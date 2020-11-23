import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import RecipeBook from "../pages/Book/RecipeBook/RecipeBook";
import IndexPage from "../pages/IndexPage/IndexPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import PrivateRoute from "./PrivateRoute";
import Editor from "../pages/Editor/Editor";
import Library from "../pages/Library/Library";
import { Helmet } from "react-helmet";
import Completed from "../pages/RegisterPage/Completed";
import PublicRecipe from "../pages/PublicRecipe/PublicRecipe";

export const ROUTES = {
  HOME: "/",
  REGISTER: "/registrer",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/glemt-passord",
  NEW_RECIPE: "/ny-oppskrift",
  EDIT_RECIPE: "/rediger-oppskrift/:recipeId",
  USER_BOOK: "/bok/:bookId",
  PUBLIC_RECIPE: "/oppskrift/:recipeId",
  LIBRARY: "/biblioteket",
  FAKE_DOOR: "/vi-tok-ikke-betalt",
};

const Router = () => {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Helmet>
        <script
          async
          defer
          data-domain="kokihop.com"
          src="https://stats.kokihop.com/js/index.js"
        ></script>
      </Helmet>
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
        <Route exact path={ROUTES.FAKE_DOOR}>
          <Completed />
        </Route>
        <PrivateRoute path={ROUTES.USER_BOOK} allowedCondition={user}>
          <RecipeBook />
        </PrivateRoute>
        <PrivateRoute path={ROUTES.EDIT_RECIPE} allowedCondition={user}>
          <Editor />
        </PrivateRoute>
        <PrivateRoute path={ROUTES.NEW_RECIPE} allowedCondition={user}>
          <Editor />
        </PrivateRoute>
        <PrivateRoute path={ROUTES.LIBRARY} allowedCondition={user}>
          <Library />
        </PrivateRoute>
        <Route path={ROUTES.PUBLIC_RECIPE}>
          <PublicRecipe />
        </Route>
        <Route>{"404"}</Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
