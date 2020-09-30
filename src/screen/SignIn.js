import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  Image,
} from 'react-native';
import {
  Header,
  Container,
  Title,
  Content,
  List,
  ListItem,
  InputGroup,
  Input,
  Icon,
  Text,
  Picker,
  Button,
  H1,
  H3,
} from 'native-base';

import Snackbar from 'react-native-snackbar';
import {SkypeIndicator} from 'react-native-indicators';

import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import trim from 'validator/lib/trim';
import normalizeEmail from 'validator/lib/normalizeEmail';

export class SignIn extends Component {
  state = {
    name: null,
    password: null,
    message: null,
  };
  doSignIn = async () => {
    try {
      let {name, password} = this.state;
      const {route, navigation} = this.props;
      password = trim(password);
      if (!name || !password) {
        return Snackbar.show({
          text: 'Please provide all fields',
          textColor: 'white',
          backgroundColor: 'red',
        });
      }

      if (!isLength(password, {min: 8, max: 20}))
        return Snackbar.show({
          text: 'Password should be between 8 to 20 characters',
          textColor: 'white',
          backgroundColor: 'red',
        });
      // if everything works fine then
      validateUser();
    } catch (error) {
      console.log({error});
      return Snackbar.show({
        text: 'Something went wrong',
        textColor: 'white',
        backgroundColor: 'red',
      });
    }
  };

  validateUser = async () => {
    const {route, navigation} = this.props;

    const {name, password} = this.state;

    const localUserDataString = await localStorage.getItem('@TEST_USERS');
    console.log(localUserDataString);

    if (!localUserDataString)
      return Snackbar.show({
        text: 'No User Found',
        textColor: 'white',
        backgroundColor: 'red',
      });

    const localUserData = JSON.parse(localUserDataString);

    console.log(localUserData);

    localUserData.forEach((user) => {
      if (name == user.name && password == user.password) {
        Snackbar.show({
          text: 'Welcome',
          textColor: 'white',
          backgroundColor: 'black',
        });
        return navigation.navigate('HOME');
      }
    });

    Snackbar.show({
      text: 'No user found',
      textColor: 'white',
      backgroundColor: 'red',
    });
  };

  render() {
    const {route, navigation} = this.props;

    if (fetching) {
      return (
        <Container>
          <SkypeIndicator
            style={{
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            color="#ffa41b"
          />
        </Container>
      );
    }

    return (
      <Container>
        <Content padder>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <Image
              source={require('../../assets/ic_launcher-web.png')}
              resizeMode="contain"
              style={{
                width: '100%',
                height: 250,
              }}
            />
            <Title
              style={{
                textTransform: 'uppercase',
                textAlign: 'center',
                color: theme.ACCENT,
                marginTop: 5,
              }}>
              Sign In
            </Title>
            <List>
              <ListItem>
                <InputGroup>
                  <Icon name="ios-person" style={{color: '#0A69FE'}} />
                  <Input
                    onChangeText={(text) => this.setState({email: text})}
                    value={this.state.name}
                    keyboardType="email-address"
                    placeholder={'Name'}
                    autoCapitalize="none"
                  />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Icon name="ios-unlock" style={{color: '#0A69FE'}} />
                  <Input
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                    placeholder={'Your Password'}
                    autoCapitalize="none"
                  />
                </InputGroup>
              </ListItem>
            </List>
            <Button
              full
              rounded
              primary
              style={{marginTop: 10, marginBottom: 5}}
              onPress={this.doSignIn}>
              <Text>Login</Text>
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text
                style={{
                  textAlign: 'center',
                }}>
                Are You New Here? SignUp Now
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

export default SignIn;

const styles = StyleSheet.create({
  errorContainer: {
    maxHeight: '20%',
  },
  contentContainer: {
    maxHeight: '80%',
  },
});
