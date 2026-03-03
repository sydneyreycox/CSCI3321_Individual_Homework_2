const express = require("express");
const app = express();
const PORT = 3199;

var recipeDB = require("./models/RecipeModel.js")
var ingDB = require("./models/IngredientModel.js")


app.set("view engine","ejs")
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req,res){
    res.render("pages/home")
});

app.get("/easter_egg", (req,res)=>{
    res.render("pages/easter_egg")
});

app.get("/recipes", async (req,res) =>{
    try{
        const proteins = await recipeDB.getProteins();
        const categories = {};
        for(let p of proteins){
            categories[p.protein] = await recipeDB.getProteinRecipes(p.protein);
        }
        res.render("pages/recipes",{
            recipeByProtein:categories
        });
    }catch(err){
        throw err;
    }
});

app.get("/viewrecipe", async (req,res) =>{
    try{
        const reqRecipe = await recipeDB.getRecipeByID(req.query.id)
        const recIngredients = await ingDB.getIngredientsByRecipeID(req.query.id)
        res.render("pages/viewrecipe",{recipe:reqRecipe, ingredients:recIngredients})
    }catch(err){
        throw err;
    }
});

app.get("/add_ingredient", async (req,res)=>{
    var all_ingredients = await ingDB.getIngredients();
    res.render("pages/add_ingredient",{ingredients:all_ingredients})
});

app.get("/add_recipe", async (req,res)=>{
    var all_ingredients = await ingDB.getIngredients();
    res.render("pages/add_recipe",{ingredients:all_ingredients})
});

app.get("/error", (req,res)=>{
    res.render("pages/error")
})

app.get("/success", (req,res)=>{
    res.render("pages/success")
})

app.post("/add-ingredient", async (req,res)=>{
    try{
        const {name,info} = req.body
        await ingDB.addIngredient(name,info);
        res.redirect("/success")
    }catch(err){
        res.redirect("/error")
        console.error(err)
    }
});

app.post("/add-recipe", async (req,res)=>{
    try{
        const{name,protein,cook_time,init_cost,serving_cost,instructions,ingredient_id,quantity} = req.body
        await recipeDB.addRecipe(name,protein,cook_time,init_cost,serving_cost,instructions,ingredient_id,quantity)
        res.redirect("/success")
    }catch(err){
        res.redirect("/error")
        console.error(err)
    }
});

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});