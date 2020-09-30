import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';

const HoblistWebView = () => {
  return (
    <Content>
      <WebView source={{uri: 'https://hoblist.com'}} />
    </Content>
  );
};

export default HoblistWebView;

const styles = StyleSheet.create({});
