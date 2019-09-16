import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Animation from './Animation1';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions, Animated, Easing,
} from 'react-native';

const Button = props => {
    const [onAction, setOnAction] = useState(false);
    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));

    useEffect(() => {
        const {status, turn} = props.params;
        toggleAnimation(0, !status, turn);
    }, [props.refreshing]);

    const toggleAnimation = (duration, status, turn) => {
        let isOn;
        if (turn !== undefined) {
            isOn = !turn;
        } else {
            isOn = !status;
        }
        Animated.timing(
            animatedValue,
            {
                toValue: isOn ? 1 : 0,
                duration: duration,
                easing: Easing.linear,
                delay: 0,
            },
        ).start();
    };

    const toggleButton = () => {
        const {device_id, status, turn} = props.params;
        setOnAction(true);
        toggleAnimation(5000, status, turn);
        setTimeout(() => {
            props.toggleButton(device_id).then((res) => {
                setOnAction(res);
            });
        }, 3500);
    };

    const {status, turn, name} = props.params;
    let color;
    let buttonText;
    let tapText;
    let fontSize;
    if (status === null) {
        color = 'grey';
        buttonText = 'Disabled';
        tapText = '';
        fontSize = 30;
    } else if (turn === true) {
        fontSize = 40;
        color = '#b0c24a';
        buttonText = 'close';
        tapText = '(Tap To Close)';
    } else if (turn === false) {
        fontSize = 40;
        color = '#b70b0b';
        buttonText = 'open';
        tapText = '(Tap To Open)';
    } else if (turn === undefined && status === true) {
        fontSize = 40;
        color = '#b0c24a';
        buttonText = 'close';
        tapText = '(Tap To Close)';
    } else {
        fontSize = 40;
        color = '#b70b0b';
        buttonText = 'open';
        tapText = '(Tap To Open)';
    }

    let statusText;
    if (turn === undefined) {
        if (onAction === true && status === true) {
            statusText = 'Closing...';
        } else if (onAction === true && status === false) {
            statusText = 'Opening...';
        }
    } else {
        if (onAction === true && turn === true) {
            statusText = 'Closing...';
        } else if (onAction === true && turn === false) {
            statusText = 'Opening...';
        }
    }
    return (
        <View style={styles.mainButtonContainer}>
            <Text style={styles.header}> {name} </Text>
            {status !== null && <Animation
                animatedValue={animatedValue}
            />}
            <TouchableOpacity
                onPress={toggleButton}
                disabled={onAction}
                style={[{backgroundColor: color}, styles.mainButton]}
            >
                <Text style={[{fontSize: fontSize}, styles.buttonText]}> {buttonText} </Text>
            </TouchableOpacity>
            <Text style={styles.tapText}> {tapText} </Text>
            <Text style={styles.statusText}> {statusText} </Text>
        </View>
    );
};

Button.propTypes = {
    params: PropTypes.object,
    toggleButton: PropTypes.func,
};

export default Button;

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height
const styles = StyleSheet.create({
    mainButtonContainer: {
        flex: 1,
        height: height,
        width: width,
        justifyContent: 'center',
    },
    header: {
        fontSize: 30,
        color: 'black',
        alignSelf: 'center',
        textTransform: 'uppercase',
        backgroundColor: 'transparent',
    },
    mainButton: {
        position: 'relative',
        marginTop: 20,
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
        marginTop: 20,
        fontSize: 20,
        color: 'black',
        alignSelf: 'center',
    },
    statusText: {
        position: 'relative',
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
        alignSelf: 'center',
    },
});
