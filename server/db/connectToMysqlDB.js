import mysql from "mysql2";
import fs from "fs";
import path from "path";
import dotenv from 'dotenv';
dotenv.config({ path:"../.env"})

const conn=mysql.createConnection(
    {
        host:process.env.MYSQL_DB_URI, 
        user:process.env.MYSQL_DB_USER, 
        password:process.env.MYSQL_DB_PASS, 
            database:"users", 
        port:process.env.MYSQL_DB_PORT, 
        ssl:{
            ca:fs.readFileSync("./db/DigiCertGlobalRootCA.crt.pem") // readFileSync takes path relative to pwd, not the directory in which it is.
        }
    }
);

export default conn;