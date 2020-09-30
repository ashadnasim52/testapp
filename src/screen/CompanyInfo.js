import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  Left,
  H1,
} from 'native-base';

const CompanyInfo = () => {
  return (
    <Container>
      <Content padder contentContainerStyle={{}}>
        <H1
          style={{
            textAlign: 'center',
            marginTop: 40,
            marginBottom: 40,
            color: '#0A69FE',
          }}>
          Company Details
        </H1>
        <Card style={{}}>
          <CardItem>
            <Icon
              style={{color: '#0A69FE'}}
              fontSize={12}
              name="shop"
              type="Entypo"
            />
            <Text>Company</Text>

            <Right>
              <Text
                style={{
                  textAlign: 'center',
                }}>
                Geeksynergy Technologies Pvt Ltd
              </Text>
            </Right>
          </CardItem>
          <CardItem>
            <Icon
              style={{color: '#0A69FE'}}
              name="address-book"
              type="FontAwesome"
              fontSize={12}
            />
            <Text>Address</Text>

            <Right>
              <Text
                style={{
                  textAlign: 'center',
                }}>
                Sanjayanagar, Bengaluru-56
              </Text>
            </Right>
          </CardItem>
          <CardItem>
            <Icon
              fontSize={12}
              style={{color: '#0A69FE'}}
              name="phone"
              type="Feather"
            />
            <Text>Phone</Text>

            <Right>
              <Text
                style={{
                  textAlign: 'center',
                }}>
                {' '}
                XXXXXXXXX09
              </Text>
            </Right>
          </CardItem>
          <CardItem>
            <Icon
              fontSize={12}
              style={{color: '#0A69FE'}}
              name="mail"
              type="Feather"
            />
            <Text>Email</Text>

            <Right>
              <Text
                style={{
                  textAlign: 'center',
                }}>
                XXXXXX@gmail.com
              </Text>
            </Right>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default CompanyInfo;

const styles = StyleSheet.create({});
