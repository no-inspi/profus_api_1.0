-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `Item_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Weapon` ADD CONSTRAINT `Weapon_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
