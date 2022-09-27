CREATE database IF NOT EXISTS companydb;

use companydb;

CREATE TABLE employee(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) DEFAULT  NULL,
    salary INT(5) DEFAULT NULL,
    PRIMARY KEY (id)
);

DESCRIBE employee;

INSERT INTO employee VALUES 
    (1,'John',1000),
    (2,'Henry',2000),
    (3,'Sam',2500),
    (4,'Max',1500);