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
import {FriendCard} from '../../../src/component/Card';
import {client} from '../../../back-end/OurApi';
import {gql} from '@apollo/client';

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

  getFriends() {
    client
      .query({
        query: gql`
          query MyQuery($id: Int) {
            followers(where: {follower_id: {_eq: $id}}) {
              followed_to_user {
                name
                id
              }
            }
          }
        `,
        variables: {
          id: global.userId,
        },
      })
      .then(result => {
        let followed = result.data.followers;
        this.setState({
          friends: followed,
        });
      })
      .catch(result => {
        Alert.alert('Bir hata oluştu.');
      });
  }

  getList() {
    this.setState({refreshing: true});
    this.getFriends();
  }

  renderFriendCard = ({item, index}) => {
    return (
      <FriendCard
        cardProps={item}
        functions={{
          respondToFriendRequest: (target, response) =>
            this.respondToFriendRequest(target, response),
        }}
        refreshing={this.state.refreshing}
      />
    );
  };

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
          title="Arkadaşlarım"
          alignment="center"
          accessoryRight={this.navigateAddFriends}
        />
        <Divider />
        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <List
            style={FriendsStyles.listContainer}
            data={this.state.friends}
            extraData={this.state.friends}
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
