import inquirer from 'inquirer';

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
    console.log(answers);
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error(error);
    } else {
      console.log(error);
    }
  });
