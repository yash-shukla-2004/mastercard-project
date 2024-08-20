const sqlite3 = require("sqlite3").verbose();
const path = require('path');

const DB_PATH = path.join('newdb.db');
const db = new sqlite3.Database(DB_PATH,(err)=>{
    if(err){
        console.error("Error opening Database:",err);
    }else{
        console.log("")
    }
})

module.exports = db;