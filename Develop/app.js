const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const newEmpQ = {
    type: "confirm",
    message: "Would you like to add a new employee?",
    name: "addEmp"
  }
const prompts = [
  {
    type: "input",
    message: "Please enter employee name: ",
    name: "empName"
  },
  {
    type: "list",
    message: "What is the current role of the employee?",
    choices: ["Manager", "Engineer", "Intern"],
    name: "employeeRole"
  },
  {
    type: "input",
    message: "Please enter the employee's ID #",
    name: "employeeID"
  },
  {
    type: "input",
    message: "Please enter the employee's email: ",
    name: "employeeEmail"
    }
]
const rolePrompts = [
  {
    type: "input",
    message: "Please enter the employee's Github Account: ",
    name: "gitHub"
  },
  {
    type: "input",
    message: "What school is the employee attending? ",
    name: "school"
  },
  {
    type: "input",
    message: "What is the manager's office number? ",
    name: "officeNum"
  }
]

const staff = []
firstQuestion();
function firstQuestion(){
  inquirer.prompt(newEmpQ).then((response) =>{
    if(response.addEmp){
      empBuilder()
    }else{
      const htmlRender = render(staff)
      console.log(htmlRender)
      fs.writeFile(outputPath, htmlRender, (err) => {
        if (err) throw err;
        console.log("File Written!")
      })
    }
  })
}

function empBuilder(){
  inquirer.prompt(prompts).then((response) => {
    
    if(response.employeeRole === "Manager"){
      managerPrompt(response);
    }else if(response.employeeRole === "Engineer"){
      engineerPrompt(response)
    }else if(response.employeeRole === "Intern"){
      internPrompt(response)
    }
  })
}
function engineerPrompt(response){
  const newEng = response
  inquirer.prompt(rolePrompts[0]).then((response) =>{
    newEng.gitHub = response
    const engProto = new Engineer(newEng.empName, newEng.employeeID, newEng.employeeEmail, newEng.gitHub.gitHub)
    staff.push(engProto)
    console.log(staff)
    firstQuestion();
})
}
function internPrompt(response){
  const newInt = response
  inquirer.prompt(rolePrompts[1]).then((response) =>{
    newInt.school = response
    const intProto = new Intern(newInt.empName, newInt.employeeID, newInt.employeeEmail, newInt.school)
    staff.push(intProto)
    console.log(staff)
    firstQuestion();
  })
}
function managerPrompt(response){
  const newMan = response
  inquirer.prompt(rolePrompts[2]).then((response) =>{
    newMan.officenum = response
    console.log(newMan)
    const manProto = new Manager(newMan.empName, newMan.employeeID, newMan.employeeEmail, newMan.officenum)
    staff.push(manProto)
    console.log(staff)
    firstQuestion();
  })
}

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.


