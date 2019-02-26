define([
       "class", 
       "models/snippets", 
       "collections/snippets", 
       "views/my-form-snippet"
], function(
  Class, 
  SnippetModel, 
  SnippetsCollection, 
  MyFormSnippetView
){
  return SnippetsCollection.extend({
    model: SnippetModel,
    component_width: null, 
    
    setEachComponentWidth: function(component_width, columns) {
      this.component_width = component_width;
      this.columns = columns;
    }, 
    
    renderAll: function(){
      var that = this;
      return this.map(function(snippet, index){
        return new MyFormSnippetView({model: new SnippetModel(snippet),
                                      parentModel: that,
                                      component_width: that.component_width,
                                      columns: that.columns
                                      }).render(true);
      })
    }, 
    
    renderAllClean: function(){
      var that = this;
      return this.map(function(snippet){
        return new MyFormSnippetView({model: new SnippetModel(snippet),
        						      parentModel: that,
        						      component_width: that.component_width,
        						      columns: that.columns
        						     }).render(false);
      });
    }
  });
});