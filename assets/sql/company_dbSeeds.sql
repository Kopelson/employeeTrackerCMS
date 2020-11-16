-- Drops the company_db if it already exists --
DROP DATABASE IF EXISTS company_db;
-- Create a database called company_db --
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department(
    id INT AUTO_INCREMENT NOT NULL,
    name varchar(30),
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT AUTO_INCREMENT NOT NULL,
    title varchar(30),
    salary decimal,
    FOREIGN KEY (id) REFERENCES department(id),
    PRIMARY KEY (id)
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT NOT NULL,
    first_name varchar(30),
    last_name varchar(30),
    FOREIGN KEY (id) REFERENCES role(id),
    PRIMARY KEY (id)
);