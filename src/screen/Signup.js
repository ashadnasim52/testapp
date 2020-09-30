import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  StyleSheet,
  Image,
  Linking,
} from 'react-native';
import {
  Header,
  Container,
  Label,
  Right,
  List,
  ListItem,
  InputGroup,
  Input,
  Icon,
  Text,
  Item,
  Button,
  Left,
  Body,
  Content,
  H3,
  Title,
} from 'native-base';
import Snackbar from 'react-native-snackbar';
import {SkypeIndicator} from 'react-native-indicators';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import trim from 'validator/lib/trim';
import normalizeEmail from 'validator/lib/normalizeEmail';

var radio_props = [
  {label: 'Student', value: 0},
  {label: 'Teacher', value: 1},
];

export class SignUp extends Component {
  state = {
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
    passMatch: true,
    showpass: false,
    value: 0,
  };

  signUp = async () => {
    try {
      let {name, email, password, confirmPassword, value: role} = this.state;
      name = trim(name);
      email = normalizeEmail(trim(email));
      password = trim(password);
      confirmPassword = trim(confirmPassword);

      console.log('roleee', role);

      if (role === null) {
        return Snackbar.show({
          text: 'Please select your role',
          textColor: 'white',
          backgroundColor: 'red',
        });
      }

      if (!name || !email || !password || !confirmPassword) {
        return Snackbar.show({
          text: 'Please provide all fields',
          textColor: 'white',
          backgroundColor: 'red',
        });
      }

      if (!isEmail(email))
        return Snackbar.show({
          text: 'Please provide mail in correct format',
          textColor: 'white',
          backgroundColor: 'red',
        });
      if (!isLength(password, {min: 8, max: 20}))
        return Snackbar.show({
          text: 'Password should be between 8 to 20 characters',
          textColor: 'white',
          backgroundColor: 'red',
        });
      if (!isLength(name, {min: 3, max: 20}))
        return Snackbar.show({
          text: 'Name should be between 3 to 20 characters',
          textColor: 'white',
          backgroundColor: 'red',
        });
      this.props.signUpUser({
        name,
        email,
        password,
        confirmPassword,
        role,
      });

      const {signUpfetching, signUperror, signUpmessage} = this.props.auth;

      console.log(signUpfetching, signUperror, signUpmessage);

      if (signUperror) {
        this.setState({message: signUpmessage});
        return Snackbar.show({
          text: signUpmessage,
          textColor: 'white',
          backgroundColor: 'red',
        });
      } else {
        Snackbar.show({
          text: signUpmessage,
          textColor: theme.BLUE,
          backgroundColor: theme.ACCENT,
        });
        setTimeout(() => {
          this.props.navigation.navigate('SignIn');
        }, 1000);
      }
    } catch (error) {
      Snackbar.show({
        text: 'Something went wrong',
      });
    }
  };

  _passwordMatch = () => {
    const {password, confirmPassword} = this.state;

    if (password == confirmPassword) {
      this.setState({passMatch: true});
    } else {
      this.setState({passMatch: false});
    }
  };

  _passwordVisibility = () => {
    this.setState({showpass: !this.state.showpass});
  };

  render() {
    const {route, navigation, auth} = this.props;

    if (auth.signUpfetching) {
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
                height: 200,
              }}
            />
            <Title
              style={{
                textTransform: 'uppercase',
                textAlign: 'center',
                color: theme.ACCENT,
                marginTop: 5,
              }}>
              Sign Up
            </Title>

            <List>
              <ListItem>
                <RadioForm
                  formHorizontal={true}
                  labelHorizontal={true}
                  radio_props={radio_props}
                  initial={0}
                  buttonSize={10}
                  labelStyle={{
                    color: theme.TEXT,
                    paddingHorizontal: 4,
                    fontSize: 16,
                  }}
                  onPress={(value) => {
                    this.setState({value: value});
                  }}
                />
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Icon name="ios-person" style={{color: '#0A69FE'}} />
                  <Input
                    keyboardType="default"
                    placeholder="Name"
                    onChangeText={(text) => this.setState({name: text})}
                    autoCapitalize="none"
                    maxLength={20}
                  />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Icon name="ios-mail" style={{color: '#0A69FE'}} />
                  <Input
                    placeholder="Your Email here"
                    onChangeText={(email) => this.setState({email})}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </InputGroup>
              </ListItem>

              <ListItem>
                <InputGroup>
                  <Icon name="ios-unlock" style={{color: '#0A69FE'}} />
                  <Input
                    onChangeText={(text) =>
                      this.setState({password: text}, () => {
                        if (!this.state.passMatch) {
                          this._passwordMatch();
                        }
                      })
                    }
                    value={this.state.password}
                    secureTextEntry={this.state.showpass ? false : true}
                    placeholder={'Your Password'}
                    autoCapitalize="none"
                  />
                  <View
                    style={{justifyContent: 'center', paddingHorizontal: 8}}>
                    {this.state.showpass ? (
                      <Icon
                        type="Entypo"
                        name="eye-with-line"
                        color="#517fa4"
                        onPress={this._passwordVisibility}
                      />
                    ) : (
                      <Icon
                        type="Entypo"
                        name="eye"
                        color="#517fa4"
                        onPress={this._passwordVisibility}
                      />
                    )}
                  </View>
                </InputGroup>
              </ListItem>

              <ListItem>
                <InputGroup>
                  <Icon name="ios-unlock" style={{color: '#0A69FE'}} />
                  <Input
                    onChangeText={(text) =>
                      this.setState({confirmPassword: text}, () => {
                        this._passwordMatch();
                      })
                    }
                    value={this.state.confirmPassword}
                    secureTextEntry={this.state.showpass ? false : true}
                    placeholder={'Confirm your password'}
                    autoCapitalize="none"
                  />
                  <View
                    style={{justifyContent: 'center', paddingHorizontal: 8}}>
                    {this.state.showpass ? (
                      <Icon
                        type="Entypo"
                        name="eye-with-line"
                        color="#517fa4"
                        onPress={this._passwordVisibility}
                      />
                    ) : (
                      <Icon
                        type="Entypo"
                        name="eye"
                        color="#517fa4"
                        onPress={this._passwordVisibility}
                      />
                    )}
                  </View>
                </InputGroup>
              </ListItem>

              {!this.state.passMatch ? (
                <Text style={{color: 'red'}}>Password not matched!</Text>
              ) : null}
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    'https://sites.google.com/view/msyllabus/privacy-policy',
                  );
                }}>
                <Text
                  style={{color: theme.BLUE, fontSize: 14, paddingLeft: 16}}>
                  Privacy policy
                </Text>
              </TouchableOpacity>
            </List>
            <Button
              full
              rounded
              primary
              style={{marginTop: 10, marginBottom: 5}}
              onPress={() => this.signUp()}>
              <Text>Register</Text>
            </Button>

            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text
                style={{
                  textAlign: 'center',
                }}>
                Already Registered? SignIn Here
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

export default SignUp;

const styles = StyleSheet.create({});
