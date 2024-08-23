import express from "express";
import cors from "cors";
import body_parser from "body-parser";
import flashcards from "./routes/flashcards.js";
import users from "./routes/users.js";
import dotenv from "dotenv";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/chat.message.routes.js";
import userRoutes from "./routes/chat.user.routes.js";

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();
app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: /^http:\/\/localhost:3000(\.[a-z0-9]+)*$/
}));

// connect to mongodb:
connectToMongoDB();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/flashcards",flashcards);
app.use("/users",users);

// app.get("/", (req, res)=>{
//     console.log("this is recieved");
//     res.send("Okayy").status(200);
// })

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
});
