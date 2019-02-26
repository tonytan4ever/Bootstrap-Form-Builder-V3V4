define([
  "class",
  "views/temp-snippet",
  "text!templates/app/renderform.html"
], function(
  Class,
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
      this.bindCollectionEvents();

      this.$el = $("<fieldset/>")
      this.$build = $("#build");

      this.$el.on("mySnippetDrag", $.proxy(this.handleSnippetDrag, this));
      this.$el.on("tempMove", $.proxy(this.handleTempMove, this));
      this.$el.on("tempDrop", $.proxy(this.handleTempDrop, this));

      this.renderForm = _.partial(Mustache.to_html, _renderForm);
      this.render();
    },
    
    bindCollectionEvents: function() {
  	  this.collection.on("add", $.proxy(this.render, this));
	  this.collection.on("remove", $.proxy(this.render, this));
	  this.collection.on("change", $.proxy(this.render, this));
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

      if(this.columns == 2) {
        this.collection.setEachComponentWidth("col-sm-6", this.columns);
      } else {
        this.collection.setEachComponentWidth(null, this.column);
      }
      
      _.each(this.collection.renderAll(), function(snippet){
          that.$el.append(snippet);
      });

      $("#render").html(that.renderForm({
        text: _.map(this.collection.renderAllClean(), function(e){return e.html()}).join("\n")
      }));

      this.$el.appendTo("#build > form");
    },

    buildSamelineDropTarget: function(el) {
      var ret_val = el.clone().prop("id", "temp_drop_target");
      ret_val.find("label").text("");
      ret_val.find("div.col-sm-6").children().each(function() {
        if(!$(this).is('span.form-text')) {
          $(this).remove();
        }
      });
      ret_val.find("div.col-sm-6").append($(
        '<input name="textinput" type="text" class="form-control-md wg-target">'
      ));
      ret_val.find("span.form-text").html("&nbsp&nbsp");
      return ret_val;
    },

    getInsertAfterEl: function(el) {
      if($(el).attr("data-title") == 'Form Name')
        return $(el).next();
      else
        return $(el).next().next()
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

    handleSnippetDrag: function(mySnippetDragEvent, mouseEvent, snippetModel, removalOption) {
        var temp_snip = new TempSnippetView({model: snippetModel});
        $("body").append(temp_snip.render());
        this.collection.remove(snippetModel, removalOption);
        temp_snip.$el.trigger("newTempPostRender", mouseEvent);
      },

      handleTempMove: function(tempMoveEvent, mouseEvent, widthOffset){
        $(".target").removeClass("target");
        if(mouseEvent.pageX >= this.$build.offset().left  &&
           mouseEvent.pageX < (this.$build.width() + this.$build.offset().left + widthOffset) &&
           mouseEvent.pageY >= this.$build.offset().top &&
           mouseEvent.pageY < (this.$build.height() + this.$build.offset().top)
        ) {
            var bottom_above_element = this.getBottomAbove(mouseEvent.pageY);
            var data_title_attr = $(bottom_above_element).attr("data-title");

            // handle multi-columns target rendering
            $(bottom_above_element).addClass("target");
            if(this.columns > 1){
              // remove possible previous drop target.
              if($("div#temp_drop_target").length) {
                $("div#temp_drop_target").remove();
              }

              if(data_title_attr == 'Form Name'){
                $(bottom_above_element).addClass("head-insert");
              } else {
                $(".head-insert").removeClass("head-insert");
              }

              // TODO: Y coordinate for same row insert
              if(mouseEvent.pageX >= this.$build.width()/this.columns + this.$build.offset().left + widthOffset){
                $(bottom_above_element).removeClass('target');

                var insert_after_el = this.getInsertAfterEl(bottom_above_element);
                this.buildSamelineDropTarget(insert_after_el).insertAfter(insert_after_el);
              }
            }

      } else {
        $(".target").removeClass("target");
      }
    },

    handleTempDrop: function(tempDropEvent, mouseEvent, model, widthOffset, index){
      if($(".target").length || $("#temp_drop_target").length) {
        if($(".target").length) {
          var index = $(".target").index()
        } else {
          var index =  $('#temp_drop_target').index();
        }
        // adjust insert position for multiple columns
        // index++ may be problematic for more than 2 columns
        if(index % 2==1 && this.columns>1) {
          index++;
        }
        this.collection.add(model,{at: index+1});
      }

      $(".target").removeClass("target");
      $(".head-insert").removeClass("head-insert");
      $("div#temp_drop_target").remove()
    }
  })
});
