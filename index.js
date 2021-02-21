/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {gql} from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://ypk.hasura.app/v1/graphql',
});

const authLink = setContext((_, {headers}) => {
  // get the authentication token from local storage if it exists
  const token =
    'E7v2cA2oCXG7xYcNaSeEFzOQo4p42UAGTdInXtmz4h7ZfS52XWmqKMzZq50AIEHD';
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret':
        'E7v2cA2oCXG7xYcNaSeEFzOQo4p42UAGTdInXtmz4h7ZfS52XWmqKMzZq50AIEHD',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
          tckn
          username
        }
      }
    `,
  })
  .then(result => console.warn(result));

AppRegistry.registerComponent(appName, () => App);
