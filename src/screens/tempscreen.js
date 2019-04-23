import React, { Component } from 'react';
import { View, Image ,StyleSheet, } from 'react-native';
import { Button, Text } from 'native-base'

export default class TEMP extends Component {
  static navigationOptions = {
    title: 'Image Taken'
  }

  constructor(props) {
    super(props);
    this.state = {
      photo: ''
    }
  }

  componentWillMount() {
    this.setState({ photo: this.props.navigation.getParam('photo') });
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={{ transform: [{ rotate: '90 deg' }] }}>
          <Image style={{ width: 400, height: 400 }} source={{ uri: this.state.photo }} />
        </View>
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <Button success onPress={() => this.props.navigation.navigate('AfterActivity', { photo: this.state.photo })} style={styles.capture}>
            <Text style={{ fontSize: 14 }}>Save to activity</Text>
          </Button>
          <Button danger onPress={() => this.props.navigation.goBack(null)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}>Cancel</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
    width: '35%'
  },
});