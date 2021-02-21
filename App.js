import React, {Component} from 'react';
import {Alert} from 'react-native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import LoginNavigator from './Screens/Navigators/LoginNavigator';
import MainNavigator from './Screens/Navigators/MainNavigator';
import {FetchPost} from './Utils/Fetch';
import {StoreData, GetData} from './Utils/AsyncStorage';
import {call} from 'react-native-reanimated';
import theme from './src/themes/theme';

/**GLOBALS START*/
global.ApiUrl = 'https://y8vcfynym7.execute-api.us-east-2.amazonaws.com/api';
global.email = '';
global.userId = '';
global.realName = '';
global.accessToken = '';
global.username = '';
/**GLOBALS END*/

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false};
  }

  componentDidMount() {
    this.checkCredentials();
  }

  clearLoginInfo() {
    StoreData('email', '');
    StoreData('user_id', '');
    StoreData('real_name', '');
    StoreData('access_token', '');
    StoreData('username', '');
    global.email = '';
    global.userId = '';
    global.realName = '';
    global.accessToken = '';
    global.username = '';
    this.setState({isLoggedIn: false});
  }

  saveLoginInfo(response) {
    StoreData('email', response.user.email);
    StoreData('user_id', response.user.id);
    StoreData('real_name', response.user.real_name);
    StoreData('access_token', response.user.access_token);
    StoreData('username', response.user.username);
    global.email = response.user.email;
    global.userId = response.user.id;
    global.realName = response.user.real_name;
    global.accessToken = response.user.access_token;
    global.username = response.user.username;
    this.setState({isLoggedIn: true});
  }

  async checkCredentials() {
    let token = await GetData('access_token');
    if (token !== null && token !== '') {
      FetchPost(
        '/login',
        {access_token: token},
        response => {
          if (response.status === 'OK') {
            this.saveLoginInfo(response);
          } else {
            console.log('clear info');
            this.clearLoginInfo();
          }
        },
        () => {
          console.log('clear info');
          this.clearLoginInfo();
        },
      );
    }
  }

  logInUserWithPassword(email, password, callback) {
    /*
    FetchPost(
      '/login_with_password',
      {email: email, password: password},
      response => {
        if (response.status === 'OK') {
          this.saveLoginInfo(response);
        } else {
          Alert.alert('Email veya sifre yanlis.');
          callback();
        }
      },
      () => {
        Alert.alert('Bir hata olustu.');
        callback();
      },
    );*/
    // bypass login
    global.email = 'dogudeniz.ugur@gmail.com';
    global.userId = 0;
    global.realName = 'Dogu Deniz Ugur';
    global.accessToken = 'a';
    global.username = 'dogu';
    this.setState({isLoggedIn: true});
  }

  logout = () => {
    this.clearLoginInfo();
    this.setState({isLoggedIn: false});
  };

  render() {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={theme.light}>
          {this.state.isLoggedIn ? (
            <MainNavigator
              mainFunctions={{
                logout: () => this.logout(),
              }}
            />
          ) : (
            <LoginNavigator
              mainFunctions={{
                logInUser: (email, password, callback) =>
                  this.logInUserWithPassword(email, password, callback),
              }}
            />
          )}
        </ApplicationProvider>
      </>
    );
  }
}
