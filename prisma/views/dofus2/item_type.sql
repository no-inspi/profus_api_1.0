SELECT
  itemtype.id,
  itemtype."nameId_EN" AS name_en,
  itemtype."nameId_ES" AS name_es,
  itemtype."nameId_FR" AS name_fr,
  itemtype."nameId_DE" AS name_de,
  itemtype."nameId_PT" AS name_pt,
  itemtype."nameId_IT" AS name_it,
  itemtype."superTypeId" AS super_type,
  itemtype."categoryId" AS category
FROM
  dofus2_raw.itemtype
ORDER BY
  itemtype.id;