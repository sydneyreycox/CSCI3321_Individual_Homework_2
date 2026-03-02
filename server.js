const express = require("express");
const app = express();

var connection = require("./database").databaseLink

app.set("view engine","ejs")
app.use(express.static('public'));

app.get("/", function (req,res){
    res.render("pages/home")
});

app.get("/easter_egg", (req,res)=>{
    res.render("pages/easter_egg")
});

app.get("/recipes", (req,res) =>{
    let sql = "SELECT * FROM recipes";
    connection.query(sql, (err,result)=>{
        if(err) throw err;
        res.render("pages/recipes",{recipes:result});
    })
});

const PORT = 3199;
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});