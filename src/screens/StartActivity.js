/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, View, Dimensions } from 'react-native';
import { Button, Text, Content, Card, CardItem, Container, ListItem, Left,Right,Radio } from 'native-base';
import MapView, { PROVIDER_GOOGLE, Callout, Marker } from 'react-native-maps';

import WeatherService from '../api/weather.service';
import PickerWI from '../components/PickerWI'

const { width, height } = Dimensions.get('window');

export default class StartActivity extends Component {
  static navigationOptions = {
    title: 'Start Activity'
  }

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 41.741820,
        longitude: -111.823030,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
      },
      weather: '',
      selected: 'key1',
    }
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  //duration
  //distance
  //pace = time/distance

  findCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var weather = '';
        WeatherService.getWeather(latitude, longitude)
          .then(results => {
            weather = results.weather[0].main;
            this.setState((prevState, prop) => {
              return {
                region: {
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 0.0522,
                  longitudeDelta: 0.0221,
                },
                weather: weather
              }
            });
          }).catch(error => {
            console.log(error);
          });

      },
      error => { console.log(error) },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  componentWillMount() {
    this.findCurrentLocation();
  }

  render() {
    return (
      <Container style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={this.state.region} //use this instead of region prop
        >
          <Marker
            coordinate={{
              latitude: this.state.region.latitude,
              longitude: this.state.region.longitude,
            }}
          >
            <Callout>
              <View>
                <Text>Current Location</Text>
              </View>
            </Callout>
          </Marker>
        </MapView>
        <Content>
        <Text >Start Activity</Text>
        <Button onPress={() => { this.findCurrentLocation() }}><Text>Check Location</Text></Button>
        <Text>{this.state.region.latitude}</Text>
        <Text>{this.state.region.longitude}</Text>
        <Text>{this.state.weather}</Text>
        <Button onPress={() => this.props.navigation.navigate('DuringActivity')}><Text>Go to During</Text></Button>

            <PickerWI/>
          </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: height / 2,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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
});
