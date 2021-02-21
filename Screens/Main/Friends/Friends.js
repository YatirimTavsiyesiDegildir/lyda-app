import React, {Component} from 'react';
import {
  SafeAreaView,
  Alert,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {
  Divider,
  Layout,
  TopNavigation,
  List,
  TopNavigationAction,
  Icon,
} from '@ui-kitten/components';
import {FetchGet, FetchPost} from '../../../src/utils/Fetch';
//import {FriendCard} from '../../../src/components/Card';

const AddFriendIcon = props => <Icon {...props} name="person-add-outline" />;

export default class FriendsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      friendRequests: [],
      refreshing: true,
      renderData: [],
    };
  }
  componentDidMount() {
    this.getList();
  }

  getFriendRequest() {
    FetchGet(
      '/get_friend_requests',
      {access_token: global.accessToken},
      response => {
        this.setState({refreshing: false});
        if (response.status === 'OK') {
          this.setState(
            {
              friendRequests: response.friend_requests,
              renderData: response.friend_requests.concat(this.state.friends),
            },
            () => console.log(this.state.renderData),
          );
        } else {
          Alert.alert('Bir hata olustu.');
        }
      },
      () => {
        this.setState({refreshing: false});
        Alert.alert('Bir hata olustu.');
      },
    );
  }

  getFriends() {
    FetchGet(
      '/get_friends',
      {access_token: global.accessToken},
      response => {
        this.setState({refreshing: false});
        if (response.status === 'OK') {
          this.setState(
            {
              friends: response.friends,
              renderData: this.state.friendRequests.concat(response.friends),
            },
            () => console.log(this.state.renderData),
          );
        } else {
          Alert.alert('Bir hata olustu.');
        }
      },
      () => {
        this.setState({refreshing: false});
        Alert.alert('Bir hata olustu.');
      },
    );
  }

  getList() {
    this.setState({refreshing: true});
    this.getFriendRequest();
    this.getFriends();
  }

  renderFriendCard = ({item, index}) => {
    return <View />;
  };
  /*
      <FriendCard
        cardProps={item}
        functions={{
          respondToFriendRequest: (target, response) =>
            this.respondToFriendRequest(target, response),
        }}
        refreshing={this.state.refreshing}
      />
    );*/

  respondToFriendRequest(target, response) {
    FetchPost(
      '/respond_to_friend_request',
      {
        access_token: global.accessToken,
        target_user_id: target,
        response: response,
      },
      () => {
        this.getList();
      },
      () => {
        Alert.alert('Bir hata olustu!');
      },
    );
  }

  navigateAddFriends = () => (
    <TopNavigationAction
      icon={AddFriendIcon}
      onPress={() => this.props.navigation.navigate('AddFriendsScreen')}
    />
  );

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <TopNavigation
          title="MyApp"
          alignment="center"
          accessoryRight={this.navigateAddFriends}
        />
        <Divider />
        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <List
            style={FriendsStyles.listContainer}
            data={this.state.renderData}
            extraData={this.state.renderData}
            renderItem={this.renderFriendCard}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.getFriends()}
              />
            }
          />
        </Layout>
      </SafeAreaView>
    );
  }
}

const FriendsStyles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
});
