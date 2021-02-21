import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, View, Image} from 'react-native';
import {
  Divider,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Icon,
} from '@ui-kitten/components';
const LogoutIcon = props => <Icon {...props} name="log-out" />;

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
  }

  BackAction = () => (
    <TopNavigationAction
      icon={LogoutIcon}
      onPress={() => this.props.route.params.mainFunctions.logout()}
    />
  );

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <TopNavigation
          title="Profilim"
          alignment="center"
          accessoryRight={this.BackAction}
        />
        <Divider />
        <Layout style={ProfileStyles.container}>
          <View style={ProfileStyles.avatarContainer}>
            <View style={ProfileStyles.avatarInnerContainer}>
              <Image
                style={ProfileStyles.avatar}
                source={{
                  uri:
                    'https://project-lyda.s3.eu-central-1.amazonaws.com/wsb.jpg',
                }}
              />
            </View>
          </View>

          <View style={ProfileStyles.infoContainer}>
            <Text category={'h1'}>{global.realName}</Text>
            <Text category={'label'} appearance={'hint'}>
              {'@' + global.username}
            </Text>
          </View>
          <View style={ProfileStyles.logoutContainer} />
        </Layout>
      </SafeAreaView>
    );
  }
}

const ProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  avatarContainer: {
    flex: 1,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  logoutContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  avatar: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    padding: 10,
    zIndex: 10,
    borderRadius: 100
  },
  avatarInnerContainer: {
    height: 200,
    width: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});
