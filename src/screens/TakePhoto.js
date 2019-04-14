import React, { Component } from 'react';
import { CameraRoll, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { PermissionsAndroid } from 'react-native';


export default class TakePhoto extends Component {

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
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                />
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.takePicture()} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}> SNAP </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    takePicture() {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            this.camera.takePictureAsync(options)
                .then(result => {
                    CameraRoll.saveToCameraRoll(result.uri)
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
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});