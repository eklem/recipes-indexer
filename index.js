var request = require("request");

var recipesklikk = {
	"recipes" : [],
	"ingredients" : []
}

//for (i = 0; i< 22; i++) {
for (i = 0; i< 1; i++) {
  //var offset = i * 2500
  var offset = 0
  
  request("https://www.kimonolabs.com/api/2t7lj88q?apikey=LAnqfEDgqLNoBU5mzVnigMJqY9sHuK6F&kimlimit=100&kimoffset=" + offset, 
  function(err, response, body) {
    if (body) {
    	console.log("body");
    	var obj = JSON.parse(body);
    	console.dir(obj.results);
    }
  });
}
