import React from 'react';
import {StyleSheet, View} from 'react-native';
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screen/Home';
import SignIn from './src/screen/SignIn';
import SignUp from './src/screen/Signup';
import HoblistWEb from './src/screen/HoblistWebView';
import CompanyInfo from './src/screen/CompanyInfo';
import Messaging from './src/utils/Messaging';
const Stack = createStackNavigator();
import {Button, Icon, List, ListItem, Title, Text} from 'native-base';
import {AsyncStorage} from 'react-native';
import Menu from './src/component/Menu';
import CustomHeader from './src/component/CustomHeader';

const App = () => {
  React.useEffect(() => {
    // AsyncStorage.removeItem('@TEST_USERS');
  }, []);

  return (
    <>
      <Messaging />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SignIn"
          screenOptions={{
            header: (props) => <CustomHeader {...props} />,
          }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="HoblistWebView" component={HoblistWEb} />
          <Stack.Screen name="CompanyInfo" component={CompanyInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
