/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://ypk.hasura.app/v1/graphql',
  cache: new InMemoryCache()
});



// const client = ...

client
  .query({
    query: gql`
    query MyQuery {
        users {
          email
          id
          name
          phone
          tckn
          username
        }
      }
    `
  })
  .then(result => console.log(JSON.stringify(result)));

AppRegistry.registerComponent(appName, () => App);


var xhr = new XMLHttpRequest();
var url = 'https://api.yapikredi.com.tr/api/creditcard/v1/creditCardTransactions';
xhr.open('POST', url);
xhr.setRequestHeader('Authorization', 'Bearer 20098be1-4937-4d53-9ccf-e9fe58cb33bf');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        //console.warn('Status: '+this.status+'\nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'\nBody: '+this.responseText);
        //console.warn(this.responseText);
        console.log(this.response);
    }
};
xhr.send(' {  "request": {    "cardNo": "6353183025166336",    "cycle": "0"  }}   ');
