import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Container, Button, Text, Header } from 'native-base';


export default class Rewards extends Component {
  static navigationOptions = {
    title: 'History'
  }

  constructor(props) {
    super(props);
    this.state = {
      activities: []
    }
  }

  componentWillMount() {
    temp = this.props.navigation.getParam('state');
    this.setState({ activities: temp });
  }

  render() {
    return (
      <Container>
        <Text style={{ fontSize: 20, textAlign: 'center' }}>
          View by:
          </Text>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-evenly'
        }}>

          <Button block style={{height:'25%'}} onPress={()=>{this.props.navigation.navigate('TypeHistory', {activities:this.state.activities})}}>
            <Text>
              Type
          </Text>
          </Button>
          <Button block style={{height:'25%'}} onPress={()=>{this.props.navigation.navigate('SortedHistory', {activities:this.state.activities})}}>
            <Text>
              Sorted
          </Text>
          </Button>
          <Button block style={{height:'25%'}}>
            <Text>
              Range
          </Text>
          </Button>
        </View>
      </Container>
    );
  }
}