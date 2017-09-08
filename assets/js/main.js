require.config({
  baseUrl: "assets/js/lib/",
  paths: {
	'jquery': 'http://code.jquery.com/jquery-3.1.1',
	'mustache' : "http://rawgithub.com/janl/mustache.js/master/mustache",
	'tether' : "https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether",
	'bootstrap' : "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap",
	'underscore' :  "https://rawgithub.com/jashkenas/underscore/master/underscore",
	'text'  : "https://rawgithub.com/requirejs/text/latest/text",
	'app'   : "..",
	 collections : "../collections",
	 data        : "../data",
	 models      : "../models",
	 helper      : "../helper",
	 templates   : "../templates",
	 views       : "../views"
  }, shim: {
    'underscore': {
	      exports: '_'
	},

    'bootstrap': {
      deps: ['jquery', 'tether'],
      exports: '$.fn.popover'
    }
  }
});

require(['app/app'], function(app){
  app.initialize();
});
