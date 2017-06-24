import { createStore, applyMiddleware } from 'redux'

// all reducers combined together
import rootReducer from './reducers'

// error spitter when trying to mutate redux state, shouldn't be run in production due to overhead
// it throws 'Error: A state mutation was detected inside a dispatch'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'

// logger for redux with time travel https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
// "/logOnlyInProduction" disable extension in production
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'

// for react-router-redux
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

// create store that contains all reducers and middlewares
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware)) // apply redux-devtools-extension
)

export default store
