import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import store from './store'
import { Provider } from 'react-redux'
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  // Use Provider to provide store to all parts of the application
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
