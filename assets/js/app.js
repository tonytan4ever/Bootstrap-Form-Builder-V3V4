define([
       "jquery", "collections/snippets", "views/tab" ,
       "text!data/input.json" , 
], function(
  $, SnippetsCollection, TabView,
  inputJSON
){
  return {
    initialize: function(){ 
    	var first = new TabView({
    		title: "Input",
    		collection: new SnippetsCollection(JSON.parse(inputJSON)),
    	});
    	
    	new TabView({
        	title: "Radios / Checkboxes",
      	});
    	
    	first.$el.addClass("active");
  	}
 }
});