//dependencies
const mysql = require("mysql");

const inquirer = require("inquirer");
// This app creates a table of all departments, roles, and employees.
const figlet = require("figlet");

//figlet application name
figlet("Employee \n \n Manager", (err, data) => {
    if (err) throw err;
    console.log(data);
})

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
};

// function to View all departments,
function viewDeparts() {
    connection.query("SELECT * FROM department", (err, data) => {
        if (err) throw err;
        console.log("Displaying all departments:");
        console.table(data);
        start();
    });
};

// function to View all roles
function viewRoles() {
    connection.query("SELECT * FROM role", (err, data) => {
        if (err) throw err;
        console.log("Displaying all roles:");
        console.table(data);
        start();
    });
};

// function to View all employees
function viewEmps() {
    connection.query("SELECT * FROM employee", (err, data) => {
        if (err) throw err;
        console.log("Displaying all employees:");
        console.table(data);
        start();
    });
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