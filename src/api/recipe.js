import { api } from "./api";

export function deleteRecipe(recipeId, categoryId) {
  api(`/recipes/${recipeId}`, "DELETE", {
    categoryId,
  });
}

export function createRecipe(categoryId, blocks) {
  api(`/recipes/add`, "POST", {
    categoryId,
    blocks,
  });
}

export function updateRecipe(recipeId, blocks) {
  api(`/recipes/${recipeId}`, "PUT", { blocks });
}
