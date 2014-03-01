define([
      'jquery', 'underscore', 'class'
], function($,  _, Class) {
  return Class.extend({
    init: function(options){
    	this.options = options;
    	this.attributes = options;
    },
    
    get: function(k) {
    	if(k in this.options)
    		return this.options[k];
    	else
    		throw "Invalid key name: " + k;
    },
    
    set: function(k, v) {
    	if(k in this.options)
    		this.options[k] = v;
    	else
    		throw "Invalid key name: " + k;
    },

    getValues: function(){
      return _.reduce(this.get("fields"), function(o, v, k){
        if (v["type"] == "select") {
          o[k] = _.find(v["value"], function(o){return o.selected})["value"];
        } else {
          o[k]  = v["value"];
        }
        return o;
      }, {});
    },
    
    idFriendlyTitle: function(){
      return this.get("title").replace(/\W/g,'').toLowerCase();
    },
    
    setField: function(name, value) {
      var fields = this.get("fields")
      fields[name]["value"] = value;
      this.set("fields", fields);
    }
  });
});