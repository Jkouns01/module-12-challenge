const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3000,
    user: "root",
    password: "happycamper22",
    database: "employeeDataBase"
});

// when user starts, bring 'main list' up 
function screenStart() {
    inquirer
        .prompt({
            type: "list",
            choices: [
                "View departments",
                "View positions",
                "View employees",
                "Add a role",
                "Add an employee",
                "Exit"
            ],
            message: "Choose an option.",
            name: "Main list"
        })
        .then(function (result) {
            console.log(result.option);
            // add options here
        });
}


function addDep() {


    inquirer.prompt({

        type: "input",
        message: "Which department?",
        name: "Department Name"

    }).then(function (answer) {



        connection.query([answer.deptName], function (err, res) {
            if (err) throw err;
            console.table(res)
            screenStart()
        })
    })
}


function roleAdd() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter name",
                name: "name of role"
            },
            {
                type: "input",
                message: "Enter salary",
                name: "total"
            }
        ])
        .then(function (answer) {
            //add an ID number
            connection.query([answer.roleName, answer.salaryTotal], function (err, res) {
                if (err) throw err;
                console.table(res);
                screenStart();
            });
        });
}

function employeeAdd() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "First name.",
                name: "firstName"
            },
            {
                type: "input",
                message: "Last name.",
                name: "lastName"
            }
        ])
        .then(function (answer) {
            //add an ID
            connection.query([answer.eeFirstName, answer.eeLastName], function (err, res) {
                if (err) throw err;
                console.table(res);
                beginScreen();
            });
        });
}



function updateEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Which employee would you like to update?",
                name: "eeUpdate"
            },

            {
                type: "input",
                message: "What do you want to update to?",
                name: "updateRole"
            }
        ])
        .then(function (answer) {


            connection.query('UPDATE employee SET role_id=? WHERE first_name= ?', [answer.updateRole, answer.eeUpdate], function (err, res) {
                if (err) throw err;
                console.table(res);
                beginScreen();
            });
        });
}
//view department option
//view employee option
// view roles option

function quit() {
    connection.end();
    process.exit();
}