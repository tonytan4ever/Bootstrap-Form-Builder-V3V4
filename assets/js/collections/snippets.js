define([
      "class", 
       "models/snippets", 
       "views/tab-snippet"
], function(
  Class, 
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
        if(!options.at)
          throw "Must specify the index of the element to remove";
        else
          index = options.at; 
    	this.data.splice(index, 1);
    	this.$el.trigger("remove", item, options);
    },
    
    change: function(item, options) {
    	if(!options.at && options.at < 0)
          throw "Must specify the index of the element to change";
        else
          index = options.at; 
    	this.data.splice(index, 1, item.options);
    	this.$el.trigger("change", item, options);
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