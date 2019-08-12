import React, { Component } from 'react'
import { Text, View } from 'react-native'

import Login from './components/LoginForm';
import Home from './components/Home';

export default class App extends Component {
  state = {
    isLoggedIn: false
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






// import React, { Component } from 'react';
// import {
//   AppRegistry
// } from 'react-native';

// import Login from '../components/LoginForm';
// import Secured from './components/Home';

// class App extends Component {

//   state = {
//     isLoggedIn: false
//   }

//   render() {

//     if (this.state.isLoggedIn) 
//       return <Secured 
//           onLogoutPress={() => this.setState({isLoggedIn: false})}
//         />;
//     else 
//       return <Login 
//           onLoginPress={() => this.setState({isLoggedIn: true})}
//         />;
//   }

// }

// export default App





















/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import React, {Fragment} from 'react';
// import LoginForm from "./components/LoginForm"

// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';



// const App = () => {

//   return (
//     <View>
//       <LoginForm/>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// export default App;
