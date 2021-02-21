import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Button, Card, Layout, Text} from '@ui-kitten/components';

const CouponCardFooter = props => {
  let status = props.cardProps.status;
  return (
    <View style={[CardStyles.footerContainer]}>
      <Text category={'h3'}>{props.cardProps.name}</Text>
      <Text category={'h5'} style={CardStyles.amountText} appearance="hint" />
      <Button
        style={CardStyles.footerControl}
        size="small"
        appearance={status === 0 ? 'outline' : 'filled'}
        status={status === 0 ? 'danger' : 'success'}
        disabled={status === 3}
        onPress={() => {
          if (status === 1) {
            props.openQRScreen();
          }
        }}>
        {status === 0 ? 'EKLE' : 'EKLENDI'}
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
const BankApiCard = props => (
  <Card style={CardStyles.card} footer={() => CouponCardFooter(props)}>
    <View style={CardStyles.cardInnerContainer}>
      <Image style={CardStyles.image} source={{uri: props.cardProps.image}} />
    </View>
  </Card>
);

const CardStyles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 20,
  },
  cardInnerContainer: {
    height: 100,
  },
  image: {
    height: '100%',
    resizeMode: 'contain',
    padding: 10,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
  },
  footerControl: {},
  amountText: {alignSelf: 'flex-end', flex: 1},
});

export default BankApiCard;
