define([
       "jquery", 
       "collections/snippets",
       "collections/my-form-snippets", 
       "views/tab",
       "views/my-form",
       "text!data/input.json",
       "text!templates/app/render.html",  "text!templates/app/about.html",  
], function(
  $, 
  SnippetsCollection, 
  MyFormSnippetsCollection,
  TabView,
  MyFormView,
  inputJSON,
  renderTab, aboutTab
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
      	
      	new TabView({
	        title: "Rendered", 
	        content: renderTab
	    });
      
        new TabView({
        	title: "About", 
        	content: aboutTab
        });
    	
    	//Make the first tab active!
	    $("#components .tab-pane").first().addClass("active");
	    $("#formtabs li").first().addClass("active");
	     
	     	     
	    new MyFormView({
        	title: "Original", 
        	collection: new MyFormSnippetsCollection([
		          { "title" : "Form Name", 
		            "fields": {
		              "name" : {
		                "label"   : "Form Name", 
		                "type"  : "input", 
		                "value" : "Form Name"
		              }
		            }
		          }
		        ])
		});
  	}
 }
});