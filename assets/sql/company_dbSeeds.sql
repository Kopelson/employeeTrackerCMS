-- Drops the company_db if it already exists --
DROP DATABASE IF EXISTS company_db;
-- Create a database called company_db --
CREATE DATABASE company_db;
-- Use the database called company_db --
USE company_db;
-- creates a table named department --
CREATE TABLE department(
    id INT AUTO_INCREMENT NOT NULL,
    name varchar(30),
    PRIMARY KEY (id)
);
-- creates a table named role --
CREATE TABLE role(
    id INT AUTO_INCREMENT NOT NULL,
    title varchar(30),
    salary int,
    departmentID int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (departmentID) REFERENCES department(id)
);
-- creates a table named employee --
CREATE TABLE employee(
    id INT AUTO_INCREMENT NOT NULL,
    first_name varchar(30),
    last_name varchar(30),
    roleID int,
    PRIMARY KEY (id),
    FOREIGN KEY (roleID) REFERENCES role(id)
);
-- inserts dummy data into department table --
INSERT INTO department (name)
VALUES ("Production"), ("R&D"), ("Marketing"), ("HR"), ("Accounting and Finance");
-- inserts dummy data into role table --
INSERT INTO role (title, salary, departmentID)
VALUES ("Associate Product Manager", 45000, 1),("Product Manager", 52000, 1),("Lead Product Manager", 65000, 1),
("R&D Tech", 39000, 2),("R&D Manager", 48000, 2),("Lead R&D Manager",7800, 2),("Chief Marketing Officer", 120000, 3),
("Marketing Analyst", 95000, 3),("Marketing Manager", 74000, 3),("HR Associate", 32000, 4),("HR Supervisor", 55000, 4),
("HR Director", 95000, 4), ("Accountant", 46000, 5),("Auditor", 56000, 5),("Chief Financial Officer", 95000, 5);
-- inserts dummy data into employee table --
INSERT INTO employee (first_name, last_name, roleID)
VALUES ("Kenneth", "Kopelson", 1),("Ashley", "Creedy", 10),("Craig", "Brandvold", 7),("Joseph", "Smith", 12),
("Dillan", "Evans", 4);