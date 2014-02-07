define(['handlebars'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["header"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<h1>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "app.name", options) : helperMissing.call(depth0, "t", "app.name", options)))
    + "</h1>\n<div class=\"settings_nav\">\n  <button type=\"button\" class=\"btn btn-success\" id=\"productsbutton\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "products.products", options) : helperMissing.call(depth0, "t", "products.products", options)))
    + "</button>\n  <button type=\"button\" class=\"btn btn-info\" id=\"settingsbutton\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "settings.settings", options) : helperMissing.call(depth0, "t", "settings.settings", options)))
    + "</button>\n</div>";
  return buffer;
  });

this["JST"]["products_ProductCollection"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<div class=\"panel panel-success\">\n  <div class=\"panel-heading\">\n    <h3 class=\"panel-title\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "products.installed", options) : helperMissing.call(depth0, "t", "products.installed", options)))
    + "</h3>\n  </div>\n  <div class=\"panel-body\" id=\"installed\">\n  </div>\n</div>\n<div class=\"panel panel-warning\">\n  <div class=\"panel-heading\">\n    <h3 class=\"panel-title\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "products.pending", options) : helperMissing.call(depth0, "t", "products.pending", options)))
    + "</h3>\n  </div>\n  <div class=\"panel-body\" id=\"pending\">\n  </div>\n</div>\n<div class=\"panel panel-info\">\n  <div class=\"panel-heading\">\n    <h3 class=\"panel-title\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "products.available", options) : helperMissing.call(depth0, "t", "products.available", options)))
    + "</h3>\n  </div>\n  <div class=\"panel-body\" id=\"notinstalled\">\n  </div>\n</div>";
  return buffer;
  });

this["JST"]["products_installedProduct"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n<button type=\"button\" class=\"btn btn-danger btn-xs\" data-action=\"uninstall\"><span class=\"glyphicon glyphicon-remove\"></span> ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "products.uninstall", options) : helperMissing.call(depth0, "t", "products.uninstall", options)))
    + "</button>";
  return buffer;
  });

this["JST"]["products_notinstalledProduct"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n<button type=\"button\" class=\"btn btn-success btn-xs\" data-action=\"install\"><span class=\"glyphicon glyphicon-plus\"></span> ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "products.install", options) : helperMissing.call(depth0, "t", "products.install", options)))
    + "</button>";
  return buffer;
  });

this["JST"]["products_pendingProduct"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  return "\n<div class=\"progress\">\n<div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"30\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 60%;\">\n<span class=\"sr-only\">60% Complete</span>\n</div>\n</div>\n\n";
  }

  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n<button type=\"button\" class=\"btn btn-info btn-xs\" data-action=\"download\"><span class=\"glyphicon glyphicon-cloud-download\"></span> ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "products.download", options) : helperMissing.call(depth0, "t", "products.download", options)))
    + "</button>\n";
  stack2 = helpers['if'].call(depth0, (depth0 && depth0.downloading), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  return buffer;
  });

this["JST"]["settings_Language"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li><a href=\"#\" data-lang=\"";
  if (stack1 = helpers.lang) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.lang); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.title); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a></li>\n    ";
  return buffer;
  }

  buffer += "<h4>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "settings.language", options) : helperMissing.call(depth0, "t", "settings.language", options)))
    + "</h4>\n<div class=\"btn-group\">\n  <button type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\">\n    ";
  if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.title); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + " <span class=\"caret\"></span>\n  </button>\n  <ul class=\"dropdown-menu\" role=\"menu\">\n    ";
  stack2 = helpers.each.call(depth0, (depth0 && depth0.available), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </ul>\n</div>";
  return buffer;
  });

this["JST"]["settings_SettingsPanel"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<div class=\"panel panel-info\">\n  <div class=\"panel-heading\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers['t'] || (depth0 && depth0['t'])),stack1 ? stack1.call(depth0, "settings.main.panelTitle", options) : helperMissing.call(depth0, "t", "settings.main.panelTitle", options)))
    + "</div>\n  <div class=\"panel-body\" id=\"settingsholder\">    \n  </div>\n</div>";
  return buffer;
  });

this["JST"]["settings_Volume"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h4>Volume</h4>";
  });

return this["JST"];

});