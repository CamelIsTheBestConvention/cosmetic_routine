CREATE TABLE user(
	user_key INT AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	username VARCHAR(255) NOT NULL,
	birth_date DATE NOT
	gender CHAR(1)  
);



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
    step_number INT,
	routine_key INT,
	item_key INT,
	step_name VARCHAR(255) NOT NULL,
	FOREIGN KEY(routine_key) REFERENCES routine(routine_key),
	FOREIGN KEY(item_key) REFERENCES item(item_key),
	PRIMARY KEY (step_number, routine_key)
);

CREATE TABLE cart (
	`cart_key`	INT	AUTO_INCREMENT NOT NULL, 
	`user_key`	INT	NOT NULL,
	`count`	INT,
	`purchase_price`	INT
);

CREATE TABLE review (
	review_key INT AUTO_INCREMENT PRIMARY KEY,
	user_key INT,
    item_key INT,
    routine_key INT,	
	review_type CHAR(1) CHECK(review_type IN ('I', 'R')), 
    review_content VARCHAR(255),
	review_at DATE, 
	rating INT, 
	FOREIGN KEY(user_key) REFERENCES user(user_key),
	    FOREIGN KEY (item_key) REFERENCES item(item_key),
    FOREIGN KEY (routine_key) REFERENCES routine(routine_key),
    CHECK (
        (item_key IS NOT NULL AND routine_key IS NULL) OR
        (item_key IS NULL AND routine_key IS NOT NULL)
    )
);
