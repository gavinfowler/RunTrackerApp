/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, View, Image } from 'react-native';
import { Button, Text, Body, Container, Content, Card, CardItem } from 'native-base';

dummyData = [{
  id: 654,
  distance: 624.1812041652864,
  latitude: 41.74886171998654,
  longitude: -111.81907135024404,
  history: [
    { latitude: 41.7418, longitude: -111.823 },
    { latitude: 41.7428, longitude: -111.833 }
  ],
  pace: 13.569156612288836,
  type: 'Run',
  active: true,
  buttonText: 'Pause',
  timer: 47,
  feeling: 'good',
  weather: 'Haze',
  newWeather: 'clear',
  photo: 'file:///data/user/0/com.finalproject1/cache/Camera/2e1dde3e-a38d-46c8-8938-6dd54a46a5d9.jpg',
  tempature: 66,
  timestamp: new Date('Sat Apr 20 2019 12:34:58 GMT-0600 (Mountain Daylight Time)')
},
{
  id: 987,
  distance: 623.1812041652864,
  latitude: 41.74886171998654,
  longitude: -111.81907135024404,
  history: [
    { latitude: 41.7418, longitude: -111.823 },
    { latitude: 41.7428, longitude: -111.833 }
  ],
  pace: 13.569156612288836,
  type: 'Run',
  active: true,
  buttonText: 'Pause',
  timer: 47,
  feeling: 'good',
  weather: 'Haze',
  newWeather: 'clear',
  photo: 'file:///data/user/0/com.finalproject1/cache/Camera/2e1dde3e-a38d-46c8-8938-6dd54a46a5d9.jpg',
  tempature: 65,
  timestamp: new Date('Sat Apr 20 2019 12:38:21 GMT-0600 (Mountain Daylight Time)')
},
{
  id: 321,
  distance: 622.1812041652864,
  latitude: 41.74886171998654,
  longitude: -111.81907135024404,
  history: [
    { latitude: 41.7418, longitude: -111.823 },
    { latitude: 41.7428, longitude: -111.833 }
  ],
  pace: 13.569156612288836,
  type: 'Run',
  active: true,
  buttonText: 'Pause',
  timer: 47,
  feeling: 'good',
  weather: 'Haze',
  newWeather: 'clear',
  photo: 'file:///data/user/0/com.finalproject1/cache/Camera/2e1dde3e-a38d-46c8-8938-6dd54a46a5d9.jpg',
  tempature: 70,
  timestamp: new Date('Sat Apr 20 2019 10:34:58 GMT-0600 (Mountain Daylight Time)')
}]

export default class HistoryDetail extends Component {
  static navigationOptions = {
    title: 'Home'
  }

  constructor(props) {
    super(props);

    this.state = {
      activities: dummyData
    }
  }

  componentWillMount() {
    this.setRewards();
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      console.log('home focused');
      activities = this.state.activities;

      if (this.props.navigation.getParam('state') !== undefined) {
        NewState = this.props.navigation.getParam('state');
        NewState['isColdest'] = false;
        NewState['isLongest'] = false;
        NewState['id'] = Math.floor((Math.random() * 1000) + 1);
        activities.push(NewState);
        this.setState({ activities: activities }, () => { this.setRewards(); console.log(this.state); });
      }

      if (this.props.navigation.getParam('delete') !== undefined) {
        id = this.props.navigation.getParam('delete');
        for (i = 0; i <= this.state.activities.length - 1; i++) {
          if (activities[i].id == id) {
            activities.splice(i, 1);
            this.setState({ activities: activities })
          }
        }
      }
    })
  }

  setRewards() {
    if (this.state.activities.length > 0) {
      for (i in this.state.activities) {
        i.isColdest = false;
      }
      this.state.activities.sort((a, b) => {
        return a.tempature - b.tempature;
      })
      this.state.activities[0]['isColdest'] = true
      for (i in this.state.activities) {
        i.isLongest = false;
      }
      this.state.activities.sort((a, b) => {
        return b.distance - a.distance;
      })
      this.state.activities[0]['isLongest'] = true
    }
  }

  deleteActivity(index) {

  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Body>
                <Text>
                  Start an Activity
              </Text>
              </Body>
            </CardItem>
            <CardItem cardBody button onPress={() => this.props.navigation.navigate('StartActivity')}>
              <Image source={require('../../images/start.jpg')} style={{ height: 140, width: null, flex: 1 }} />
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <Text>
                  View Past Activities
              </Text>
              </Body>
            </CardItem>
            <CardItem cardBody button onPress={() => this.props.navigation.navigate('History', { state: this.state })}>
              <Image source={require('../../images/history.jpg')} style={{ height: 140, width: null, flex: 1 }} />
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <Text>
                  Rewards
              </Text>
              </Body>
            </CardItem>
            <CardItem cardBody button onPress={() => this.props.navigation.navigate('Rewards', { state: this.state })}>
              <Image source={require('../../images/rewards.jpg')} style={{ height: 140, width: null, flex: 1 }} />
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
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
