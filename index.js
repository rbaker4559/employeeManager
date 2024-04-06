//imports given requires didn't work
import inquirer from 'inquirer';
import mysql2 from 'mysql2';

//mysql2 pool
const pool = mysql2.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employee_manager_db'
})


//view all departments function
function viewDepartments() {
  pool.query('SELECT * FROM department', (error, results) => {
    if (error) {
      console.error('Error retrieving departments: ', error);
      return;
    } 
    console.table(results);
  })
};

//view roles function
function viewRoles() {
  pool.query('SELECT * FROM role', (error, results) => {
    if (error) {
      console.error('Error retrieving roles: ', error);
      return;
    } 
    console.table(results);
  })
};

//view employees function
function viewEmployees() {
  pool.query('SELECT * FROM employee', (error, results) => {
    if (error) {
      console.error('Error retrieving employees: ', error);
      return;
    } 
    console.table(results);
  })
};




const questions = [
  {
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role'],
  },
];


inquirer
  .prompt(questions)
  .then((answers) => {
    switch (answers.action) {
      case 'View All Departments': 
        viewDepartments();
        break;
      case 'View All Roles': 
        viewRoles();
        break;
      case 'View All Employees': 
        viewEmployees();
        break;
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error(error);
    } else {
      console.log(error);
    }
  });
