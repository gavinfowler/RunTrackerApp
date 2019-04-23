/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, View, Dimensions, Image, ScrollView } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Callout, Marker, Polyline, Polygon } from 'react-native-maps';
import { Card, CardItem, Content, Container, Text, Button, Item, Input, Label, Form } from 'native-base';

import WeatherService from '../api/weather.service';;

const { width, height } = Dimensions.get('window');

export default class HistoryDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activity: {}
    }
  }

  secondsToFormat() {
    hours = (Math.floor(this.state.activity.timer / 3600)).toString();
    minutes = (Math.floor(this.state.activity.timer / 60)).toString();
    seconds = (this.state.activity.timer % 60).toString();
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
    // console.log(temp);
    this.setState({ activity: temp })
  }

  checkRewards() {
    response = ''
    if (this.state.activity.isColdest)
      return (<Text>This is the coldest time that you have exercised</Text>)
    else
      return (<Text>None</Text>)
  }

  render() {
    return (
      <Container style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: this.state.activity.latitude,
            longitude: this.state.activity.longitude,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0121
          }}
        // onRegionChange={(region) => this.onRegionChange(region)}
        >
          <Marker
            coordinate={{
              latitude: this.state.activity.latitude,
              longitude: this.state.activity.longitude
            }}
          >
            <Callout>
              <View>
                <Text>Current Location</Text>
              </View>
            </Callout>
          </Marker>
          <Polyline
            coordinates={this.state.activity.history}
            strokeWidth={3}
          />
        </MapView>
        <Content style={{ top: (height / 2) - 75, width: '100%' }}>
          <ScrollView style={{ flex:1, height: 270}} contentContainerStyle={{alignItems:'center'}}>
            
            <Text style={styles.bold}>Activity Type: </Text>
            <Text>{this.state.activity.type}</Text>
            <Text style={styles.bold}>Activity date: </Text>
            <Text>{(this.state.activity.timestamp).toLocaleDateString("en-US")}</Text>
            <Text style={styles.bold}>How you felt: </Text>
            <Text>'{this.state.activity.feeling}'</Text>
            <Text style={styles.bold}>Duration: </Text>
            <Text>{this.secondsToFormat()}</Text>
            <Text style={styles.bold}>Distance: </Text>
            <Text>{Math.floor(this.state.activity.distance)} meters</Text>
            <Text style={styles.bold}>Pace: </Text>
            <Text>{Math.floor(this.state.activity.pace)} meters/second</Text>
            <Text style={styles.bold}>Weather begin: </Text>
            <Text>{this.state.activity.weather}</Text>
            <Text style={styles.bold}>Weather end: </Text>
            <Text>{this.state.activity.newWeather}</Text>
            <Text style={styles.bold}>Tempature: </Text>
            <Text>{this.state.activity.tempature} °F</Text>
            <Text style={styles.bold}>Rewards: </Text>
            {this.checkRewards()}
            <Text style={styles.bold}>Picture: </Text>
            <View style={{transform:[{rotate: '90 deg'}]}}>
            <Image style={{width: 270,height:320}} source={{ uri: this.state.activity.photo }} />
            </View>
          </ScrollView>
          <Text></Text>
          <Button danger block style={{ paddingTop:10 }} onPress={() => { this.props.navigation.navigate('Home', { delete: this.state.activity.id }) }}>
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
  bold: {
    fontWeight: 'bold'
  },
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
