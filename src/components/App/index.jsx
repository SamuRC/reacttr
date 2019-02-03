import React, { Component } from 'react'
// Cambiar el import de react-router por este otro
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'normalize-css'

import styles from './app.css'
import Header from '../Header'
import Main from '../Main'
import Profile from '../Profile'
import Login from '../Login'

class App extends Component {
  constructor(){
    super()
    this.state = {
      user: {
        photoURL: 'https://pbs.twimg.com/profile_images/1014574035995381760/xxA7qmVp_bigger.jpg',
        email: 'samurc.net@gmail.com',
        displayName: 'Samuel Cusi',
        location: 'Lima, Perú'
      }
    }

    this.handleOnAuth = this.handleOnAuth.bind(this)
  }

  handleOnAuth(){
    console.log('Auth');
  }


  // Modificar el método render con los nuevos componentes: HashRouter por Router,
  // añadir Switch y cambiar Match por Route y en lugar de pattern utilizar
  // la propiedad path
  render () {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path='/' render={() => {
              if (this.state.user) {
                return (
                  <Main
                  user={this.state.user}
                  onLogout={this.handleLogout}
                  />
                )
              } else {
                return (
                  <Login onAuth={this.handleOnAuth} />
                )
              }
            }} />
            <Route path='/profile' render={() => {
              return (
                <Profile
                  picture={this.state.user.photoURL}
                  username={this.state.user.email.split('@')[0]}
                  displayName={this.state.user.displayName}
                  location={this.state.user.location}
                  emailAddress={this.state.user.email}
                />
              )
            }} />
            <Route path='/user/:username' render={({ params }) => {
              return (
                <Profile
                  displayName={params.username}
                  username={params.username}
                />
              )
            }} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
