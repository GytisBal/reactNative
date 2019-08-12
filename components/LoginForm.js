import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button
} from 'react-native';
import { login } from './LoginFunction';

export default class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            isLoggingIn: false,
            message: ''
        }

        this.onChange=this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e){
        e.preventDefault()

        const user = {
            username: this.state.username,
            password: this.state.password,
        };

        login(user).then(res => {
            if (res){
                this.props.history.push('/profile')
            }
        })

        this.setState({isLoggingIn: true, message:''});
    }


    render() {

        return (
            <ScrollView style={{ padding: 20 }}>
                <Text
                    style={{ fontSize: 27 }}>
                    Login
            </Text>
                <TextInput 
                placeholder='Username'
                name="username"
                value={this.state.username}
                onChange={this.onChange}
                />
                <TextInput 
                placeholder='Password' 
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                />
                <View style={{ margin: 7 }} />
                {!!this.state.message && (
                    <Text
                        style={{ fontSize: 14, color: 'red', padding: 5 }}>
                        {this.state.message}
                    </Text>
                )}
                <Button
                    disabled={this.state.isLoggingIn || !this.state.username || !this.state.password}
                    onChange={this.onChange}
                    title="Submit" />
            </ScrollView>
        )
    }
}