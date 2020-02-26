require.config({
  baseUrl: "assets/js/lib/",
  paths: {
	'jquery': 'https://code.jquery.com/jquery-3.2.1',
	'mustache' : "http://rawgithub.com/janl/mustache.js/v3.1.0/mustache",
	'popper' : "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper",
	'bootstrap' : "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap",
	'underscore' :  "https://rawgithub.com/jashkenas/underscore/master/underscore",
	'text'  : "https://rawgithub.com/requirejs/text/latest/text",
	'app'   : "..",
	 collections : "../collections",
	 data        : "../data",
	 models      : "../models",
	 helper      : "../helper",
	 templates   : "../templates",
	 views       : "../views"
  },
  shim: {
    'underscore': {
	      exports: '_'
	},
    'popper': {
        'exports': 'Popper.default'
    },
    bootstrap: {
      deps: ['jquery', 'popper'],
      exports: 'bootstrap'
    },
  }
});


require(['jquery','popper'], function($, popper){
  window.Popper = popper;
  require([ 'bootstrap'], function(bootstrap) {
    console.log("loaded");
  });
});

require(['app/app'], function(app){
  app.initialize();
});
