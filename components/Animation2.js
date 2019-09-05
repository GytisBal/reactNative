// Load the module
import React, {Component} from 'react';
import Video from 'react-native-video';
import {
    StyleSheet,
    Dimensions,
} from 'react-native';


export default class Animation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: '',
            duration: '',
            paused: this.props.paused,
        };
        this.onProgress = this.onProgress.bind(this);
        this.onVideoLoad = this.onVideoLoad.bind(this);
        this.onSeek = this.onSeek.bind(this);
    }

    onVideoLoad(e) {
        this.setState({currentTime: e.currentTime, duration: e.duration});
        if(this.props.turn === 'on'){
            this.player.seek(250)
        }else if (this.props.turn === undefined && this.props.status === true){
            this.player.seek(250)
        }
    }

    onProgress(e) {
        if(e.currentTime > 4 && e.currentTime < 4.15){
                this.props.toggleButton()
        }
        if(e.currentTime > 8 && e.currentTime < 8.15){
                this.props.toggleButton()
        }
        this.setState({currentTime: e.currentTime});
    }
    onSeek(e){
      console.log(e.seekTime)
    }

    render() {
    // const url = 'https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4';
        const url = {uri: 'https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'};
        const local = require('../inc/Gates.mp4');
        return (
            <Video
                source={local}   // Can be a URL or a local file.
                ref={(ref) => {
                    this.player = ref;
                }}
                onBuffer={this.onBuffer}                // Callback when remote video is buffering
                onError={this.videoError}               // Callback when video cannot be loaded
                onLoad={this.onVideoLoad}
                onProgress={this.onProgress}
                onSeek={this.onSeek}
                resizeMode={'stretch'}
                repeat={true}
                rate={0.5}
                paused={this.props.paused}
                style={styles.backgroundVideo}
            />
        );
    }
}

// Later on in your styles..
const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height
const styles = StyleSheet.create({
    backgroundVideo: {
        marginTop: 20,
        height: 150,
        width: '100%',
    },
});

