import React, { Component } from 'react';
import { CameraRoll, Platform, StyleSheet, View, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { PermissionsAndroid } from 'react-native';
import { Button, Text } from 'native-base';
import { tsImportEqualsDeclaration } from '@babel/types';

const { width, height } = Dimensions.get('window');

export default class TakePhoto extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type = RNCamera.Constants.Type.back,
            photo: ''
        }
    }

    componentDidMount() {
        if (Platform.OS === 'Android') {
            requestCameraRollPermission();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={this.state.type}
                    flashMode={RNCamera.Constants.FlashMode.on}
                />
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <Button light onPress={() => this.takePicture()} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}> Snap </Text>
                    </Button>
                    <Button light onPress={() => this.toggleType()} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}> Flip </Text>
                    </Button>
                </View>
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <Button success onPress={() => this.props.navigation.navigate('AfterActivity', { photo: this.state.photo })} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}> Save </Text>
                    </Button>
                    <Button danger onPress={() => this.props.navigation.navigate('AfterActivity')} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}> Cancel </Text>
                    </Button>
                </View>
            </View>
        );
    }

    toggleType() {
        this.setState((prevState) => {
            return ({
                type: prevState.type == RNCamera.Constants.Type.back ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back,
            })
        })
    }

    takePicture() {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            this.camera.takePictureAsync(options)
                .then(result => {
                    CameraRoll.saveToCameraRoll(result.uri)
                    .then(this.setState({ photo: result.uri }));
                })
                .catch(error => console.log('error:', error));

        }
    };
}

async function requestCameraRollPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Save Photos',
                message:
                    'This App needs access to your camera roll to save pictures',
                buttonNegative: 'Deny',
                buttonPositive: 'Grant',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can save pictures');
        } else {
            console.log('Camera roll access denied');
        }
    } catch (err) {
        console.warn(err);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        borderRadius: 5,
        padding: 5,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
        width: '35%'
    },
});