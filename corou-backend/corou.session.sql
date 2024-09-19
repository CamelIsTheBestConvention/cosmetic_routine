ALTER TABLE `routine_detail`
ADD COLUMN `description` VARCHAR(255) NOT NULL;

SELECT * FROM routine;
DELETE FROM routine WHERE routine_key = 1;

drop database corou;
create database corou;
use corou;
