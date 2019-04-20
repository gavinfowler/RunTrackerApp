/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, View, Dimensions, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Callout, Marker, Polyline, Polygon } from 'react-native-maps';
import { Card, CardItem, Content, Container, Text, Button, Item, Input, Label, Form } from 'native-base';

import WeatherService from '../api/weather.service';

const { width, height } = Dimensions.get('window');

export default class AfterActivity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id:0,
      distance: 0,
      latitude: 0,
      longitude: 0,
      history: [],
      pace: 0,
      type: 'Run',
      active: true,
      buttonText: 'Pause',
      timer: 0,
      feeling: '',
      weather: '',
      newWeather: '',
      photo: '',
      tempature: 0,
      isColdest: true,
      isLongest: true,
    }
  }

  secondsToFormat() {
    hours = (Math.floor(this.state.timer / 3600)).toString();
    minutes = (Math.floor(this.state.timer / 60)).toString();
    seconds = (this.state.timer % 60).toString();
    if (hours.length == 1)
      hours = '0' + hours;
    if (minutes.length == 1)
      minutes = '0' + minutes;
    if (seconds.length == 1)
      seconds = '0' + seconds;
    return (hours + ':' + minutes + ':' + seconds);
  }

  componentWillMount() {
    temp = this.props.navigation.getParam('data');
    console.log(temp);
    this.setState(temp[0])
  }

  checkRewards(){
    response = ''
    if(this.state.isColdest && this.state.isLongest)
      response = 'This is the coldest time that you have exercised \n This is the longest distance that you have gone'
    else if(this.state.isColdest)
      response = response + 'This is the coldest time that you have exercised'
    else if(this.state.isLongest)
      response = response + 'This is the longest distance that you have gone'
    return(<Text>{response}</Text>)
  }

  render() {
    return (
      <Container style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0121
          }}
        // onRegionChange={(region) => this.onRegionChange(region)}
        >
          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
          >
            <Callout>
              <View>
                <Text>Current Location</Text>
              </View>
            </Callout>
          </Marker>
          <Polyline
            coordinates={this.state.history}
            strokeWidth={3}
          />
        </MapView>
        <Content style={{ top: (height / 2) - 75, width: '100%' }}>
          <View style={{ alignItems: 'center' }}>
            <Text>Activity Type: {this.state.type}</Text>
            <Text>How you felt: '{this.state.feeling}'</Text>
            <Text>Duration: {this.secondsToFormat()} seconds</Text>
            <Text>Distance: {Math.floor(this.state.distance)} meters</Text>
            <Text>Pace: {Math.floor(this.state.pace)} meters/second</Text>
            <Text>Weather begin: {this.state.weather}</Text>
            <Text>Weather end: {this.state.newWeather}</Text>
            <Text>Tempature: {this.state.tempature} °F</Text>
            <Text>Rewards:</Text>
            {this.checkRewards()}
            <Image source={{ uri:'file:///data/user/0/com.finalproject1/cache/Camera/6f0f332b-5bb8-4f7f-89e1-9065e483f7e6.jpg'}} />
          </View>
          <Button danger block onPress={() => { this.props.navigation.navigate('Home', {delete: this.state.id}) }}>
            <Text>
              Delete
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  other: {
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
