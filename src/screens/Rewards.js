import React, { Component } from 'react';
import { Platform, StyleSheet, View, Image } from 'react-native';
import { Button, Text, Body, Container, Content, Card, CardItem } from 'native-base';

export default class Rewards extends Component {
  static navigationOptions = {
    title: 'Rewards'
  }

  constructor(props) {
    super(props);

    this.state = {
      activities: {},
      longest: {},
      coldest: {},
      lastDate: {},
      numDays: 0,
      numActivities: 0,
    }
  }

  componentWillMount() {
    incomingActivities = this.props.navigation.getParam('state');
    incomingActivities = incomingActivities.activities
    console.log(incomingActivities);

    today = new Date();

    coldest = null;

    for (i in incomingActivities) {
      i = incomingActivities[i];
      if (i.isColdest) {
        coldest = i
      }
      if (i.timestamp > today) {
        today = i.timestamp;
      }
    }

    this.setState({ 
      activities: incomingActivities, 
      lastDate: today, 
      coldest: i,
      numActivities: incomingActivities.length
    }, () => {
      console.log(this.state);
      this.calcDays();
      this.determineRank()
    })
  }

  calcDays() {
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date();
    var diffDays = Math.round(Math.abs((firstDate.getTime() - this.state.lastDate.getTime()) / (oneDay)));
    this.setState({ numDays: diffDays })
  }

  determineRank(){
    if(this.state.numActivities < 5)
      return('1, You need to do more activities')
    else if(this.state.numActivities < 10)
      return('2, You\'re getting there')
    else
      return('3, Nice work')

  }

  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Body>
                <Text>
                  Rank: {this.determineRank()}
              </Text>
              </Body>
            </CardItem>
            <CardItem cardBody>
              <Image source={require('../../images/marathon.png')} style={{ height: 137, width: null, flex: 1 }} />
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <Text>
                  Coldest Activity: {this.state.coldest.tempature} °F
              </Text>
              </Body>
            </CardItem>
            <CardItem cardBody button onPress={() => this.props.navigation.navigate('HistoryDetail', { data: this.state.coldest })}>
              <Image source={require('../../images/coldest.png')} style={{ height: 137, width: null, flex: 1 }} />
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <Text>
                  Days since last run: {this.state.numDays}
                  {(this.state.numDays > 7 ? '\nThat\'s sad :(' : '\nNice Job! :)')}
                </Text>
              </Body>
            </CardItem>
            <CardItem cardBody>
              <Image source={require('../../images/couch.png')} style={{ height: 137, width: null, flex: 1 }} />
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}