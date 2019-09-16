import React, {Component} from 'react';
import {toggle, status} from './Api';
import Button from './Button1';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faParking} from '@fortawesome/free-solid-svg-icons';
import {removeToken} from './AsyncStorage';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
    RefreshControl,
} from 'react-native';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            devices: [],
            refreshing: false,
        };
        this.toggleButton = this.toggleButton.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        status().then(res => {
            this.setState({devices: [...res.data.devices]});
        }).catch(res => {
            if (res) {
                console.log(res);
                this.props.onLogoutPress();
            }
        });
        setTimeout(() => {
            this.setState({isLoading: false});
        }, 3000);
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        status().then(res => {
            this.setState({devices: [...res.data.devices], refreshing: false});
        }).catch(res => {
            if (res) {
                console.log(res);
                this.props.onLogoutPress();
            }
        });
    };

    async toggleButton(device_id) {
        return toggle(device_id).then(res => {
            this.setState({devices: [...res.data.devices]});
            return false;
        }).catch(res => {
            if (res) {
                console.log(res);
                this.props.onLogoutPress();
            }
        });
    }

    logout(e) {
        e.preventDefault();
        this.props.onLogoutPress();
        removeToken();
    }

    render() {
        let button;
        if (this.state.devices.length <= 0) {
            button = <Text style={styles.header}>You dont have devices</Text>;
        } else {
            button = this.state.devices.map(device => {
                return (
                    <Button key={device.id}
                            params={device}
                            refreshing={this.state.refreshing}
                            toggleButton={this.toggleButton}
                    />
                );
            });
        }
        if (this.state.isLoading === true) {
            return (
                <View style={styles.loadingPage}>
                    <View style={styles.circle}>
                        <FontAwesomeIcon style={styles.parking} size={50} icon={faParking}/>
                    </View>
                    <Text style={styles.loadingHeader}> Loading... </Text>
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
    header: {
        flex: 1,
        height: height,
        width: width,
        fontSize: 25,
        top: '15%',
        color: 'black',
        alignSelf: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        textTransform: 'uppercase',
        backgroundColor: 'transparent',
    },
});
