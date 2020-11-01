import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import ROUTES from "./Routes/Routes";
import PrivateRoute from "./Routes/PrivateRoute";
import IndexPage from "./pages/IndexPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import "./styles/index.scss";
import { AuthProvider } from "./context/authContext";

const API_URL = process.API_URL || "http://localhost:5000";

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken") || "",
  },
});

const App = () => (
  <ApolloProvider client={client}>
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path={ROUTES.HOME}>
            <IndexPage />
          </Route>
          <Route exact path={ROUTES.REGISTER}>
            <RegisterPage />
          </Route>
          <Route exact path={ROUTES.LOGIN}>
            <LoginPage />
          </Route>
          <Route exact path={ROUTES.FORGOT_PASSWORD}>
            {"<ForgotPassword />"}
          </Route>
          <PrivateRoute path={ROUTES.USER_BOOK} allowedCondition={true}>
            {`<RecipeContextProvider>
            <RecipeBook />
          </RecipeContextProvider>`}
          </PrivateRoute>
          <PrivateRoute path={ROUTES.NEW_RECIPE} allowedCondition={true}>
            {`<EditorContextProvider>
            <Editor />
          </EditorContextProvider>`}
          </PrivateRoute>
          <Route path={ROUTES.PUBLIC_RECIPE}>{"<LinkedRecipePage />"}</Route>
          <Route>{"404"}</Route>
        </Switch>
      </Router>
    </AuthProvider>
  </ApolloProvider>
);

export default App;
