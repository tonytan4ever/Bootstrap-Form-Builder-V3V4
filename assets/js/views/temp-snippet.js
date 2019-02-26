define([
       "views/snippet", 
       "text!templates/app/temp.html"
], function(
  SnippetView, _tempTemplate
){
  return SnippetView.extend({
    init: function(options){
      this.clsname = "TempSnippetView";
      this._super(options);
    
      this.$el.addClass("temp");
      this.$el.on("newTempPostRender", $.proxy(this.postRender, this));
      this.tempTemplate = _.partial(Mustache.to_html, _tempTemplate);
    },
    
    render: function() {
      return this.$el.html(this.tempTemplate({text: this._super(this).html()}));
    }, 
    
    postRender: function(mouseEvent){
      this.tempForm  = this.$el.find("form")[0];
      this.halfHeight = Math.floor(this.tempForm.clientHeight/2);
      this.halfWidth  = Math.floor(this.tempForm.clientWidth/2);
      this.centerOnEvent(mouseEvent);
    }, 
    
    events:{
      "mousemove": "mouseMoveHandler",
      "mouseup" : "mouseUpHandler"
    }, 
    
    centerOnEvent: function(mouseEvent){
      var mouseX     = mouseEvent.pageX;
      var mouseY     = mouseEvent.pageY;
      
      this.tempForm.style.top = (mouseY - this.halfHeight) + "px";
      this.tempForm.style.left = (mouseX - this.halfWidth) + "px";
      // Make sure the element has been drawn and
      // has height in the dom before triggering.
      $("#build > form > fieldset").trigger("tempMove", [mouseEvent, this.halfWidth]);
    }, 
    
    
    mouseMoveHandler: function(mouseEvent) {
      mouseEvent.preventDefault();
      this.centerOnEvent(mouseEvent);
    },
    
    mouseUpHandler: function(mouseEvent){
      mouseEvent.preventDefault();
      $("#build > form > fieldset").trigger("tempDrop", [mouseEvent, this.model, this.halfWidth]);
      this.$el.remove();
    }
  });
});