import React, { Component } from 'react'
// Cambiar el import de react-router por este otro
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import firebase from 'firebase'
import 'normalize-css'

import Header from '../Header'
import Main from '../Main'
import Profile from '../Profile'
import Login from '../Login'

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null
    }

    this.handleOnAuth = this.handleOnAuth.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  /* una vez el componente se reenderizo, librerias externas */
  componentWillMount () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
        console.log(user)
      } else {
        this.setState({ user: null })
      }
    })
  }

  handleOnAuth () {
    const provider = new firebase.auth.GithubAuthProvider()
    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => console.error(`Error: ${error.code}: ${error.message}`))
  }

  handleLogout () {
    firebase.auth().signOut()
      .then(() => console.log('Te has desconectado correctamente'))
      .catch(() => console.error('Un Error ocurrió'))
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
