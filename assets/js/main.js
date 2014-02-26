require.config({
  baseUrl: "assets/js/lib/",
  paths: {
	'jquery': 'http://code.jquery.com/jquery-2.1.0',
	'app'   : ".."
  }, shim: {
    'bootstrap': {
      deps: ['jquery'],
      exports: '$.fn.popover'
    }
  }
});
require([ 'app/app'], function(app){
  app.initialize();
});