const pool = require("../database").databaseLink;

async function getIngredients(){
    try{
        var all = (await pool.query("SELECT * FROM ingredients"))[0]
        return all;
    }catch(err){
        console.error("getIngredients Failed: ", err)
        throw err;
    }
}

async function getIngredientIDByName(name){
    try{
        var id = (await pool.query("SELECT id FROM ingredients WHERE name = ?",[name]))
    }catch(err){
        console.error("getIngredientIDByName Failed: ", err)
        throw err;
    }
}

async function getIngredientByID(id){
    try{
        var recipe = (await pool.query("SELECT * FROM ingredients WHERE id = ?",id))[0][0]
        return recipe
    }catch(err){
        console.error("getRecipeByID Failed: ", err)
        throw err;
    }
}

async function addIngredient(name,info){
    try{
        await pool.query("INSERT INTO ingredients (name,info) VALUES (?,?)",[name,info])
    }catch(err){
        console.error("addIngredient Failed: ", err)
        throw err;
    }
}

async function getIngredientsByRecipeID(recipe_id){
    try{
        const ings = await pool.query(
            "SELECT i.name,ifr.quantity,i.info FROM ingredients_for_recipe ifr JOIN ingredients i ON ifr.ingredient_id=i.id WHERE ifr.recipe_id = ?"
            ,[recipe_id])
        return ings[0]
    }catch(err){
        console.error("getIngredientsByRecipeID Failed: ", err)
        throw err;
    }
}

module.exports = {
    getIngredients,
    getIngredientByID,
    addIngredient,
    getIngredientIDByName,
    getIngredientsByRecipeID
};