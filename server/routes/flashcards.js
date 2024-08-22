import express from "express";
import conn from "./../db/connectToMysqlDB.js";

const Router = express.Router();

conn.connect((err)=>{
    if(err){
        console.error("Error connecting to Database bitches ",err.stack);
    }else{
        console.log("DATABASE CONNECTINON IS ACTIVE!!    ",conn.threadId);
    }
})

Router.get("/",(req,res)=>{
    conn.query("SELECT * FROM flashcards",[],(err,results)=>{
        if(err){
            return res.status(500).json({error: err.message});
        }else{
            return res.json(results);
        }
    })
})

Router.get("/:id",(req,res)=>{
    const id = req.params.id;
    conn.query("SELECT * FROM flashcards WHERE id=?",[id],(err,results)=>{
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
    conn.query("SELECT * FROM users WHERE username = ?",[author],(err,results)=>{
        if(err){
            return res.status(500).json({error:err.message});
        }
        if(results.length==0){
            return res.status(404).json({error:`Could not find any user with username = ${author}`});
        }
        const sql  = "INSERT INTO flashcards (name,question,answer,likes,dislikes,author) VALUES(?,?,?,?,?,?)";
        conn.query(sql,[name,question,answer,likes,dislikes,author],(err,resu)=>{
            if(err){
                console.error("An error occured while inserting flashcard");
                return res.status(500).json({error:err.message});
            }
            return res.status(201).json({message: "Flashcard added successfully", id:resu.insertId});
        })
    })
})

export default Router;
// module.exports = Router;