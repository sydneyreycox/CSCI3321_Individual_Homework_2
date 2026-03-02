CREATE SCHEMA dormpediadb;
USE DormPediaDB;

CREATE TABLE ingredients(
	id SERIAL PRIMARY KEY,
	name varchar(31),
    info varchar(255)
);

CREATE TABLE recipes(
	id SERIAL PRIMARY KEY,
    name varchar(31),
    protein varchar(31),
    instructions TEXT,
    init_cost DECIMAL(5,2),
    serving_cost DECIMAL(5,2),
    cook_time INT /* In minutes */
);

CREATE TABLE ingredients_for_recipe(
	id SERIAL PRIMARY KEY,
    ingredient_id BIGINT UNSIGNED,
    recipe_id BIGINT UNSIGNED,
    quantity varchar(31),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);

-- Ingredients for brownie in a mug.
INSERT INTO ingredients(name,info) VALUES
	("Unsalted Butter","When a recipe tells you to soften butter, grate cold butter and microwave in 5-second intervals. Softened butter isn't hard or melted."),
    ("Brown Sugar","Store your brown sugar in a sealed ziplock bag to prevent it from turning into a rock. If you fuck that up add a slice of dry bread to make it soft again"),
    ("Whole Milk","Don't drink from the carton, it's not because it's nasty, it's because it makes the milk spoil faster."),
    ("Vanilla Extract","If you don't have vanilla extract, you can swap it for Bourbon or Rum. Of course you won't have those in your dorm."),
	("All-Purpose Flour","Store your flour in airtight containers in the dark, and freeze it for 48 hours after purchasing to kill bug eggs. You should be able to keep your flour for a while like this."),
    ("Unsweetened Cocoa Powder","Don't store this in a fridge, it's good for 2 years. Also it tastes pretty bad alone, don't be scared."),
    ("Salt", "Honestly, if you manage to fuck up salt, congratulations, somehow you made it to college."),
    ("Chocolate Chips","Don't let your chocolate get too hot, it'll ruin it real easy, not just melt it. Dark place, cold, as usual.")
;

-- Ingredients for carbonara.

INSERT INTO ingredients(name,info) VALUES
	("Ramen","Ahhh, a staple of the dorm room, you can't fuck these up."),
    ("Olive Oil","When buying olive oil, get olive oil in dark/tinted glass, and go for extra virgin, it's worth it."),
    ("Bacon","Stores in fridge only for a few days. If needed, separate portions and place in airtight bag. You can freeze bacon up to 6 months."),
    ("Minced Garlic", " To mince garlic, smash peeled cloves with the flat side of a knife to loosen them, then chop repeatedly. Or just buy it prepackaged, it doesn't really matter."),
    ("Egg","Store your eggs in their carton, unwashed, pointed end down. They should keep 3-5 weeks."),
    ("Grated Parmesan","Pre grated cheese is very often not actually parmesan, make sure you're getting your real parmesan or grate it yourself."),
    ("Black Pepper", "Freshly ground is always better, try to avoid powdered pepper. Finer grind for cooking, coarser for seasoning."),
    ("Chopped Parsley","Buy bright green parsley, no yellow or slimey stems/leaves. Good parsley should smell aromatic. For the love of god wash your parsley.")
;

INSERT INTO recipes(name,protein,init_cost,serving_cost,cook_time,instructions) VALUES
	("Brownie in a Mug","Grains",25.00,0.20,5,CONCAT(
    "Melt Butter: Place butter in a 10-12 oz microwave-safe mug and microwave for 20-30 seconds until melted.",
	"\nCombine Wet Ingredients: Add the brown sugar, milk, and vanilla extract to the melted butter. Whisk with a fork until smooth.",
	"\nAdd Dry Ingredients: Mix in the flour, cocoa powder, and salt until just combined. Do not overmix, as this can make the brownie rubbery.",
	"\nAdd Chips: Fold in the chocolate chips, choose the type of chocolate chips you prefer.",
	"\nMicrowave: Microwave on high for 1 minute to 1 minute 15 seconds. The edges should be set, but the center may still look slightly gooey.",
	"\nRest & Serve: Let it cool for 3-5 minutes (important for the fudgy texture to set) and serve with vanilla ice cream.")),
    ("Ramen Carbonara","Bacon",20.00,5.00,30,CONCAT(
    "Boil noodles according to package instructions, discard seasoning. Save 1/4 cup of cooking water to loosen sauce later, if needed.",
    " Drain noodles and toss with olive oil so they don't stick.",
	"\nHeat medium skillet over medium heat. Cook 1/2'' chopped bacon pieces until brown and crisp, then add garlic and cook for 1-2 minutes.",
	"\nAdd the noodles to the skillet and toss with the bacon until the noodles are coated in the bacon fat. Turn off the heat. ",
    "Beat eggs with fork and mix in Parmesan cheese. Pour egg-cheese mixture to skillet and toss with bacon and noodles. ",
    "(The residual heat of the pan will cook the egg-mixture, but do not overcook or the eggs will scramble!)",
    "\nDivide between bowls. Garnish with parsley and freshly ground pepper."))
;

INSERT INTO ingredients_for_recipe(recipe_id,ingredient_id,quantity) VALUES
	(1,1,"2 Tbsp"),(1,2,"3 Tbsp"),(1,3,"3 Tbsp"),(1,4,"1/4 Tsp"),(1,5,"3 Tbsp"),(1,6,"2 Tbsp"),(1,7,"1 Pinch"),(1,8,"2 Tbsp"),
    (2,9,"3 Packs"),(2,10,"1 Tbsp"),(2,11,"6 Slices"),(2,12,"2 Cloves"),(2,13,"2"),(2,14,"3/4 Cup"),(2,15,""),(2,16,"1 Tbsp"),(2,7,"")
;


SELECT 
    r.name AS recipe_name,
    i.name AS ingredient_name,
    ifr.quantity,
    i.info
FROM recipes r
JOIN ingredients_for_recipe ifr ON r.id = ifr.recipe_id
JOIN ingredients i ON ifr.ingredient_id = i.id
WHERE r.id = 2;