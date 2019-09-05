import React, {Component} from 'react';
import Login from './components/LoginForm';
import Home from './components/Home';

export default class App extends Component {
    state = {};

    static getDerivedStateFromProps(props, state) {
        const {status, turn} = props.params;
        console.log(status, state.isOn);
        if (status !== state.isOn) {
            return {isOn: status};
        }
        console.log('antras', status, isOn);
        if (status === isOn) {
            let isOn;
            if (turn === undefined) {
                if (status === false) {
                    isOn = false;
                } else {
                    isOn = true;
                }
            } else {
                if (turn === 'off') {
                    isOn = false;
                } else {
                    isOn = true;
                }
            }
            return {
                isOn,
            };
        } else {
            return null;
        }
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        const {status, turn} = this.props.params;
        console.log(status, prevProps.params.status);
        if (status !== prevProps.params.status) {
            let isOn;
            if (turn === undefined) {
                if (status === false) {
                    isOn = false;
                } else {
                    isOn = true;
                }
            } else {
                if (turn === 'off') {
                    isOn = false;
                } else {
                    isOn = true;
                }
            }
            this.setState(
                {isOn},
                () => {
                    Animated.timing(
                        this.state.animatedValue,
                        {
                            toValue: isOn ? 1 : 0,
                            duration: 0,
                            easing: Easing.linear,
                            delay: 0,
                        },
                    ).start();
                },
            );
        }
    }

    render() {

    }
}
