SELECT
  breed.id AS class_id,
  unnest(breed."breedSpellsId") AS spell_id
FROM
  dofus2_raw.breed
ORDER BY
  breed.id;