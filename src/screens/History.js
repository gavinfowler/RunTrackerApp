import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

var temp = {
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
  tempature: 0
}

export default class Rewards extends Component {
    render() {
        return (
            <View>
              <Text>
                History
              </Text>
            </View>
        );
    }
}