define([
       "jquery", "mustache", "underscore", "class", 
       "views/temp-snippet", 
       //"helper/pubsub", 
       "text!templates/app/renderform.html"
], function(
  $, Mustache, _, Class, 
  TempSnippetView, 
  //PubSub, 
  _renderForm
){
  return Class.extend({
    
    init: function(options){
      // class name is actually not needed
      this.clsname="MyFormView";
      
      this.collection = options.collection;
    
      //this.collection.on("add", this.render, this);
      //this.collection.on("remove", this.render, this);
      //this.collection.on("change", this.render, this);
      //PubSub.on("mySnippetDrag", this.handleSnippetDrag, this);
      //PubSub.on("tempMove", this.handleTempMove, this);
      //PubSub.on("tempDrop", this.handleTempDrop, this);
      this.$el = $("<fieldset/>")
      this.$build = $("#build");
      this.renderForm = _.partial(Mustache.to_html, _renderForm);
      this.render();
    }, 
    
    render: function(){
      //Render Snippet Views
      this.$el.empty();
      var that = this;
      _.each(this.collection.renderAll(), function(snippet){
        that.$el.append(snippet);
      });
      console.log(_.map(this.collection.renderAllClean(), function(e){return e.html()}).join("\n"));
      $("#render").val(that.renderForm({
        text: _.map(this.collection.renderAllClean(), function(e){return e.html()}).join("\n")
      }));
      
      this.$el.appendTo("#build > form");
      //this.delegateEvents(); 
    }, 
    
    getBottomAbove: function(eventY){
      var myFormBits = $(this.$el.find(".component"));
      var topelement = _.find(myFormBits, function(renderedSnippet) {
        if (($(renderedSnippet).position().top + $(renderedSnippet).height()) > eventY  - 90) {
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
    
    handleSnippetDrag: function(mouseEvent, snippetModel) {
      $("body").append(new TempSnippetView({model: snippetModel}).render());
      this.collection.remove(snippetModel);
      PubSub.trigger("newTempPostRender", mouseEvent);
    }, 
    
    handleTempMove: function(mouseEvent){
      $(".target").removeClass("target");
      if(mouseEvent.pageX >= this.$build.position().left &&
          mouseEvent.pageX < (this.$build.width() + this.$build.position().left) &&
          mouseEvent.pageY >= this.$build.position().top &&
          mouseEvent.pageY < (this.$build.height() + this.$build.position().top)){
        $(this.getBottomAbove(mouseEvent.pageY)).addClass("target");
      } else {
        $(".target").removeClass("target");
      }
    }, 
    
    handleTempDrop: function(mouseEvent, model, index){
      if(mouseEvent.pageX >= this.$build.position().left &&
         mouseEvent.pageX < (this.$build.width() + this.$build.position().left) &&
         mouseEvent.pageY >= this.$build.position().top &&
         mouseEvent.pageY < (this.$build.height() + this.$build.position().top)) {
        var index = $(".target").index();
        $(".target").removeClass("target");
        this.collection.add(model,{at: index+1});
      } else {
        $(".target").removeClass("target");
      }
    }
  })
});