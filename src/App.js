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
// import HomePage from './pages/homePage'
// import TodoListPage from './pages/todoListPage'
import VotePage from './pages/votePage'
import ResultPage from './pages/resultPage'

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

  componentDidMount () {
    // notifications
    this._notifications()
    this._displayNotification()
  }

  _notifications() {
    Notification.requestPermission(function(status) {
      console.log('Notification permission status:', status);
    });
  }

  _displayNotification() {
    if (Notification.permission === 'granted') {
      Firebase.database().ref('isOpen').on('value', (openData) => {
        // const isOpen = openData.val();

        // if(!isOpen) {
        if(true) {
          Firebase.database().ref('candidates').once('value', (candData) => {
            let candidates = candData.val();

            if(candidates && candidates.length > 0) {
              candidates = candidates.sort(function(a, b){return b.score-a.score});

              this._sendNotifications(candidates)
            }
          });
        }
      })
    }
  }

  _sendNotifications(candidates) {
    navigator.serviceWorker.getRegistration().then((reg) => {
      if(reg) {
        var options = {
          body: `Winner is ${candidates[0].name || ''} score ${candidates[0].score || 0}`,
          icon: './icon192.png',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          }
        };
        reg.showNotification('Election Voting Platform', options);
      }
    });
  }

  render () {
    return (
      <ConnectedRouter history={routerHistory}>
        <div>
          <Route path='/' component={Menu} />
          {/* <Route exact path='/' component={HomePage} />
          <Route path='/todolist' component={TodoListPage} /> */}
          <Route exact path='/' component={VotePage} />
          <Route path='/result' component={ResultPage} />
        </div>
      </ConnectedRouter>
    )
  }
}

export default App
