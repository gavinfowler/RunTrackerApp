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

temp = {
  distance: 1000,
  latitude: 0,
  longitude: 0,
  history: [],
  pace: 16,
  type: 'Run',
  active: true,
  buttonText: 'Pause',
  timer: 166,
  feeling: 'good',
  weather: 'clear',
  newWeather: 'clear',
  photo: '', 
  tempature: 56
}

export default class HistoryDetail extends Component {
  static navigationOptions = {
    title: 'Home'
  }

  constructor(props) {
    super(props);

    this.state = {
      activities: []
    }
  }

  componentWillMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      console.log('home focused');
      if (this.props.navigation.getParam('state') !== undefined) {
        activities = this.state.activities;
        temp = this.props.navigation.getParam('state');
        temp['isColdest'] = false;
        temp['isLongest'] = false;
        temp['id'] = activities.length
        activities.push();
        this.setState({ activities: activities }, () => {console.log(this.state);this.setRewards();});
      }
    })
  }

  setRewards(){
    if(this.state.activities.length > 0){
      for(i in this.state.activities){
        i.isColdest = false;
      }
      this.state.activities.sort((a, b) => {
        return a.temp - b.temp;
      })
      this.state.activities[0]['isColdest'] = true
      for(i in this.state.activities){
        i.isLongest = false;
      }
      this.state.activities.sort((a, b) => {
        return a.distance - b.distance;
      })
      this.state.activities[0]['isLongest'] = true
    }
  }

  deleteActivity(index){

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
            <CardItem cardBody button onPress={() => this.props.navigation.navigate('History')}>
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
            <CardItem cardBody button onPress={() => this.props.navigation.navigate('Rewards')}>
              <Image source={require('../../images/rewards.jpg')} style={{ height: 140, width: null, flex: 1 }} />
            </CardItem>
          </Card>
          <Text style={styles.welcome}>Home</Text>
          <Button onPress={() => this.props.navigation.navigate('HistoryDetail', {data:[temp]})}><Text>Go to History Detail</Text></Button>
          <Button onPress={() => this.props.navigation.navigate('TakePhoto')}><Text>Take Photo</Text></Button>
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
