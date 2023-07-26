SELECT
  is_eff.d2o_index AS item_set_id,
  (is_eff.iter_id + 1) AS item_count,
  is_eff."diceNum" AS max,
  is_eff."effectId" AS effect_id,
  get_desc(eff."descriptionId_FR") AS desc_fr,
  get_desc(eff."descriptionId_EN") AS desc_en,
  get_desc(eff."descriptionId_ES") AS desc_es,
  get_desc(eff."descriptionId_PT") AS desc_pt,
  get_desc(eff."descriptionId_DE") AS desc_de,
  get_desc(eff."descriptionId_IT") AS desc_it
FROM
  (
    dofus2_raw.itemset_effectinstancedice is_eff
    LEFT JOIN dofus2_raw.effect eff ON ((is_eff."effectId" = eff.id))
  )
ORDER BY
  is_eff.d2o_index,
  is_eff.iter_id;