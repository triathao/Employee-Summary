const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

createManager()

let employees = []


function createManager() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is your manager's name?"
            },
            {
                type: "input",
                name: "managerId",
                message: "What is your manager's ID?"
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your manager's email address?"
            },
            {
                type: "input",
                name: "managerOffice",
                message: "What is your manager's office number?"
            },
        ])
        .then(response => {
            const manager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOffice)
            employees.push(manager)
            nextStep()
            
        })
}

function nextStep() {
    inquirer
        .prompt ({
            type: 'list',
            message: "Which employee would you like to add next?",
            choices: ["Manager", "Engineer", "Intern", "None, I'm done"],
            name: 'addNext',
        })
        .then (response => {
            if (response.addNext === "Manager") {
                createManager()
            } else if (response.addNext === "Engineer") {
                createEngineer()
            } else if (response.addNext === "Intern") {
                createIntern()
            } else {
                createTeam()
            }
        
        })
}

function createEngineer() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your engineer's name?"
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is your engineer's ID?"
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is your engineer's email address?"
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is your engineer's GitHub account?"
            },
        ])
        .then(response => {
            const engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGithub)
            employees.push(engineer)
            nextStep()
            
        })

    
}

function createIntern() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your intern's name?"
            },
            {
                type: "input",
                name: "internId",
                message: "What is your intern's ID?"
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is your intern's email address?"
            },
            {
                type: "input",
                name: "internSchool",
                message: "What is your intern's school?"
            },
        ])
        .then(response => {
            const intern = new Intern(response.internName, response.internId, response.internEmail, response.internSchool)
            employees.push(intern)
            nextStep()
            
        })
}

function createTeam() {
    fs.writeFileSync(outputPath, render(employees), "utf-8");
}





// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
