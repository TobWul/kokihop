import React, { useReducer, createContext, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

const initialState = {
  recipeId: "",
  bookId: "",
  categoryId: "index",
  currentPage: 0,
  recipeIdList: [],
  book: {},
};

const RecipeContext = createContext();

function recipeReducer(state, action) {
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
      const selectedCategory = state.book.categories.find(
        (category) => category.id === action.value
      );
      return {
        ...state,
        categoryId: action.value,
        recipeIdList: selectedCategory ? selectedCategory.recipes : [],
      };
    case "SET_BOOK":
      return {
        ...state,
        book: action.value,
        bookId: action.value.id,
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
  return (
    <RecipeContext.Provider
      value={{
        ...state,
        setBookId: (bookId) => {
          dispatch({ type: "SET_BOOK_ID", value: bookId });
        },

        setRecipeId: (recipeId) => {
          dispatch({ type: "SET_RECIPE_ID", value: recipeId });
        },

        setBook: (book) => {
          dispatch({ type: "SET_BOOK", value: book });
        },

        setCategoryId: (categoryId) => {
          dispatch({ type: "CHANGE_SELECTED_CATEGORY", value: categoryId });
        },

        setCurrentPage: (pageNum) => {
          dispatch({ type: "SET_PAGE_NUMBER", value: pageNum });
        },
      }}
      {...props}
    />
  );
}

export { RecipeContext, RecipeProvider };
