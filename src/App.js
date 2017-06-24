import React, { Component } from 'react'

// use dispatch(push('/page')) for page navigation
// for more actions, see https://github.com/ReactTraining/react-router/blob/master/packages/react-router-redux/modules/actions.js
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { routerHistory, sagaMiddleware } from './store.js'

// get every sagas
import rootSagas from './sagas'

import Menu from './containers/menuContainer'

// import your pages here
import HomePage from './pages/homePage'
import TodoListPage from './pages/todoListPage'

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
          <Route path='/todolist' component={TodoListPage} />
        </div>
      </ConnectedRouter>
    )
  }
}

export default App
