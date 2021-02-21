import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Button, Card, Text, Icon, Popover, Layout} from '@ui-kitten/components';

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

export const BankApiCard = props => (
  <Card style={CardStyles.card} footer={() => CouponCardFooter(props)}>
    <View style={CardStyles.cardInnerContainer}>
      <Image style={CardStyles.image} source={{uri: props.cardProps.image}} />
    </View>
  </Card>
);

export const SubscriptionWarningCard = () => {
  const [visible, setVisible] = React.useState(false);

  const renderToggleButton = () => (
    <Card style={CardStyles.smallCard} onPress={() => setVisible(true)}>
      <View style={CardStyles.smallCardInnerContainer}>
        <View
          style={{
            height: '100%',
            width: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon
            style={CardStyles.icon}
            fill="#FFF"
            name="alert-circle-outline"
          />
        </View>
        <Text category={'h6'} style={{flex: 1, color: '#FFF'}}>
          3 gun sonra Spotify odemen gerceklesek, abonelige devam etmek istiyor
          musun?
        </Text>
      </View>
    </Card>
  );

  return (
    <Popover
      visible={visible}
      anchor={renderToggleButton}
      onBackdropPress={() => setVisible(false)}
      backdropStyle={CardStyles.backdrop}>
      <Layout style={CardStyles.content}>
        <Text>
          Henuz bankanizin API'i buna izin vermiyor, lutfen diger yollarla
          aboneliginizi iptal edin.
        </Text>
      </Layout>
    </Popover>
  );
};

const CardStyles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 20,
  },
  smallCard: {
    width: '100%',
    height: 100,
    backgroundColor: '#FF3D71',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  smallCardInnerContainer: {
    height: '100%',
    flexDirection: 'row',
  },
  icon: {
    width: 40,
    height: 40,
    color: '#FFF',
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
