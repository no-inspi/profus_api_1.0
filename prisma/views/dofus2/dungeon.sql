SELECT
  dungeon.id,
  dungeon."nameId_EN" AS name_en,
  dungeon."nameId_ES" AS name_es,
  dungeon."nameId_FR" AS name_fr,
  dungeon."nameId_DE" AS name_de,
  dungeon."nameId_PT" AS name_pt,
  dungeon."nameId_IT" AS name_it,
  dungeon."optimalPlayerLevel" AS LEVEL
FROM
  dofus2_raw.dungeon
ORDER BY
  dungeon."optimalPlayerLevel" DESC;