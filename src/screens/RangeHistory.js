import React, { Component } from 'react';
import { TouchableOpacity, FlatList } from 'react-native'
import { View, Text, Card, Container } from "native-base";

import HistoryCard from '../components/HistoryCard';
import RangePicker from '../components/RangePicker';

const MILLI_IN_WEEK  =   604800000;
const MILLI_IN_MONTH =  2629800000;
const MILLI_IN_YEAR  = 31557600000;

export default class RangeHistory extends Component {
  static navigationOptions = {
    title: 'Range History'
  }

  constructor(props) {
    super(props)
    this.state = {
      activities: this.props.navigation.getParam('activities').activities,
      currActivities: [],
      sortedBy: 'Year',
    }
  }

  getValue(value) {
    newOrder = [];
    date = new Date();
    if (value == 'Week') {
      for(i in this.state.activities){
        current = this.state.activities[i];
        if((date.getTime() - current.timestamp.getTime()) < MILLI_IN_WEEK)
          newOrder.push(current);
          console.log(current);
      }
    } else if (value == 'Month') {
      for(i in this.state.activities){
        current = this.state.activities[i];
        if((date.getTime() - current.timestamp.getTime()) < MILLI_IN_MONTH)
          newOrder.push(current);
          console.log(current);
      }
    } else {
      for(i in this.state.activities){
        current = this.state.activities[i];
        if((date.getTime() - current.timestamp.getTime()) < MILLI_IN_YEAR)
          newOrder.push(current);
          console.log(current);
      }
    }

    newOrder.sort((a,b)=>{
      return(b.timestamp - a.timestamp);
    })

    this.setState({ sortedBy: value, currActivities: [] }, () => this.setState({currActivities:newOrder}));
  }

  componentWillMount() {
    this.getValue(this.state.sortedBy);
  }

  navigate(place, data) {
    this.props.navigation.navigate(place, data);
  }

  _renderItem(item){
    return(<HistoryCard activity={item.item} navigate={(place, data) => this.navigate(place, data)} />)
  }

  _keyExtractor = (item, index) => index.toString()

  render() {
    return (
      <Container >
        <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>
          Get activities in the range of:
        </Text>
        <RangePicker setValue={(value) => { this.getValue(value) }} />
        <FlatList 
          style={{height:'100%'}}
          data={this.state.currActivities}
          renderItem={(item)=>this._renderItem(item)}
          keyExtractor={this._keyExtractor}
        />
      </Container>
    )
  }
}