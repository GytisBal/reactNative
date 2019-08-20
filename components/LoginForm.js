import React, {Component} from 'react';
import {login, status} from './api';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faParking } from '@fortawesome/free-solid-svg-icons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
const access_token = "";
export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            message: '',
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    storeToken = async (accessToken) => {
        try {
            await AsyncStorage.setItem(access_token, accessToken);
        } catch (error) {
            console.log(error)
        }
    };

    getToken= async () => {
        try {
            const value = await AsyncStorage.getItem(access_token);
            if (value !== null) {
                return value
            }
        } catch (error) {
           console.log(error)
        }
    };

    removeToken = async () => {
        try {
            await AsyncStorage.removeItem(access_token);
            this.getToken();
        } catch (error) {
            console.log(error)
        }
    };

    onSubmit(e) {
        e.preventDefault();

        let user;
        if (Config.IS_PRODUCTION === true){
            user = {
                email: this.state.email,
                password: this.state.password,
            };
        }   else{
           user = {
                email: 'vytis@gmail.com',
                password: 'Jy2tgYIV',
            };
        }

        login(user)
            .then(res => {

            if (res.data.message) {
                this.setState({message: res.data.message})
            } else {
                this.storeToken(res.data.accessToken)
                this.props.onLoginPress();
            }
        }).catch(res=>{
            console.log(res)
        })
    }


    render() {
        return (

            <KeyboardAwareScrollView
                style={{ backgroundColor: 'white' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={false}
            >
                <View style={styles.containerTop}>
                <View style={styles.circle}>
                <FontAwesomeIcon style={styles.parking} size={50} icon={ faParking } />
                </View>
                </View>
                <View
                    style={styles.containerBottom}
                >
                <Text
                    style={styles.loginHeading}>
                    Login
                </Text>
                    <Text
                        style={styles.message}>
                        {this.state.message}
                    </Text>
                <TextInput
                    style={styles.emailStyle}
                    placeholder='Email'
                    placeholderTextColor="blue"
                    name="email"
                    value={this.state.email}
                    onChangeText={(email) => this.setState({email})}
                />
                <TextInput
                    style={styles.passwordStyle}
                    placeholder='Password'
                    placeholderTextColor="blue"
                    name="password"
                    value={this.state.password}
                    onChangeText={(password) => this.setState({password})}
                />
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={this.onSubmit}>
                    <Text style={styles.loginButtonText}>Sign in</Text>
                </TouchableOpacity>
                </View>

            </KeyboardAwareScrollView>

        );
    }
}

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
    Wrapper: {
        position: "relative",
        height: height,
        width: width,
    },
    containerTop: {
        backgroundColor: 'blue',
        height: height / 2,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        backgroundColor: 'white',
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    parking: {
        color: 'blue',
    },

    containerBottom: {
        flex: 1,
        position: "relative",
        top: "-5%",
        zIndex: 100,
        alignItems: 'center',
        alignSelf: 'center',
        height: height / 2.5,
        width: width / 1.2,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    loginHeading: {
        fontSize: 30,
        textTransform: "uppercase",
    },
    message:{
        position: "absolute",
        top: 38,
      color: "red",
      fontSize: 14,
    },
    emailStyle:{
        fontSize:20,
        marginTop: 20,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "blue",
        width: "90%",

    },
    passwordStyle:{
        fontSize:20,
        borderBottomWidth: 1,
        borderBottomColor: "blue",
        marginTop: 20,
        width: "90%",
    },
    loginButton:{
        position: "absolute",
        height: 50,
        width: 200,
        top: "90%",
        backgroundColor: "blue",
        borderRadius: 30,
        justifyContent: 'center',
    },
    loginButtonText:{
        fontSize:20,
        color: "white",
        textTransform: "uppercase",
        alignSelf: 'center',

    },
});



