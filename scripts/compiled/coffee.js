var API, App, DB, DefaultSettings, FS, HeaderView, LanguageEmptyView, LanguageItem, LanguageItemView, LanguageSetting, LanguagesCollection, LanguagesCollectionView, LessonAudioCollection, LessonAudioModel, LessonCollection, LessonModel, ProductCollection, ProductCollectionView, ProductItem, ProductItemView, Setting, SettingItemView, SettingsCollection, SettingsCollectionView, VolumeSetting;

API = (function() {
  function API() {}

  API.call = function(path, onSuccess) {
    return $.ajax({
      context: this,
      crossDomain: true,
      accepts: {
        xml: 'text/xml',
        text: 'text/plain'
      },
      dataType: 'json',
      headers: {
        'accept': 'application/vnd.vilango.v1'
      },
      url: 'http://le3.staging.vilango.com/api/' + path,
      success: function(data) {
        onSuccess(data.response);
        return true;
      },
      error: function(jqXHR, textStatus, errorThrown) {
        return console.log(jqXHR);
      }
    });
  };

  return API;

})();

App = null;

DB = (function() {
  function DB() {}

  DB.init = function() {
    var cl, request;
    this.dbName = 'vilango';
    this.version = 2;
    this.db = null;
    this.commandStack = [];
    cl = this;
    request = indexedDB.open(this.dbName, this.version);
    request.onerror = function(event) {
      return console.log(event.target.errorCode);
    };
    request.onsuccess = function(event) {
      var _results;
      console.log('db initialized');
      cl.db = request.result;
      _results = [];
      while (cl.commandStack.length > 0) {
        _results.push(cl.commandStack.shift().command());
      }
      return _results;
    };
    return request.onupgradeneeded = function(event) {
      var db, objectStore;
      db = event.target.result;
      objectStore = db.createObjectStore('products', {
        keyPath: 'id'
      });
      objectStore.createIndex('id', 'id', {
        unique: true
      });
      objectStore.createIndex('key', 'key', {
        unique: true
      });
      objectStore = db.createObjectStore('lessons', {
        keyPath: 'id'
      });
      objectStore.createIndex('id', 'id', {
        unique: true
      });
      objectStore.createIndex('product_id', 'product_id', {
        unique: false
      });
      objectStore = db.createObjectStore('lesson_audios', {
        keyPath: 'id'
      });
      objectStore.createIndex('id', 'id', {
        unique: true
      });
      objectStore.createIndex('lesson_id', 'lesson_id', {
        unique: false
      });
      objectStore.createIndex('url', 'url', {
        unique: false
      });
      return objectStore = db.createObjectStore('settings', {
        keyPath: 'name'
      });
    };
  };

  DB.insertRecord = function(table, object) {
    var objectStore, request;
    if (this.db === null) {
      return this.commandStack.push({
        command: function() {
          return DB.insertRecord(table, object);
        }
      });
    } else {
      objectStore = this.db.transaction(table, 'readwrite').objectStore(table);
      return request = objectStore.add(object);
    }
  };

  DB.getRecord = function(table, keyName, keyValue, fn) {
    var index, objectStore, req;
    if (this.db === null) {
      return this.commandStack.push({
        command: function() {
          return DB.getRecord(table, keyName, keyValue, fn);
        }
      });
    } else {
      objectStore = this.db.transaction(table).objectStore(table);
      index = objectStore.index(keyName);
      req = index.get(keyValue);
      return req.onsuccess = function(event) {
        return fn(event.target.result);
      };
    }
  };

  DB.getRecords = function(table, keyName, keyValue, fn, complete) {
    var index, singleKeyRange;
    if (!this.db) {
      return this.commandStack.push({
        command: function() {
          return DB.getRecords(table, keyName, keyValue, fn, complete);
        }
      });
    } else {
      index = this.db.transaction(table).objectStore(table).index(keyName);
      singleKeyRange = IDBKeyRange.only(keyValue);
      return index.openCursor(singleKeyRange).onsuccess = function(event) {
        var cursor;
        cursor = event.target.result;
        if (cursor) {
          fn(cursor.value);
          return cursor["continue"]();
        } else {
          return complete();
        }
      };
    }
  };

  DB.getAllRecords = function(table, fn) {
    var objectStore;
    if (!this.db) {
      return this.commandStack.push({
        command: function() {
          return DB.getAllRecords(table, fn);
        }
      });
    } else {
      objectStore = this.db.transaction(table).objectStore(table);
      return objectStore.openCursor().onsuccess = function(event) {
        var cursor;
        cursor = event.target.result;
        if (cursor) {
          fn(cursor.value);
          return cursor["continue"]();
        }
      };
    }
  };

  DB.deleteRecord = function(table, key) {
    if (this.db === null) {
      return this.commandStack.push({
        command: function() {
          return DB.deleteRecord(table, key);
        }
      });
    } else {
      return this.db.transaction(table, "readwrite").objectStore(table)["delete"](key);
    }
  };

  DB.updateRecord = function(table, key, object) {
    var objectStore, request;
    if (this.db === null) {
      return this.commandStack.push({
        command: function() {
          return DB.updateRecord(table, key, object);
        }
      });
    } else {
      objectStore = this.db.transaction(table, 'readwrite').objectStore(table);
      request = objectStore.get(object[key]);
      return request.onsuccess = function(event) {
        return objectStore.put(object);
      };
    }
  };

  return DB;

})();

DB.init();

FS = (function() {
  function FS() {}

  FS.init = function() {
    var context, onInitFs;
    context = this;
    if (!this.fs) {
      window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
      onInitFs = function(fs) {
        context.fs = fs;
        context.currentpath = fs.root;
        return console.log('Opened file system: ' + fs.name);
      };
      return window.requestFileSystem(PERSISTENT, 50 * 1024 * 1024, onInitFs, this.errorHandler);
    }
  };

  FS.errorHandler = function(e) {
    var msg;
    msg = "";
    switch (e.code) {
      case FileError.QUOTA_EXCEEDED_ERR:
        msg = "QUOTA_EXCEEDED_ERR";
        break;
      case FileError.NOT_FOUND_ERR:
        msg = "NOT_FOUND_ERR";
        break;
      case FileError.SECURITY_ERR:
        msg = "SECURITY_ERR";
        break;
      case FileError.INVALID_MODIFICATION_ERR:
        msg = "INVALID_MODIFICATION_ERR";
        break;
      case FileError.INVALID_STATE_ERR:
        msg = "INVALID_STATE_ERR";
        break;
      default:
        msg = "Unknown Error";
    }
    return console.log("Error: " + msg);
  };

  FS.createFolder = function(foldername) {
    var retDirEntry;
    retDirEntry = null;
    this.fs.root.getDirectory(foldername, {
      create: true
    }, function(dirEntry) {
      return retDirEntry = dirEntry;
    }, this.errorHandler);
    return retDirEntry;
  };

  FS.getFile = function(path) {};

  FS.downloadFile = function(path, url) {
    var fs, xhr;
    fs = this.fs;
    xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.setRequestHeader('accept', 'application/vnd.vilango.v1');
    xhr.onload = function(e) {
      var res;
      if (this.status === 200) {
        console.log(this.response);
        res = this.response;
        return fs.root.getFile(path, {
          create: true
        }, function(fe) {
          fe.createWriter(function(writer) {
            return writer.write(res);
          });
          return console.log(fe.toURL());
        }, this.errorHandler);
      }
    };
    return xhr.send();
  };

  return FS;

})();

FS.init();

HeaderView = Backbone.Marionette.ItemView.extend({
  template: JST.header,
  tagName: 'div',
  className: 'header',
  initialize: function() {
    return App.headerRegion.show(this);
  },
  events: {
    'click #settingsbutton': function() {
      return this.showSettingsPage();
    },
    'click #productsbutton': function() {
      return this.showProductsPage();
    }
  },
  showSettingsPage: function() {
    App.mainRegion.close();
    return App.mainRegion.show(new SettingsCollectionView());
  },
  showProductsPage: function() {
    App.mainRegion.close();
    return App.mainRegion.show(new ProductCollectionView());
  }
});

LessonAudioModel = Backbone.Model.extend({
  defaults: {
    downloaded: false,
    needupdate: false,
    updated_at: null
  },
  initialize: function(audio) {
    var model;
    if (typeof audio !== 'object') {
      model = this;
      DB.getRecord('lesson_audios', 'id', audio, function(rec) {
        if (rec) {
          return model.set(rec);
        }
      });
    }
    return console.log(this.toJSON());
  },
  update: function(audioObject) {
    audioObject.downloaded = this.get('downloaded');
    audioObject.needupdate = true;
    return this.set(audioObject);
  },
  saveLocal: function() {
    var obj;
    console.log('saving audio local');
    obj = this.toJSON();
    console.log(obj);
    return DB.updateRecord('lesson_audios', 'id', obj);
  }
});

LessonAudioCollection = Backbone.Collection.extend({
  model: LessonAudioModel
});

LessonModel = Backbone.Model.extend({
  initialize: function(lesson) {
    var model;
    if (typeof lesson !== 'object') {
      model = this;
      DB.getRecord('lessons', 'id', lessonid, function(rec) {
        if (rec) {
          return model.set(rec);
        }
      });
    }
    return this.set('lesson_audios', null);
  },
  updateAudios: function(lesson_audios) {
    var lesson;
    lesson = this;
    return this.loadAudiosLocal(function() {
      var audiosLocal;
      audiosLocal = lesson.get('lesson_audios');
      console.log(audiosLocal);
      return _.each(lesson_audios, function(lesson_audio) {
        var local;
        local = audiosLocal.findWhere({
          id: lesson_audio.id
        });
        if (local) {
          if (!local.compare(lesson_audio)) {
            console.log('audio differs');
            local.update(lesson_audio);
            return local.saveLocal();
          } else {
            return console.log('no audio update needed so far');
          }
        } else {
          local = new LessonAudioModel(lesson_audio);
          audiosLocal.push(local);
          return local.saveLocal();
        }
      });
    });
  },
  update: function(lessonObject) {
    var lesson_audios;
    lesson_audios = lessonObject.lesson_audios;
    delete lessonObject.lesson_audios;
    this.set(lessonObject);
    return lessonObject.lesson_audios = lesson_audios;
  },
  loadAudiosLocal: function(done) {
    var lessonAudios;
    if (this.get('lesson_audios') && false) {
      return done();
    } else {
      lessonAudios = new LessonAudioCollection();
      this.set('lesson_audios', lessonAudios);
      return DB.getRecords('lesson_audios', 'lesson_id', this.get('id'), function(lessonAudio) {
        return lessonAudios.push(new LessonAudioModel(lessonAudio));
      }, function() {
        return done();
      });
    }
  },
  compare: function(lessonObject) {
    return this.get('updated_at') === lessonObject.updated_at;
  },
  saveLocal: function() {
    var obj;
    console.log('saving local');
    obj = this.toJSON();
    delete obj.lesson_audios;
    return DB.updateRecord('lessons', 'id', obj);
  }
});

LessonCollection = Backbone.Collection.extend({
  model: LessonModel
});

ProductItem = Backbone.Model.extend({
  defaults: {
    installed: false,
    pendingupdate: false,
    downloading: false
  },
  playAudio: function() {
    if (this.a) {
      if (this.a.paused) {
        this.a.play();
      } else {
        this.a.pause();
      }
    } else {
      this.a = document.createElement('audio');
      this.a.preload = 'auto';
      this.a.src = 'http://le3.staging.vilango.com/NORMAL.mp3';
      this.a.play();
    }
    return this.set({
      playing: !this.a.paused
    });
  },
  loadLessonsLocal: function(done) {
    var lessons;
    if (this.get('lessons')) {
      return done();
    } else {
      lessons = new LessonCollection();
      this.set('lessons', lessons);
      return DB.getRecords('lessons', 'product_id', this.get('id'), function(lesson) {
        return lessons.push(new LessonModel(lesson));
      }, function() {
        return done();
      });
    }
  },
  install: function() {
    var product;
    this.set({
      updated_at: ''
    });
    product = this;
    if (this.get('installed') === false) {
      this.set({
        installed: true,
        pendingupdates: true
      });
      return DB.insertRecord('products', this.toJSON());
    }
  },
  update: function() {
    var product;
    product = this;
    return this.loadLessonsLocal(function() {
      var apiurl, lessonsLocal;
      lessonsLocal = product.get('lessons');
      apiurl = 'lessons?product_id=' + product.get('id') + '&updated_at=' + product.get('updated_at');
      return API.call(apiurl, function(response) {
        if (response.length === 0) {
          return;
        }
        return _.each(response, function(lesson) {
          var local;
          local = lessonsLocal.findWhere({
            id: lesson.id
          });
          if (local) {
            if (!local.compare(lesson)) {
              local.update(lesson);
              local.saveLocal();
            } else {
              console.log('no update needed so far');
            }
          } else {
            local = new LessonModel(lesson);
            lessonsLocal.push(local);
            local.saveLocal();
          }
          return local.updateAudios(lesson.lesson_audios);
        });
      });
    });
  },
  uninstall: function() {
    var productid;
    if (this.get('installed')) {
      productid = this.get('id');
      DB.deleteRecord('products', productid);
      DB.getAllRecords('lessons', function(lesson) {
        if (lesson.productid === productid) {
          return DB.deleteRecord('lessons', lesson.id);
        }
      });
      return this.set({
        installed: false,
        pendingupdates: false
      });
    }
  }
});

ProductItemView = Backbone.Marionette.ItemView.extend({
  template: function(ser_model) {
    var templ;
    if (ser_model.installed === true) {
      if (ser_model.pendingupdates === true) {
        templ = JST['products_pendingProduct'];
      } else {
        templ = JST['products_installedProduct'];
      }
    } else {
      templ = JST['products_notinstalledProduct'];
    }
    return templ(ser_model);
  },
  tagName: 'p',
  className: 'products',
  events: {
    'click button': function(e) {
      var action;
      action = $(e.currentTarget).attr('data-action');
      if (action === 'install') {
        return this.model.install();
      } else if (action === 'uninstall') {
        return this.model.uninstall();
      } else if (action === 'download') {
        return this.model.update();
      }
    }
  }
});

ProductCollection = Backbone.Collection.extend({
  model: ProductItem,
  initialize: function() {
    return this.fetchProducts();
  },
  fetchProducts: function() {
    this.fetchInstalled();
    return this.fetchFromWeb();
  },
  fetchFromWeb: function() {
    var collection;
    collection = this;
    return API.call('products/', function(response) {
      return _.each(response, function(product) {
        var savedProduct;
        if (this.where({
          id: product.id
        }).length === 0) {
          return savedProduct = this.add(product);
        }
      }, collection);
    });
  },
  fetchInstalled: function() {
    var collection;
    collection = this;
    return DB.getAllRecords('products', function(product) {
      return collection.add(product);
    });
  }
});

ProductCollectionView = Backbone.Marionette.CompositeView.extend({
  tagName: 'div',
  id: 'products',
  template: JST.products_ProductCollection,
  itemView: ProductItemView,
  appendHtml: function(collectionView, itemView) {
    var target;
    if (itemView.model.get('installed')) {
      if (itemView.model.get('pendingupdates')) {
        target = '#pending';
      } else {
        target = '#installed';
      }
    } else {
      target = '#notinstalled';
    }
    return collectionView.$(target).append(itemView.el);
  },
  initialize: function() {
    this.collection = new ProductCollection();
    this.listenTo(this.collection, 'change', this.render);
    return App.mainRegion.show(this);
  }
});

Setting = Backbone.Model.extend();

LanguageSetting = Setting.extend({
  initialize: function(options) {
    var available;
    this.set('template', 'settings_Language');
    available = [];
    _.each(App.I18n.options.resStore, function(lang) {
      available.push({
        lang: lang.lang,
        title: lang.name
      });
      if (lang.lang === options.value) {
        return this.set('title', lang.name);
      }
    }, this);
    return this.set('available', available);
  },
  setValue: function(lang) {
    var newLang;
    newLang = _.where(this.get('available'), {
      lang: lang
    });
    this.set({
      value: newLang[0].lang,
      title: newLang[0].title
    });
    return App.I18n.setLng(this.get('value'), function(t) {
      if (App.headerRegion.currentView) {
        App.headerRegion.currentView.render();
      }
      if (App.mainRegion.currentView) {
        return App.mainRegion.currentView.render();
      }
    });
  },
  saveToDB: function() {
    return this.collection.saveSetting({
      name: 'language',
      value: this.get('value')
    });
  },
  events: {
    'click a': function(e) {
      var lang;
      lang = $(e.currentTarget).attr('data-lang');
      this.model.setValue(lang);
      return this.model.saveToDB();
    }
  }
});

VolumeSetting = Setting.extend({
  initialize: function() {
    return this.set('template', 'settings_Volume');
  },
  events: []
});

SettingsCollection = Backbone.Collection.extend({
  model: Setting,
  initialize: function() {
    this.loadDefaultSettings();
    return this.fetchSettingsFromStore();
  },
  loadDefaultSettings: function() {
    return _.each(DefaultSettings, function(setting) {
      var newSetting, settingType;
      switch (setting.name) {
        case 'language':
          settingType = LanguageSetting;
          break;
        case 'volume':
          settingType = VolumeSetting;
          break;
        default:
          settingType = Setting;
      }
      newSetting = new settingType({
        name: setting.name,
        value: setting.value
      });
      return this.add(newSetting);
    }, this);
  },
  fetchSettingsFromStore: function() {
    var collection;
    collection = this;
    return DB.getAllRecords('settings', function(savedSetting) {
      var setting;
      setting = collection.findWhere({
        name: savedSetting.name
      });
      return setting.setValue(savedSetting.value);
    });
  },
  saveSetting: function(setting) {
    return DB.updateRecord('settings', 'name', setting);
  }
});

DefaultSettings = [
  {
    name: 'language',
    value: 'en'
  }, {
    name: 'volume',
    value: 0.7
  }
];

SettingItemView = Backbone.Marionette.ItemView.extend({
  tagName: 'div',
  className: '',
  template: function(ser_model) {
    return JST[ser_model.template](ser_model);
  },
  initialize: function() {
    return this.events = this.model.events;
  }
});

SettingsCollectionView = Backbone.Marionette.CompositeView.extend({
  id: 'settingsholder',
  tagName: 'div',
  template: JST.settings_SettingsPanel,
  itemView: SettingItemView,
  initialize: function() {
    this.collection = App.settings;
    return this.listenTo(this.collection, 'change', this.render);
  },
  appendHtml: function(collectionView, itemView) {
    return collectionView.$('#settingsholder').append(itemView.el);
  }
});

LanguageItem = Backbone.Model.extend();

LanguageItemView = Backbone.Marionette.ItemView.extend({
  template: JST.language_LanguageItem,
  tagName: 'option',
  className: ''
});

LanguageEmptyView = Backbone.Marionette.ItemView.extend({
  template: JST.language_LanguageEmpty,
  tagName: 'div',
  className: ''
});

LanguagesCollection = Backbone.Collection.extend({
  model: LanguageItem,
  initialize: function(I18n) {
    return _.each(I18n.options.resStore, function(lang) {
      return this.add({
        lang: lang.lang,
        title: lang.name
      });
    }, this);
  }
});

LanguagesCollectionView = Backbone.Marionette.CollectionView.extend({
  itemView: LanguageItemView,
  emptyView: LanguageEmptyView,
  initialize: function(VA, I18n) {
    this.collection = new LanguagesCollection(I18n);
    return console.log(this.collection);
  }
});
