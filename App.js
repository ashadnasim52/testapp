import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screen/Home';
import SignIn from './src/screen/SignIn';
import SignUp from './src/screen/Signup';
import HoblistWebView from './src/screen/HoblistWebView';
import CompanyInfo from './src/screen/CompanyInfo';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          headerTitle: (props) => <Title>Hello</Title>,
          headerRight: () => (
            <>
              <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
              />
              <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
              />
            </>
          ),
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="HoblistWebView" component={HoblistWebView} />
        <Stack.Screen name="CompanyInfo" component={CompanyInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
