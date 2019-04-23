import React, { Component } from "react";
import { StyleSheet } from 'react-native';
import { Card, CardItem, Text } from "native-base";

export default class HistoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: this.props.activity,
    };
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

  render() {
    return (
      <Card style={{height:'15%',backgroundColor:'E6E6FA' }}>
        <CardItem style={{paddingLeft:10,backgroundColor:'E6E6FA'}} cardBody button onPress={() => this.props.navigate('HistoryDetail', { data: this.state.activity })}>
          <Text>Activity Type: {' '}
          {this.state.activity.type}{'\n'}
          Activity date: {' '}
          {(this.state.activity.timestamp).toLocaleDateString("en-US")}{'\n'}
          Duration: {' '}
          {this.secondsToFormat()}{'\n'}
          Weather: {' '}
          {this.state.activity.weather}{'\n'}</Text>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold'
  },
})