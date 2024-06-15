import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { BACKEND_URL, STAGE, APP_PATH } from './config.js';
import store from './store.js';
import { get, post } from './utilities.js';

console.log('Spambuster app v2.0.10 - ' + STAGE);

const render = (apiKey, shop) => {
  const App = require('./containers/app.jsx').default;
  const rootEl = document.getElementById('react-app');

  if (rootEl) {
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <App apiKey={apiKey} shop={shop} />
        </Router>
      </Provider>,
      rootEl
    );
  } else {
    console.error('React root element not found.');
  }
};

const hmrCallback = () => {
  setTimeout(render);
};

const startHMR = (hmr) => {
  if (hmr) {
    hmr.accept('./containers/app.jsx', hmrCallback);
  }
};

const startReact = (apiKey, shop) => {
  startHMR(module.hot);
  render(apiKey, shop);
};

const startApp = (shop) => {
  get(BACKEND_URL + '/access' + window.location.search).then(json => {
    if (json.apiKey) {
      startReact(json.apiKey, shop);
    }
  }).catch(error => {
    console.error(error);
  });
};

const urlParams = new URLSearchParams(window.location.search);
const shop = urlParams.get('shop');

if (shop) {
  startApp(shop);
} else {
  console.error('Shop parameter not found.');
}

export default {
  render: render,
  startHMR: startHMR,
  hmrCallback: hmrCallback
};
