SELECT
  item_effect.item_id,
  sum(
    CASE
      WHEN (item_effect.effect_id = ANY (ARRAY [95, 100])) THEN item_effect.min
      ELSE NULL :: integer
    END
  ) AS min_dmg_neutral,
  sum(
    CASE
      WHEN (item_effect.effect_id = ANY (ARRAY [95, 100])) THEN item_effect.max
      ELSE NULL :: integer
    END
  ) AS max_dmg_neutral,
  count(
    CASE
      WHEN (item_effect.effect_id = ANY (ARRAY [95, 100])) THEN item_effect.max
      ELSE NULL :: integer
    END
  ) AS line_neutral,
  sum(
    CASE
      WHEN (item_effect.effect_id = ANY (ARRAY [92, 97])) THEN item_effect.min
      ELSE NULL :: integer
    END
  ) AS min_dmg_earth,
  sum(
    CASE
      WHEN (item_effect.effect_id = ANY (ARRAY [92, 97])) THEN item_effect.max
      ELSE NULL :: integer
    END
  ) AS max_dmg_earth,
  count(
    CASE
      WHEN (item_effect.effect_id = ANY (ARRAY [92, 97])) THEN item_effect.max
      ELSE NULL :: integer
    END
  ) AS line_earth,
  sum(
    CASE
      WHEN (item_effect.effect_id = ANY (ARRAY [94, 99])) THEN item_effect.min
      ELSE NULL :: integer
    END
  ) AS min_dmg_fire,
  sum(
    CASE
      WHEN (item_effect.effect_id = ANY (ARRAY [94, 99])) THEN item_effect.max
      ELSE NULL :: integer
    END
  ) AS max_dmg_fire,
  count(
    CASE
      WHEN (item_effect.effect_id = ANY (ARRAY [94, 99])) THEN item_effect.max
      ELSE NULL :: integer
    END
  ) AS line_fire,
  sum(
    CASE
      WHEN (item_effect.effect_id = ANY (ARRAY [91, 96])) THEN item_effect.min
      ELSE NULL :: integer
    END
  ) AS min_dmg_water,
  sum(
    CASE
      WHEN (item_effect.effect_id = ANY (ARRAY [91, 96])) THEN item_effect.max
      ELSE NULL :: integer
    END
  ) AS max_dmg_water,
  count(
    CASE
      WHEN (item_effect.effect_id = ANY (ARRAY [91, 96])) THEN item_effect.max
      ELSE NULL :: integer
    END
  ) AS line_water,
  sum(
    CASE
      WHEN (item_effect.effect_id = ANY (ARRAY [93, 98])) THEN item_effect.min
      ELSE NULL :: integer
    END
  ) AS min_dmg_air,
  sum(
    CASE
      WHEN (item_effect.effect_id = ANY (ARRAY [93, 98])) THEN item_effect.max
      ELSE NULL :: integer
    END
  ) AS max_dmg_air,
  count(
    CASE
      WHEN (item_effect.effect_id = ANY (ARRAY [93, 98])) THEN item_effect.max
      ELSE NULL :: integer
    END
  ) AS line_air
FROM
  item_effect
WHERE
  (
    item_effect.item_id IN (
      SELECT
        weapon.id
      FROM
        weapon
    )
  )
GROUP BY
  item_effect.item_id;