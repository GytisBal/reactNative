import React, {Component} from 'react';
import {toggle, status} from './api';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const access_token = "";

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            status: false,
            onAction: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        this.getToken()
        status()
            .then(res=>{
              this.setState({status: res.data})
            })
            .catch(res=>{
                console.log(res)
            })
    }

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

    onSubmit(e) {
        e.preventDefault();

        this.setState({onAction: true})

        toggle().then(res => {
            this.setState({onAction: false})
            if(res.data === "on"){
                this.setState({status: true})
            }else{
                this.setState({status: false})
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        let color;
        let buttonText;
        let tapText;
        let statusText;

        if(this.state.status === true){
            color = '#b0c24a'
            buttonText = 'close'
            tapText = 'Tap To Close'
        }else{
            color = '#b70b0b'
            buttonText = 'open'
            tapText = 'Tap To Open'
        }

        if(this.state.onAction === true && this.state.status === true){
            statusText = "Closing..."
        }else if(this.state.onAction === true && this.state.status === false){
            statusText = "Opening..."
        }

        return (
            <View style={styles.wrapper}>
                <TouchableOpacity
                    onPress={this.props.onLogoutPress}
                    style={styles.logoutButton}
                >
                    <Text style={styles.logoutText}> Logout </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.onSubmit}
                    disabled={this.state.onAction}
                    style={[{ backgroundColor: color }, styles.mainButton]}
                >
                    <Text style={styles.buttonText}> {buttonText} </Text>
                </TouchableOpacity>
                <Text style={styles.tapText}> ({tapText}) </Text>
                <Text style={styles.statusText}> {statusText} </Text>
            </View>
        )
    }
}

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height


const styles = StyleSheet.create({
    Wrapper: {
        position: "relative",
        height: height,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutButton: {
        backgroundColor: "blue",
        justifyContent: 'center',
        height: 50,
    },
    logoutText: {
        alignSelf: 'center',
        textTransform: 'uppercase',
        color: "white",
        fontSize: 25,
    },
    mainButton: {
        position: "relative",
        top: "50%",
        width: 200,
        height: 200,
        borderRadius: 200 / 2,
        justifyContent: 'center',
        textAlign: "center",
        alignSelf: 'center',
        textTransform: 'uppercase',
        borderWidth: 15,
        borderColor: "#D3D3D3",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,

    },
    buttonText: {
        fontSize: 40,
        color: "white",
        textTransform: "uppercase",
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    tapText: {
        position: "relative",
        top: "55%",
        fontSize: 20,
        color: "black",
        alignSelf: 'center',
    },
    statusText: {
        position: "relative",
        top: "60%",
        fontWeight: 'bold',
        fontSize: 15,
        color: "black",
        alignSelf: 'center',
    },

});
