import React, { useContext, useEffect } from "react";
import SwipeableViews from "react-swipeable-views";
import { virtualize, bindKeyboard } from "react-swipeable-views-utils";
import RecipePage from "../RecipePage/RecipePage";
import Paginator from "../Paginator/Paginator";
import PageEmptyState from "../PageEmptyState/PageEmptyState";
import SettingsMenu from "../SettingsMenu/SettingsMenu";
import { RecipeContext } from "../../context/RecipeContext";

const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

const Pages = () => {
  const {
    recipeIdList,
    currentPage,
    setCurrentPage,
    setRecipeId,
    recipeId,
  } = useContext(RecipeContext);
  const bookLength = recipeIdList.length;
  if (currentPage >= bookLength) setCurrentPage(0);
  const handleChangeIndex = (index) => {
    setCurrentPage(index);
    setRecipeId(recipeIdList[index]);
  };

  const slideRenderer = (params) => {
    const { index, key } = params;
    return <RecipePage key={key} recipeId={recipeIdList[index]} />;
  };

  const nextPage = () =>
    currentPage < bookLength - 1 && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 0 && setCurrentPage(currentPage - 1);

  return (
    <div>
      {bookLength > 0 ? (
        <>
          <SettingsMenu savedCount={null} prevUpdate={null} />
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

export default Pages;
