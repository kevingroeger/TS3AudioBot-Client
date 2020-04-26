import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App
      render={() => <h1>>You broke something.</h1>}
    />
  </Provider>,
  document.getElementById('root')
)
