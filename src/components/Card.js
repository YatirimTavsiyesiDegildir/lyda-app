import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Button, Card, Text, Icon, Spinner} from '@ui-kitten/components';

const AcceptIcon = props => <Icon {...props} name={'checkmark'} />;
const CancelIcon = props => <Icon {...props} name={'close'} />;
const Loader = props => <Spinner status={'basic'} />;
const AddIcon = props => <Icon {...props} name={'add'} />;

const CouponCardFooter = props => {
  let status = props.cardProps.status;
  return (
    <View style={[CardStyles.footerContainer]}>
      <Text category={'h4'}>{props.cardProps.place_name}</Text>
      <Text category={'h6'} style={CardStyles.amountText} appearance="hint">
        {'  ' + props.cardProps.amount} TL
      </Text>
      <Button
        style={CardStyles.footerControl}
        size="small"
        appearance={status === 0 || status === 3 ? 'outline' : 'filled'}
        status={status === 0 ? 'danger' : 'primary'}
        disabled={status === 3}
        onPress={() => {
          if (status === 1) {
            props.openQRScreen();
          }
        }}>
        {status === 0
          ? 'Odeme Bekleniyor'
          : status === 1
          ? 'KULLAN'
          : 'Kullanildi'}
      </Button>
    </View>
  );
};

/*
{
	:done: "amount": 15,
	"code": "COWSXZ",
	"formal_name": "Barikat A.S.",
	"gifted_by": null,
	"iban": "TR78 0011 1000 0000 0079 4274 57",
	"id": 199,
	:done: "image_url": "https://bulusunca.s3.us-east-2.amazonaws.com/place-pictures/Barikat1.jpg",
	"is_gifted": 0,
	:done: "place_name": "Barikat",
	"status": 1
}
 */
const CouponCard = props => (
  <Card style={CardStyles.card} footer={() => CouponCardFooter(props)}>
    <View style={CardStyles.cardInnerContainer}>
      <Image
        style={CardStyles.image}
        source={{uri: props.cardProps.image_url}}
      />
    </View>
  </Card>
);

const FriendCardFooter = props => {
  return (
    <View style={[CardStyles.footerContainer, {justifyContent: 'flex-end'}]}>
      <Button
        status={'danger'}
        style={CardStyles.button}
        accessoryLeft={props.refreshing ? Loader : CancelIcon}
        onPress={() =>
          props.functions.respondToFriendRequest(props.cardProps.user_one_id, 0)
        }
      />
      <Button
        status={'success'}
        style={CardStyles.button}
        accessoryLeft={props.refreshing ? Loader : AcceptIcon}
        onPress={() =>
          props.functions.respondToFriendRequest(props.cardProps.user_one_id, 1)
        }
      />
    </View>
  );
};

const FriendCard = props => (
  <Card
    style={CardStyles.card}
    footer={() =>
      typeof props.cardProps.real_name === 'undefined'
        ? FriendCardFooter(props)
        : null
    }>
    <View
      style={[
        CardStyles.cardInnerContainer,
        CardStyles.cardInnerContainerFriend,
      ]}>
      <View style={CardStyles.friendAvatarContainer}>
        <Image
          style={CardStyles.friendAvatar}
          source={{
            uri:
              'https://bulusunca-profile-pictures.s3.us-east-2.amazonaws.com/' +
              (typeof props.cardProps.real_name !== 'undefined'
                ? props.cardProps.id.toString()
                : props.cardProps.user_one_id.toString()) +
              '.jpg',
          }}
        />
      </View>
      <Text category={'h6'} style={CardStyles.nameText}>
        {typeof props.cardProps.real_name !== 'undefined'
          ? props.cardProps.real_name
          : props.cardProps.user_one_name}
      </Text>
      {typeof props.isAddFriend !== 'undefined' ? <Button /> : null}
    </View>
  </Card>
);

const CardStyles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  cardInnerContainer: {
    marginHorizontal: -24,
    marginVertical: -16,
    height: 200,
  },
  cardInnerContainerFriend: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -14,
  },
  friendAvatarContainer: {
    width: 60,
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 1,
  },
  friendAvatar: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  footerControl: {},
  amountText: {alignSelf: 'flex-end', flex: 1},
  nameText: {
    marginLeft: 20,
  },
  icon: {
    height: 20,
    width: 20,
  },
  button: {
    height: 30,
    width: 70,
    marginHorizontal: 5,
  },
});

export {FriendCard};
export default CouponCard;
