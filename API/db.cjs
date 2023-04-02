//Ignore this file if you don't have any DB.

const mysql = require('mysql');

const connexion=mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'gpt',
    port:'3306'
});

module.exports = connexion;
