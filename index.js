var request = require("sync-request");
var jhash = require("jhash");
            jhash.setSymbols('0123456789');
            // jhash.setMaskLen(6);

var recipesklikk = {
  "recipes" : [],
  "ingredients" : []
}

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
      // console.log("Recipes count    : " + obj.results.recipes.length);

      // Use .map to edit object
      obj.results.recipes.map(function (recipe){
        delete recipe.index;
        if (recipe.country) {
          recipe.country = recipe.country.text;
        }
        if (recipe.cheff.href) {
          recipe.cheff = recipe.cheff.text;
        }
        recipe.ingredients = [];
        recipe.id = jhash.hash(recipe.url);
        console.log("recipe: " + JSON.stringify(recipe, null, 2));
      })
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
        console.log("ingredient: " + JSON.stringify(ingredient, null, 2))
      })
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