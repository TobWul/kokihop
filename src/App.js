import React from "react";
import Pages from "./components/Pages/Pages";
import { Switch, Route, Link } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import RecipeBook from "./components/RecipeBook/RecipeBook";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/bok/:bookId">
          <RecipeBook />
        </Route>
      </Switch>
    </>
  );
}

export default App;
