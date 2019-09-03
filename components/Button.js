import React, {Component} from 'react';
import Animation from './Animation2';

import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions, Animated, Easing,
} from 'react-native';

export default class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onAction: false,
            isOn: false,
            animatedValue: new Animated.Value(0),

        };
        this.toggleButton = this.toggleButton.bind(this);
    }

    componentDidMount(): void {
        const {status} = this.props.params
        this.setState(
            {isOn: status},
            () => {
                Animated.timing(
                    this.state.animatedValue,
                    {
                        toValue: status ? 1 : 0,
                        duration: 0,
                        easing: Easing.linear,
                        delay: 0,
                    },
                ).start();
            },
        );
    }


    // componentWillReceiveProps({params}) {
    //     this.setState(
    //         {isOn: params.status},
    //         () => {
    //             Animated.timing(
    //                 this.state.animatedValue,
    //                 {
    //                     toValue: params.status ? 1 : 0,
    //                     duration: 0,
    //                     easing: Easing.linear,
    //                     delay: 0,
    //                 },
    //             ).start();
    //         },
    //     );
    // }

    toggleButton() {
        const {status, turn, device_id} = this.props.params;
        let isOn;
        if(turn === undefined){
            if(status === true){
                isOn = false
            }else{
                isOn = true
            }
        }else{
            if(turn === "on"){
                isOn = false
            }else{
                isOn = true
            }
        }
        this.setState({onAction: true, isOn});
        setTimeout(() => {
            this.props.toggleButton(device_id).then(res => {
                this.setState({onAction: res});
            });
        }, 3500);
    }

    render() {
        const {onAction, animatedValue, isOn} = this.state;
        const {status, turn, name} = this.props.params;
        console.log(status)
        let color;
        let buttonText;
        let tapText;
        let fontSize;

        Animated.timing(
            animatedValue,
            {
                toValue: isOn ? 1 : 0,
                duration: 5000,
                easing: Easing.linear,
                delay: 0,
            },
        ).start();

        if (status === null) {
            color = 'grey';
            buttonText = 'Disabled';
            tapText = '';
            fontSize = 30;
        } else if (turn === 'on') {
            fontSize = 40;
            color = '#b0c24a';
            buttonText = 'close';
            tapText = '(Tap To Close)';
        } else if (turn === 'off') {
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
            if (onAction === true && turn === 'on') {
                statusText = 'Closing...';
            } else if (onAction === true && turn === 'off') {
                statusText = 'Opening...';
            }
        }
        return (
            <View style={styles.mainButtonContainer}>
                <Text style={styles.header}> {name} </Text>
                <Animation
                    animatedValue={animatedValue}
                />
                <TouchableOpacity
                    onPress={this.toggleButton}
                    disabled={onAction}
                    style={[{backgroundColor: color}, styles.mainButton]}
                >
                    <Text style={[{fontSize: fontSize}, styles.buttonText]}> {buttonText} </Text>
                </TouchableOpacity>
                <Text style={styles.tapText}> {tapText} </Text>
                <Text style={styles.statusText}> {statusText} </Text>
            </View>
        );
    }
}

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
