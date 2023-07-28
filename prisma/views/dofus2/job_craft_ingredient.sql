SELECT
  r.item_id,
  r.ingredient_id,
  r.quantity,
  i."nameId_EN" AS name_en,
  i."nameId_ES" AS name_es,
  i."nameId_FR" AS name_fr,
  i."nameId_DE" AS name_de,
  i."nameId_PT" AS name_pt,
  i."nameId_IT" AS name_it,
  i."iconId" AS icon_id,
  i."typeId" AS type_id,
  i."realWeight" AS pods,
  i.level
FROM
  (
    (
      SELECT
        recipe.d2o_index AS item_id,
        unnest(recipe."ingredientIds") AS ingredient_id,
        unnest(recipe.quantities) AS quantity
      FROM
        dofus2_raw.recipe
    ) r
    LEFT JOIN dofus2_raw.item i ON ((i.d2o_index = r.ingredient_id))
  );