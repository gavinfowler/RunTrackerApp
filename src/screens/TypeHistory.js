import React, { Component } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native'
import { View, Text, Card, Container } from "native-base";

import HistoryCard from '../components/HistoryCard';
import TypePicker from '../components/TypePicker';

export default class TypeHistory extends Component {
  static navigationOptions ={
    title: 'History by Type'
  }

  constructor(props){
    super(props)
    this.state={
      activities: [],
      type: 'All'
    }
  }

  getValue(value) {
    this.setState({ type: value });
  }

  componentWillMount(){
    activities = this.props.navigation.getParam('activities').activities;
    console.log(activities)
    this.setState({activities:activities});
  }

  navigate(place, data){
    this.props.navigation.navigate(place, data);
  }

  createCards(){
    cardArray = [];
    type = this.state.type;
    for(i in this.state.activities){
      currActivity = this.state.activities[i];
      if(type == 'All' || currActivity.type == type){
        cardArray.push(<HistoryCard  key={i} activity={currActivity} navigate={(place, data)=>this.navigate(place, data)}/>);
      }
    }
    return(cardArray);
  }

  render(){
    return(
      <Container >
        <Text style={{alignSelf:'center', fontWeight:'bold'}}>
          Select a Type
        </Text>
        <TypePicker setValue={(value) => { this.getValue(value) }}/>
        <ScrollView>
        {this.createCards()}
        </ScrollView>
      </Container>
    )
  }
}