import React, { Component } from "react";
import { Card, CardItem, Text } from "native-base";

export default class HistoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: this.props.activity,
    };
  }

  render(){
    return(
      <Card>
        <CardItem>
          <Text>
            {this.state.activity.distance}
          </Text>
        </CardItem>
      </Card>
    );
  }
}