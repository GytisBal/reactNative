import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faParking } from '@fortawesome/free-solid-svg-icons'

import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';

import {login} from './LoginFunction';


export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            email: 'test2@gmail.com	',
            password: 'jN9Rlz1W',
        };

        // const user = {
        //     email: this.state.email,
        //     password: this.state.password,
        // };

        login(user).then(res => {
            console.log(res.data);
            if (res.data.message) {
                console.log(res.data.message);
            } else {
                this.props.onLoginPress();
            }
        });
    }


    render() {
        return (
            <ScrollView style={styles.wrapper}>
                <View style={styles.containerTop}>
                    <View style={styles.circle}>
                        <FontAwesomeIcon style={styles.parking} size={50} icon={ faParking } />
                    </View>
                </View>
                <View style={styles.containerBottom}>
                <Text
                    style={{fontSize: 27}}>
                    Login
                </Text>
                <TextInput
                    placeholder='email'
                    name="email"
                    value={this.state.email}
                    onChangeText={(email) => this.setState({email})}
                />
                <TextInput
                    placeholder='Password'
                    name="password"
                    value={this.state.password}
                    onChangeText={(password) => this.setState({password})}
                />
                </View>

                {/*/!*<View style={{margin: 7}}/>*!/*/}
                {/*/!*{!!this.state.message && (*!/*/}
                {/*/!*    <Text*!/*/}
                {/*/!*        style={{fontSize: 14, color: 'red', padding: 5}}>*!/*/}
                {/*/!*        {this.state.message}*!/*/}
                {/*/!*    </Text>*!/*/}
                {/*/!*)}*!/*/}

                <TouchableOpacity onPress={this.onSubmit}>
                    <Text>SUBMIT</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}
{/*<LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>*/}
{/*    <Text>Hello</Text>*/}
{/*</LinearGradient>*/}

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
    Wrapper: {
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
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
        position: "absolute",
        top: 0,
        left: width / 2,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        height: height / 2,
        width: width / 2,
        backgroundColor: 'grey',
    },
});
