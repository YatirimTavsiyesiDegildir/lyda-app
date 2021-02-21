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

export const FriendWarningCard = props => {
  return (
    <Card
      style={[CardStyles.smallCard, {backgroundColor: '#FFAA00', height: 120}]}>
      <View style={[CardStyles.smallCardInnerContainer]}>
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
            name="alert-triangle-outline"
          />
        </View>
        <Text style={{flex: 1, color: '#FFF'}}>
          Ev disindaki harcamalarin arkdaslarindan %35 daha fazla. Bu
          harcamalardan kisarak birikimlerine odaklanabilirsin.
        </Text>
      </View>
    </Card>
  );
};

export const PurchaseCard = props => {
  const [visible, setVisible] = React.useState(false);
  const renderPurchaseInfo = () => (
    <Card
      style={[
        CardStyles.smallCard,
        {backgroundColor: props.subscription ? '#FFF1C2' : '#FFF', height: 60},
      ]}
      onPress={() => {
        if (props.subscription === 1) {
          setVisible(true);
        }
      }}>
      <View style={[CardStyles.smallCardInnerContainer]}>
        <Text category={'h6'} style={{flex: 1}}>
          {props.name}
        </Text>
        <Text>{props.amount}TL</Text>
      </View>
    </Card>
  );

  return (
    <Popover
      visible={visible}
      anchor={renderPurchaseInfo}
      onBackdropPress={() => setVisible(false)}
      backdropStyle={CardStyles.backdrop}>
      <Layout style={CardStyles.content}>
        <Text>
          Bu harcamanin abonelik olma ihtimali var. Uyari eklemek ister misiniz?
        </Text>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <Button
            style={CardStyles.subscriptionButton}
            appearance="outline"
            status="danger"
            onPress={() => setVisible(false)}>
            Hayir
          </Button>
          <Button
            style={CardStyles.subscriptionButton}
            appearance="filled"
            status="success"
            onPress={() => setVisible(false)}>
            Evet
          </Button>
        </View>
      </Layout>
    </Popover>
  );
};

const CardStyles = StyleSheet.create({
  subscriptionButton: {
    width: 150,
    margin: 20,
  },
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
    alignItems: 'center',
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
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
