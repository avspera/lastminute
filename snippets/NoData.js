
import React, { Component } from 'react';
import {Text,View,} from 'react-native';

import styles from '../styles/nodata';

export default class NoData extends Component {

    constructor(props) {
      super(props);
      
      this.state = {
        subtext : this.props.subtext ? this.props.subtext : "",
        text: this.props.text ? this.props.text : ""
      };
    }

  render() {
    const {text} = this.state;
    return (
      <View style={styles.container}>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>Nothing to show here</Text>
              <Text p>{text}</Text>
            </View>
        </View>
      </View>
    );
  }
}