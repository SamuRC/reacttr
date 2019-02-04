import React from 'react'
import { render } from 'react-dom'
import firebase from 'firebase'

firebase.initializeApp({
  apiKey: 'AIzaSyB65GVAwkDaYk-dSWf-gRZ0fswqStwBY24',
  authDomain: 'curso-react-14087.firebaseapp.com',
  databaseURL: 'https://curso-react-14087.firebaseio.com',
  projectId: 'curso-react-14087',
  storageBucket: 'curso-react-14087.appspot.com',
  messagingSenderId: '947946484757'
})

import App from './components/App'

render(<App />, document.getElementById('root'))
