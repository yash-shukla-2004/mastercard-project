const express = require("express");

const Router = express.Router();

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
    connection.query("SELECT * FROM flashcards",[],(err,results)=>{
        if(err){
            return res.status(500).json({error: err.message});
        }else{
            return res.json(results);
        }
    })
})

Router.get("/:id",(req,res)=>{
    const id = req.params.id;
    connection.query("SELECT * FROM flashcards WHERE id=?",[id],(err,results)=>{
        if(err){
            return res.status(500).json({error: err.message});
        }
        if(results.length>0){
            return res.json(results[0]);
        }else{
            return res.status(404).json("ID Not Found");
        }
    })
})

Router.post("/add/new",(req,res)=>{
    const {name,question,answer,likes,dislikes,author} = req.body;
    connection.query("SELECT * FROM users WHERE username = ?",[author],(err,results)=>{
        if(err){
            return res.status(500).json({error:err.message});
        }
        if(results.length==0){
            return res.status(404).json({error:`Could not find any user with username = ${author}`});
        }
        const sql  = "INSERT INTO flashcards (name,question,answer,likes,dislikes,author) VALUES(?,?,?,?,?,?)";
        connection.query(sql,[name,question,answer,likes,dislikes,author],(err,resu)=>{
            if(err){
                console.error("An error occured while inserting flashcard");
                return res.status(500).json({error:err.message});
            }
            return res.status(201).json({message: "Flashcard added successfully", id:resu.insertId});
        })
    })
})

module.exports = Router;