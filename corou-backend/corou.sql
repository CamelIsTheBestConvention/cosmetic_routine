ALTER TABLE address
ADD COLUMN user_key INT;

INSERT INTO item (item_name, item_price, description, category)
VALUES 
( 'testItem1', 1000, '테스트 아이템입니다.', '지성'),
( 'testItem2', 10000, '테스트 아이템입니다.', '건성'),
( 'testItem3', 20000, '테스트 아이템입니다.', '지성');

drop database corou;
create database corou;
