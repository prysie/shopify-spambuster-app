import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router
} from "react-router-dom"
import { BACKEND_URL, STAGE, APP_PATH } from './config.js'
import store from './store.js'
import { get, post } from './utilities.js'

console.log('Spambuster app v2.1.7 - ' + STAGE)

const render = (apiKey, shop) => {
  console.log('Calling render')
  const App = require('./containers/app.jsx').default
  const rootEl = document.getElementById('react-app')

  if (rootEl) {
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <App apiKey={apiKey} shop={shop} />
        </Router>
      </Provider>,
      rootEl
    )
  } else {
    // if (process && process.env.NODE_ENV !== 'test') {
      console.error('React root element not found.')
    // }
  }
}

const hmrCallback = () => {
  setTimeout(render)
}

const startHMR = (hmr) => {
  if (hmr) {
    hmr.accept('./containers/app.jsx', hmrCallback)
  }
}

const startReact = (apiKey, shop) => {
  startHMR(module.hot)
  render(apiKey, shop)
}

const startApp = (shop) => {
  console.log('Starting the app');
  get(BACKEND_URL + '/access' + window.location.search).then(json => {
    console.log('Response from /access:', json);
    if (json.apiKey) {
      console.log('API key received. Starting React.');
      startReact(json.apiKey, shop);
    } else {
      console.log('API key not found in the response.');
    }
  }).catch(error => {
    console.error('Error fetching /access:', error);
  });
}

const urlParams = new URLSearchParams(window.location.search)
const hmac = urlParams.get('hmac')
const shop = urlParams.get('shop')
const timestamp = urlParams.get('timestamp')

const code = urlParams.get('code')

const session = urlParams.get('session')

const chargeID = urlParams.get('charge_id')

if (session === null && code === null && hmac !== null && shop !== null && timestamp !== null) {
  console.log('Installing...')
  // First install
  const redirectURL = BACKEND_URL + '/install' + window.location.search
  window.location.href = redirectURL
} else if (code !== null) {
  console.log('Confirming install...')
  // Install confirmation
  const nonce = urlParams.get('state')

  post(BACKEND_URL + '/confirm', {
    code: code,
    nonce: nonce,
    hmac: hmac,
    shop: shop,
    timestamp: timestamp,
    queryString: window.location.search
  }).then(json => {
    if (json.apiKey) {
      window.location.href = 'https://' + shop + APP_PATH
    }
  }).catch(error => {
    console.error(error)
  })
} else if (chargeID !== null) {
  console.log('Returned from billing confirmation');
  get(BACKEND_URL + '/activate' + window.location.search)
    .then(json => {
      console.log('Response from /activate:', json);
      if (json.isActive === true) {
        console.log('Payment approved. Starting the app.');
        startApp(shop);
      } else if (json.isActive === false && json.confirmationURL) {
        console.log('Payment not yet approved. Redirecting to the payment confirmation URL.');
        window.top.location.href = json.confirmationURL;
      } else {
        console.error('Unexpected response from /activate:', json);
      }
    })
    .catch(error => {
      console.error('Error activating the app after payment:', error);
    });
}

export default {
  render: render,
  startHMR: startHMR,
  hmrCallback: hmrCallback
}
