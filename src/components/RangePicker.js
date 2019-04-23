import React, { Component } from "react";
import { Container, Header, Content, Icon, Picker, Form } from "native-base";

export default class RangePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "Year"
    };
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  getValue() {
    return (this.state.selected);
  }

  render() {
    return (
      <Form>
        <Picker
          mode="dropdown"
          selectedValue={this.state.selected}
          style={{ width: '50%', alignSelf: 'center', borderColor: 'black', borderRadius: 2 }}
          onValueChange={(itemValue) => {
            this.onValueChange.bind(this);
            this.setState({ selected: itemValue },
              () => { this.props.setValue(this.state.selected) });
          }}

        >
          <Picker.Item label="Year" value="Year" />
          <Picker.Item label="Month" value="Month" />
          <Picker.Item label="Week" value="Week" />
        </Picker>
      </Form>
    );
  }
}