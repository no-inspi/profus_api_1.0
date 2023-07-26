SELECT
  item_set_effect.item_set_id,
  item_set_effect.item_count,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 210) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS res_per_earth,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 211) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS res_per_water,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 212) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS res_per_air,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 213) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS res_per_fire,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 214) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS res_per_neutral,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 240) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS res_earth,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 241) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS res_water,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 242) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS res_air,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 243) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS res_fire,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 244) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS res_neutral,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 420) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS res_crit,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 416) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS res_pou,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 111) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS "PA",
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 128) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS "PM",
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 117) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS "PO",
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 182) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS "Invo",
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 220) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS do_ren,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 115) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS crit,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 752) THEN (item_set_effect.max) :: numeric
      WHEN (item_set_effect.effect_id = 119) THEN ((item_set_effect.max) :: numeric * 0.1)
      ELSE NULL :: numeric
    END
  ) AS fui,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 753) THEN (item_set_effect.max) :: numeric
      WHEN (item_set_effect.effect_id = 119) THEN ((item_set_effect.max) :: numeric * 0.1)
      ELSE NULL :: numeric
    END
  ) AS tac,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 412) THEN (item_set_effect.max) :: numeric
      WHEN (item_set_effect.effect_id = 124) THEN ((item_set_effect.max) :: numeric * 0.1)
      ELSE NULL :: numeric
    END
  ) AS ret_pm,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 410) THEN (item_set_effect.max) :: numeric
      WHEN (item_set_effect.effect_id = 124) THEN ((item_set_effect.max) :: numeric * 0.1)
      ELSE NULL :: numeric
    END
  ) AS ret_pa,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 161) THEN (item_set_effect.max) :: numeric
      WHEN (item_set_effect.effect_id = 124) THEN ((item_set_effect.max) :: numeric * 0.1)
      ELSE NULL :: numeric
    END
  ) AS esq_pm,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 160) THEN (item_set_effect.max) :: numeric
      WHEN (item_set_effect.effect_id = 124) THEN ((item_set_effect.max) :: numeric * 0.1)
      ELSE NULL :: numeric
    END
  ) AS esq_pa,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 176) THEN (item_set_effect.max) :: numeric
      WHEN (item_set_effect.effect_id = 123) THEN ((item_set_effect.max) :: numeric * 0.1)
      ELSE NULL :: numeric
    END
  ) AS pp,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 124) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS sasa,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 125) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS vita,
  sum(
    CASE
      WHEN (
        item_set_effect.effect_id = ANY (ARRAY [174, 118, 126, 119, 123])
      ) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS ini,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 118) THEN (item_set_effect.max * 5)
      WHEN (item_set_effect.effect_id = 158) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS pods,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 138) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS pwr_all,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 122) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS add_all,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 430) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS add_neutral,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 118) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS pwr_earth,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 422) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS add_earth,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 126) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS pwr_fire,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 424) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS add_fire,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 119) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS pwr_air,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 428) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS add_air,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 123) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS pwr_water,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 428) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS add_water,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 178) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS add_heal,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 226) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS pwr_pi,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 225) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS add_pi,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 418) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS add_crit,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 414) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS add_pou,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 2812) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS dmg_spell,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 2808) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS dmg_weapon,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 2804) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS dmg_range,
  sum(
    CASE
      WHEN (item_set_effect.effect_id = 2800) THEN item_set_effect.max
      ELSE NULL :: integer
    END
  ) AS dmg_melee
FROM
  item_set_effect
GROUP BY
  item_set_effect.item_set_id,
  item_set_effect.item_count
ORDER BY
  item_set_effect.item_set_id,
  item_set_effect.item_count;