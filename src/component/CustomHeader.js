import React, {Component} from 'react';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text,
} from 'native-base';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';

export default class CustomHeader extends Component {
  _menu = null;

  setMenuRef = (ref) => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  render() {
    return (
      <>
        <Header>
          <Body>
            <Title>Hoblist</Title>
          </Body>
          <Right>
            <Menu
              ref={this.setMenuRef}
              button={
                <Button transparent onPress={this.showMenu}>
                  <Icon name="menu" />
                </Button>
              }>
              <MenuItem
                onPress={() => {
                  this.hideMenu();

                  this.props.navigation.navigate('CompanyInfo');
                }}>
                Company Info{' '}
              </MenuItem>
              <MenuItem
                onPress={() => {
                  this.hideMenu();

                  this.props.navigation.navigate('HoblistWebView');
                }}>
                Hoblist
              </MenuItem>
            </Menu>
          </Right>
        </Header>
      </>
    );
  }
}

/*


<Header>
        <Left>
          <Button transparent>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Header</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="menu" />
          </Button>
        </Right>
      </Header>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={300}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <Menu />
      </RBSheet>


*/
