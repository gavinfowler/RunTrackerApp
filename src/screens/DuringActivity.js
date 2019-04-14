/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Button, Text, Content } from 'native-base';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class DuringActivity extends Component {
  interval = null;

  static navigationOptions = {
    title: 'DuringActivity'
  }

  constructor(props) {
    super(props);

    this.state = {
      active: true,
      timer: 0
    }
  }

  setUpTimer() {
    interval = setInterval(this.myTimer, 1000)
  }

  pauseResume(){
    if(this.state.active){
      clearInterval(interval);
    } else {
      this.setUpTimer();
    }
    this.setState((prevState, props) => {
      return{
        active:!prevState.active
      }
    });
  }

  myTimer = () => {
    this.setState((prevState, props) => {
      return {
        timer: prevState.timer + 1
      }
    });
  }

  componentWillMount() {
    this.setState({ timer: 0 });
    this.setUpTimer();
  }

  componentWillUnmount() {
    clearInterval(interval);
  }

  render() {
    return (
      <Content>
        <Text style={styles.welcome}>DuringActivity</Text>
        <Text style={styles.welcome}>{this.state.timer}</Text>
        <Button onPress={() => {clearInterval(interval);this.props.navigation.navigate('AfterActivity');}}>
          <Text>
            Finish Activity
          </Text>
        </Button>
        <Button onPress={() => this.pauseResume()}>
          <Text>
            Pause
          </Text>
        </Button>
      </Content>
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
