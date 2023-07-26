SELECT
  breed.id,
  breed."shortNameId_EN" AS name_en,
  breed."shortNameId_ES" AS name_es,
  breed."shortNameId_FR" AS name_fr,
  breed."shortNameId_DE" AS name_de,
  breed."shortNameId_PT" AS name_pt,
  breed."shortNameId_IT" AS name_it,
  breed."maleLook" AS male_look,
  breed."femaleLook" AS female_look,
  breed."maleColors" AS male_colors,
  breed."femaleColors" AS female_colors
FROM
  dofus2_raw.breed
ORDER BY
  breed.id;