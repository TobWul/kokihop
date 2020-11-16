import React, { useReducer, createContext, useEffect, useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { AuthContext } from "./authContext";

const initialState = {
  recipeId: "",
  bookId: "",
  categoryId: "index",
  currentPage: 0,
  recipeIdList: [],
  book: {},
};

const RecipeContext = createContext();

const getSelectedCategory = (book, categoryId) =>
  book.categories &&
  book.categories.find((category) => category.id === categoryId);

function recipeReducer(state, action) {
  let selectedCategory;
  switch (action.type) {
    case "SET_BOOK_ID":
      return {
        ...state,
        bookId: action.value,
      };
    case "SET_RECIPE_ID":
      return {
        ...state,
        recipeId: action.value,
      };
    case "CHANGE_SELECTED_CATEGORY":
      selectedCategory = getSelectedCategory(state.book, action.value);
      return {
        ...state,
        categoryId: action.value,
        currentPage: 0,
        recipeIdList: selectedCategory ? selectedCategory.recipes : [],
        recipeId: selectedCategory ? selectedCategory.recipes[0] : "",
      };
    case "SET_BOOK":
      const categoryId = state.categoryId ? state.categoryId : "index";
      selectedCategory = getSelectedCategory(action.value, categoryId);
      return {
        ...state,
        book: action.value,
        bookId: action.value.id,
        categoryId,
        recipeIdList: selectedCategory ? selectedCategory.recipes : [],
      };
    case "SET_PAGE_NUMBER":
      return {
        ...state,
        currentPage: action.value,
      };
    default:
      return state;
  }
}

function RecipeProvider(props) {
  const [state, dispatch] = useReducer(recipeReducer, initialState);
  const { user } = useContext(AuthContext);
  const setBookId = (bookId) => {
    dispatch({ type: "SET_BOOK_ID", value: bookId });
  };

  const setRecipeId = (recipeId) => {
    dispatch({ type: "SET_RECIPE_ID", value: recipeId });
  };

  const setBook = (book) => {
    dispatch({ type: "SET_BOOK", value: book });
  };

  const setCategoryId = (categoryId) => {
    dispatch({ type: "CHANGE_SELECTED_CATEGORY", value: categoryId });
  };

  const setCurrentPage = (pageNum) => {
    if (pageNum >= 0 && pageNum < state.recipeIdList.length) {
      dispatch({ type: "SET_PAGE_NUMBER", value: pageNum });
    }
  };

  const { loading, error, refetch } = useQuery(GET_BOOK, {
    variables: { bookId: state.bookId },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setBook(data.getBook);
    },
  });

  useEffect(() => {
    refetch();
  }, [user]);

  return (
    <RecipeContext.Provider
      value={{
        ...state,
        setBookId,
        setRecipeId,
        setBook,
        setCategoryId,
        setCurrentPage,
        refetch,
      }}
      {...props}
    />
  );
}

const GET_BOOK = gql`
  query GetBook($bookId: ID!) {
    getBook(bookId: $bookId) {
      id
      name
      categories {
        id
        name
        recipes
      }
      createdAt
    }
  }
`;

export { RecipeContext, RecipeProvider };
