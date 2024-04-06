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
    choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role']
  },
];

const addEmployeeQuestions = [
  {
    type: 'string',
    name: 'firstName',
    message: 'First name?'
  },
  {
    type: 'string',
    name: 'lastName',
    message: 'Last name?'
  },
  {
    type: 'list',
    name: 'role',
    message: 'Role?',
    choices: ['Enterprise Account Executive', 'Account Manager', 'Staff Accountant', 'Finance Manager', 'Content Manager', 'Head of Marketing', 'Junior Full Stack Developer', 'Product Manager']
  },
  {
    type: 'number',
    name: 'managerID',
    message: 'Manager ID?',
  }
];

function addEmployee() {
  inquirer.prompt(addEmployeeQuestions).then((answers) => {
    const roleName = answers.role;
    pool.query('SELECT id FROM role WHERE title = ?', roleName, (error, result) => {
      if(error) {
        console.error('Error retrieving role: ', error);
        return;
      }
      const roleID = result[0].id;

      pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answers.firstName, answers.lastName, roleID, answers.managerID], (error, result) => {
        if (error) {
          console.error('Error adding employee: ', error);
          return;
        }
        console.log('Employee successfully added!');
      });
    });
  });
};


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
      case 'Add An Employee':
        addEmployee();
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
