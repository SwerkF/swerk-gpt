//Ignore this file if you don't have any DB.

const mysql = require('mysql');

//connect to mysql with server side
const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chatgpt"
});


module.exports = connexion;
