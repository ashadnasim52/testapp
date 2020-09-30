import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Icon, List, ListItem, Title, Text} from 'native-base';

const Menu = (props) => {
  console.log(props);
  return (
    <List>
      <ListItem onPress={() => {}}>
        <Text> </Text>
      </ListItem>
      <ListItem
        onPress={() => {
          navigation.navigate('HoblistWebView');
        }}>
        <Text> Hoblist </Text>
      </ListItem>
    </List>
  );
};

export default Menu;

const styles = StyleSheet.create({});
