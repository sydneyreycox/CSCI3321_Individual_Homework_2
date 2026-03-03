const pool = require("../database").databaseLink;

async function getProteins(){
    try{
        var proteins = (await pool.query("SELECT DISTINCT protein FROM recipes"))[0]
        return proteins;
    }catch(err){
        console.error("getProteins Failed: ", err)
        throw err;
    }
}

async function getRecipes(){
    try{
        var recipes = (await pool.query("SELECT * FROM recipes"))[0]
        return recipes;
    }catch(err){
        console.error("getRecipes Failed: ", err)
        throw err;
    }
}

async function getProteinRecipes(protein){
    try{
        var proteins = (await pool.query("SELECT * FROM recipes WHERE protein = ?",[protein]))[0]
        return proteins;
    }catch(err){
        console.error("getProteinRecipes Failed: ", err)
        throw err;
    }
}

async function getRecipeByID(id){
    try{
        var recipe = (await pool.query("SELECT * FROM recipes WHERE id = ?",id))[0][0]
        return recipe
    }catch(err){
        console.error("getRecipeByID Failed: ", err)
        throw err;
    }
}

async function addRecipe(name,protein,cook_time,init_cost,serv_cost,instructions,ingredients, quantities){
    try{
        const newID = (await pool.query("INSERT INTO recipes (name,protein,init_cost,serving_cost,cook_time,instructions) VALUES (?,?,?,?,?,?)",
            [name,protein,init_cost,serv_cost,cook_time,instructions]
        ))[0][0]
        for(let i = 0; i<ingredients.length;i++){
            await pool.query("INSERT INTO ingredients_for_recipe (recipe_id,ingredient_id,quantity) VALUES (?,?,?)",[newID,ingredients[i],quantities[i]])
        }
    }catch(err){
        console.error("addRecipe Failed: ", err)
        throw err;
    }
}

module.exports = {
    getProteinRecipes,
    getProteins,
    getRecipes,
    getRecipeByID,
    addRecipe
};