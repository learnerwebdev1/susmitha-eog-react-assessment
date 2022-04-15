import React from "react";
import { ToastContainer } from "react-toastify";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
//import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import {
  createClient,
  Provider,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from "urql";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
// import NowWhat from './components/NowWhat';

import Dashboard from "./components/Dashboard";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(39,49,66)",
    },
    secondary: {
      main: "rgb(197,208,222)",
    },
    background: {
      default: "rgb(226,231,238)",
    },
  },
});

// const client = new ApolloClient({
//   uri: 'https://react-assessment.herokuapp.com/graphql',
//   cache: new InMemoryCache(),
// });

const client = createClient({
  url: "https://react-assessment.herokuapp.com/graphql/",
  exchanges: [dedupExchange, cacheExchange, fetchExchange],
  fetchOptions: () => {
    return { headers: {} };
  },
});

const App = () => (
  <Provider value={client}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Wrapper>
        <Header />
        {/* <NowWhat /> */}
        <Dashboard />
        <ToastContainer />
      </Wrapper>
    </MuiThemeProvider>
  </Provider>
);

export default App;
