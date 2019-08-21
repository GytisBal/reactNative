import React, {Component} from 'react';
import {toggle, status} from './api';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
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

        this.toggleButton = this.toggleButton.bind(this);
    }

    componentDidMount() {
       this.getToken()
            .then(token => {
                console.log(token)
            status(token)
                .then(res => {
                    this.setState({status: res.data})
                })
                .catch(res => {
                    if (res) {
                        console.log(res)
                        this.removeToken()
                        this.props.onLogoutPress()
                    }
                })
        })
    }

    getToken = async () => {
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
            this.getToken()
        } catch (error) {
            console.log(error)
        }
    };


    toggleButton(e) {
        e.preventDefault();

        this.setState({onAction: true})

        this.getToken()
            .then(token => {
            toggle(token)
                .then(res => {
                this.setState({onAction: false})

                if (res.data === "on") {
                    this.setState({status: true})
                } else {
                    this.setState({status: false})
                }
            }).catch(res=>{
                if (res) {
                    console.log(res)
                    this.removeToken()
                    this.props.onLogoutPress()
                }
            });
        });
    }

    handleScroll(){
        // event.nativeEvent.contentOffset.x
    }

    render() {
        let color;
        let buttonText;
        let tapText;
        let statusText;

        if (this.state.status === true) {
            color = '#b0c24a'
            buttonText = 'close'
            tapText = 'Tap To Close'
        } else {
            color = '#b70b0b'
            buttonText = 'open'
            tapText = 'Tap To Open'
        }

        if (this.state.onAction === true && this.state.status === true) {
            statusText = "Closing..."
        } else if (this.state.onAction === true && this.state.status === false) {
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
                <Text style={styles.header}> Lempa </Text>
                <ScrollView onScroll={this.handleScroll}>
                <View style={styles.mainButtonContainer}>
                <TouchableOpacity
                    onPress={this.toggleButton}
                    disabled={this.state.onAction}
                    style={[{backgroundColor: color}, styles.mainButton]}
                >
                    <Text style={styles.buttonText}> {buttonText} </Text>
                </TouchableOpacity>
                <Text style={styles.tapText}> ({tapText}) </Text>
                <Text style={styles.statusText}> {statusText} </Text>
                </View>
                <View  style={styles.mainButtonContainer}>
                    <TouchableOpacity
                        onPress={this.toggleButton}
                        disabled={this.state.onAction}
                        style={[{backgroundColor: color}, styles.mainButton]}
                    >
                        <Text style={styles.buttonText}> {buttonText} </Text>
                    </TouchableOpacity>
                    <Text style={styles.tapText}> ({tapText}) </Text>
                    <Text style={styles.statusText}> {statusText} </Text>
                </View>
                </ScrollView>
            </View>
        )
    }
}


const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height


const styles = StyleSheet.create({
    Wrapper: {
        backgroundColor: 'transparent',
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
    header:{
        fontSize: 30,
        color: "black",
        alignSelf: 'center',
        textTransform: 'uppercase',
        backgroundColor: 'transparent',
    },
    mainButtonContainer:{
        flex: 1,
        height: height,
        width: width,
    },
    mainButton: {
        position: "relative",
        top: "30%",
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
        top: "35%",
        fontSize: 20,
        color: "black",
        alignSelf: 'center',
    },
    statusText: {
        position: "relative",
        top: "40%",
        fontWeight: 'bold',
        fontSize: 15,
        color: "black",
        alignSelf: 'center',
    },

});
