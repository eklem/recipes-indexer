var request = require("sync-request");

var recipesklikk = {
  "recipes" : [],
  "ingredients" : []
}

i = 0;
iterate = true;
do {
  var limit = 2500;
  var offset = i * limit;
  var url = "https://www.kimonolabs.com/api/2t7lj88q?apikey=LAnqfEDgqLNoBU5mzVnigMJqY9sHuK6F&kimlimit=" + limit + "&kimoffset=" + offset;

  // console.log(url);

  var kimono = request('GET', url);
  //console.log("\n request " + i + ": \n" +kimono.getBody('utf8'));
  var obj = JSON.parse(kimono.getBody('utf8'));

  // console.dir(obj.results.recipes);

  // Check if JSON contains recipes
  if (obj.results.recipes) {

    // use recipes.length to run throug all recipes and transform JSON to correct structure
    console.log("Recipes number: " + obj.results.recipes.length);
  }

  // Check if JSON contains ingredients
  if (obj.results.ingredients) {

    // use ingredients.length to run throug all recipes and transform JSON to correct structure
    console.log("Ingredients number: " + obj.results.ingredients.length);
  }

  // use obj.count to determin end of do/while loop, i.e. set a variable "iterate" to false
  console.log("Object count: " + obj.count);
  console.log("Iteration: " + i + "\n");
  if (obj.count < limit) {
    iterate = false;
  }
  i++;
} while (iterate);




    // request("https://www.kimonolabs.com/api/2t7lj88q?apikey=LAnqfEDgqLNoBU5mzVnigMJqY9sHuK6F&kimlimit=10&kimoffset=" + offset, 
    // function(err, response, body) {
    //  console.log(body);
    //  var obj = JSON.parse(body);

    //  // Check if JSON contains recipes
    //  if (obj.results.recipes) {
    //    console.log(obj.results.recipes.length);
    //    console.log("Object count: " + obj.count)
    //  }

    //  // Check if JSON contains ingredients
    //  if (obj.results.ingredients) {
    //    console.log(obj.results.ingredients.length);
    //    console.log("Object count: " + obj.count)
    //  }
    // });




  // request("https://www.kimonolabs.com/api/2t7lj88q?apikey=LAnqfEDgqLNoBU5mzVnigMJqY9sHuK6F&kimlimit=2500&kimoffset=" + offset, 
  // function(err, response, body) {
    
  //   // Check for errors
  //   if (err) {
  //    console.dir("Error!\n" + err)
  //   }
  //   else {
  //    // Get body and JSON parse it.
  //    console.log("body");
  //    var obj = JSON.parse(body);
  //    // console.dir(obj.results.recipes);
  //    // console.dir(obj.results.recipes.length);
      
  //    // Variable used to break loop if negative
  //    console.dir(obj.count);

  //  // If no more rows in body.results,
  //  // return recipe array and break for-loop
  //    if (obj.count <= -1) { 
  //      results = false;
  //    }
  //   }

  //   return results;

 
  // });