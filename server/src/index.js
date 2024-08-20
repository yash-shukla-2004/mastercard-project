const express = require("express");
const cors = require("cors");

const app = express();
const body_parser = require("body-parser");
app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());
app.use(express.json());
app.use(cors());


const StudentModel = require("../database/students");
const db = require("../database/db");
const flashcards = require("../API/flashcards");
const users = require("../API/users");

app.use("/flashcards",flashcards);
app.use("/users",users);

/*const mysql = require("mysql2");

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

app.get("/flashcards",(req,res)=>{
    connection.query("SELECT * FROM flashcards",[],(err,results)=>{
        if(err){
            return res.status(500).json({error: err.message});
        }else{
            return res.json(results);
        }
    })
})

app.get("/flashcards/:id",(req,res)=>{
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

app.post("/flashcards/add/new",(req,res)=>{
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
*/

/* EVERYTHING BELOW IS IRRELEVANT */


app.post("/student/new",(req,res)=>{
    const {id,name} = req.body;
    if(!id || !name){
        return res.status(400).json({error: "No Data entered in Body"});
    }
     /*const student = StudentModel.some((stu) => stu.id == req.body.id);
     if(student){
        return res.status(409).json({error: "Student already exists"});
    }

    StudentModel.push({ id: parseInt(req.body.id) , name});
    return res.json({status: "Completed"});
    */
   const query = "INSERT INTO Student VALUES (?,?)";
   db.run(query,[id,name],(err)=>{
    if(err){
        throw err;
    }
    return res.json({id: name});
   })

    
})

app.put("/student/up/:id",(req,res)=>{
    const {name} = req.body;
    const id = req.params.id;
    const getstu = StudentModel.findIndex((stu)=>stu.id==id);
    if(getstu!=-1){
        StudentModel[getstu].name = name;
        return res.json({status: "Updated"});
    }
    else {
        return res.status(404).json({error:"NO SUCH INDEX FOUND"});
    }

})

app.delete("/student/del/:id",(req,res)=>{
    const id = req.params.id;
    
    const getstu = StudentModel.filter((stu)=>stu.id!=id);
    
    StudentModel.Students = getstu;
    return res.json({status: "Deleted"});
    
})

app.get("/",(req,res)=>{
    return res.json({data:"IT WORKSSSSS!!!!"})
});

app.get("/student/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    /*const getstudent = StudentModel.filter((student)=>
        student.id == parseInt(id));
    res.json({student: getstudent});
    */
   
   const query = 'SELECT * FROM Student WHERE id = ?';
   db.all(query,[id],(err,row)=>{
    if(err){
        throw err;
    }
    if(row){
        return res.json({students: row});
    }else{
        return res.json({error: "No student found with this id"});
    }
   })
})

app.get("/student",(req,res)=>{
    const query = "SELECT * FROM Student;"

    db.all(query,[],(err,rows)=>{
        if(err){
            throw err;
        }else{
            return res.json({students: rows});
        }
    })


})

app.listen(3001,()=>{
    console.log("Server is Up and Running!!")
});
