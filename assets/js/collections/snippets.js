define([
       "jquery" , "underscore" , "class", 
       "models/snippets", 
       "views/tab-snippet"
], function(
  $, _, Class, 
  SnippetModel, 
  TabSnippetView
){
  return Class.extend({
    init: function(options) {
    	this.data = options;
    },
    
    map: function(func) {
    	return _.map(this.data, func);
    }, 
    
    renderAll: function(){
      return this.map(function(snippet){
        //return new SnippetModel(snippet).getValues();
        return new TabSnippetView({model: new SnippetModel(snippet)}).render();
      });
    }
  });
});