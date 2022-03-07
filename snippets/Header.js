/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 * @author Antonio Vincenzo Spera
 */

import {ImageBackground, StyleSheet, Text} from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <ImageBackground
      accessibilityRole="image"
      testID="new-app-screen-header"
      source={require('../images/logo.png')}
      style={[styles.background]}
      imageStyle={styles.logo}>
      <Text style={styles.text}>Welcome to{'\n'}Wreking Hotels rooms</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    paddingBottom: 40,
    paddingTop: 40,
    paddingHorizontal:40,
  },
  logo: {
    opacity: 0.1,
    overflow: 'visible',
    resizeMode: 'cover',
  },
  text: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    color: '#5f9ea0'
  },
});

export default Header;
