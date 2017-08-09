define([
       "jquery", "mustache", "underscore", "class", 
       "views/temp-snippet",  
       "text!templates/app/renderform.html"
], function(
  $, Mustache, _, Class, 
  TempSnippetView, 
  _renderForm
){
  return Class.extend({
    
    init: function(options){
      // class name is actually not needed
      this.clsname="MyFormView";
      
      this.columns = options.columns || 1;
      
      this.collection = options.collection;
    
      //(TODO:) modify on add to render in more sizable way
      this.collection.on("add", $.proxy(this.render, this));
      this.collection.on("remove", $.proxy(this.render, this));
      this.collection.on("change", $.proxy(this.render, this));
      
      this.$el = $("<fieldset/>")
      this.$build = $("#build");
      
      this.$el.on("mySnippetDrag", $.proxy(this.handleSnippetDrag, this));
      this.$el.on("tempMove", $.proxy(this.handleTempMove, this));
      this.$el.on("tempDrop", $.proxy(this.handleTempDrop, this));
      
      this.renderForm = _.partial(Mustache.to_html, _renderForm);
      this.render();
    }, 
    
    setLayoutNumberOfColumns: function(layout_number_of_columns) {
      // reset the elements in your form if the layout has changed.
      if(this.columns != layout_number_of_columns)
      	this.collection.data = _.initial(this.collection.data, this.collection.data.length-1);
      this.columns = layout_number_of_columns;
    },
    
    render: function(){
    
      //Render Snippet Views
      this.$el.empty();
      var that = this;
      
      _.each(this.collection.renderAll(), function(snippet){
        that.$el.append(snippet);
      });
      
      if(this.columns == 2) {
      	this.collection.setEachComponentWidth("col-sm-6", this.columns);
      } else {
      	this.collection.setEachComponentWidth(null, this.column);
      }
      
      $("#render").html(that.renderForm({
        text: _.map(this.collection.renderAllClean(), function(e){return e.html()}).join("\n")
      }));
      
      this.$el.appendTo("#build > form"); 
    }, 
    
    getBottomAbove: function(eventY){
      var myFormBits = $(this.$el.find(".component"));
      var topelement = _.find(myFormBits, function(renderedSnippet) {
        if (($(renderedSnippet).offset().top + $(renderedSnippet).height()) > eventY  - 90) {
          return true;
        }
        else {
          return false;
        }
      });
      
      if (topelement){
        return topelement;
      } else {
        return myFormBits[0];
      }
    }, 
    
    handleSnippetDrag: function(mySnippetDragEvent, mouseEvent, snippetModel, 
       removalOption) {
      var temp_snip = new TempSnippetView({model: snippetModel});
      $("body").append(temp_snip.render());
      this.collection.remove(snippetModel, removalOption);
      temp_snip.$el.trigger("newTempPostRender", mouseEvent);
    }, 
    
    handleTempMove: function(tempMoveEvent, mouseEvent, widthOffset){
      $(".target").removeClass("target");
      if(mouseEvent.pageX >= this.$build.offset().left  &&
          mouseEvent.pageX < (this.$build.width() + this.$build.offset().left 
                                                               + widthOffset) &&
          mouseEvent.pageY >= this.$build.offset().top && 
          mouseEvent.pageY < (this.$build.height() + this.$build.offset().top)
          ){
        	var bottom_above_element = this.getBottomAbove(mouseEvent.pageY);
        	console.log($(bottom_above_element).attr("data-title"));
        	$(bottom_above_element).addClass("target")
        	if(this.columns > 1){
        		$(bottom_above_element).addClass("columns-"+this.columns);
        	}
        	
        // $(bottom_above_element).css({'float':'left'});
      } else {
        $(".target").removeClass("target");
      }
    }, 
    
    handleTempDrop: function(tempDropEvent, mouseEvent, model, widthOffset, index){
      if($(".target").length) {
        var index = $(".target").index();
        $(".target").removeClass("target");
        this.collection.add(model,{at: index+1});
      } else {
        $(".target").removeClass("target");
      }
    }
  })
});