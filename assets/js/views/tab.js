define([ 'class', "text!templates/app/tab-nav.html"
], function(Class, _tabNavTemplate){
	
	return Class.extend({
		init: function(options) {
		    /* Not too necessary for name*/
			this.clsname = "TabView";
			
			this.options = options;
			this.collection = options.collection;
			
			this.$el = $('<div/>', {
				class : "tab-pane"
			});
			this.id = this.options.title.toLowerCase().replace(/\W/g,'');
			this.tabNavTemplate = _.partial(Mustache.to_html, _tabNavTemplate);
			
			this.render();
		},
		
		
		render: function() {
		  // Render Snippet Views
		  var that = this;
		  if (that.collection !== undefined) {
		    _.each(this.collection.renderAll(), function(snippet){
		      that.$el.append(snippet);
		    });
		  } else if (that.options.content){
		    that.$el.append(that.options.content);
		  }
		  
		  // Render & append nav for tab
		  $("#formtabs").append(this.tabNavTemplate({title: this.options.title, id: this.id}))
		  // Render tab
		  this.$el.attr("id", this.id);
		  this.$el.appendTo(".tab-content");
		}
	
	})

})