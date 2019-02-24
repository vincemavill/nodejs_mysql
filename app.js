const express = require('express');
const mysql = require('mysql');

// create connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node_mysql"

});

// connect
db.connect((error) => {
    if(error){
        throw error;
    } else {
        console.log("mysql is connected!");
    }
});

const app = express();

// create database
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE node_mysql';
    db.query(sql, (error, result)=>{
        if(error) throw error;
        console.log(result);
        res.send("database created...!");
    });
});

// create table 
app.get('/create_usertble', (req,res) => {
    let sql= "CREATE TABLE `user_table` (`id` INT NOT NULL AUTO_INCREMENT,`username` VARCHAR(255),`password` VARCHAR(255),PRIMARY KEY (`id`))"
    db.query(sql, (error,result) => {
        if(error){
            res.send(error);
        } else {
            res.send("table has been created!");
        }

    });
});

app.get('/user_list', (req,res) => {
    let sql= "SELECT * FROM user_table";
    db.query(sql, (error,result) => {
        if(error){
            res.send(error);
        } else {
            res.send(result);
        }
    });
});

//create admin
app.get('/add_user_admin', (req,res) => {
    let post = {username: 'admin', password:'pass'};
    let sql = 'INSERT INTO user_table SET ?';
    db.query(sql, post, (error,result) => {
        if(error){
            res.send(error);
        } else {
            res.send("admin has been created");
        }
    });
});



app.listen('4000', ()=>{
    console.log("server started on port 4000");
});