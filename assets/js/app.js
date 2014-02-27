define([
       "jquery", "collections/snippets", "views/tab" ,
       "text!data/input.json" , 
], function(
  $, SnippetsCollection, TabView,
  inputJSON
){
  return {
    initialize: function(){
    
    	console.log(new SnippetsCollection(JSON.parse(inputJSON)).renderAll());
    
    	new TabView({
    		title: "Input",
    	});
    	
    	new TabView({
        	title: "Radios / Checkboxes",
      	});
    	
  	}
 }
});