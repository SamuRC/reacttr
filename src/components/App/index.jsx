import React, { Component } from 'react'
import 'normalize-css'

import styles from './app.css'
import Header from '../Header'
import Main from '../Main'

class App extends Component {
  constructor(){
    super()
    this.state = {
      user: {
        photoURL: 'https://pbs.twimg.com/profile_images/1014574035995381760/xxA7qmVp_bigger.jpg',
        email: 'samurc.net@gmail.com',
        displayName: 'Samuel Cusi'
      }
    }
  }

  render (){
    return (
      <div>
        <Header />
        <Main user={this.state.user} />
      </div>
    )
  }
}

export default App
