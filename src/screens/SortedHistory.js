import React, { Component } from 'react';
import { TouchableOpacity, FlatList } from 'react-native'
import { View, Text, Card, Container } from "native-base";

import HistoryCard from '../components/HistoryCard';
import SortedPicker from '../components/SortedPicker';

export default class SortedHistory extends Component {
  static navigationOptions = {
    title: 'Sorted History'
  }

  constructor(props) {
    super(props)
    this.state = {
      activities: this.props.navigation.getParam('activities').activities,
      sortedBy: 'Date',
      cardArray: []
    }
  }

  getValue(value) {
    newOrder = this.state.activities.slice();
    console.log('----------------')
    console.log(newOrder)
    sortedBy = value;
    console.log(sortedBy)
    if (sortedBy == 'Duration') {
      newOrder.sort((a, b) => {
        return (b.timer - a.timer)
      })
    } else if (sortedBy == 'Pace') {
      newOrder.sort((a, b) => {
        return (b.pace - a.pace)
      })
    } else {
      newOrder.sort((a, b) => {
        return (b.timestamp - a.timestamp)
      })
    }
    console.log(newOrder);
    console.log('----------------')

    this.setState({ sortedBy: value, activities: [] }, () => this.setState({activities:newOrder}));
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
          Sorted by:
        </Text>
        <SortedPicker setValue={(value) => { this.getValue(value) }} />
        <FlatList 
          style={{height:'100%'}}
          data={this.state.activities}
          renderItem={(item)=>this._renderItem(item)}
          keyExtractor={this._keyExtractor}
        />
      </Container>
    )
  }
}