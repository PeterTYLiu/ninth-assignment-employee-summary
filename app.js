const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const managerQuestions = [
  {
    name: "name",
    message: "What is the manager's name?",
  },
  {
    name: "id",
    message: "What is their employee ID?",
  },
  {
    name: "email",
    message: "What is their email?",
  },
  {
    name: "officeNumber",
    message: "What is their office number?",
  },
];

const addEmployeeQuestion = [
  {
    type: "list",
    name: "addEmployee",
    message: "Add another team member?",
    choices: ["Add engineer", "Add intern", "No"],
  },
];

const engineerQuestions = [
  {
    name: "name",
    message: "What is the engineer's name?",
  },
  {
    name: "id",
    message: "What is their employee ID?",
  },
  {
    name: "email",
    message: "What is their email?",
  },
  {
    name: "github",
    message: "What is their Github username?",
  },
];

const internQuestions = [
  {
    name: "name",
    message: "What is the intern's name?",
  },
  {
    name: "id",
    message: "What is their employee ID?",
  },
  {
    name: "email",
    message: "What is their email?",
  },
  {
    name: "school",
    message: "What is their school?",
  },
];

// Instantiate an empty team
let employees = [];

// Create a recursive question that adds employees
let addEmployee = async () => {
  let question = await inquirer.prompt(addEmployeeQuestion);
  if (question.addEmployee == "Add engineer") {
    let engineer = await inquirer.prompt(engineerQuestions);
    let newEngineer = new Engineer(
      engineer.name,
      engineer.id,
      engineer.email,
      engineer.github
    );
    employees.push(newEngineer);
    if (engineer.name) {
      addEmployee();
    }
  } else if (question.addEmployee == "Add intern") {
    let intern = await inquirer.prompt(internQuestions);
    let newIntern = new Intern(
      intern.name,
      intern.id,
      intern.email,
      intern.school
    );
    employees.push(newIntern);
    if (intern.name) {
      addEmployee();
    }
  } else {
    fs.writeFileSync(outputPath, render(employees));
  }
};

// Create the team based on prompts
(async () => {
  let manager = await inquirer.prompt(managerQuestions);
  newManager = new Manager(
    manager.name,
    manager.id,
    manager.email,
    manager.officeNumber
  );
  employees.push(newManager);
  addEmployee();
})();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
