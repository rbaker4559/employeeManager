/*Sales department seed and value retrieval*/
INSERT INTO department (name) VALUES ('Sales');
/*Retrieve ID for sales*/
SET @sales_department_id := LAST_INSERT_ID();

/*Finance department seed and retrieval*/
INSERT INTO department (name) VALUES ('Finance');
--Retrieve ID for finance
SET @finance_department_id := LAST_INSERT_ID();

/*Marketing department seed and retrieval*/
INSERT INTO department (name) VALUES ('Marketing');
/*Retrieve ID for marketing*/
SET @marketing_department_id := LAST_INSERT_ID();

/*Product department seed and retrieval*/
INSERT INTO department (name) VALUES ('Product');
/*Retrieve ID for product*/
SET @product_department_id := LAST_INSERT_ID();


/*Sales role seeds and sets*/
INSERT INTO role (title, salary, department_id) VALUES ('Enterprise Account Executive', 300000.00, @sales_department_id), ('Account Manager', 150000.00, @sales_department_id);
/*Retrieve ID for ENT AE*/
SET @enterprise_account_executive_role_id :=  LAST_INSERT_ID();
/*Retrieve ID for AM*/
SET @account_manager_role_id :=  LAST_INSERT_ID();

/*Finance role seeds*/
INSERT INTO role (title, salary, department_id) VALUES ('Staff Accountant', 60000.00, @finance_department_id), ('Finance Manager', 120000.00, @finance_department_id);
/*Retrieve ID for staff accountant*/
SET @staff_accountant_role_id := LAST_INSERT_ID();
/*Retrieve ID for finance manager*/
SET @finance_manager_role_id := LAST_INSERT_ID();

/*Marketing role seeds*/
INSERT INTO role (title, salary, department_id) VALUES ('Content Manager', 80000.00, @marketing_department_id), ('Head of Marketing', 120000.00, @marketing_department_id);
/*Retrieve ID for content manager*/
SET @content_manager_role_id := LAST_INSERT_ID();
/*Retrieve ID for head of marketing*/
SET @head_of_marketing_role_id := LAST_INSERT_ID();

/*Product role seeds*/
INSERT INTO role (title, salary, department_id) VALUES ('Junior Full Stack Developer', 90000.00, @product_department_id), ('Product Manager', 120000.00, @product_department_id);
/*Retrieve ID for junior dev*/
SET @junior_full_stack_developer_job_id := LAST_INSERT_ID();
/*Retrieve ID for product manager*/
SET @product_manager_job_id := LAST_INSERT_ID();


/*Sales employee seeds*/
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Reggie', 'Baker', @enterprise_account_executive_role_id, 1001), ('Jack', 'Frank', @account_manager_role_id, 1001);

/*Finance employee seeds*/
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Chris', 'Morrow', @staff_accountant_role_id, 2001), ('Jack', 'Frank', @finance_manager_role_id, 2001);

/*Marketing employee seeds*/
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Beth', 'Frank', @content_manager_role_id, 3001), ('Joe', 'Schmo', @head_of_marketing_role_id, 3003);

/*Product employee seeds*/
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Reggie', 'Baker', @junior_full_stack_developer_job_id, 4001), ('Wen', 'Nguyen', @product_manager_job_id, 4002);