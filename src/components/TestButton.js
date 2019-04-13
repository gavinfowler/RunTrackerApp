import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles.js';
import { increment, decrement } from '../redux/actions/actions';

class Button extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={() => this.props.dispatchIncrement(this.props.incr)}
                style={this.props.style}
            >
                <Text 
                    style={styles.buttonText}>
                    {this.props.name}
                </Text>
            </TouchableOpacity>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchIncrement: (val) => dispatch(increment(val)),
        dispatchDecrement: () => dispatch(decrement())
    };
}

export default connect(null, mapDispatchToProps)(Button);