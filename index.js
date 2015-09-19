var request  = require("sync-request");
var jhash    = require("jhash");
               jhash.setSymbols('0123456789');
var _        = require('lodash');
var jsonfile = require('jsonfile');
               var dir = "/Users/eklem/node_modules/recipes-indexer/data/";


var recipesklikk = {
  "recipes" : [],
  "ingredients" : []
};
console.dir(recipesklikk.recipes);

i = 0;
content = true;
do {
  var limit = 2500;
  var offset = i * limit;
  var url = "https://www.kimonolabs.com/api/2t7lj88q?apikey=LAnqfEDgqLNoBU5mzVnigMJqY9sHuK6F&kimlimit=" + limit + "&kimoffset=" + offset;

  // console.log(url);

  var kimono = request('GET', url, {'statusCode': {}});
  

  // console.log(kimono.statusCode);

  // Error handling
  if (kimono.statusCode >= 400) {
    console.log("Error, type: " + kimono.statusCode + " on offset: " + offset + "\n");
  } else {
    // Process content
    var obj = JSON.parse(kimono.getBody('utf8'));   

    // Check if JSON contains recipes
    if (obj.results.recipes) {
      // console.dir(obj.results.recipes);
      // use recipes.length to run throug all recipes and transform JSON to correct structure
      

      // Use .map to edit object
      obj.results.recipes.map(function (recipe){
        delete recipe.index;
        if (recipe.country) {
          recipe.country = recipe.country.text;
        }
        if (recipe.cheff.href) {
          recipe.cheff = recipe.cheff.text;
        }
        recipe.ingredients = new Array();
        recipe.id = jhash.hash(recipe.url);
        // console.log("recipe: " + JSON.stringify(recipe, null, 2));
      })
      recipesklikk.recipes.push.apply(recipesklikk.recipes, obj.results.recipes);
      console.log("Recipes count     : " + obj.results.recipes.length);
      console.log("Recipes array     : " + recipesklikk.recipes.length);
    }

    // Check if JSON contains ingredients
    if (obj.results.ingredients) {
      // console.dir(obj.results.ingredients);
      // use ingredients.length to run throug all recipes and transform JSON to correct structure
      // console.log("Ingredients count: " + obj.results.ingredients.length);

      obj.results.ingredients.map(function (ingredient){
        delete ingredient.index;
        ingredient.id = jhash.hash(ingredient.url);
        delete ingredient.url;
        // console.log("ingredient: " + JSON.stringify(ingredient, null, 2))

        // HERE YOU PUSH INGREDIENTS INTO ARRAY, working now!!!
        console.log("Ingredient to add: " + ingredient.ingredient);
        _.find(recipesklikk.recipes, _.matches({ 'id': ingredient.id })).ingredients.push(ingredient.ingredient);
        
        // recipesklikk.recipes.[recipeid].ingredients.push.(recipesklikk.recipes.[recipeid].ingredients, ingredient.ingredient);
        // console.dir(recipesklikk.recipes.[recipeid]);
      })
      recipesklikk.ingredients.push.apply(recipesklikk.ingredients, obj.results.ingredients);
      console.log("Ingredients count : " + obj.results.ingredients.length);
      console.log("Ingredients array : " + recipesklikk.ingredients.length);
    }

    // use obj.count to determin end of do/while loop, i.e. set a variable "iterate" to false
    console.log("Object count     : " + obj.count);
    console.log("Content batch    : " + i);
    console.log("HTTP Status code : " + kimono.statusCode + "\n");


    if (obj.count < limit) {
      content = false;
    }
    // Logging?
  }

  // iterator needed since I'm using do/while
  i++;
} while (content);

console.log("Recipes     : " + recipesklikk.recipes.length);
console.log("Ingredients : " + recipesklikk.ingredients.length);

console.dir(recipesklikk.recipes);
jsonfile.writeFileSync(dir + "klikk-recipes.json", recipesklikk.recipes, {spaces: 2})
jsonfile.writeFileSync(dir + "klikk-ingredients.json", recipesklikk.ingredients, {spaces: 2})

