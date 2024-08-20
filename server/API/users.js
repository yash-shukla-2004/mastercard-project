const express = require("express");
const session = require('express-session');
const Router = express.Router();

Router.use(session({
    secret: 'your-secret-key', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yash2511',
    database: 'mydb'
});

connection.connect((err)=>{
    if(err){
        console.error("Error connecting to Database",err.stack);
    }else{
        console.log("DATABASE CONNECTINON IS ACTIVE!!    ",connection.threadId);
    }
})

Router.get("/",(req,res)=>{
    connection.query("SELECT * FROM users",[],(err,results)=>{
        if(err){
            return res.status(500).json({error: err.stack});
        }
        return res.json({results});
    })
})

Router.get("/:name",(req,res)=>{
    const name = req.params.name;
    connection.query("SELECT * FROM users WHERE username = ? ",[name],(err,results)=>{
        if(err){
            return res.status(500).json({error: err.stack});
        }
        if(results.length>0){
            return res.json(results[0]);
        }else{
            return res.status(404).json({error: "No username matches found!!"})
        }
    })
})

Router.post("/login",(req,res)=>{
    const {username,password} = req.body;
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    connection.query("SELECT * FROM users WHERE username=? AND password=?",[trimmedUsername,trimmedPassword],(err,resu)=>{
        if (err) {
            return res.status(500).json({ error: err.stack });
        }
        if (resu.length == 0) {
            return res.status(401).json({ error: "Invalid username or password" });
        } else {
            req.session.user = { id: resu[0].id, username: resu[0].username };
            return res.json({ message: "Login successful", user: req.session.user });
        }
    })
})

Router.post("/add/new",(req,res)=>{
    const {username,password} = req.body;
    connection.query("SELECT * FROM users WHERE username = ?",[username],(err,resu)=>{
        if(err){
            return res.status(500).json({error: err.stack});
        }
        if(resu.length>0){
            return res.status(404).json({error: "Username with this name exists!!"});
        }else{
            connection.query("INSERT INTO users (username,password) VALUES (?,?)",[username,password],(err,result)=>{
                if(err){
                    console.error("Error inserting data");
                    return res.status(500).json({error: err.stack});
                }
                else{
                    return res.json({message: "USER HAS BEEN UPDATED SUCCESSFULLY!!   " , id: result.insertId});
                }
            })
        }
    })
    
})

module.exports = Router;