define([
       "models/snippets", 
       "views/snippet", 
       "views/temp-snippet", 
], function( 
  SnippetModel, 
  SnippetView, 
  TempSnippetView 
){
  return SnippetView.extend({
    events:{
      "mousedown" : "mouseDownHandler"
    }, 
    
    mouseDownHandler: function(mouseDownEvent){
      mouseDownEvent.preventDefault();
      mouseDownEvent.stopPropagation();
      //hide all popovers
      $(".popover").hide();
      var new_temp_snippet = new TempSnippetView({model: new SnippetModel($.extend(true,{},this.model.attributes))});
      $("body").append(new_temp_snippet.render());
      new_temp_snippet.$el.trigger("newTempPostRender", mouseDownEvent);
    },
    
    init: function(options) {
        // classname just for convenience	
    	this.clsname = "TabSnippetView";
    	
    	this._super(options);
    }
  });
});