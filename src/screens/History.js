import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';


export default class Rewards extends Component {
  constructor(props){
    super(props);
    this.state = {
      activities: []
    }
  }

  componentWillMount(){
    temp = this.props.navigation.getParam('state');
    this.setState({activities:temp});
    console.log(temp);
  }

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