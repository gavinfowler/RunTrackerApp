/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Button, Text, Content, Container } from 'native-base';


export default class DuringActivity extends Component {
  interval = null;

  static navigationOptions = {
    title: 'During Activity'
  }

  constructor(props) {
    super(props);

    this.state = {
      distance: 0,
      latitude: 0,
      longitude: 0,
      pace: 0,
      type: 'Run',
      active: true,
      buttonText: 'Pause',
      timer: 0
    }
  }

  setUpTimer() {
    interval = setInterval(this.myTimer, 1000)
  }

  pauseResume() {
    if (this.state.active) {
      this.setState({ buttonText: 'Resume' });
      clearInterval(interval);
    } else {
      this.setState({ buttonText: 'Pause' });
      this.setUpTimer();
    }
    this.setState((prevState, props) => {
      return {
        active: !prevState.active
      }
    });
  }

  myTimer = () => {
    this.setState((prevState, props) => {
      return {
        timer: prevState.timer + 1
      }
    }, ()=> { 
      if(this.state.timer%10==0){
        this.findCurrentLocation()
      } 
    });
  }

  findCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var distance = this.state.distance;
        
        distance=distance+this.getDistanceFromLatLon(this.state.latitude, this.state.longitude, latitude, longitude);
        pace=(distance/this.state.timer);

        if(isNaN(pace)){
          pace=0;
        }
        
        this.setState({
          distance: distance,
          latitude: latitude,
          longitude: longitude,
          pace: pace
        });
      },
      error => { console.log(error) },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d * 1000;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
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
    var type = this.props.navigation.getParam('type', 'Run');
    navigator.geolocation.getCurrentPosition(
      position => {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        this.setState({ 
          timer: 0,
          latitude: latitude,
          longitude: longitude,
          type: type
        }, ()=>{
          this.setUpTimer();
          this.findCurrentLocation();
        })
      });
  }

  componentWillUnmount() {
    clearInterval(interval);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Text style={styles.welcome}>Get Running!</Text>
        <Text style={styles.welcome}>{this.secondsToFormat()}</Text>
        <Button style={styles.buttons} onPress={() => this.pauseResume()}>
          <Text>
            {this.state.buttonText}
          </Text>
        </Button>
        <Text>{'\n'}Distance: {Math.floor(this.state.distance)} meters{'\n'}</Text>
        <Text>Pace: {Math.floor(this.state.pace)} meters/second{'\n'}</Text>
        <Button style={styles.buttons} onPress={() => { clearInterval(interval); this.props.navigation.navigate('AfterActivity', {state:this.state}); }}>
          <Text>
            Finish activity
          </Text>
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttons: {
    padding: '10%', 
    alignSelf: 'center'
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
