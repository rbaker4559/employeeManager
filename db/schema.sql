DROP DATABASE IF EXISTS employee_manager_db;
CREATE DATABASE employee_manager_db;

CREATE TABLE department (
  id INT NOT NULL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT, 
    FOREIGN KEY(department_id) REFERENCES department(id) 
);

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY(role_id) REFERENCES role(id)
);