import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {
  Divider,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Avatar,
  Button,
  Spinner,
  Icon,
} from '@ui-kitten/components';
import ImagePicker from 'react-native-image-crop-picker';
import {FetchGet, FetchPutPhoto} from '../../src/utils/Fetch';

const LogoutIcon = props => <Icon {...props} name="log-out" />;

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoSource: {
        uri:
          'https://bulusunca-profile-pictures.s3.us-east-2.amazonaws.com/' +
          global.userId.toString() +
          '.jpg',
      },
      photoLoading: false,
    };
  }

  openImagePicker() {
    // Todo: for localization and android check back the repo
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then(image => {
      this.setState({photoLoading: true, photoSource: null});
      FetchGet(
        '/get_profile_picture_upload_url',
        {access_token: global.accessToken},
        responseData => {
          if (responseData.status === 'OK') {
            FetchPutPhoto(
              responseData.fields,
              {image: image},
              () => {
                this.setState({
                  photoSource: {uri: image.path},
                  photoLoading: false,
                });
              },
              xhr => {
                Alert.alert('Bir hata olustu: ' + xhr.status.toString());
              },
            );
          }
        },
        () => {},
      );
    });
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
            <TouchableOpacity
              onPress={() => this.openImagePicker()}
              style={ProfileStyles.avatarInnerContainer}>
              <Image
                style={ProfileStyles.avatar}
                size="giant"
                source={this.state.photoSource}
                onLoadEnd={() => {
                  this.setState({photoLoading: false});
                }}
                onLoadStart={() => {
                  this.setState({photoLoading: true});
                }}
              />
              {this.state.photoLoading ? (
                <View
                  style={{
                    position: 'absolute',
                  }}>
                  <Spinner />
                </View>
              ) : null}
            </TouchableOpacity>
          </View>
          <View style={ProfileStyles.infoContainer}>
            <Text category={'h1'}>{global.realName}</Text>
            <Text category={'label'} appearance={'hint'}>
              {'@' + global.username}
            </Text>
          </View>
          <View style={ProfileStyles.logoutContainer}>

          </View>
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
    borderRadius: 100,
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
