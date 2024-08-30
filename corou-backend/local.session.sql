CREATE TABLE item (
	`item_key`	INT AUTO_INCREMENT PRIMARY KEY,
	`item_name`	VARCHAR(255)	NOT NULL,
	`price`	INT NOT NULL,
	`category`	VARCHAR(255)
);

ALTER TABLE order_detail 

add constraint fk2
foreign key(order_key) references item_order(order_key);

drop table order_detail;

CREATE TABLE order_detail (
	`order_key`	INT	NOT NULL, 
	`item_key`	INT	NOT NULL,
	`count`	INT,
	`purchase_price`	INT
);

CREATE TABLE routine (
	`routine_key`	INT	AUTO_INCREMENT PRIMARY KEY, 
	`user_key`	INT,
	`routine_name`	varchar(255) NOT NULL,
	`steps` INT NOT NULL,
	 FOREIGN KEY(user_key) REFERENCES user(user_key)
);

CREATE TABLE tag(
	tag_key INT AUTO_INCREMENT PRIMARY KEY,
	tag_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE routine_tag_relation (
    routine_key INT,
    tag_key INT,
    PRIMARY KEY (routine_key, tag_key),
    FOREIGN KEY (routine_key) REFERENCES routine(routine_key),
    FOREIGN KEY (tag_key) REFERENCES tag(tag_key)
);

CREATE TABLE routine_detail (
    step_number INT NOT NULL,
	routine_key INT,
	item_key INT,
	user_key INT,
	step_name VARCHAR(255) NOT NULL,
);

CREATE TABLE cart (
	`cart_key`	INT	AUTO_INCREMENT NOT NULL, 
	`user_key`	INT	NOT NULL,
	`count`	INT,
	`purchase_price`	INT
);