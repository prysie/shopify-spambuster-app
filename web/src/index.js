import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppProvider as PolarisProvider } from '@shopify/polaris'
import { Provider as AppBridgeProvider, useAppBridge } from '@shopify/app-bridge-react'
import { Redirect } from '@shopify/app-bridge/actions'
import store from './store.js'
import { get, post } from './utilities.js'
import translations from '@shopify/polaris/locales/en.json'
import { BACKEND_URL, STAGE, APP_PATH } from './config.js'

console.log('Spambuster app v2.0.7 - ' + STAGE)

const MyProvider = ({ children }) => {
  const app = useAppBridge()
  const redirect = Redirect.create(app)

  return children
}

const render = (apiKey, shop) => {
  const App = require('./containers/app.jsx').default
  const rootEl = document.getElementById('react-app')

  if (rootEl) {
    ReactDOM.render(
      <Provider store={store}>
        <PolarisProvider i18n={translations}>
          <AppBridgeProvider
            config={{
              apiKey: apiKey,
              shopOrigin: shop,
              forceRedirect: true,
            }}
          >
            <MyProvider>
              <Router>
                <App apiKey={apiKey} shop={shop} />
              </Router>
            </MyProvider>
          </AppBridgeProvider>
        </PolarisProvider>
      </Provider>,
      rootEl
    )
  } else {
    console.error('React root element not found.')
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
  get(BACKEND_URL + '/access' + window.location.search).then((json) => {
    if (json.apiKey) {
      startReact(json.apiKey, shop)
    }
  }).catch((error) => {
    console.error(error)
  })
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
  const redirectURL = BACKEND_URL + '/install' + window.location.search
  window.location.href = redirectURL
} else if (code !== null) {
  console.log('Confirming install...')
  const nonce = urlParams.get('state')

  post(BACKEND_URL + '/confirm', {
    code: code,
    nonce: nonce,
    hmac: hmac,
    shop: shop,
    timestamp: timestamp,
    queryString: window.location.search
  }).then((json) => {
    if (json.apiKey) {
      window.location.href = 'https://' + shop + APP_PATH
    }
  }).catch((error) => {
    console.error(error)
  })
} else if (chargeID !== null) {
  console.log('Returned from billing confirmation')
  get(BACKEND_URL + '/activate' + window.location.search).then((json) => {
    startApp(shop)
  }).catch((error) => {
    console.error(error)
  })
} else {
  console.log('Installed version running')
  startApp(shop)
}

export default {
  render: render,
  startHMR: startHMR,
  hmrCallback: hmrCallback,
}
