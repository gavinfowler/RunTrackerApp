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

var start = 'http://blog.runningwarehouse.com/wp-content/uploads/2015/10/ASICS-Kayano-22-e1444773272100.jpg';
var rewards = 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.qlAIwdDwLBgXxDo6krFUsQHaE8%26pid%3DApi&f=1';
var pastImage = 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fd2v9y0dukr6mq2.cloudfront.net%2Fvideo%2Fthumbnail%2FS9BPJEp7ioxrxk50%2Frunning-woman-tying-shoe-laces-going-running-girl-trail-runner-closeup-of-female-legs-and-running-shoes-in-action-girl-athlete-fitness-runner-running-fast-outside-in-trail-running-shoes-5994-fps_rulls-7ml_thumbnail-full14.png&f=1';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class Home extends Component {
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
      //check if param===undefined
      // if not append to state
    })
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
              <Image source={{ uri: start }} style={{ height: 140, width: null, flex: 1 }} />
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
              <Image source={{ uri: pastImage }} style={{ height: 140, width: null, flex: 1 }} />
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
              <Image source={{ uri: rewards }} style={{ height: 140, width: null, flex: 1 }} />
            </CardItem>
          </Card>
          <Text style={styles.welcome}>Home</Text>
          <Button onPress={() => this.props.navigation.navigate('StartActivity')}><Text>Go to Start</Text></Button>
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
