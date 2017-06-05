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
    
    
    // TODO:  Add form div columnized logic according to
    // https://stackoverflow.com/questions/18428871/multi-column-forms-with-fieldsets
    renderAll: function(){
      var that = this;
      return this.map(function(snippet){
        return new MyFormSnippetView({model: new SnippetModel(snippet),
                                      parentModel: that,
                                      }).render(true);
      })
    }, 
    
    renderAllClean: function(){
      var that = this;
      return this.map(function(snippet){
        return new MyFormSnippetView({model: new SnippetModel(snippet),
        						      parentModel: that,
        						     }).render(false);
      });
    }
  });
});