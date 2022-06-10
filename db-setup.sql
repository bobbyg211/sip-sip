-- DROP TABLE questions;

-- CREATE TABLE `questions` (
--   `id` int NOT NULL auto_increment,
--   `content` varchar(2083) NOT NULL,
--   `category` varchar(200) NULL,
--   `dirty` boolean NULL DEFAULT false,
--   `individual` boolean NULL DEFAULT false,
--   `sipped` boolean NULL DEFAULT false,
--   PRIMARY KEY (`id`)
-- );

-- TRUNCATE TABLE questions;

-- LOAD DATA LOCAL INFILE "C:/Users/RobertGonzalez/Documents/questions.csv" 
-- INTO TABLE questions 
-- FIELDS TERMINATED BY ',' 
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;

UPDATE questions SET sipped = 0 WHERE id > 0;

SELECT * FROM questions;