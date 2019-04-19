/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, View, Dimensions, } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Callout, Marker, Polyline, Polygon } from 'react-native-maps';
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
      feeling: '',
      weather: '',
      newWeather: '',
      photo: ''
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
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      if(this.props.navigation.getParam('photo') != undefined){
        photo = this.props.navigation.getParam('photo');
        // console.log(photo)
        this.setState({photo: photo})
      } else {
        console.log('couldn\'t find pic')
      }
    })
    incomingState = this.props.navigation.getParam('state');
    WeatherService.getWeather(incomingState.latitude, incomingState.longitude)
      .then(results => {
        weather = results.weather[0].main;
        incomingState['newWeather'] = weather;
        incomingState['coordinates'] = [
          { latitude: 41.7418, longitude: -111.823 },
          { latitude: 41.7428, longitude: -111.833 }
        ];
        this.setState(incomingState
          // ,() => console.log(this.state)
        );
      }).catch(error => {
        console.log(error);
      });
    }

  componentWillUnmount() {
    this.focusListener.remove();
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
        <Content style={{ top: (height / 2) - 90, width: '100%' }}>
          <Content style={{ padding: 0 }}>
            <Form style={{ width: '50%', alignSelf: 'center', paddingBottom: 20, paddingTop: 0 }}>
              <Item floatingLabel>
                <Label>How are you feeling?</Label>
                <Input onChangeText={(text) => this.setState({ feeling: text })} />
              </Item>
            </Form>
          </Content>
          <View style={{ alignItems: 'center' }}>
            <Button block onPress={() => { this.props.navigation.navigate('TakePhoto') }}>
              <Text>
                Take a picture!
            </Text>
            </Button>
            <Text>{'\n'}Duration: {this.secondsToFormat()} seconds</Text>
            <Text>Distance: {Math.floor(this.state.distance)} meters</Text>
            <Text>Pace: {Math.floor(this.state.pace)} meters/second</Text>
            <Text>Weather begin: {this.state.weather}</Text>
            <Text>Weather end: {this.state.newWeather}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
            <Button success style={{ width: '30%' }} onPress={() => { this.props.navigation.navigate('Home', { state: this.state }) }}>
              <Text>
                Save
            </Text>
            </Button>
            <Button danger style={{ width: '30%' }} onPress={() => { this.props.navigation.navigate('Home') }}>
              <Text>
                Cancel
            </Text>
            </Button>
          </View>
        </Content>
      </Container >
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
