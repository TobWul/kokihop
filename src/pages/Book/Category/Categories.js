import React, { useContext } from "react";
import CategoryLabel from "./CategoryLabel";
import styles from "./Category.module.scss";
import { RecipeContext } from "../../../context/recipeContext";

const Categories = () => {
  const {
    book: { categories },
    setCategoryId,
    categoryId,
  } = useContext(RecipeContext);
  const index = { id: "index" };
  return (
    <div className={styles.wrapper}>
      <CategoryLabel
        id={index.id}
        name="Indeks"
        active={categoryId === index.id}
        changeCategory={() => setCategoryId(index.id)}
      />
      {categories &&
        categories.map((category) => (
          <CategoryLabel
            key={`category-${category.id}`}
            name={category.name}
            active={categoryId === category.id}
            changeCategory={() => setCategoryId(category.id)}
          />
        ))}
    </div>
  );
};

export default Categories;
