var jsonfile = require('jsonfile');
var util     = require('util');
               var file = "/home/eklem/node_modules/recipes-indexer/data/klikk-recipes.json";
var options = {
  deletable: true,
  fieldedSearch: true,
  indexPath: '/home/eklem/si',
  logLevel: 'error',
  nGramLength: 1,
  stopwords: SearchIndex.getStopwords('no'),
  fieldsToStore: 'all'
  options.fieldOptions = [
    {fieldName: 'ingredients', {
      filter: true,
      nGramLength: SearchIndex.options.nGramLength,     //inherited from initialization options
      searchable: true,
      weight: 1,
      fieldedSearch: SearchIndex.options.fieldedSearch  //inherited from initialization options
    }
  ];
}

var si = require('search-index')(options);

jsonfile.readFile(file, options, function(err, obj) {
  console.log(obj)
  si.add(obj, options, function (err) {
    //add stuff to index
  });

});
