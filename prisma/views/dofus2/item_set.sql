SELECT
  itemset.id,
  itemset."nameId_EN" AS name_en,
  itemset."nameId_ES" AS name_es,
  itemset."nameId_FR" AS name_fr,
  itemset."nameId_DE" AS name_de,
  itemset."nameId_PT" AS name_pt,
  itemset."nameId_IT" AS name_it
FROM
  dofus2_raw.itemset;