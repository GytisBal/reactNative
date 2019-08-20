import React, { Component } from 'react'
import Login from './components/LoginForm';
import Home from './components/Home';
import {login} from './components/api';
import AsyncStorage from '@react-native-community/async-storage';
const access_token = "";
export default class App extends Component {
  state = {
    isLoggedIn: true
  }
  componentDidMount(){
   const getToken= async () => {
      try {
        const value = await AsyncStorage.getItem(access_token);
        if (value !== null) {
          console.log(value)
        }
      } catch (error) {
        console.log(error)
      }
    };
  // getToken()
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
