/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Callout, Marker } from 'react-native-maps';

var colors = {
    void: '0E0B16',
    fuschia: 'A239CA',
    jewel: '4717F6',
    stark: 'E7DFDD'

}

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: 41.7452,
                longitude: -111.8097,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        }
    }

    render() {
        return (
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={this.state.region} //use this instead of region prop
                onRegionChange={(region) => this.onRegionChange(region)}
            >
                <Marker
                    coordinate={{
                        latitude: 41.74088,
                        longitude: -111.81373
                    }}
                >
                    <Callout>
                        <View>
                            <Text>Chad Mano's Office</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>
        );
    }

    onRegionChange(region) {
        //update state, but doesn't modify map because we use initalRegion
        //if we use region prop it creates a weird update cycle
        this.setState({ region });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
