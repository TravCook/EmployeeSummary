const Employee = require("./Employee.js")
class Engineer extends Employee{
  constructor(name, id, email, ghAccount){
    super(name, id, email)
    this.github = ghAccount
  }
  getRole(){
    return "Engineer"
  }
  getGithub(){
    return this.github
  }
}
module.exports = Engineer;
