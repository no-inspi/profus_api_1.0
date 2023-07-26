SELECT
  job.id,
  job."nameId_EN" AS name_en,
  job."nameId_ES" AS name_es,
  job."nameId_FR" AS name_fr,
  job."nameId_DE" AS name_de,
  job."nameId_PT" AS name_pt,
  job."nameId_IT" AS name_it,
  job."iconId" AS icon_id
FROM
  dofus2_raw.job
WHERE
  (job.id > 1)
ORDER BY
  job.id;