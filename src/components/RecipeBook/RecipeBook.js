import React, { useState } from "react";
import {
  Switch,
  Route,
  useRouteMatch,
  useParams,
  useHistory,
  useLocation,
} from "react-router-dom";
import Pages from "../Pages/Pages";
import useDataApi from "../../api/api";
import CategoryContainer from "../Category/CategoryContainer";
import BookIndex from "../BookIndex/BookIndex";
import styles from "./RecipeBook.module.scss";
import RoundButton from "../Button/RoundButton";
import { getUrlElementAtIndex } from "../../lib/helpers";
import Editor from "../Editor/Editor";

const RecipeBook = () => {
  let { path } = useRouteMatch();
  const { bookId } = useParams();
  const history = useHistory();
  const { pathname } = useLocation();

  const [state] = useDataApi(`/books/${bookId}/`);
  const { data = {} } = state;
  let { categories = [] } = data;
  categories = [{ id: "index" }, ...categories];

  const [recipeId, setRecipeId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    getUrlElementAtIndex(pathname, 3) || categories[0].id
  );

  let editRecipUrl = `${selectedCategoryId}/ny-oppskrift`;

  const changeCategory = (id) => {
    const newUrl = `/bok/${bookId}/${id}`;
    history.push(newUrl);
    setSelectedCategoryId(id);
  };
  const goToIndex = (id) => {
    history.push(`/bok/${bookId}/`);
    setSelectedCategoryId(id);
  };
  const goToEditPage = (recipeId) => {
    history.push(editRecipUrl, { recipeId });
  };

  const newRecipe = () => {
    setRecipeId(null);
    history.push(editRecipUrl);
  };

  console.log(categories);

  return (
    <>
      <div className={styles.bookContainer}>
        <CategoryContainer
          categories={categories}
          changeCategory={changeCategory}
          goToIndex={goToIndex}
          selectedCategoryId={selectedCategoryId}
        />
        <div className={styles.pageWrapper}>
          <Switch>
            <Route exact path={path}>
              <BookIndex />
            </Route>
            <Route path={`${path}/${selectedCategoryId}/ny-oppskrift`}>
              <Editor
                bookId={bookId}
                categoryId={selectedCategoryId}
                recipeId={recipeId}
              />
            </Route>
            {categories.map((category) => (
              <Route path={`${path}/${category._id}/`} key={category._id}>
                <Pages
                  recipes={category.recipes}
                  setRecipeId={setRecipeId}
                  goToEditPage={goToEditPage}
                />
              </Route>
            ))}
          </Switch>
          {selectedCategoryId !== "index" &&
            !pathname.includes("ny-oppskrift") && (
              <RoundButton icon="add" onClick={newRecipe} fab="bottom right" />
            )}
        </div>
      </div>
    </>
  );
};

export default RecipeBook;
