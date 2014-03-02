define([
  "jquery", "mustache", "underscore", "class", 
  "text!templates/popover/popover-main.html", 
  "text!templates/popover/popover-input.html", 
  "text!templates/popover/popover-select.html", 
  "text!templates/popover/popover-textarea.html", 
  "text!templates/popover/popover-textarea-split.html", 
  "text!templates/popover/popover-checkbox.html", 
  "templates/snippet/snippet-templates", 
  "bootstrap"
], function(
  $, Mustache, _, Class, 
  _PopoverMain, 
  _PopoverInput,
  _PopoverSelect, 
  _PopoverTextArea,
  _PopoverTextAreaSplit,
  _PopoverCheckbox,
  _snippetTemplates
){
  return Class.extend({
    init: function(options){
      this.clsname = "SnippetView";
      
      this.options = options;
      if("model" in options){
      	this.model = options.model;
      }
      
      this.$el = $('<div/>').addClass("component");
      if(this.events != null)
      	_.each(this.events, $.proxy(function(val, key) {
	    		//console.log($.proxy(this[this.events[key]],this));
	    		this.$el.bind(key, $.proxy(this[this.events[key]],this));
      		}, this)
      	);
      
      this.template = _.partial(Mustache.to_html,
                               _snippetTemplates[this.model.idFriendlyTitle()]);
      this.popoverTemplates = {
        "input" : _.partial(Mustache.to_html,_PopoverInput),
        "select" : _.partial(Mustache.to_html,_PopoverSelect),
        "textarea" : _.partial(Mustache.to_html,_PopoverTextArea),
        "textarea-split" : _.partial(Mustache.to_html,_PopoverTextAreaSplit),
        "checkbox" : _.partial(Mustache.to_html,_PopoverCheckbox)
      }
    }, 
    
    
    render: function(withAttributes){
      var that = this;
      var popover_form_text = _.reduce(this.model.get("fields"), function(str, v, k){ 
      						v["name"] = k;
      						return str + that.popoverTemplates[v["type"]](v);
    				  }, "");
      var content = Mustache.to_html(_PopoverMain , {
        "title": that.model.get("title"),
        "items" : that.model.get("fields"),
        "popoverTemplates": that.popoverTemplates,
        "compiled" :  popover_form_text
      });
      
      if (withAttributes) {
        return this.$el.html(
          that.template(that.model.getValues())
        ).attr({
          "data-content"   : content, 
          "data-title"     : that.model.get("title"), 
          "data-trigger"   : "manual", 
          "data-html"      : true
        });
      } else {
        return this.$el.html(
          that.template(that.model.getValues())
        );
      }
    }
  });
});