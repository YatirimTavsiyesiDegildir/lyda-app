import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
  View,
} from 'react-native';
import {
  Divider,
  Layout,
  TopNavigation,
  Text,
  List,
} from '@ui-kitten/components';

import {PurchaseCard} from '../../../Components/Card';

export default class PastPurchasesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {transactions: [], refreshing: false};
  }

  updateTransactions(transactions) {
    console.log(transactions[0].txnInfo.transactionDetails.txnDscr);
    this.setState({transactions: transactions});
  }

  getTransactions() {
    let updateTransactions = t => this.updateTransactions(t);
    var xhr = new XMLHttpRequest();
    var url =
      'https://api.yapikredi.com.tr/api/creditcard/v1/creditCardTransactions';
    xhr.open('POST', url);
    xhr.setRequestHeader(
      'Authorization',
      'Bearer 5bdb7b35-5a01-468d-9d3b-026cf361892e',
    );
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
      if (this.readyState == 4) {
        updateTransactions(
          JSON.parse(this.responseText).response.return.listResult.cycleList
            .transactionList,
        );
      }
    };
    xhr.send(
      ' {  "request": {    "cardNo": "6353183025166336",    "cycle": "0"  }}   ',
    );
  }

  componentDidMount() {
    this.getTransactions();
  }

  renderTransaction = ({item, index}) => {
    /*
    return (

    );
     */
    return <View style={{width: 10, height: 10, backgroundColor: '#000'}} />;
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <TopNavigation title="Harcamalarim" alignment="center" />
        <Divider />
        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {this.state.transactions.length > 1 ? (
            <List
              style={PastPurchasesStyles.listContainer}
              data={this.state.transactions}
              extraData={this.state.transactions}
              renderItem={item => (
                <PurchaseCard
                  name={item.item.txnInfo.transactionDetails.txnDscr.txnDscr1}
                  amount={Math.abs(
                    item.item.txnInfo.transactionDetails.txnAmount,
                  )}
                  subscription={0}
                />
              )}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.getTransactions()}
                />
              }
            />
          ) : null}
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
