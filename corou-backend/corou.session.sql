ALTER TABLE `routine_detail`
ADD COLUMN `description` VARCHAR(255) NOT NULL;

SELECT * FROM routine;
DELETE FROM routine WHERE routine_key = 1;

drop database corou;
create database corou;
use corou;

SELECT SUM(item_price) as total_price
FROM routine_detail as rd
INNER JOIN item as i ON rd.item_key = i.item_key
WHERE rd.routine_key = 1;


