import React, {Component} from 'react';
import {toggle, status} from './api';
import Button from './Button';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faParking} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
    RefreshControl,
} from 'react-native';

const access_token = '';
export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            status: false,
            isLoading: true,
            devices: [],
            refreshing: false,
        };

        this.toggleButton = this.toggleButton.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        this.getToken()
            .then(token => {
                status(token)
                    .then(res => {
                        this.setState({devices: [...res.data.devices]});
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
                setTimeout(() => {
                    this.setState({isLoading: false});
                }, 3000);
            });
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.getToken()
            .then(token => {
                status(token)
                    .then(res => {
                        this.setState({devices: [...res.data.devices]});
                        this.removeToken();
                        this.storeToken(res.data.accessToken);
                        this.setState({refreshing: false});
                    })
                    .catch(res => {
                        if (res) {
                            console.log(res);
                            this.removeToken();
                            this.props.onLogoutPress();
                        }
                    });
            });
    };

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

    async toggleButton(device_id) {
        return this.getToken()
            .then(token => {
                return toggle(token, device_id)
                    .then(res => {
                        console.log(res)
                        this.setState({devices: [...res.data.devices]});
                        return res.data.accessToken;
                    }).then(res => {
                        this.removeToken();
                        this.storeToken(res);
                        return false;
                    }).catch(res => {
                        if (res) {
                            console.log(res);
                            this.removeToken();
                            this.props.onLogoutPress();
                        }
                    });
            });
    }

    logout(e) {
        e.preventDefault();
        this.props.onLogoutPress();
        this.removeToken();
    }

    render() {
        const button = this.state.devices.map(item => {
            console.log(item.status)
            return (
                <Button key={item.id} status={this.state.status} params={item} toggleButton={this.toggleButton}/>
            );
        });

        if (this.state.isLoading === true) {
            return (
                <View style={styles.loadingPage}>
                    <View style={styles.circle}>
                        <FontAwesomeIcon style={styles.parking} size={50} icon={faParking}/>
                    </View>
                    <Text style={styles.loadingHeader}> Loading... </Text>
                </View>
            );
        } else if (this.state.devices.length <= 0) {
            return (
                <View>
                    <TouchableOpacity
                        onPress={this.logout}
                        style={styles.logoutButton}
                    >
                        <Text style={styles.logoutText}> Logout </Text>
                    </TouchableOpacity>
                    <Text style={styles.header}>You dont have devices</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.wrapper}>
                    <TouchableOpacity
                        onPress={this.logout}
                        style={styles.logoutButton}
                    >
                        <Text style={styles.logoutText}> Logout </Text>
                    </TouchableOpacity>

                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                    >
                        {button}
                    </ScrollView>
                </View>
            );
        }
    }
}

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height
const styles = StyleSheet.create({
    loadingPage: {
        top: '30%',
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
