import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { virtualize, bindKeyboard } from "react-swipeable-views-utils";
import RecipePage from "../RecipePage/RecipePage";
import Paginator from "../Paginator/Paginator";
import { useParams, useHistory, useLocation } from "react-router-dom";
import PageEmptyState from "../PageEmptyState/PageEmptyState";
import SettingsMenu from "../SettingsMenu/SettingsMenu";
import RoundButton from "../Button/RoundButton";

const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

const Pages = ({ recipes, setRecipeId, goToEditPage }) => {
  const [index, setIndex] = useState(0);

  const bookLength = recipes.length;
  const handleChangeIndex = (index) => {
    setIndex(index);
    setRecipeId(recipes[index]);
  };

  const slideRenderer = (params) => {
    const { index, key } = params;
    return <RecipePage key={key} recipeId={recipes[index]} />;
  };
  const nextPage = () => index < bookLength - 1 && setIndex(index + 1);
  const prevPage = () => index > 0 && setIndex(index - 1);

  return (
    <div>
      {bookLength > 0 ? (
        <>
          <SettingsMenu
            editPage={goToEditPage}
            url={`${recipes[index]}`}
            savedCount={null}
            prevUpdate={null}
          />
          <VirtualizeSwipeableViews
            index={index}
            onChangeIndex={handleChangeIndex}
            slideRenderer={slideRenderer}
            slideCount={bookLength}
          />
          <Paginator
            nextPage={nextPage}
            bookLength={bookLength}
            prevPage={prevPage}
            currentPage={index}
          />
        </>
      ) : (
        <PageEmptyState />
      )}
    </div>
  );
};

Pages.defaultProps = {
  bookLength: 20,
};

export default Pages;
