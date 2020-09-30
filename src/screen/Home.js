import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Icon,
  Right,
  Title,
} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import Axios from 'axios';
const Home = () => {
  React.useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const {data} = await Axios.post('https://hoblist.com/movieList');
    console.log(data);
  };
  return (
    <Container>
      <Content>
        <Grid>
          <Row>
            <View>
              <Col>Votes</Col>
              <Col>
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                  }}
                />
              </Col>
              <Col>
                <List>
                  <ListItem header>
                    <Title>Movie Name</Title>
                  </ListItem>
                  <ListItem>
                    <Left>
                      <Icon active name="logo-googleplus" />
                      <Text>Company</Text>
                    </Left>
                    <Right>
                      <Text>Geeksynergy Technologies Pvt Ltd</Text>
                    </Right>
                  </ListItem>
                  <ListItem>
                    <Left>
                      <Icon active name="logo-googleplus" />
                      <Text>Address</Text>
                    </Left>
                    <Right>
                      <Text>Sanjayanagar, Bengaluru-56</Text>
                    </Right>
                  </ListItem>
                  <ListItem>
                    <Left>
                      <Icon active name="logo-googleplus" />
                      <Text>Phone</Text>
                    </Left>
                    <Right>
                      <Text>XXXXXXXXX09</Text>
                    </Right>
                  </ListItem>
                  <ListItem>
                    <Left>
                      <Icon active name="logo-googleplus" />
                      <Text>Email</Text>
                    </Left>
                    <Right>
                      <Text>XXXXXX@gmail.com</Text>
                    </Right>
                  </ListItem>
                </List>
              </Col>
              <Button block light>
                <Text>Watch Trailer</Text>
              </Button>
            </View>
          </Row>
        </Grid>
      </Content>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({});
