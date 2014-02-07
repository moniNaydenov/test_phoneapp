define([
  "underscore",
  "backbone",
  "handlebars",
  "compiledhbs",
  "I18n",
  "locales",
  "indexedDB",
  "backbone.marionette",
  "compiledcoffee",
  "bootstrap-sass"
],
function (_, Backbone, Handlebars, Compiledhbs, I18n, locales) {
    
  var VA = new Backbone.Marionette.Application();
  App = VA;
  
  I18n.init({
      lng: 'en',
      resStore: locales,
      useCookie: false
  });
  
  
  Handlebars.registerHelper('t', function(i18n_key) {
    var result = I18n.t(i18n_key);
   
    return new Handlebars.SafeString(result);
  });
  Handlebars.registerHelper("log", function(context) {
    return console.log(context);
  });
  // An init function for your main application object
  VA.addInitializer(function () {
    this.root = '/';
  });

  // Add as many of these as you like
  VA.addInitializer(function () {
    VA.I18n = I18n;
    this.settings = new SettingsCollection();
  });
  
  VA.addRegions({
    headerRegion: '#header',
    mainRegion: '#content'
  });
  
  Backbone.Marionette.Renderer.render = function(template, data){
    return template(data);
  };
  

  VA.addInitializer(function(){
    var headerView = new HeaderView(VA);
  });

  // Return the instantiated app (there should only be one)
  return VA;

});


