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
        // Class name is actually not needed
		this.clsname="snippets";
    
    	this.data = options;
    	// invisible element to hook up events
    	this.$el = $("<div/>");
    },
    
    on: function(event, handler) {
        // validation event name logic missing for now...
    	this.$el.on(event, handler);
    },
    
    add: function(item, options) {
    	var index = this.data.length;
    	if(options) {
    		index = options.at;
    	}
    	this.data.splice(index, 0, item.options);
    	this.$el.trigger("add", item, options);
    },
    
    remove: function(item, options) {
    	var index = this.data.length;
    	if(options) {
    		index = options.at;
    	}
    	this.data.splice(index, 0, item);
    },
    
    change: function(item, options) {
    	var index = this.data.length;
    	if(options) {
    		index = options.at;
    	}
    	this.data.splice(index, 0, item);
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