import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import {Button, Divider, Layout} from '@ui-kitten/components';

export default class RegisterScreen extends Component {
  navigateLogin = () => {
    this.props.navigation.navigate('Login');
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Divider />
        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Button onPress={this.navigateLogin}>GO BACK TO LOGIN</Button>
        </Layout>
      </SafeAreaView>
    );
  }
}
