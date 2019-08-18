import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';

export default class Home extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <TouchableOpacity
                    onPress={this.props.onLogoutPress}
                    style={styles.logoutButton}
                >
                    <Text style={styles.logoutText}> Logout </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.mainButton}
                >
                    <Text style={styles.buttonText}> Open </Text>
                </TouchableOpacity>
                <Text style={styles.tapText}> (Tap To Close) </Text>
                <Text style={styles.statusText}> Closing... </Text>
            </View>
        )
    }
}

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height
const red = '#b70b0b';
const green = '#b0c24a';


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
        backgroundColor: green,
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