import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Animated,
    Text,
} from 'react-native';


export default class Animation extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    render() {
        const moveRight = this.props.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 150],
        });
        const moveLeft = this.props.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -150],
        });
        return (
            <View style={styles.container}>
                <Animated.View style={[styles.gates_panel, styles.gates_panel_left, {
                    transform: [{
                        translateX: moveLeft,
                    }],
                },
                ]}
                >
                    <Text style={[styles.gates_header, {textAlign: 'right'}]}>Open</Text>
                </Animated.View>
                <View style={styles.gates_content}>
                    <Text style={styles.gates_content_text}> Welcome </Text>
                </View>
                <Animated.View style={[styles.gates_panel, styles.gates_panel_left, {
                    transform: [{
                        translateX: moveRight,
                    }],
                },
                ]}
                >
                    <Text style={[styles.gates_header]}>Gates</Text>
                </Animated.View>
            </View>
        );
    }
}

// Later on in your styles..
const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height
const styles = StyleSheet.create({
    container: {
        position: 'relative',
        marginTop: 20,
        height: 150,
        width: '100%',
        flexDirection: 'row',
        overflow: 'hidden',
    },
    gates_panel: {
        position: 'relative',
        backgroundColor: 'blue',
        width: '50%',
        height: '100%',
        zIndex: 2,
        justifyContent: 'center',
    },
    gates_panel_left: {},
    gates_panel_right: {},
    gates_header: {
        color: 'white',
        margin: 4,
        fontSize: 30,
        textTransform: 'uppercase',
    },
    gates_content: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gates_content_text:{
        alignSelf: 'center',
        fontSize: 40,
        textTransform: 'uppercase',
    }

});

