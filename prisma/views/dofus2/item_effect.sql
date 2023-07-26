WITH elements(id, element_name) AS (
  VALUES
    ('-1' :: integer, NULL :: text),
    (0, 'neutral' :: text),
    (1, 'earth' :: text),
    (2, 'fire' :: text),
    (3, 'water' :: text),
    (4, 'air' :: text)
)
SELECT
  ieff.d2o_index AS item_id,
  eff2.id AS effect_id,
  CASE
    WHEN (eff.operator = '+' :: text) THEN ieff."diceNum"
    WHEN (eff.operator = '-' :: text) THEN (
      GREATEST(ieff."diceNum", ieff."diceSide") * '-1' :: integer
    )
    WHEN (eff.operator IS NULL) THEN ieff."diceNum"
    ELSE 0
  END AS min,
  CASE
    WHEN (eff.operator = '+' :: text) THEN GREATEST(ieff."diceNum", ieff."diceSide")
    WHEN (eff.operator = '-' :: text) THEN (ieff."diceNum" * '-1' :: integer)
    WHEN (eff.operator IS NULL) THEN ieff."diceSide"
    ELSE 0
  END AS max,
  ieff.value,
  get_desc(eff2."descriptionId_FR") AS desc_fr,
  get_desc(eff2."descriptionId_EN") AS desc_en,
  get_desc(eff2."descriptionId_ES") AS desc_es,
  get_desc(eff2."descriptionId_PT") AS desc_pt,
  get_desc(eff2."descriptionId_DE") AS desc_de,
  get_desc(eff2."descriptionId_IT") AS desc_it,
  eff2.category,
  eff2.boost,
  eff2."effectPowerRate" AS power,
  eff2."elementId" AS element_id,
  elements.element_name
FROM
  (
    (
      (
        (
          SELECT
            item_effectinstancedice.iter_id,
            item_effectinstancedice.d2o_index,
            item_effectinstancedice."targetMask",
            item_effectinstancedice."diceNum",
            item_effectinstancedice."visibleInBuffUi",
            item_effectinstancedice."baseEffectId",
            item_effectinstancedice."visibleInFightLog",
            item_effectinstancedice."targetId",
            item_effectinstancedice."effectElement",
            item_effectinstancedice."effectUid",
            item_effectinstancedice.dispellable,
            item_effectinstancedice.triggers,
            item_effectinstancedice."spellId",
            item_effectinstancedice.duration,
            item_effectinstancedice.random,
            item_effectinstancedice."effectId",
            item_effectinstancedice.delay,
            item_effectinstancedice."diceSide",
            item_effectinstancedice."visibleOnTerrain",
            item_effectinstancedice."visibleInTooltip",
            item_effectinstancedice."rawZone",
            item_effectinstancedice."forClientOnly",
            item_effectinstancedice.value,
            item_effectinstancedice."order",
            item_effectinstancedice."group"
          FROM
            dofus2_raw.item_effectinstancedice
          UNION
          SELECT
            weapon_effectinstancedice.iter_id,
            weapon_effectinstancedice.d2o_index,
            weapon_effectinstancedice."targetMask",
            weapon_effectinstancedice."diceNum",
            weapon_effectinstancedice."visibleInBuffUi",
            weapon_effectinstancedice."baseEffectId",
            weapon_effectinstancedice."visibleInFightLog",
            weapon_effectinstancedice."targetId",
            weapon_effectinstancedice."effectElement",
            weapon_effectinstancedice."effectUid",
            weapon_effectinstancedice.dispellable,
            weapon_effectinstancedice.triggers,
            weapon_effectinstancedice."spellId",
            weapon_effectinstancedice.duration,
            weapon_effectinstancedice.random,
            weapon_effectinstancedice."effectId",
            weapon_effectinstancedice.delay,
            weapon_effectinstancedice."diceSide",
            weapon_effectinstancedice."visibleOnTerrain",
            weapon_effectinstancedice."visibleInTooltip",
            weapon_effectinstancedice."rawZone",
            weapon_effectinstancedice."forClientOnly",
            weapon_effectinstancedice.value,
            weapon_effectinstancedice."order",
            weapon_effectinstancedice."group"
          FROM
            dofus2_raw.weapon_effectinstancedice
        ) ieff
        LEFT JOIN (
          SELECT
            effect.id,
            effect.operator,
            CASE
              WHEN (effect.operator = '-' :: text) THEN CASE
                WHEN (effect."oppositeId" > 0) THEN effect."oppositeId"
                ELSE effect.id
              END
              ELSE effect.id
            END AS effect_id
          FROM
            dofus2_raw.effect
        ) eff ON ((ieff."effectId" = eff.id))
      )
      LEFT JOIN (
        SELECT
          effect.d2o_index,
          effect.id,
          effect."descriptionId_EN",
          effect."descriptionId_ES",
          effect."descriptionId_FR",
          effect."descriptionId_DE",
          effect."descriptionId_PT",
          effect."descriptionId_IT",
          effect."iconId",
          effect.characteristic,
          effect.category,
          effect.operator,
          effect."showInTooltip",
          effect."useDice",
          effect."forceMinMax",
          effect.boost,
          effect.active,
          effect."oppositeId",
          effect."theoreticalDescriptionId_EN",
          effect."theoreticalDescriptionId_ES",
          effect."theoreticalDescriptionId_FR",
          effect."theoreticalDescriptionId_DE",
          effect."theoreticalDescriptionId_PT",
          effect."theoreticalDescriptionId_IT",
          effect."theoreticalPattern",
          effect."showInSet",
          effect."bonusType",
          effect."useInFight",
          effect."effectPriority",
          effect."effectPowerRate",
          effect."elementId"
        FROM
          dofus2_raw.effect
      ) eff2 ON ((eff.effect_id = eff2.id))
    )
    LEFT JOIN elements ON ((eff2."elementId" = elements.id))
  )
ORDER BY
  ieff.d2o_index,
  ieff.iter_id;