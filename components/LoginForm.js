import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    TouchableOpacity
} from 'react-native';
import { login } from './LoginFunction';



export default class Login extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault()

        // const user = {
        //     email: 'kazkas@gmail.com',
        //     password: 'cdm2G7DH',
        // };

        const user = {
            email: this.state.email,
            password: this.state.password,
        };

        login(user).then(res=>{
            console.log(res.data)
            if(res.data.message){
                console.log(res.data.message)
            }else{
                this.props.onLoginPress()
            }
        })
    }


    render() {
        return (
            <ScrollView style={{ padding: 20 }}>
                <Text
                    style={{ fontSize: 27 }}>
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
                <View style={{ margin: 7 }} />
                {!!this.state.message && (
                    <Text
                        style={{ fontSize: 14, color: 'red', padding: 5 }}>
                        {this.state.message}
                    </Text>
                )}
                <TouchableOpacity onPress={this.onSubmit}>
                <Text>SUBMIT</Text>
                </TouchableOpacity>     
            </ScrollView>
        )
    }
}