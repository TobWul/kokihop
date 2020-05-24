import React from "react";
import Pages from "./components/Pages/Pages";
import { Switch, Route, Link } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import RecipeBook from "./components/RecipeBook/RecipeBook";
import { RecipeContextProvider } from "./context/RecipeContext";
import Editor from "./components/Editor/Editor";
import { EditorContextProvider } from "./context/EditorContext";
import RecipePage from "./components/RecipePage/RecipePage";
import LinkedRecipePage from "./components/LinkedRecipePage/LinkedRecipePage";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/bok/:bookId">
          <RecipeContextProvider>
            <RecipeBook />
          </RecipeContextProvider>
        </Route>
        <Route path="/ny-oppskrift">
          <EditorContextProvider>
            <Editor />
          </EditorContextProvider>
        </Route>
        <Route>
          <LinkedRecipePage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
