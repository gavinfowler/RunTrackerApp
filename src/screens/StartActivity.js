/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, View, Dimensions } from 'react-native';
import { Button, Text, Content, Card, CardItem, Container, ListItem, Left, Right, Radio } from 'native-base';
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
      temp: 0,
      selected: 'Run',
      timestamp: null
    }
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  findCurrentLocation() {
    date = new Date();
    navigator.geolocation.getCurrentPosition(
      position => {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var weather = '';
        WeatherService.getWeather(latitude, longitude)
          .then(results => {
            weather = results.weather[0].main;
            var K = results.main.temp;
            temp = Math.round((K - 273.15) * 1.8000 + 32.00);
            this.setState((prevState, prop) => {
              return {
                region: {
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 0.0522,
                  longitudeDelta: 0.0221,
                },
                weather: weather,
                temp: temp,
                timestamp: date,
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

  getValue(value) {
    this.setState({ selected: value });
  }

  render() {
    return (
      <Container style={styles.container}>
        <MapView
          liteModes
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
        <Content style={{ top: (height / 2) - 50, width: '100%', }}>
            <Text style={{alignSelf:'center'}}>Pick a type of activity</Text>
            <PickerWI setValue={(value) => { this.getValue(value) }} />
            <Text style={{alignSelf:'center'}}>{'\n'}Current Weather: {this.state.weather}</Text>
            <Text style={{alignSelf:'center'}}>{'\n'}Current Tempature: {this.state.temp} °F{'\n'}</Text>
            <Button block onPress={() => this.props.navigation.navigate('DuringActivity', { type: this.state.selected, weather: this.state.weather })}>
              <Text>Start Activity</Text>
            </Button>
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
    // justifyContent: 'flex-start',
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
