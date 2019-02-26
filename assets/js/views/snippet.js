define([
  "class", 
  "text!templates/popover/popover-main.html", 
  "text!templates/popover/popover-input.html", 
  "text!templates/popover/popover-select.html", 
  "text!templates/popover/popover-textarea.html", 
  "text!templates/popover/popover-textarea-split.html", 
  "text!templates/popover/popover-checkbox.html", 
  "templates/snippet/snippet-templates", 
], function(
  Class, 
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

      this.component_width = options.component_width;
      this.columns = options.columns;
      this.index = options.index; 
      
      this.$el = $('<div/>').addClass("component");
      if(this.events != null)
      	_.each(this.events, $.proxy(function(val, key) {
	    		this.$el.bind(key, $.proxy(this[this.events[key]],this));
      		}, this)
      	);

      var template_str = _snippetTemplates[this.model.idFriendlyTitle()];
      if(this.component_width && this.model.idFriendlyTitle() != 'formname'){
      	this.$el.addClass(this.component_width);
      	// temporary fix to support V4 2-column layout
      	this.$el.css("float", "left");
      
      	var outter_div_template = "<div class="+ this.component_width + ">{{{inner_html}}}</div>";
      	template_str = Mustache.to_html(outter_div_template, { inner_html:template_str  });
      }
      this.template = _.partial(Mustache.to_html, template_str);

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
      
      var template_context = that.model.getValues();

      if (withAttributes) {
        return_el =  this.$el.html(
          that.template(template_context)
        ).attr({
          "data-content"   : content, 
          "data-title"     : that.model.get("title"), 
          "data-trigger"   : "manual", 
          "data-html"      : true,
        });
        
        if(this.columns > 1 && this.model.idFriendlyTitle() != 'formname'){
	        //	var temp_return_el = return_el;
	        // 	return_el = $('<div class="row"/>');
	        //	return_el.append(temp_return_el);
	        	return_el.children().first().removeClass(this.component_width);
        }
        return return_el;
      } else {
        return this.$el.html(
          that.template(template_context)
        );
      }
    }
  });
});