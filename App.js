import React, { Component } from 'react'
import Login from './components/LoginForm';
import Home from './components/Home';

export default class App extends Component {
  state = {
    isLoggedIn: true
  }

  render() {
    if (this.state.isLoggedIn)
      return <Home
        onLogoutPress={() => this.setState({ isLoggedIn: false })}
      />;
    else
      return <Login
        onLoginPress={() => this.setState({ isLoggedIn: true })}
      />;
  }
}
