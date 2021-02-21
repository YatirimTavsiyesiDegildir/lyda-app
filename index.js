/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import {gql} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://ypk.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
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
    `,
  })
  .then(result => console.log(JSON.stringify(result)));

AppRegistry.registerComponent(appName, () => App);
