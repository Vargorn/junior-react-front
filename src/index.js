import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    uri: 'http://localhost:4000'
})

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
root.render(
    <ApolloProvider client={client}>       
            <App />
    </ApolloProvider>
)