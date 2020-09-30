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
} from 'native-base';

const CompanyInfo = () => {
  return (
    <Content>
      <Card>
        <CardItem>
          <Left>
            <Icon active name="logo-googleplus" />
            <Text>Company</Text>
          </Left>
          <Right>
            <Text>Geeksynergy Technologies Pvt Ltd</Text>
          </Right>
        </CardItem>
        <CardItem>
          <Left>
            <Icon active name="logo-googleplus" />
            <Text>Address</Text>
          </Left>
          <Right>
            <Text>Sanjayanagar, Bengaluru-56</Text>
          </Right>
        </CardItem>
        <CardItem>
          <Left>
            <Icon active name="logo-googleplus" />
            <Text>Phone</Text>
          </Left>
          <Right>
            <Text>XXXXXXXXX09</Text>
          </Right>
        </CardItem>
        <CardItem>
          <Left>
            <Icon active name="logo-googleplus" />
            <Text>Email</Text>
          </Left>
          <Right>
            <Text>XXXXXX@gmail.com</Text>
          </Right>
        </CardItem>
      </Card>
    </Content>
  );
};

export default CompanyInfo;

const styles = StyleSheet.create({});
