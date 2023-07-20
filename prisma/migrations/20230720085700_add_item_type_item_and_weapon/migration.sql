-- CreateTable
CREATE TABLE `Item_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_en` VARCHAR(191) NOT NULL,
    `name_es` VARCHAR(191) NOT NULL,
    `name_fr` VARCHAR(191) NOT NULL,
    `name_de` VARCHAR(191) NOT NULL,
    `name_pt` VARCHAR(191) NOT NULL,
    `name_it` VARCHAR(191) NOT NULL,
    `super_type` INTEGER NOT NULL,
    `category` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_en` VARCHAR(191) NOT NULL,
    `name_es` VARCHAR(191) NOT NULL,
    `name_fr` VARCHAR(191) NOT NULL,
    `name_de` VARCHAR(191) NOT NULL,
    `name_pt` VARCHAR(191) NOT NULL,
    `name_it` VARCHAR(191) NOT NULL,
    `type_id` INTEGER NOT NULL,
    `desc_en` VARCHAR(191) NOT NULL,
    `desc_es` VARCHAR(191) NOT NULL,
    `desc_fr` VARCHAR(191) NOT NULL,
    `desc_de` VARCHAR(191) NOT NULL,
    `desc_pt` VARCHAR(191) NOT NULL,
    `desc_it` VARCHAR(191) NOT NULL,
    `icon_id` INTEGER NOT NULL,
    `level` INTEGER NOT NULL,
    `pods` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `item_set_id` DOUBLE NOT NULL,
    `criteria` VARCHAR(191) NOT NULL,
    `pet_food_xp` INTEGER NOT NULL,
    `nuggets` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Weapon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_id` INTEGER NOT NULL,
    `criticalHitBonus` INTEGER NOT NULL,
    `min_range` INTEGER NOT NULL,
    `criticalHitProbability` INTEGER NOT NULL,
    `range` INTEGER NOT NULL,
    `ap_cost` INTEGER NOT NULL,
    `maxCastPerTurn` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
