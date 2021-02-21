import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  Divider,
  Layout,
  TopNavigation,
  Text,
} from '@ui-kitten/components';
import {PurchaseCard} from '../../../Components/Card';

export default class PastPurchasesScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <TopNavigation title="Harcamalarim" alignment="center" />
        <Divider />
        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ScrollView style={PastPurchasesStyles.listContainer}>
            <Text category={'h4'} style={{marginTop: 10, marginLeft: 20}}>
              Son 1 Ay
            </Text>
            <PurchaseCard name={'New Castle'} amount={59} subscription={0} />
            <PurchaseCard name={'New Castle'} amount={59} subscription={0} />
            <PurchaseCard name={'Netflix'} amount={14.99} subscription={1} />
            <PurchaseCard name={'New Castle'} amount={59} subscription={0} />
            <PurchaseCard name={'New Castle'} amount={59} subscription={0} />
            <PurchaseCard name={'New Castle'} amount={59} subscription={0} />
            <PurchaseCard name={'New Castle'} amount={59} subscription={0} />
            <PurchaseCard name={'New Castle'} amount={59} subscription={0} />
            <PurchaseCard name={'New Castle'} amount={59} subscription={0} />
            <PurchaseCard name={'New Castle'} amount={59} subscription={0} />
          </ScrollView>
        </Layout>
      </SafeAreaView>
    );
  }
}

const PastPurchasesStyles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  sectionTitle: {
    textAlign: 'center',
  },
});
