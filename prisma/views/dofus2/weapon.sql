SELECT
  weapon.id,
  weapon."criticalHitBonus",
  weapon."minRange" AS min_range,
  weapon."criticalHitProbability",
  weapon.range,
  weapon."apCost" AS ap_cost,
  weapon."maxCastPerTurn"
FROM
  dofus2_raw.weapon
ORDER BY
  weapon.id;