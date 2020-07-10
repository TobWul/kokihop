import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import useDataApi from "../api/api";
const RecipeContext = React.createContext();

const RecipeContextProvider = ({ children }) => {
  const history = useHistory();
  const params = useParams();

  const [recipeId, setRecipeId] = useState("");
  const [categoryId, setCategoryId] = useState("index");
  const [bookId, setBookId] = useState(params.bookId);
  const [currentPage, setCurrentPage] = useState(0);
  const [recipeIdList, setRecipeIdList] = useState([]);
  const [book, setBook] = useState();

  const [state] = useDataApi(`/books/${bookId}/`);

  const { data = {} } = state;
  let { categories = [] } = data;
  categories = [{ _id: "index" }, ...categories];

  useEffect(() => {
    setBookId(params.bookId);
  }, [params.bookId]);

  useEffect(() => {
    const currentCategory = categories.find(
      (category) => categoryId === category._id
    ) || {
      recipes: [],
    };

    setRecipeIdList(currentCategory.recipes);
    if (currentPage >= currentCategory.recipes.length) setCurrentPage(0);
    setRecipeId(currentCategory.recipes[currentPage]);
  }, [categoryId]);

  const navigate = (url, data) => {
    history.push({ pathname: url, state: { ...data } });
  };

  return (
    <RecipeContext.Provider
      value={{
        recipeId,
        setRecipeId,
        categoryId,
        setCategoryId,
        bookId,
        setBookId,
        navigate,
        currentPage,
        setCurrentPage,
        categories,
        recipeIdList,
        book,
        setBook,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export { RecipeContextProvider, RecipeContext };
