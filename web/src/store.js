import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import root from './reducers/root.js'

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducers = combineReducers({
  root: root
})

const store = createStore(reducers, storeEnhancers(applyMiddleware(thunk)))

export default store
