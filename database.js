//I'm usuing sql promise instead because it's a ton cleaner

var mysql = require("mysql2/promise");
require('dotenv').config();

var pool = mysql.createPool({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_NAME
});

//Perhaps the most disgusting syntax I've ever seen VVVV
(async () =>{
    try {
        await pool.query("SELECT 1")
        console.log("Connected to MySQL.")
    }catch(err){
        console.error("Failed to connect: ", err)
    }
})();

exports.databaseLink = pool;

/*Get protein types,
get recipes
get others*/