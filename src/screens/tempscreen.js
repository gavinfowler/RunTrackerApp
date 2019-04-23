import React, { Component } from 'react';
import { Platform, StyleSheet, View, Image } from 'react-native';
import { Container, Button, Text, Header } from 'native-base';

export default class TEMP extends Component {
  static navigationOptions = {
    title: 'TEMP'
  }

  constructor(props) {
    super(props);
    this.state = {
      temp: 0
    }
  }

  componentWillMount() {
    console.log(this.props.navigation.getParam('photo'))
  }


  render() {
    return (
      <View style={{transform:[{rotate: '90 deg'}]}}>
        <Image style={{width: 600,height:100}} source={{uri:this.props.navigation.getParam('photo')}}/>
      </View>
    );
  }
}