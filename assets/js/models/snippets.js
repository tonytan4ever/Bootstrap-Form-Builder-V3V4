define([
  'class'
], function(Class) {
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
      }, { 
          index: function() {
            if(window['INDEX'] === null)
               window['INDEX'] = -1;
            window["INNER_INDEX"] = 0;
        	return ++window['INDEX']||(window['INDEX']=0);
    	  },
    	  increIndex: function() {
            if(window['INDEX'] === null)
               window['INDEX'] = -1;
            window["INNER_INDEX"] = 0;
        	++window['INDEX']||(window['INDEX']=0);
    	  },  
    	  getIndex: function() {
    	  	return window['INDEX'].toString();
    	  },
    	  first: function() {
    	  	return window['INDEX'] == 0;
    	  },
    	  resetIndex: function() {
    	     window["INNER_INDEX"]=null;
        	 window['INDEX']=null;
        	 return;
    	  },
    	  // this is just for radiovalues and checkboxesvalues 
    	  getNthValue: function() {
		    	if(window["INNER_INDEX"] == window['INDEX']){
		    		window["INNER_INDEX"]++;
		    		return true;
		    	} else {
		    		window["INNER_INDEX"]++;
		    		return false;
		    	}
    	  }
    	  
    	  });
    },
    
    idFriendlyTitle: function(){
      return this.get("title").replace(/\W/g,'').toLowerCase();
    },
    
    setField: function(name, value) {
      var fields = this.get("fields");
      fields[name]["value"] = value;
      this.set("fields", fields);
    }
  });
});