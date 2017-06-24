import React, { Component } from 'react'
import Firebase from 'firebase'

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
import CandidatesPage from './pages/candidatesPage'

const firebaseConfig = {
  apiKey: 'AIzaSyDU3HxQOtgg0chbgVKd5RbrmiZNTCvcqYQ',
  authDomain: 'pwa-online-hackathon-2017.firebaseapp.com',
  databaseURL: 'https://pwa-online-hackathon-2017.firebaseio.com',
  projectId: 'pwa-online-hackathon-2017',
  storageBucket: 'pwa-online-hackathon-2017.appspot.com',
  messagingSenderId: '388721314773'
}

class App extends Component {
  constructor (props) {
    super(props)
    sagaMiddleware.run(rootSagas)
    Firebase.initializeApp(firebaseConfig)
  }

  render () {
    return (
      <ConnectedRouter history={routerHistory}>
        <div>
          <Route path='/' component={Menu} />
          <Route exact path='/' component={HomePage} />
          <Route path='/todolist' component={TodoListPage} />
          <Route path='/candidates' component={CandidatesPage} />
        </div>
      </ConnectedRouter>
    )
  }
}

export default App
