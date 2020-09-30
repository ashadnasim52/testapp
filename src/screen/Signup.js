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
  Text,
  Item,
  Button,
  Left,
  Body,
  Content,
  H3,
  Title,
  Icon,
} from 'native-base';
import Snackbar from 'react-native-snackbar';
import {SkypeIndicator} from 'react-native-indicators';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import trim from 'validator/lib/trim';
import normalizeEmail from 'validator/lib/normalizeEmail';
import {AsyncStorage} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export class SignUp extends Component {
  state = {
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
    passMatch: true,
    showpass: false,
    profession: 'Doctor',
    phoneNumber: null,
  };

  signUp = async () => {
    try {
      let {
        name,
        email,
        password,
        confirmPassword,
        profession,
        phoneNumber,
      } = this.state;
      name = trim(name);
      email = normalizeEmail(trim(email));
      password = trim(password);
      confirmPassword = trim(confirmPassword);

      if (!name || !email || !password || !confirmPassword || !phoneNumber) {
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

      const prevCredintals = await AsyncStorage.getItem('@TEST_USERS');
      console.log(prevCredintals);
      if (!prevCredintals) {
        await AsyncStorage.setItem(
          '@TEST_USERS',
          JSON.stringify([
            {
              name,
              email,
              password,
              phoneNumber,
              profession,
            },
          ]),
        );
      } else {
        const prevCredintals_parshed = JSON.parse(prevCredintals);
        console.log(prevCredintals_parshed);
        // const newList = await .push({
        //   name,
        //   email,
        //   password,
        //   phoneNumber,
        //   profession,
        // });
        // console.log(newList);

        await AsyncStorage.setItem(
          '@TEST_USERS',
          JSON.stringify([
            ...prevCredintals_parshed,
            {
              name,
              email,
              password,
              phoneNumber,
              profession,
            },
          ]),
        );

        Snackbar.show({
          text: 'Account Created successfully',
          textColor: 'white',
          backgroundColor: 'red',
        });

        return this.props.navigation.navigate('SignIn');
      }
    } catch (error) {
      Snackbar.show({
        text: 'Something went wrong',
        textColor: 'white',
        backgroundColor: 'red',
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

    return (
      <Container>
        <Content padder>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <Image
              source={require('../assets/coffee_lover_outline.png')}
              resizeMode="contain"
              style={{
                width: '100%',
                height: 100,
              }}
            />

            <List>
              <DropDownPicker
                items={[
                  {
                    label: 'Doctor',
                    value: 'Doctor',
                    icon: () => (
                      <Icon
                        name="work"
                        type="MaterialIcons"
                        size={18}
                        style={{color: '#0A69FE'}}
                      />
                    ),
                  },
                  {
                    label: 'Carpenter',
                    value: 'Carpenter',
                    icon: () => (
                      <Icon
                        name="work"
                        type="MaterialIcons"
                        size={18}
                        style={{color: '#0A69FE'}}
                      />
                    ),
                  },
                  {
                    label: 'Engineer',
                    value: 'Engineer',
                    icon: () => (
                      <Icon
                        name="work"
                        type="MaterialIcons"
                        size={18}
                        style={{color: '#0A69FE'}}
                      />
                    ),
                  },
                ]}
                defaultValue={this.state.profession}
                containerStyle={{}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={(item) =>
                  this.setState({
                    profession: item.value,
                  })
                }
              />

              <ListItem>
                <InputGroup>
                  <Icon
                    name="person-outline"
                    type="Ionicons"
                    style={{color: '#0A69FE'}}
                  />
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
                  <Icon name="mail" type="Feather" style={{color: '#0A69FE'}} />
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
                  <Icon
                    name="phone"
                    type="Feather"
                    style={{color: '#0A69FE'}}
                  />
                  <Input
                    placeholder="Phone Number"
                    onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                    autoCapitalize="none"
                  />
                </InputGroup>
              </ListItem>

              <ListItem>
                <InputGroup>
                  <Icon
                    name="unlock"
                    type="Feather"
                    style={{color: '#0A69FE'}}
                  />
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
                  <Icon
                    name="unlock"
                    type="Feather"
                    style={{color: '#0A69FE'}}
                  />
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
