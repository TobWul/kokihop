import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import RecipeBook from "../pages/Book/RecipeBook/RecipeBook";
import IndexPage from "../pages/IndexPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PrivateRoute from "./PrivateRoute";
import Editor from "../pages/Editor/Editor";
import Library from "../pages/Library/Library";

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
};

const Router = () => {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
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
        <Route path={ROUTES.PUBLIC_RECIPE}>{"<LinkedRecipePage />"}</Route>
        <Route>{"404"}</Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;