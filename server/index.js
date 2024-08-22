import express from "express";
import cors from "cors";
import body_parser from "body-parser";
import flashcards from "./routes/flashcards.js";
import users from "./routes/users.js";
import dotenv from "dotenv";
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();
app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());
app.use(express.json());
app.use(cors());

app.use("/flashcards",flashcards);
app.use("/users",users);

app.listen(3001,()=>{
    console.log("Server is Up and Running!!")
});
