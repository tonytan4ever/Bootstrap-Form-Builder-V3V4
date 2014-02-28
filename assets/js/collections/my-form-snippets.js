define([
       "jquery" , "underscore" , "class", 
       "models/snippets", 
       "collections/snippets", 
       "views/my-form-snippet"
], function(
  $, _, Class, 
  SnippetModel, 
  SnippetsCollection, 
  MyFormSnippetView
){
  return SnippetsCollection.extend({
    model: SnippetModel, 
    
    renderAll: function(){
      return this.map(function(snippet){
        return new MyFormSnippetView({model: new SnippetModel(snippet)}).render(true);
      })
    }, 
    
    renderAllClean: function(){
      return this.map(function(snippet){
        return new MyFormSnippetView({model: new SnippetModel(snippet)}).render(false);
      });
    }
  });
});