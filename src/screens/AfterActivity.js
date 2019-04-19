/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, View, Dimensions, } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Callout, Marker } from 'react-native-maps';
import { Card, CardItem, Content, Container, Text, Button, Item, Input, Label, Form } from 'native-base';

import Map from '../components/map'
import WeatherService from '../api/weather.service';
import { ScrollView } from 'react-native-gesture-handler';

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
      distance: 0,
      latitude: 0,
      longitude: 0,
      history: [],
      pace: 0,
      type: 'Run',
      active: true,
      buttonText: 'Pause',
      timer: 0,
      weather: '',
      newWeather: ''
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
    incomingState = this.props.navigation.getParam('state');
    WeatherService.getWeather(incomingState.latitude, incomingState.longitude)
      .then(results => {
        weather = results.weather[0].main;
        incomingState['newWeather'] = weather;
        this.setState(incomingState);
      }).catch(error => {
        console.log(error);
      });
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
            latitudeDelta: 0.0522,
            longitudeDelta: 0.0221
          }}
          onRegionChange={(region) => this.onRegionChange(region)}
        >
          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
          >
            <Callout>
              <View>
                <Text>Chad Mano's Office</Text>
              </View>
            </Callout>
          </Marker>
        </MapView>
        <Content style={{ top: (height / 2) - 50, width: '100%' }}>
          <Content>
            <Form style={{ width: '50%', alignSelf: 'center', paddingBottom: 20,paddingTop:0 }}>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input />
              </Item>
            </Form>
          </Content>
          <View style={{ alignItems: 'center' }}>
            <Button block>
              <Text>
                Take a picture!
            </Text>
            </Button>
            <Text>{'\n'}Duration: {this.secondsToFormat()} seconds</Text>
            <Text>Distance: {this.state.distance} meters</Text>
            <Text>Pace: {this.state.pace} meters/second</Text>
            <Text>Weather begin: {this.state.weather}</Text>
            <Text>Weather end: {this.state.newWeather}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
            <Button style={{ width: '30%' }}>
              <Text>
                Save
            </Text>
            </Button>
            <Button style={{ width: '30%' }}>
              <Text>
                Cancel
            </Text>
            </Button>
          </View>
        </Content>
      </Container >
    );
  }

  /*
 
  Map with path (GPS points create path)
  How do you feel?
  Take Photo (Create a record of worst looking selfies!)
  Save/Delete
 
  */

  onRegionChange(region) {
    //update state, but doesn't modify map because we use initalRegion
    //if we use region prop it creates a weird update cycle
    this.setState({ region });
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
