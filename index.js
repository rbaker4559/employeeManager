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
    init();
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
    init();
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
    init();
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

//Questions for adding new employees
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
    choices: []
  },
  {
    type: 'number',
    name: 'managerID',
    message: 'Manager ID?',
  }
];

//Fetches roles
function fetchRoles (callback) {
  pool.query('SELECT id FROM role', (error, result) => {
    if (error) {
      console.error('Error fetching roles: ', error);
      return;
    }
    const IDs = result.map(role => role.id);
    callback(IDs);
  });
};

//Adds new employees
function addEmployee() {
  fetchRoles((roles) => {
    addEmployeeQuestions[2].choices = roles;

    inquirer.prompt(addEmployeeQuestions).then((answers) => {
      const roleTitle = answers.role;

      pool.query('Select id FROM role WHERE title = ?', roleTitle, (error, result) => {
        if (error) {
          console.error('Error retrieving role ID: ', error);
          return;
        }
        const roleID = result[0].id;

        pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answers.firstName, answers.lastName, roleID, answers.managerID], (error, result) => {
          if (error) {
            console.error('Error adding employee: ', error);
            return;
          }
          console.log('Role succesfully added!');
          init();
        });
      });
    });
  });
};

//questions for new department
const addDepartmentQuestions = [
  {
    type: 'string',
    name: 'department',
    message: 'Department name?'
  }
];

//Adds new department
function addDepartment() {
  inquirer.prompt(addDepartmentQuestions).then((answers) => {
      pool.query('INSERT INTO department (name) VALUES (?)', [answers.department], (error, result) => {
        if (error) {
          console.error('Error adding employee: ', error);
          return;
        }
        console.log('Department successfully added!');
        init();
      });
    });
  };

//Questions for adding a role
const addRoleQuestions = [
  {
    type: 'string',
    name: 'title',
    message: 'Title?'
  },
  {
    type: 'string',
    name: 'salary',
    message: 'Salary?'
  },
  {
    type: 'list',
    name: 'department',
    message: 'Which department?',
    choices: []
  }
];

//Fetches roles
function fetchDepartments (callback) {
  pool.query('SELECT name FROM department', (error, result) => {
    if (error) {
      console.error('Error fetching departments: ', error);
      return;
    }
    const departments = result.map(department => department.name);
    callback(departments);
  });
};

//Adds Roles
function addRole() {
  fetchDepartments((departments) => {
    addRoleQuestions[2].choices = departments;

    inquirer.prompt(addRoleQuestions).then((answers) => {
      const departmentName = answers.department;

      pool.query('SELECT id FROM department WHERE name = ?', departmentName, (error, result ) => {
        if (error) {
          console.error('Error retrieving department: ', error);
          return;
        }
        const departmentID = result[0].id;

        pool.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [answers.title, answers.salary, departmentID], (error, result) => {
          if (error) {
            console.error('Error adding role: ', error);
            return;
          }
          console.log('Role succesfully added!');
          init();
        });
      });
    });
  });
};


function init(){
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
      case 'Add A Department':
        addDepartment();
        break;
      case 'Add A Role':
        addRole();
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
};

init();
