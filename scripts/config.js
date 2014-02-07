requirejs.config({  
  shim: {
    backbone: {
      deps: ['underscore', 'jquery']
    },
    'compiledhbs': {
      deps: ['handlebars'],
      exports: 'Compiledhbs'
    },
    //underscore: {
   //   exports: '_'
   // },
    'handlebars': {
      exports: 'Handlebars'
    },
    'compiledcoffee': {
      'deps': ['backbone', 'compiledhbs', 'backbone.marionette', 'indexedDB'],
      'exports': 'compiledcoffee2'
    },
    'locales': {
      exports: 'locales'
    },
    'bootstrap-sass': {
      deps: ['jquery']
    },
    'indexedDB': {
      exports: 'indexedDB'
    }
  },
  paths: {
    jquery: '../bower_components/jquery/jquery',
    backbone: '../bower_components/backbone-amd/backbone',
    underscore: '../bower_components/underscore-amd/underscore',

    /* alias all marionette libs */
    'backbone.marionette'   : '../bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
    'backbone.wreqr'        : '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
    'backbone.babysitter'   : '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
    'backbone.eventbinder'  : '../bower_components/backbone.eventbinder/lib/amd/backbone.eventbinder',
    
    
    /* alias the bootstrap js lib */
    'bootstrap-sass': '../bower_components/bootstrap-sass/dist/js/bootstrap',
    'bootstrap-dropdown': '../bower_components/bootstrap-sass/js/dropdown',
    'handlebars': '../bower_components/handlebars/handlebars.runtime',
    'compiledcoffee': './compiled/coffee',
    'compiledhbs': './compiled/handlebars',
    'I18n': '../bower_components/i18next/release/i18next.amd-1.7.1',
    'locales': './compiled/locales',
    'indexedDB': '../bower_components/IndexedDBShim/dist/IndexedDbShim.min'
  },
  deps: ['main']
});


// deps: ['backbone.marionette', 'bootstrap', 'main'],


// shim: {
//     backbone: {
//         deps: [
//             'underscore',
//             'jquery'
//         ],
//         exports: 'Backbone'
//     },
//     bootstrap: {
//         deps: ['jquery'],
//         exports: 'jquery'
//     }
// },

// paths: {
//     jquery: '../<%= bowerDirectory %>/jquery/jquery',
//     backbone: '../<%= bowerDirectory %>/backbone-amd/backbone',
//     underscore: '../<%= bowerDirectory %>/underscore-amd/underscore',

//     /* alias all marionette libs */
//     'backbone.marionette': '../<%= bowerDirectory %>/backbone.marionette/lib/core/amd/backbone.marionette',
//     'backbone.wreqr': '../<%= bowerDirectory %>/backbone.wreqr/lib/amd/backbone.wreqr',
//     'backbone.babysitter': '../<%= bowerDirectory %>/backbone.babysitter/lib/amd/backbone.babysitter',

//     /* alias the bootstrap js lib */
//     bootstrap: 'vendor/bootstrap',

//     /* Alias text.js for template loading and shortcut the templates dir to tmpl */
//     text: '../<%= bowerDirectory %>/requirejs-text/text',
//     tmpl: "../templates",

//     /* handlebars from the require handlerbars plugin below */
//     handlebars: '../<%= bowerDirectory %>/require-handlebars-plugin/Handlebars',

//     /* require handlebars plugin - Alex Sexton */
//     i18nprecompile: '../<%= bowerDirectory %>/require-handlebars-plugin/hbs/i18nprecompile',
//     json2: '../<%= bowerDirectory %>/require-handlebars-plugin/hbs/json2',
//     hbs: '../<%= bowerDirectory %>/require-handlebars-plugin/hbs'
// },

// hbs: {
//     disableI18n: true
// }