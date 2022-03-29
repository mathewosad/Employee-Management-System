//dependencies
const mysql = require("mysql");

const inquirer = require("inquirer");
require("console.table");

//this create the connection for database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "0007",
    database: "employee_management_db"
});

connection.connect(err => {
    if (err) throw err;
    console.log('connection established!');
    start();
});


function start() {
    // start the app
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update employee role",
            "Exit"
        ]
    }).then((answer) => {
        switch (answer.promptMenu) {
            case "View all departments":
                viewDeparts();
                break;

            case "View all roles":
                viewRoles();
                break;

            case "View all employees":
                viewEmps();
                break;

            case "Add a department":
                addDept();
                break;

            case "Add a role":
                addRole();
                break;

            case "Add an employee":
                addEe();
                break;

            case "Update employee role":
                update();
                break;

            case "Esc":
                connection.end();
                break;
        }
    });
}

function addDept() {
 
    inquirer.prompt({
        type: 'input',
        message: 'Enter new department:',
        name: 'addDept'
  
    }).then(function (answer) {
        connection.query(`INSERT INTO department (name) VALUES ('${answer.addDept}')`)
      startPrompts();
    })  
};


function addRole() {

    inquirer.prompt([
        {
        type: 'input',
        message: 'Which department?',
        name: 'addRoleDept'
    }

]).then(function (answer) {

        db.query(`
        
        INSERT INTO role (department_id) VALUES ('${answer.addRoleDept}');
            `)
            startPrompts();
    })
};

function viewDeparts() {
    connection.query('SELECT * FROM department;', function (err, res) {
        if (err) throw err;
        console.log("Displaying all departments:");
        console.table(res);
        startPrompts();
    })
};


function viewRoles() {
    connection.query('SELECT * FROM role;', function (err, res) {
        if (err) throw err;
        console.log("Displaying all Roles:");
        console.table(res);
       startPrompts();
    })
};

function viewEmps() {

    connection.query('SELECT * FROM employee;', function (err,res) {
        if (err) throw err;
        console.log("Displaying all Employees:");
        console.table(res);
        startPrompts();
    })
};

function Esc() {
    connection.end();
    console.log('Connection to employee_db terminated.');
};

// // function to Update employee role
// function update() {
//     // get all employees
//     connection.query("SELECT * FROM employee, role", (err, results) => {
//         if (err) throw err;

//         inquirer.prompt([
//             {
//                 name: "employee",
//                 type: "rawlist",
//                 choices: () => {
//                     let choiceArray = [];
//                     for (let i = 0; i < results.length; i++) {
//                         choiceArray.push(results[i].last_name);
//                     }
//                     //remove duplicates
//                     let cleanChoiceArray = [...new Set(choiceArray)];
//                     return cleanChoiceArray;
//                 },
//                 message: "Which employee would you like to update?"
//             },
//             {
//                 name: "role",
//                 type: "rawlist",
//                 choices: () => {
//                     let choiceArray = [];
//                     for (let i = 0; i < results.length; i++) {
//                         choiceArray.push(results[i].title);
//                     }
//                     //remove duplicates
//                     let cleanChoiceArray = [...new Set(choiceArray)];
//                     return cleanChoiceArray;
//                 },
//                 message: "What is the employee's new role?"
//             }
//         ]).then(answer => {
//             let chosenEe;
//             let chosenRole;

//             for (let i = 0; i < results.length; i++) {
//                 if (results[i].last_name === answer.employee) {
//                     chosenEe = results[i];
//                 }
//             }

//             for (let i = 0; i < results.length; i++) {
//                 if (results[i].title === answer.role) {
//                     chosenRole = results[i];
//                 }
//             }

//             connection.query(
//                 "UPDATE employee SET ? WHERE ?",
//                 [
//                     {
//                         role_id: chosenRole,
//                     },
//                     {
//                         last_name: chosenEe,
//                     }
//                 ],
//                 (err) => {
//                     if (err) throw err;
//                     console.log(`Role has been updated!`);
//                     start();
//                 }
//             )
//         })
//     })
// }