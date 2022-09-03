// 🐨 you'll need to import react and createRoot from react-dom up here
import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import {Logo} from './components/logo'
import {Dialog, setShowDialog} from '@reach/dialog'
import '@reach/dialog/styles.css'

// 🐨 you'll also need to import the Logo component from './components/logo'
// 🐨 create an App component here and render the logo, the title ("Bookshelf"), a login button, and a register button.
// 🐨 for fun, you can add event handlers for both buttons to alert that the button was clicked
const App = () => {
  return (
    <div>
      <Logo width={80} height={80} />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => alert('login clicked')} type="button">
          Login
        </button>
      </div>
      <div>
        <button onClick={() => alert('Register clicked')} type="button">
          Register
        </button>
      </div>
    </div>
  )
}

// 🐨 use createRoot to render the <App /> to the root element
// 💰 find the root element with: document.getElementById('root')

ReactDOM.render(<App />, document.getElementById('root'))
