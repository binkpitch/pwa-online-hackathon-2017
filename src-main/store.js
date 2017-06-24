import { createStore, applyMiddleware } from 'redux'

import rootReducer from './reducers'

import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'

import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'

import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'

import createSagaMiddleware from 'redux-saga'

export const routerHistory = createHistory()
export const sagaMiddleware = createSagaMiddleware()

const middleware = process.env.NODE_ENV !== 'production'
  // add middlewares to run on development
  ? [reduxImmutableStateInvariant(), routerMiddleware(routerHistory), sagaMiddleware]
  // add middlewares to run on production
  : [routerMiddleware(routerHistory), sagaMiddleware]

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware)) // apply redux-devtools-extension
)

export default store
