/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Button, Text, Content, Card, CardItem } from 'native-base';
import MapView, { PROVIDER_GOOGLE, Callout, Marker } from 'react-native-maps';

import WeatherService from '../api/weather.service';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class StartActivity extends Component {
  static navigationOptions = {
    title: 'Start Activity'
  }

  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      weather: ''
    }
  }

  //duration
  //distance
  //pace = time/distance

  findCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        var latitude = JSON.stringify(position.coords.latitude);
        var longitude = JSON.stringify(position.coords.longitude);
        var weather = '';
        WeatherService.getWeather(latitude, longitude)
          .then(results => {
            weather = results.weather[0].main;
            this.setState({
              latitude: latitude,
              longitude: longitude,
              weather: weather
            });
          }).catch(error => {
            console.log(error);
          });

      },
      error => { console.log(error) },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    return (
      <Content>
        <Text style={styles.welcome}>Start Activity</Text>
        <Button onPress={() => { this.findCurrentLocation() }}><Text>Check Location</Text></Button>
        <Text>{this.state.latitude}</Text>
        <Text>{this.state.longitude}</Text>
        <Text>{this.state.weather}</Text>
        <Button onPress={() => this.props.navigation.navigate('DuringActivity')}><Text>Go to During</Text></Button>
        <Card>
          <CardItem>
            {/* <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: 41.7452,
                longitude: -111.8097,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }} //use this instead of region prop
              onRegionChange={(region) => this.onRegionChange(region)}
            >
              <Marker
                coordinate={{
                  latitude: state.longitude,
                  longitude: this.state.longitude
                }}
              >
                <Callout>
                  <View>
                    <Text>Current location</Text>
                  </View>
                </Callout>
              </Marker>
            </MapView> */}
          </CardItem>
        </Card>
      </Content>
    );
  }

  // onRegionChange(region) {
  //   //update state, but doesn't modify map because we use initalRegion
  //   //if we use region prop it creates a weird update cycle
  //   this.setState({ region });
  // }

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
});
