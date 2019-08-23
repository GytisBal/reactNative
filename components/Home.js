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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faParking } from '@fortawesome/free-solid-svg-icons'
import AsyncStorage from '@react-native-community/async-storage';

const access_token = '';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            status: false,
            onAction: false,
            isLoading: true,
        };

        this.toggleButton = this.toggleButton.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true})
        this.getToken()
            .then(token => {
                status(token)
                    .then(res => {
                        this.setState({status: res.data.status});
                        this.removeToken();
                        this.storeToken(res.data.accessToken);
                    })
                    .catch(res => {
                        if (res) {
                            console.log(res);
                            this.removeToken();
                            this.props.onLogoutPress();
                        }
                    });
                setTimeout(() => {this.setState({isLoading: false})}, 3000)
            });
    }

    storeToken = async (accessToken) => {
        try {
            await AsyncStorage.setItem(access_token, accessToken);
        } catch (error) {
            console.log(error);
        }
    };

    getToken = async () => {
        try {
            const value = await AsyncStorage.getItem(access_token);
            if (value !== null) {
                return value;
            }
        } catch (error) {
            console.log(error);
        }
    };

    removeToken = async () => {
        try {
            await AsyncStorage.removeItem(access_token);
            this.getToken();
        } catch (error) {
            console.log(error);
        }
    };


    toggleButton(e) {
        e.preventDefault();

        this.setState({onAction: true});

        this.getToken()
            .then(token => {
                toggle(token)
                    .then(res => {
                        this.setState({onAction: false});
                        if (res.data.turn === 'on') {
                            this.setState({status: true});
                        } else {
                            this.setState({status: false});
                        }
                        return res.data.accessToken;
                    }).then(res => {
                    this.removeToken();
                    this.storeToken(res);
                }).catch(res => {
                    if (res) {
                        console.log(res);
                        this.removeToken();
                        this.props.onLogoutPress();
                    }
                });
            });
    }

    render() {
        let color;
        let buttonText;
        let tapText;
        let statusText;

        if (this.state.status === true) {
            color = '#b0c24a';
            buttonText = 'close';
            tapText = 'Tap To Close';
        } else {
            color = '#b70b0b';
            buttonText = 'open';
            tapText = 'Tap To Open';
        }

        if (this.state.onAction === true && this.state.status === true) {
            statusText = 'Closing...';
        } else if (this.state.onAction === true && this.state.status === false) {
            console.log('labas');
            statusText = 'Opening...';
        }

        if (this.state.isLoading === true) {
            return (
                <View style={styles.loadingPage}>
                <View style={styles.circle}>
                    <FontAwesomeIcon style={styles.parking} size={50} icon={ faParking } />
                </View>
                    <Text style={styles.loadingHeader}> Loading... </Text>
                </View>
            );
        } else {
            return (
                <View style={styles.wrapper}>
                    <TouchableOpacity
                        onPress={this.props.onLogoutPress}
                        style={styles.logoutButton}
                    >
                        <Text style={styles.logoutText}> Logout </Text>

                    </TouchableOpacity>

                    <ScrollView onScroll={this.handleScroll}>
                        <View style={styles.mainButtonContainer}>
                            <Text style={styles.header}> Lempa </Text>
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
                        <View style={styles.mainButtonContainer}>
                            <Text style={styles.header}> Kitas</Text>
                            <TouchableOpacity
                                onPress={this.toggleButton}
                                disabled={true}
                                style={[{backgroundColor: 'grey'}, styles.mainButton]}
                            >
                                <Text style={styles.buttonText}> {buttonText} </Text>
                            </TouchableOpacity>
                            <Text style={styles.tapText}> ({tapText}) </Text>
                            <Text style={styles.statusText}> {statusText} </Text>
                        </View>
                    </ScrollView>
                </View>
            );
        }
    }
}


const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height


const styles = StyleSheet.create({
    loadingPage:{
        top: "30%",
    },
    circle: {
        backgroundColor: 'white',
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        borderWidth: 0.5,
        borderColor: 'blue',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    parking: {
        color: 'blue',
    },
    loadingHeader: {
        fontSize: 15,
        left: 5,
        top: '15%',
        color: 'black',
        alignSelf: 'center',
        backgroundColor: 'transparent',
    },
    Wrapper: {
        backgroundColor: 'transparent',
    },
    logoutButton: {
        backgroundColor: 'blue',
        justifyContent: 'center',
        height: 50,
    },
    logoutText: {
        alignSelf: 'center',
        textTransform: 'uppercase',
        color: 'white',
        fontSize: 25,
    },

    mainButtonContainer: {
        flex: 1,
        height: height,
        width: width,
    },
    header: {
        fontSize: 30,
        top: '15%',
        color: 'black',
        alignSelf: 'center',
        textTransform: 'uppercase',
        backgroundColor: 'transparent',
    },
    mainButton: {
        position: 'relative',
        top: '30%',
        width: 200,
        height: 200,
        borderRadius: 200 / 2,
        justifyContent: 'center',
        textAlign: 'center',
        alignSelf: 'center',
        textTransform: 'uppercase',
        borderWidth: 15,
        borderColor: '#D3D3D3',

        shadowColor: '#000',
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
        color: 'white',
        textTransform: 'uppercase',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    tapText: {
        position: 'relative',
        top: '35%',
        fontSize: 20,
        color: 'black',
        alignSelf: 'center',
    },
    statusText: {
        position: 'relative',
        top: '40%',
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
        alignSelf: 'center',
    },

});
