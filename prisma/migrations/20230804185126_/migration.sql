-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `pseudo` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_pseudo_key`(`pseudo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RefreshToken` (
    `id` VARCHAR(191) NOT NULL,
    `hashedToken` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `revoked` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `RefreshToken_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `class` (
    `id` INTEGER NOT NULL,
    `name_en` VARCHAR(12) NULL,
    `name_es` VARCHAR(10) NULL,
    `name_fr` VARCHAR(10) NULL,
    `name_de` VARCHAR(15) NULL,
    `name_pt` VARCHAR(10) NULL,
    `name_it` VARCHAR(11) NULL,
    `male_look` VARCHAR(13) NULL,
    `female_look` VARCHAR(13) NULL,
    `male_colors` VARCHAR(45) NULL,
    `female_colors` VARCHAR(46) NULL,

    UNIQUE INDEX `class_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `class_spell` (
    `class_id` INTEGER NULL,
    `spell_id` INTEGER NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dungeon` (
    `id` INTEGER NOT NULL,
    `name_en` VARCHAR(32) NULL,
    `name_es` VARCHAR(36) NULL,
    `name_fr` VARCHAR(33) NULL,
    `name_de` VARCHAR(42) NULL,
    `name_pt` VARCHAR(54) NULL,
    `name_it` VARCHAR(36) NULL,
    `level` INTEGER NULL,

    UNIQUE INDEX `dungeon_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item` (
    `id` INTEGER NOT NULL,
    `name_en` VARCHAR(67) NULL,
    `name_es` VARCHAR(65) NULL,
    `name_fr` VARCHAR(69) NULL,
    `name_de` VARCHAR(71) NULL,
    `name_pt` VARCHAR(63) NULL,
    `name_it` VARCHAR(69) NULL,
    `type_id` INTEGER NOT NULL,
    `desc_en` VARCHAR(1550) NULL,
    `desc_es` VARCHAR(1649) NULL,
    `desc_fr` VARCHAR(1680) NULL,
    `desc_de` VARCHAR(1563) NULL,
    `desc_pt` VARCHAR(1555) NULL,
    `desc_it` VARCHAR(1080) NULL,
    `icon_id` INTEGER NULL,
    `level` INTEGER NULL,
    `pods` INTEGER NULL,
    `price` INTEGER NULL,
    `item_set_id` INTEGER NULL,
    `criteria` VARCHAR(143) NULL,
    `pet_food_xp` INTEGER NULL,
    `nuggets` INTEGER NULL,

    UNIQUE INDEX `item_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_effect` (
    `item_id` INTEGER NOT NULL,
    `effect_id` INTEGER NULL,
    `min` INTEGER NULL,
    `max` INTEGER NULL,
    `value` INTEGER NULL,
    `desc_fr` VARCHAR(72) NULL,
    `desc_en` VARCHAR(70) NULL,
    `desc_es` VARCHAR(87) NULL,
    `desc_pt` VARCHAR(71) NULL,
    `desc_de` VARCHAR(91) NULL,
    `desc_it` VARCHAR(74) NULL,
    `category` INTEGER NULL,
    `boost` VARCHAR(1) NULL,
    `power` DECIMAL(12, 9) NULL,
    `element_id` INTEGER NULL,
    `element_name` VARCHAR(7) NULL,
    `rune_item_id` VARCHAR(5) NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_set` (
    `id` INTEGER NOT NULL,
    `name_en` VARCHAR(29) NULL,
    `name_es` VARCHAR(39) NULL,
    `name_fr` VARCHAR(33) NULL,
    `name_de` VARCHAR(34) NULL,
    `name_pt` VARCHAR(32) NULL,
    `name_it` VARCHAR(34) NULL,

    UNIQUE INDEX `item_set_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_set_damage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_set_id` INTEGER NULL,
    `item_count` INTEGER NULL,
    `res_per_earth` VARCHAR(2) NULL,
    `res_per_water` VARCHAR(2) NULL,
    `res_per_air` VARCHAR(2) NULL,
    `res_per_fire` VARCHAR(2) NULL,
    `res_per_neutral` VARCHAR(2) NULL,
    `res_earth` VARCHAR(3) NULL,
    `res_water` VARCHAR(3) NULL,
    `res_air` VARCHAR(3) NULL,
    `res_fire` VARCHAR(3) NULL,
    `res_neutral` VARCHAR(3) NULL,
    `res_crit` VARCHAR(2) NULL,
    `res_pou` VARCHAR(2) NULL,
    `PA` VARCHAR(1) NULL,
    `PM` VARCHAR(1) NULL,
    `PO` VARCHAR(1) NULL,
    `Invo` VARCHAR(1) NULL,
    `do_ren` VARCHAR(1) NULL,
    `crit` VARCHAR(2) NULL,
    `fui` VARCHAR(3) NULL,
    `tac` VARCHAR(3) NULL,
    `ret_pm` VARCHAR(3) NULL,
    `ret_pa` VARCHAR(3) NULL,
    `esq_pm` VARCHAR(3) NULL,
    `esq_pa` VARCHAR(3) NULL,
    `pp` VARCHAR(3) NULL,
    `sasa` VARCHAR(3) NULL,
    `vita` VARCHAR(4) NULL,
    `ini` VARCHAR(4) NULL,
    `pods` VARCHAR(4) NULL,
    `pwr_all` VARCHAR(3) NULL,
    `add_all` VARCHAR(10) NULL,
    `add_neutral` VARCHAR(2) NULL,
    `pwr_earth` VARCHAR(3) NULL,
    `add_earth` VARCHAR(2) NULL,
    `pwr_fire` VARCHAR(3) NULL,
    `add_fire` VARCHAR(2) NULL,
    `pwr_air` VARCHAR(3) NULL,
    `add_air` VARCHAR(2) NULL,
    `pwr_water` VARCHAR(3) NULL,
    `add_water` VARCHAR(2) NULL,
    `add_heal` VARCHAR(2) NULL,
    `pwr_pi` VARCHAR(2) NULL,
    `add_pi` VARCHAR(2) NULL,
    `add_crit` VARCHAR(2) NULL,
    `add_pou` VARCHAR(2) NULL,
    `dmg_spell` VARCHAR(10) NULL,
    `dmg_weapon` VARCHAR(10) NULL,
    `dmg_range` VARCHAR(10) NULL,
    `dmg_melee` VARCHAR(10) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_set_effect` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_set_id` INTEGER NULL,
    `item_count` INTEGER NULL,
    `max` INTEGER NULL,
    `effect_id` INTEGER NULL,
    `desc_fr` VARCHAR(26) NULL,
    `desc_en` VARCHAR(24) NULL,
    `desc_es` VARCHAR(36) NULL,
    `desc_pt` VARCHAR(31) NULL,
    `desc_de` VARCHAR(40) NULL,
    `desc_it` VARCHAR(36) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_type` (
    `id` INTEGER NOT NULL,
    `name_en` VARCHAR(42) NULL,
    `name_es` VARCHAR(36) NULL,
    `name_fr` VARCHAR(36) NULL,
    `name_de` VARCHAR(32) NULL,
    `name_pt` VARCHAR(33) NULL,
    `name_it` VARCHAR(32) NULL,
    `super_type` INTEGER NULL,
    `category` INTEGER NULL,

    UNIQUE INDEX `item_type_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job` (
    `id` INTEGER NOT NULL,
    `name_en` VARCHAR(12) NULL,
    `name_es` VARCHAR(12) NULL,
    `name_fr` VARCHAR(11) NULL,
    `name_de` VARCHAR(17) NULL,
    `name_pt` VARCHAR(11) NULL,
    `name_it` VARCHAR(12) NULL,
    `icon_id` INTEGER NULL,

    UNIQUE INDEX `job_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_action` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_id` INTEGER NULL,
    `is_craft` VARCHAR(1) NULL,
    `level` INTEGER NULL,
    `ingredientIds` VARCHAR(49) NULL,
    `quantities` VARCHAR(30) NULL,
    `xp` INTEGER NULL,
    `job_id` INTEGER NULL,
    `name_en` VARCHAR(45) NULL,
    `name_es` VARCHAR(54) NULL,
    `name_fr` VARCHAR(57) NULL,
    `name_de` VARCHAR(61) NULL,
    `name_pt` VARCHAR(52) NULL,
    `name_it` VARCHAR(55) NULL,
    `icon_id` VARCHAR(6) NULL,
    `price` VARCHAR(5) NULL,
    `skill_name_en` VARCHAR(25) NULL,
    `skill_name_es` VARCHAR(32) NULL,
    `skill_name_fr` VARCHAR(36) NULL,
    `skill_name_de` VARCHAR(33) NULL,
    `skill_name_pt` VARCHAR(30) NULL,
    `skill_name_it` VARCHAR(39) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_craft_ingredient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_id` INTEGER NULL,
    `ingredient_id` INTEGER NULL,
    `quantity` INTEGER NULL,
    `name_en` VARCHAR(40) NULL,
    `name_es` VARCHAR(54) NULL,
    `name_fr` VARCHAR(57) NULL,
    `name_de` VARCHAR(62) NULL,
    `name_pt` VARCHAR(52) NULL,
    `name_it` VARCHAR(57) NULL,
    `icon_id` VARCHAR(6) NULL,
    `type_id` VARCHAR(3) NULL,
    `pods` VARCHAR(3) NULL,
    `level` VARCHAR(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `runes_prices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DOUBLE NOT NULL,
    `item_id` INTEGER NOT NULL,
    `server_id` INTEGER NOT NULL,
    `user_id` INTEGER NULL,
    `saved_date` DATE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `weapon` (
    `id` INTEGER NOT NULL,
    `criticalHitBonus` INTEGER NULL,
    `min_range` INTEGER NULL,
    `criticalHitProbability` INTEGER NULL,
    `range` INTEGER NULL,
    `ap_cost` INTEGER NULL,
    `maxCastPerTurn` INTEGER NULL,

    UNIQUE INDEX `weapon_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TauxItemBrisage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_item` INTEGER NOT NULL,
    `taux` INTEGER NOT NULL,
    `id_server` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `TauxItemBrisage_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Price` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_item` INTEGER NOT NULL,
    `price_t` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Price_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RefreshToken` ADD CONSTRAINT `RefreshToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `item_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `item_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_effect` ADD CONSTRAINT `item_effect_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `runes_prices` ADD CONSTRAINT `runes_prices_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TauxItemBrisage` ADD CONSTRAINT `TauxItemBrisage_id_item_fkey` FOREIGN KEY (`id_item`) REFERENCES `item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Price` ADD CONSTRAINT `Price_id_item_fkey` FOREIGN KEY (`id_item`) REFERENCES `item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
