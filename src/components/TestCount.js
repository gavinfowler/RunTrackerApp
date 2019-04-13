import React, { Component } from 'react';
import {
    StyleSheet,
    Text
} from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles.js';

class Counter extends Component {

    render() {
        return (
            <Text style={styles.counter}>
                {this.props.count}
            </Text>
        );
    }
}

function mapStateToProps(state) {
    return {
        count: state.count
    };
}

export default connect(mapStateToProps)(Counter);