import App from "components/App";
import React from 'react';
import { ApolloProvider } from "react-apollo"
import ReactDOM from 'react-dom';
import apolloClient from "./apollo";

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App/>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);
