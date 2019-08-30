import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
} from 'react-native';

export default class Button extends Component {
    constructor() {
        super();
        this.state = {
            onAction: false,
            disable: false,
        };
        this.toggleButton = this.toggleButton.bind(this);
    }

    toggleButton() {
        this.setState({onAction: true});
        const {device_id} = this.props.params;
        this.props.toggleButton(device_id).then(res => {
            this.setState({onAction: res});
        });
    }

    render() {
        let color;
        let buttonText;
        let tapText;
        let fontSize;
        if (this.props.params.status === null) {
            color = 'grey';
            buttonText = 'Disabled';
            tapText = '';
            fontSize = 30;
        } else if (this.props.params.turn === 'on') {
            fontSize = 40;
            color = '#b0c24a';
            buttonText = 'close';
            tapText = '(Tap To Close)';
        } else if (this.props.params.turn === 'off') {
            fontSize = 40;
            color = '#b70b0b';
            buttonText = 'open';
            tapText = '(Tap To Open)';
        } else if (this.props.params.turn === undefined && this.props.params.status === true) {
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
        if (this.props.params.turn === undefined) {
            if (this.state.onAction === true && this.props.params.status === true) {
                statusText = 'Closing...';
            } else if (this.state.onAction === true && this.props.params.status === false) {
                statusText = 'Opening...';
            }
        } else {
            if (this.state.onAction === true && this.props.params.turn === 'on') {
                statusText = 'Closing...';
            } else if (this.state.onAction === true && this.props.params.turn === 'off') {
                statusText = 'Opening...';
            }
        }

        return (
            <View style={styles.mainButtonContainer}>
                <Text style={styles.header}> {this.props.params.name} </Text>
                <TouchableOpacity
                    onPress={this.toggleButton}
                    disabled={this.state.onAction}
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
