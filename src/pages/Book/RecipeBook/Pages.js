import React, { useContext, useEffect } from "react";
import SwipeableViews from "react-swipeable-views";
import { virtualize, bindKeyboard } from "react-swipeable-views-utils";
// import RecipePage from "../RecipePage/RecipePage";
import Paginator from "../Paginator/Paginator";
import PageEmptyState from "../PageEmptyState/PageEmptyState";
import SettingsMenu from "../SettingsMenu/SettingsMenu";
import { RecipeContext } from "../../../context/recipeContext";
import { gql, useQuery } from "@apollo/client";
import RecipeContent from "../../../components/Webapp/RecipeContent/RecipeContent";

const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

const Pages = () => {
  const {
    recipeId,
    recipeIdList,
    currentPage,
    setCurrentPage,
    setRecipeId,
  } = useContext(RecipeContext);

  const { data, error, loading, refetch } = useQuery(GET_RECIPE, {
    fetchPolicy: "cache-and-network",
    variables: { recipeId },
  });

  useEffect(() => {
    setRecipeId(recipeIdList[currentPage]);
  }, [recipeIdList]);

  const recipe = data && data.getRecipe;
  const bookLength = recipeIdList.length;

  const handleChangeIndex = (index) => {
    setCurrentPage(index);
    setRecipeId(recipeIdList[index]);
  };

  const slideRenderer = (params) => {
    const { index, key } = params;
    return <RecipeContent recipe={recipe} key={key} />;
  };

  const nextPage = () =>
    currentPage < bookLength - 1 && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 0 && setCurrentPage(currentPage - 1);

  return (
    <div>
      {bookLength > 0 ? (
        <>
          <SettingsMenu
            savedCount={null}
            prevUpdate={recipe && recipe.updatedAt}
          />
          <VirtualizeSwipeableViews
            index={currentPage}
            onChangeIndex={handleChangeIndex}
            slideRenderer={slideRenderer}
            slideCount={bookLength}
          />
          <Paginator
            nextPage={nextPage}
            bookLength={bookLength}
            prevPage={prevPage}
            currentPage={currentPage}
          />
        </>
      ) : (
        <PageEmptyState />
      )}
    </div>
  );
};

const GET_RECIPE = gql`
  query GetRecipe($recipeId: ID!) {
    getRecipe(recipeId: $recipeId) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

export default Pages;
