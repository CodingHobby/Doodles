import React, { Component } from 'react'
import '../assets/styles/components/App.css'
import firebase from 'firebase'
import Nav from './Nav'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({user})
    })
  }

  render() {
    return (
      <div>
        <Nav user={this.state.user}/>
        {
          this.state.user ? (
            <h1>Log in to start using the app!</h1>
          ) : (
            <Contacts user={this.state.user}/>
          )
        }
      </div>
    )
  }
}

export default App
