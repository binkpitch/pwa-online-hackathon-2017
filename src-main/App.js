import React, { Component } from 'react'

import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { routerHistory, sagaMiddleware } from './store.js'

import rootSagas from './sagas'

import Menu from './containers/menuContainer'

import HomePage from './pages/homePage'

class App extends Component {
  constructor (props) {
    super(props)
    sagaMiddleware.run(rootSagas)
  }

  render () {
    return (
      <ConnectedRouter history={routerHistory}>
        <div>
          <Route path='/' component={Menu} />
          <Route exact path='/' component={HomePage} />
        </div>
      </ConnectedRouter>
    )
  }
}

export default App
