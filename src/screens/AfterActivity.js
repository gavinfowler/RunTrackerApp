/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Callout, Marker } from 'react-native-maps';
import { Card, CardItem, Content, Container } from 'native-base';

import Map from '../components/map'

const { width, height } = Dimensions.get('window');

var colors = {
  void: '0E0B16',
  fuschia: 'A239CA',
  jewel: '4717F6',
  stark: 'E7DFDD'

}

export default class AfterActivity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 41.7452,
        longitude: -111.8097,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0221,
      }
    }
  }

  componentWillMount(){
    console.log(this.props.navigation.getParam('state'));
  }

  render() {
    return (
      <Container style={styles.container}>
      
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
        <Text>text2</Text>
      </Container>
    );
  }

  onRegionChange(region) {
    //update state, but doesn't modify map because we use initalRegion
    //if we use region prop it creates a weird update cycle
    this.setState({ region });
  }
}

const styles = StyleSheet.create({
  other:{
    position: 'absolute',
    top: height / 2,
    left: 0,
    right: 0,
    bottom: height,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: height / 2,
  },
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
  map1: {
    ...StyleSheet.absoluteFillObject,
  },
});
