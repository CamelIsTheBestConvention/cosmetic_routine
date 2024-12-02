ALTER TABLE `routine_detail`
ADD COLUMN `description` VARCHAR(255) NOT NULL;

SELECT * FROM routine;
DELETE FROM routine WHERE routine_key = 1;

drop database corou;
create database corou;
use corou;

SHOW CREATE TABLE routine_skin_relation;

{
  "Table": "routine_skin_relation",
  "Create Table": "CREATE TABLE `routine_skin_relation` (\n  `routine_key` int NOT NULL,\n  `attr_key` int NOT NULL,\n  PRIMARY KEY (`routine_key`,`attr_key`),\n  KEY `FK_a2fe43b3eaf04d9bc133539657a` (`attr_key`),\n  CONSTRAINT `FK_09305d32140735656ded7098f98` FOREIGN KEY (`routine_key`) REFERENCES `routine` (`routine_key`),\n  CONSTRAINT `FK_a2fe43b3eaf04d9bc133539657a` FOREIGN KEY (`attr_key`) REFERENCES `skin_attribute` (`attr_key`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci"
}

SELECT SUM(item_price) as total_price
FROM routine_detail as rd
INNER JOIN item as i ON rd.item_key = i.item_key
WHERE rd.routine_key = 1;


