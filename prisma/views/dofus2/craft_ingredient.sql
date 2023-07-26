SELECT
  recipe.d2o_index AS item_id,
  unnest(recipe."ingredientIds") AS ingredient_id,
  unnest(recipe.quantities) AS quantity
FROM
  dofus2_raw.recipe;