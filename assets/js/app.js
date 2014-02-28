define([
       "jquery", "collections/snippets", "views/tab" ,
       "text!data/input.json" , 
], function(
  $, SnippetsCollection, TabView,
  inputJSON
){
  return {
    initialize: function(){ 
    	new TabView({
    		title: "Input",
    		collection: new SnippetsCollection(JSON.parse(inputJSON)),
    	});
    	
    	new TabView({
        	title: "Radios / Checkboxes",
      	});
    	
    	 //Make the first tab active!
	     $("#components .tab-pane").first().addClass("active");
	     $("#formtabs li").first().addClass("active");
  	}
 }
});