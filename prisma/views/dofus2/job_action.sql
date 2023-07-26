SELECT
  recipe."resultId" AS item_id,
  TRUE AS is_craft,
  recipe."resultLevel" AS LEVEL,
  recipe."ingredientIds",
  recipe.quantities,
  floor(
    (
      (
        CASE
          WHEN (item."craftXpRatio" > '-1' :: integer) THEN ((item."craftXpRatio") :: numeric * 0.01)
          WHEN (itype."craftXpRatio" > '-1' :: integer) THEN ((itype."craftXpRatio") :: numeric * 0.01)
          ELSE (1) :: numeric
        END * (20) :: numeric
      ) * (recipe."resultLevel") :: numeric
    )
  ) AS xp,
  recipe."jobId" AS job_id,
  recipe."resultNameId_EN" AS name_en,
  recipe."resultNameId_ES" AS name_es,
  recipe."resultNameId_FR" AS name_fr,
  recipe."resultNameId_DE" AS name_de,
  recipe."resultNameId_PT" AS name_pt,
  recipe."resultNameId_IT" AS name_it,
  item."iconId" AS icon_id,
  item.price,
  skill."nameId_EN" AS skill_name_en,
  skill."nameId_ES" AS skill_name_es,
  skill."nameId_FR" AS skill_name_fr,
  skill."nameId_DE" AS skill_name_de,
  skill."nameId_PT" AS skill_name_pt,
  skill."nameId_IT" AS skill_name_it
FROM
  (
    (
      (
        dofus2_raw.recipe recipe
        LEFT JOIN dofus2_raw.item item ON ((recipe."resultId" = item.id))
      )
      LEFT JOIN dofus2_raw.itemtype itype ON ((item."typeId" = itype.id))
    )
    LEFT JOIN dofus2_raw.skill skill ON ((recipe."skillId" = skill.id))
  )
WHERE
  (recipe."jobId" > 1)
UNION
SELECT
  skill."gatheredRessourceItem" AS item_id,
  false AS is_craft,
  skill."levelMin" AS LEVEL,
  ARRAY [] :: integer [] AS "ingredientIds",
  ARRAY [] :: integer [] AS quantities,
  floor(
    (
      (10) :: numeric + ((skill."levelMin") :: numeric * 0.2)
    )
  ) AS xp,
  skill."parentJobId" AS job_id,
  item."nameId_EN" AS name_en,
  item."nameId_ES" AS name_es,
  item."nameId_FR" AS name_fr,
  item."nameId_DE" AS name_de,
  item."nameId_PT" AS name_pt,
  item."nameId_IT" AS name_it,
  item."iconId" AS icon_id,
  item.price,
  skill."nameId_EN" AS skill_name_en,
  skill."nameId_ES" AS skill_name_es,
  skill."nameId_FR" AS skill_name_fr,
  skill."nameId_DE" AS skill_name_de,
  skill."nameId_PT" AS skill_name_pt,
  skill."nameId_IT" AS skill_name_it
FROM
  (
    (
      dofus2_raw.skill skill
      LEFT JOIN dofus2_raw.item item ON ((skill."gatheredRessourceItem" = item.id))
    )
    LEFT JOIN dofus2_raw.itemtype itype ON ((item."typeId" = itype.id))
  )
WHERE
  (
    (skill."parentJobId" > 1)
    AND (skill."gatheredRessourceItem" > 0)
  )
ORDER BY
  7,
  3;