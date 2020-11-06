import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./styles/index.scss";
import { AuthProvider } from "./context/authContext";
import Router from "./Routes/Router";
import { RecipeProvider } from "./context/recipeContext";

const API_URL = process.env.REACT_APP_API_URL;

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken") || "",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <RecipeProvider>
          <Router />
        </RecipeProvider>
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
