define([
       "jquery", 
       "collections/snippets",
       "collections/my-form-snippets", 
       "views/tab",
       "views/my-form",
       "text!data/input.json", "text!data/radio.json", "text!data/select.json", "text!data/button.json",
       "text!templates/app/render.html",  "text!templates/app/about.html",  
], function(
  $, 
  SnippetsCollection, 
  MyFormSnippetsCollection,
  TabView,
  MyFormView,
  inputJSON, radioJSON, selectJSON, buttonJSON,
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
        	collection: new SnippetsCollection(JSON.parse(radioJSON)),
      	});
      	
      	new TabView({
        	title: "Select",
        	collection: new SnippetsCollection(JSON.parse(selectJSON)),
      	});
      	
      	new TabView({
        	title: "Buttons",
        	collection: new SnippetsCollection(JSON.parse(buttonJSON)),
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
	    
	    var layout_number_of_columns = 1;
	     	     
	    myform_view = new MyFormView({
        	title: "Original", 
        	columns: layout_number_of_columns,
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
		
		//Deal with the layout column selector
	    $('#form-layout li').on('click', function(){
	    
	    	var output_tpl = _.template("Form Layout: <%= number %> column(s)");	    
		    $('#form-layout-text').val(output_tpl({number: $(this).attr("value")}));
		    layout_number_of_columns = $(this).attr("value");
		    myform_view.setLayoutNumberOfColumns(layout_number_of_columns);
		    myform_view.render()
		});
  	}
 }
});