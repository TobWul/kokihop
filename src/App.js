import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import RecipeBook from "./components/RecipeBook/RecipeBook";
import { RecipeContextProvider } from "./context/RecipeContext";
import Editor from "./components/Editor/Editor";
import { EditorContextProvider } from "./context/EditorContext";
import LinkedRecipePage from "./components/LinkedRecipePage/LinkedRecipePage";
import Signup from "./components/AuthPages/Signup/Signup";
import Login from "./components/AuthPages/Login/Login";
import ForgotPassword from "./components/AuthPages/ForgotPassword/ForgotPassword";
import NoMatchPage from "./components/NoMatchPage/NoMatchPage";
import ROUTES from "./lib/Routes";
import { useEffect } from "react";
import { useState } from "react";
import { withFirebase } from "./firebase/context";
import withAuthentication from "./components/HOC/withAuthentication";
import UserContext from "./context/UserContext";
import PrivateRoute from "./lib/PrivateRoute";

const App = ({ firebase }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const authListener = firebase.auth.onAuthStateChanged((user) => {
      setUser(user || null);
      setLoading(false);
    });
    return () => authListener();
  });
  return (
    <UserContext.Provider value={user}>
      {loading ? (
        ""
      ) : (
        <Switch>
          <Route exact path={ROUTES.HOME}>
            <Landing />
          </Route>
          <Route exact path={ROUTES.REGISTER}>
            <Signup />
          </Route>
          <Route exact path={ROUTES.LOGIN}>
            <Login />
          </Route>
          <Route exact path={ROUTES.FORGOT_PASSWORD}>
            <ForgotPassword />
          </Route>
          <PrivateRoute
            path={ROUTES.USER_BOOK}
            allowedCondition={user !== null}
          >
            <RecipeContextProvider>
              <RecipeBook />
            </RecipeContextProvider>
          </PrivateRoute>
          <PrivateRoute
            path={ROUTES.NEW_RECIPE}
            allowedCondition={user !== null}
          >
            <EditorContextProvider>
              <Editor />
            </EditorContextProvider>
          </PrivateRoute>
          <Route path={ROUTES.PUBLIC_RECIPE}>
            <LinkedRecipePage />
          </Route>
          <Route>
            <NoMatchPage />
          </Route>
        </Switch>
      )}
    </UserContext.Provider>
  );
};

export default withFirebase(App);
