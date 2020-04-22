import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
) */

ReactDOM.render(
  <App
    render={() => <h1>>You broke something.</h1>}
  />,
  document.getElementById('root')
)
