import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {toggle, status} from './Api';
import Button from './Button';
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

const Home = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        let unmounted = false;
        if (!unmounted) {
            status().then(res => {
                setDevices([...res.data.devices]);
            }).catch(res => {
                if (res) {
                    console.log(res);
                    props.onLogoutPress();
                }
            });
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        return function () {
            unmounted = true;
        };
    }, []);

    const _onRefresh = () => {
        setRefreshing(true);
        status().then(res => {
            setDevices([...res.data.devices]);
            setRefreshing(false);
        }).catch(res => {
            if (res) {
                console.log(res);
                props.onLogoutPress();
            }
        });
    };

    const toggleButton = async (device_id) => {
        return toggle(device_id).then(res => {
            setDevices([...res.data.devices]);
            return false;
        }).catch(res => {
            if (res) {
                console.log(res);
                props.onLogoutPress();
            }
        });
    };

    const logout = (e) => {
        e.preventDefault();
        props.onLogoutPress();
        removeToken();
    };

    let button;
    if (devices.length <= 0) {
        button = <Text style={styles.header}>You dont have devices</Text>;
    } else {
        button = devices.map(device => {
            return (
                <Button key={device.id}
                        params={device}
                        refreshing={refreshing}
                        toggleButton={toggleButton}
                />
            );
        });
    }
    if (isLoading === true) {
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
                    onPress={logout}
                    style={styles.logoutButton}
                >
                    <Text style={styles.logoutText}> Logout </Text>
                </TouchableOpacity>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={_onRefresh}
                        />
                    }
                >
                    {button}
                </ScrollView>
            </View>
        );
    }
};

Home.propTypes = {
    onLogoutPress: PropTypes.func,
};

export default Home;

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
