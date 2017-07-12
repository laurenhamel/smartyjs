// smarty.js - a pure HTML + JS interactive learning solution
(function ($) {
    
    // Polyfills
    /* jshint ignore:start */
    $.pf = {
        
        webcomponents: function(){
/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
// @version 0.7.22
(function() {
  window.WebComponents = window.WebComponents || {
    flags: {}
  };
  var file = "webcomponents-lite.js";
  var script = document.querySelector('script[src*="' + file + '"]');
  var flags = {};
  if (!flags.noOpts) {
    location.search.slice(1).split("&").forEach(function(option) {
      var parts = option.split("=");
      var match;
      if (parts[0] && (match = parts[0].match(/wc-(.+)/))) {
        flags[match[1]] = parts[1] || true;
      }
    });
    if (script) {
      for (var i = 0, a; a = script.attributes[i]; i++) {
        if (a.name !== "src") {
          flags[a.name] = a.value || true;
        }
      }
    }
    if (flags.log && flags.log.split) {
      var parts = flags.log.split(",");
      flags.log = {};
      parts.forEach(function(f) {
        flags.log[f] = true;
      });
    } else {
      flags.log = {};
    }
  }
  if (flags.register) {
    window.CustomElements = window.CustomElements || {
      flags: {}
    };
    window.CustomElements.flags.register = flags.register;
  }
  WebComponents.flags = flags;
})();

(function(scope) {
  "use strict";
  var hasWorkingUrl = false;
  if (!scope.forceJURL) {
    try {
      var u = new URL("b", "http://a");
      u.pathname = "c%20d";
      hasWorkingUrl = u.href === "http://a/c%20d";
    } catch (e) {}
  }
  if (hasWorkingUrl) return;
  var relative = Object.create(null);
  relative["ftp"] = 21;
  relative["file"] = 0;
  relative["gopher"] = 70;
  relative["http"] = 80;
  relative["https"] = 443;
  relative["ws"] = 80;
  relative["wss"] = 443;
  var relativePathDotMapping = Object.create(null);
  relativePathDotMapping["%2e"] = ".";
  relativePathDotMapping[".%2e"] = "..";
  relativePathDotMapping["%2e."] = "..";
  relativePathDotMapping["%2e%2e"] = "..";
  function isRelativeScheme(scheme) {
    return relative[scheme] !== undefined;
  }
  function invalid() {
    clear.call(this);
    this._isInvalid = true;
  }
  function IDNAToASCII(h) {
    if ("" == h) {
      invalid.call(this);
    }
    return h.toLowerCase();
  }
  function percentEscape(c) {
    var unicode = c.charCodeAt(0);
    if (unicode > 32 && unicode < 127 && [ 34, 35, 60, 62, 63, 96 ].indexOf(unicode) == -1) {
      return c;
    }
    return encodeURIComponent(c);
  }
  function percentEscapeQuery(c) {
    var unicode = c.charCodeAt(0);
    if (unicode > 32 && unicode < 127 && [ 34, 35, 60, 62, 96 ].indexOf(unicode) == -1) {
      return c;
    }
    return encodeURIComponent(c);
  }
  var EOF = undefined, ALPHA = /[a-zA-Z]/, ALPHANUMERIC = /[a-zA-Z0-9\+\-\.]/;
  function parse(input, stateOverride, base) {
    function err(message) {
      errors.push(message);
    }
    var state = stateOverride || "scheme start", cursor = 0, buffer = "", seenAt = false, seenBracket = false, errors = [];
    loop: while ((input[cursor - 1] != EOF || cursor == 0) && !this._isInvalid) {
      var c = input[cursor];
      switch (state) {
       case "scheme start":
        if (c && ALPHA.test(c)) {
          buffer += c.toLowerCase();
          state = "scheme";
        } else if (!stateOverride) {
          buffer = "";
          state = "no scheme";
          continue;
        } else {
          err("Invalid scheme.");
          break loop;
        }
        break;

       case "scheme":
        if (c && ALPHANUMERIC.test(c)) {
          buffer += c.toLowerCase();
        } else if (":" == c) {
          this._scheme = buffer;
          buffer = "";
          if (stateOverride) {
            break loop;
          }
          if (isRelativeScheme(this._scheme)) {
            this._isRelative = true;
          }
          if ("file" == this._scheme) {
            state = "relative";
          } else if (this._isRelative && base && base._scheme == this._scheme) {
            state = "relative or authority";
          } else if (this._isRelative) {
            state = "authority first slash";
          } else {
            state = "scheme data";
          }
        } else if (!stateOverride) {
          buffer = "";
          cursor = 0;
          state = "no scheme";
          continue;
        } else if (EOF == c) {
          break loop;
        } else {
          err("Code point not allowed in scheme: " + c);
          break loop;
        }
        break;

       case "scheme data":
        if ("?" == c) {
          this._query = "?";
          state = "query";
        } else if ("#" == c) {
          this._fragment = "#";
          state = "fragment";
        } else {
          if (EOF != c && "	" != c && "\n" != c && "\r" != c) {
            this._schemeData += percentEscape(c);
          }
        }
        break;

       case "no scheme":
        if (!base || !isRelativeScheme(base._scheme)) {
          err("Missing scheme.");
          invalid.call(this);
        } else {
          state = "relative";
          continue;
        }
        break;

       case "relative or authority":
        if ("/" == c && "/" == input[cursor + 1]) {
          state = "authority ignore slashes";
        } else {
          err("Expected /, got: " + c);
          state = "relative";
          continue;
        }
        break;

       case "relative":
        this._isRelative = true;
        if ("file" != this._scheme) this._scheme = base._scheme;
        if (EOF == c) {
          this._host = base._host;
          this._port = base._port;
          this._path = base._path.slice();
          this._query = base._query;
          this._username = base._username;
          this._password = base._password;
          break loop;
        } else if ("/" == c || "\\" == c) {
          if ("\\" == c) err("\\ is an invalid code point.");
          state = "relative slash";
        } else if ("?" == c) {
          this._host = base._host;
          this._port = base._port;
          this._path = base._path.slice();
          this._query = "?";
          this._username = base._username;
          this._password = base._password;
          state = "query";
        } else if ("#" == c) {
          this._host = base._host;
          this._port = base._port;
          this._path = base._path.slice();
          this._query = base._query;
          this._fragment = "#";
          this._username = base._username;
          this._password = base._password;
          state = "fragment";
        } else {
          var nextC = input[cursor + 1];
          var nextNextC = input[cursor + 2];
          if ("file" != this._scheme || !ALPHA.test(c) || nextC != ":" && nextC != "|" || EOF != nextNextC && "/" != nextNextC && "\\" != nextNextC && "?" != nextNextC && "#" != nextNextC) {
            this._host = base._host;
            this._port = base._port;
            this._username = base._username;
            this._password = base._password;
            this._path = base._path.slice();
            this._path.pop();
          }
          state = "relative path";
          continue;
        }
        break;

       case "relative slash":
        if ("/" == c || "\\" == c) {
          if ("\\" == c) {
            err("\\ is an invalid code point.");
          }
          if ("file" == this._scheme) {
            state = "file host";
          } else {
            state = "authority ignore slashes";
          }
        } else {
          if ("file" != this._scheme) {
            this._host = base._host;
            this._port = base._port;
            this._username = base._username;
            this._password = base._password;
          }
          state = "relative path";
          continue;
        }
        break;

       case "authority first slash":
        if ("/" == c) {
          state = "authority second slash";
        } else {
          err("Expected '/', got: " + c);
          state = "authority ignore slashes";
          continue;
        }
        break;

       case "authority second slash":
        state = "authority ignore slashes";
        if ("/" != c) {
          err("Expected '/', got: " + c);
          continue;
        }
        break;

       case "authority ignore slashes":
        if ("/" != c && "\\" != c) {
          state = "authority";
          continue;
        } else {
          err("Expected authority, got: " + c);
        }
        break;

       case "authority":
        if ("@" == c) {
          if (seenAt) {
            err("@ already seen.");
            buffer += "%40";
          }
          seenAt = true;
          for (var i = 0; i < buffer.length; i++) {
            var cp = buffer[i];
            if ("	" == cp || "\n" == cp || "\r" == cp) {
              err("Invalid whitespace in authority.");
              continue;
            }
            if (":" == cp && null === this._password) {
              this._password = "";
              continue;
            }
            var tempC = percentEscape(cp);
            null !== this._password ? this._password += tempC : this._username += tempC;
          }
          buffer = "";
        } else if (EOF == c || "/" == c || "\\" == c || "?" == c || "#" == c) {
          cursor -= buffer.length;
          buffer = "";
          state = "host";
          continue;
        } else {
          buffer += c;
        }
        break;

       case "file host":
        if (EOF == c || "/" == c || "\\" == c || "?" == c || "#" == c) {
          if (buffer.length == 2 && ALPHA.test(buffer[0]) && (buffer[1] == ":" || buffer[1] == "|")) {
            state = "relative path";
          } else if (buffer.length == 0) {
            state = "relative path start";
          } else {
            this._host = IDNAToASCII.call(this, buffer);
            buffer = "";
            state = "relative path start";
          }
          continue;
        } else if ("	" == c || "\n" == c || "\r" == c) {
          err("Invalid whitespace in file host.");
        } else {
          buffer += c;
        }
        break;

       case "host":
       case "hostname":
        if (":" == c && !seenBracket) {
          this._host = IDNAToASCII.call(this, buffer);
          buffer = "";
          state = "port";
          if ("hostname" == stateOverride) {
            break loop;
          }
        } else if (EOF == c || "/" == c || "\\" == c || "?" == c || "#" == c) {
          this._host = IDNAToASCII.call(this, buffer);
          buffer = "";
          state = "relative path start";
          if (stateOverride) {
            break loop;
          }
          continue;
        } else if ("	" != c && "\n" != c && "\r" != c) {
          if ("[" == c) {
            seenBracket = true;
          } else if ("]" == c) {
            seenBracket = false;
          }
          buffer += c;
        } else {
          err("Invalid code point in host/hostname: " + c);
        }
        break;

       case "port":
        if (/[0-9]/.test(c)) {
          buffer += c;
        } else if (EOF == c || "/" == c || "\\" == c || "?" == c || "#" == c || stateOverride) {
          if ("" != buffer) {
            var temp = parseInt(buffer, 10);
            if (temp != relative[this._scheme]) {
              this._port = temp + "";
            }
            buffer = "";
          }
          if (stateOverride) {
            break loop;
          }
          state = "relative path start";
          continue;
        } else if ("	" == c || "\n" == c || "\r" == c) {
          err("Invalid code point in port: " + c);
        } else {
          invalid.call(this);
        }
        break;

       case "relative path start":
        if ("\\" == c) err("'\\' not allowed in path.");
        state = "relative path";
        if ("/" != c && "\\" != c) {
          continue;
        }
        break;

       case "relative path":
        if (EOF == c || "/" == c || "\\" == c || !stateOverride && ("?" == c || "#" == c)) {
          if ("\\" == c) {
            err("\\ not allowed in relative path.");
          }
          var tmp;
          if (tmp = relativePathDotMapping[buffer.toLowerCase()]) {
            buffer = tmp;
          }
          if (".." == buffer) {
            this._path.pop();
            if ("/" != c && "\\" != c) {
              this._path.push("");
            }
          } else if ("." == buffer && "/" != c && "\\" != c) {
            this._path.push("");
          } else if ("." != buffer) {
            if ("file" == this._scheme && this._path.length == 0 && buffer.length == 2 && ALPHA.test(buffer[0]) && buffer[1] == "|") {
              buffer = buffer[0] + ":";
            }
            this._path.push(buffer);
          }
          buffer = "";
          if ("?" == c) {
            this._query = "?";
            state = "query";
          } else if ("#" == c) {
            this._fragment = "#";
            state = "fragment";
          }
        } else if ("	" != c && "\n" != c && "\r" != c) {
          buffer += percentEscape(c);
        }
        break;

       case "query":
        if (!stateOverride && "#" == c) {
          this._fragment = "#";
          state = "fragment";
        } else if (EOF != c && "	" != c && "\n" != c && "\r" != c) {
          this._query += percentEscapeQuery(c);
        }
        break;

       case "fragment":
        if (EOF != c && "	" != c && "\n" != c && "\r" != c) {
          this._fragment += c;
        }
        break;
      }
      cursor++;
    }
  }
  function clear() {
    this._scheme = "";
    this._schemeData = "";
    this._username = "";
    this._password = null;
    this._host = "";
    this._port = "";
    this._path = [];
    this._query = "";
    this._fragment = "";
    this._isInvalid = false;
    this._isRelative = false;
  }
  function jURL(url, base) {
    if (base !== undefined && !(base instanceof jURL)) base = new jURL(String(base));
    this._url = url;
    clear.call(this);
    var input = url.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g, "");
    parse.call(this, input, null, base);
  }
  jURL.prototype = {
    toString: function() {
      return this.href;
    },
    get href() {
      if (this._isInvalid) return this._url;
      var authority = "";
      if ("" != this._username || null != this._password) {
        authority = this._username + (null != this._password ? ":" + this._password : "") + "@";
      }
      return this.protocol + (this._isRelative ? "//" + authority + this.host : "") + this.pathname + this._query + this._fragment;
    },
    set href(href) {
      clear.call(this);
      parse.call(this, href);
    },
    get protocol() {
      return this._scheme + ":";
    },
    set protocol(protocol) {
      if (this._isInvalid) return;
      parse.call(this, protocol + ":", "scheme start");
    },
    get host() {
      return this._isInvalid ? "" : this._port ? this._host + ":" + this._port : this._host;
    },
    set host(host) {
      if (this._isInvalid || !this._isRelative) return;
      parse.call(this, host, "host");
    },
    get hostname() {
      return this._host;
    },
    set hostname(hostname) {
      if (this._isInvalid || !this._isRelative) return;
      parse.call(this, hostname, "hostname");
    },
    get port() {
      return this._port;
    },
    set port(port) {
      if (this._isInvalid || !this._isRelative) return;
      parse.call(this, port, "port");
    },
    get pathname() {
      return this._isInvalid ? "" : this._isRelative ? "/" + this._path.join("/") : this._schemeData;
    },
    set pathname(pathname) {
      if (this._isInvalid || !this._isRelative) return;
      this._path = [];
      parse.call(this, pathname, "relative path start");
    },
    get search() {
      return this._isInvalid || !this._query || "?" == this._query ? "" : this._query;
    },
    set search(search) {
      if (this._isInvalid || !this._isRelative) return;
      this._query = "?";
      if ("?" == search[0]) search = search.slice(1);
      parse.call(this, search, "query");
    },
    get hash() {
      return this._isInvalid || !this._fragment || "#" == this._fragment ? "" : this._fragment;
    },
    set hash(hash) {
      if (this._isInvalid) return;
      this._fragment = "#";
      if ("#" == hash[0]) hash = hash.slice(1);
      parse.call(this, hash, "fragment");
    },
    get origin() {
      var host;
      if (this._isInvalid || !this._scheme) {
        return "";
      }
      switch (this._scheme) {
       case "data":
       case "file":
       case "javascript":
       case "mailto":
        return "null";
      }
      host = this.host;
      if (!host) {
        return "";
      }
      return this._scheme + "://" + host;
    }
  };
  var OriginalURL = scope.URL;
  if (OriginalURL) {
    jURL.createObjectURL = function(blob) {
      return OriginalURL.createObjectURL.apply(OriginalURL, arguments);
    };
    jURL.revokeObjectURL = function(url) {
      OriginalURL.revokeObjectURL(url);
    };
  }
  scope.URL = jURL;
})(self);

if (typeof WeakMap === "undefined") {
  (function() {
    var defineProperty = Object.defineProperty;
    var counter = Date.now() % 1e9;
    var WeakMap = function() {
      this.name = "__st" + (Math.random() * 1e9 >>> 0) + (counter++ + "__");
    };
    WeakMap.prototype = {
      set: function(key, value) {
        var entry = key[this.name];
        if (entry && entry[0] === key) entry[1] = value; else defineProperty(key, this.name, {
          value: [ key, value ],
          writable: true
        });
        return this;
      },
      get: function(key) {
        var entry;
        return (entry = key[this.name]) && entry[0] === key ? entry[1] : undefined;
      },
      "delete": function(key) {
        var entry = key[this.name];
        if (!entry || entry[0] !== key) return false;
        entry[0] = entry[1] = undefined;
        return true;
      },
      has: function(key) {
        var entry = key[this.name];
        if (!entry) return false;
        return entry[0] === key;
      }
    };
    window.WeakMap = WeakMap;
  })();
}

(function(global) {
  if (global.JsMutationObserver) {
    return;
  }
  var registrationsTable = new WeakMap();
  var setImmediate;
  if (/Trident|Edge/.test(navigator.userAgent)) {
    setImmediate = setTimeout;
  } else if (window.setImmediate) {
    setImmediate = window.setImmediate;
  } else {
    var setImmediateQueue = [];
    var sentinel = String(Math.random());
    window.addEventListener("message", function(e) {
      if (e.data === sentinel) {
        var queue = setImmediateQueue;
        setImmediateQueue = [];
        queue.forEach(function(func) {
          func();
        });
      }
    });
    setImmediate = function(func) {
      setImmediateQueue.push(func);
      window.postMessage(sentinel, "*");
    };
  }
  var isScheduled = false;
  var scheduledObservers = [];
  function scheduleCallback(observer) {
    scheduledObservers.push(observer);
    if (!isScheduled) {
      isScheduled = true;
      setImmediate(dispatchCallbacks);
    }
  }
  function wrapIfNeeded(node) {
    return window.ShadowDOMPolyfill && window.ShadowDOMPolyfill.wrapIfNeeded(node) || node;
  }
  function dispatchCallbacks() {
    isScheduled = false;
    var observers = scheduledObservers;
    scheduledObservers = [];
    observers.sort(function(o1, o2) {
      return o1.uid_ - o2.uid_;
    });
    var anyNonEmpty = false;
    observers.forEach(function(observer) {
      var queue = observer.takeRecords();
      removeTransientObserversFor(observer);
      if (queue.length) {
        observer.callback_(queue, observer);
        anyNonEmpty = true;
      }
    });
    if (anyNonEmpty) dispatchCallbacks();
  }
  function removeTransientObserversFor(observer) {
    observer.nodes_.forEach(function(node) {
      var registrations = registrationsTable.get(node);
      if (!registrations) return;
      registrations.forEach(function(registration) {
        if (registration.observer === observer) registration.removeTransientObservers();
      });
    });
  }
  function forEachAncestorAndObserverEnqueueRecord(target, callback) {
    for (var node = target; node; node = node.parentNode) {
      var registrations = registrationsTable.get(node);
      if (registrations) {
        for (var j = 0; j < registrations.length; j++) {
          var registration = registrations[j];
          var options = registration.options;
          if (node !== target && !options.subtree) continue;
          var record = callback(options);
          if (record) registration.enqueue(record);
        }
      }
    }
  }
  var uidCounter = 0;
  function JsMutationObserver(callback) {
    this.callback_ = callback;
    this.nodes_ = [];
    this.records_ = [];
    this.uid_ = ++uidCounter;
  }
  JsMutationObserver.prototype = {
    observe: function(target, options) {
      target = wrapIfNeeded(target);
      if (!options.childList && !options.attributes && !options.characterData || options.attributeOldValue && !options.attributes || options.attributeFilter && options.attributeFilter.length && !options.attributes || options.characterDataOldValue && !options.characterData) {
        throw new SyntaxError();
      }
      var registrations = registrationsTable.get(target);
      if (!registrations) registrationsTable.set(target, registrations = []);
      var registration;
      for (var i = 0; i < registrations.length; i++) {
        if (registrations[i].observer === this) {
          registration = registrations[i];
          registration.removeListeners();
          registration.options = options;
          break;
        }
      }
      if (!registration) {
        registration = new Registration(this, target, options);
        registrations.push(registration);
        this.nodes_.push(target);
      }
      registration.addListeners();
    },
    disconnect: function() {
      this.nodes_.forEach(function(node) {
        var registrations = registrationsTable.get(node);
        for (var i = 0; i < registrations.length; i++) {
          var registration = registrations[i];
          if (registration.observer === this) {
            registration.removeListeners();
            registrations.splice(i, 1);
            break;
          }
        }
      }, this);
      this.records_ = [];
    },
    takeRecords: function() {
      var copyOfRecords = this.records_;
      this.records_ = [];
      return copyOfRecords;
    }
  };
  function MutationRecord(type, target) {
    this.type = type;
    this.target = target;
    this.addedNodes = [];
    this.removedNodes = [];
    this.previousSibling = null;
    this.nextSibling = null;
    this.attributeName = null;
    this.attributeNamespace = null;
    this.oldValue = null;
  }
  function copyMutationRecord(original) {
    var record = new MutationRecord(original.type, original.target);
    record.addedNodes = original.addedNodes.slice();
    record.removedNodes = original.removedNodes.slice();
    record.previousSibling = original.previousSibling;
    record.nextSibling = original.nextSibling;
    record.attributeName = original.attributeName;
    record.attributeNamespace = original.attributeNamespace;
    record.oldValue = original.oldValue;
    return record;
  }
  var currentRecord, recordWithOldValue;
  function getRecord(type, target) {
    return currentRecord = new MutationRecord(type, target);
  }
  function getRecordWithOldValue(oldValue) {
    if (recordWithOldValue) return recordWithOldValue;
    recordWithOldValue = copyMutationRecord(currentRecord);
    recordWithOldValue.oldValue = oldValue;
    return recordWithOldValue;
  }
  function clearRecords() {
    currentRecord = recordWithOldValue = undefined;
  }
  function recordRepresentsCurrentMutation(record) {
    return record === recordWithOldValue || record === currentRecord;
  }
  function selectRecord(lastRecord, newRecord) {
    if (lastRecord === newRecord) return lastRecord;
    if (recordWithOldValue && recordRepresentsCurrentMutation(lastRecord)) return recordWithOldValue;
    return null;
  }
  function Registration(observer, target, options) {
    this.observer = observer;
    this.target = target;
    this.options = options;
    this.transientObservedNodes = [];
  }
  Registration.prototype = {
    enqueue: function(record) {
      var records = this.observer.records_;
      var length = records.length;
      if (records.length > 0) {
        var lastRecord = records[length - 1];
        var recordToReplaceLast = selectRecord(lastRecord, record);
        if (recordToReplaceLast) {
          records[length - 1] = recordToReplaceLast;
          return;
        }
      } else {
        scheduleCallback(this.observer);
      }
      records[length] = record;
    },
    addListeners: function() {
      this.addListeners_(this.target);
    },
    addListeners_: function(node) {
      var options = this.options;
      if (options.attributes) node.addEventListener("DOMAttrModified", this, true);
      if (options.characterData) node.addEventListener("DOMCharacterDataModified", this, true);
      if (options.childList) node.addEventListener("DOMNodeInserted", this, true);
      if (options.childList || options.subtree) node.addEventListener("DOMNodeRemoved", this, true);
    },
    removeListeners: function() {
      this.removeListeners_(this.target);
    },
    removeListeners_: function(node) {
      var options = this.options;
      if (options.attributes) node.removeEventListener("DOMAttrModified", this, true);
      if (options.characterData) node.removeEventListener("DOMCharacterDataModified", this, true);
      if (options.childList) node.removeEventListener("DOMNodeInserted", this, true);
      if (options.childList || options.subtree) node.removeEventListener("DOMNodeRemoved", this, true);
    },
    addTransientObserver: function(node) {
      if (node === this.target) return;
      this.addListeners_(node);
      this.transientObservedNodes.push(node);
      var registrations = registrationsTable.get(node);
      if (!registrations) registrationsTable.set(node, registrations = []);
      registrations.push(this);
    },
    removeTransientObservers: function() {
      var transientObservedNodes = this.transientObservedNodes;
      this.transientObservedNodes = [];
      transientObservedNodes.forEach(function(node) {
        this.removeListeners_(node);
        var registrations = registrationsTable.get(node);
        for (var i = 0; i < registrations.length; i++) {
          if (registrations[i] === this) {
            registrations.splice(i, 1);
            break;
          }
        }
      }, this);
    },
    handleEvent: function(e) {
      e.stopImmediatePropagation();
      switch (e.type) {
       case "DOMAttrModified":
        var name = e.attrName;
        var namespace = e.relatedNode.namespaceURI;
        var target = e.target;
        var record = new getRecord("attributes", target);
        record.attributeName = name;
        record.attributeNamespace = namespace;
        var oldValue = e.attrChange === MutationEvent.ADDITION ? null : e.prevValue;
        forEachAncestorAndObserverEnqueueRecord(target, function(options) {
          if (!options.attributes) return;
          if (options.attributeFilter && options.attributeFilter.length && options.attributeFilter.indexOf(name) === -1 && options.attributeFilter.indexOf(namespace) === -1) {
            return;
          }
          if (options.attributeOldValue) return getRecordWithOldValue(oldValue);
          return record;
        });
        break;

       case "DOMCharacterDataModified":
        var target = e.target;
        var record = getRecord("characterData", target);
        var oldValue = e.prevValue;
        forEachAncestorAndObserverEnqueueRecord(target, function(options) {
          if (!options.characterData) return;
          if (options.characterDataOldValue) return getRecordWithOldValue(oldValue);
          return record;
        });
        break;

       case "DOMNodeRemoved":
        this.addTransientObserver(e.target);

       case "DOMNodeInserted":
        var changedNode = e.target;
        var addedNodes, removedNodes;
        if (e.type === "DOMNodeInserted") {
          addedNodes = [ changedNode ];
          removedNodes = [];
        } else {
          addedNodes = [];
          removedNodes = [ changedNode ];
        }
        var previousSibling = changedNode.previousSibling;
        var nextSibling = changedNode.nextSibling;
        var record = getRecord("childList", e.target.parentNode);
        record.addedNodes = addedNodes;
        record.removedNodes = removedNodes;
        record.previousSibling = previousSibling;
        record.nextSibling = nextSibling;
        forEachAncestorAndObserverEnqueueRecord(e.relatedNode, function(options) {
          if (!options.childList) return;
          return record;
        });
      }
      clearRecords();
    }
  };
  global.JsMutationObserver = JsMutationObserver;
  if (!global.MutationObserver) {
    global.MutationObserver = JsMutationObserver;
    JsMutationObserver._isPolyfilled = true;
  }
})(self);

(function() {
  var needsTemplate = typeof HTMLTemplateElement === "undefined";
  if (/Trident/.test(navigator.userAgent)) {
    (function() {
      var importNode = document.importNode;
      document.importNode = function() {
        var n = importNode.apply(document, arguments);
        if (n.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
          var f = document.createDocumentFragment();
          f.appendChild(n);
          return f;
        } else {
          return n;
        }
      };
    })();
  }
  var needsCloning = function() {
    if (!needsTemplate) {
      var t = document.createElement("template");
      var t2 = document.createElement("template");
      t2.content.appendChild(document.createElement("div"));
      t.content.appendChild(t2);
      var clone = t.cloneNode(true);
      return clone.content.childNodes.length === 0 || clone.content.firstChild.content.childNodes.length === 0;
    }
  }();
  var TEMPLATE_TAG = "template";
  var TemplateImpl = function() {};
  if (needsTemplate) {
    var contentDoc = document.implementation.createHTMLDocument("template");
    var canDecorate = true;
    var templateStyle = document.createElement("style");
    templateStyle.textContent = TEMPLATE_TAG + "{display:none;}";
    var head = document.head;
    head.insertBefore(templateStyle, head.firstElementChild);
    TemplateImpl.prototype = Object.create(HTMLElement.prototype);
    TemplateImpl.decorate = function(template) {
      if (template.content) {
        return;
      }
      template.content = contentDoc.createDocumentFragment();
      var child;
      while (child = template.firstChild) {
        template.content.appendChild(child);
      }
      template.cloneNode = function(deep) {
        return TemplateImpl.cloneNode(this, deep);
      };
      if (canDecorate) {
        try {
          Object.defineProperty(template, "innerHTML", {
            get: function() {
              var o = "";
              for (var e = this.content.firstChild; e; e = e.nextSibling) {
                o += e.outerHTML || escapeData(e.data);
              }
              return o;
            },
            set: function(text) {
              contentDoc.body.innerHTML = text;
              TemplateImpl.bootstrap(contentDoc);
              while (this.content.firstChild) {
                this.content.removeChild(this.content.firstChild);
              }
              while (contentDoc.body.firstChild) {
                this.content.appendChild(contentDoc.body.firstChild);
              }
            },
            configurable: true
          });
        } catch (err) {
          canDecorate = false;
        }
      }
      TemplateImpl.bootstrap(template.content);
    };
    TemplateImpl.bootstrap = function(doc) {
      var templates = doc.querySelectorAll(TEMPLATE_TAG);
      for (var i = 0, l = templates.length, t; i < l && (t = templates[i]); i++) {
        TemplateImpl.decorate(t);
      }
    };
    document.addEventListener("DOMContentLoaded", function() {
      TemplateImpl.bootstrap(document);
    });
    var createElement = document.createElement;
    document.createElement = function() {
      "use strict";
      var el = createElement.apply(document, arguments);
      if (el.localName === "template") {
        TemplateImpl.decorate(el);
      }
      return el;
    };
    var escapeDataRegExp = /[&\u00A0<>]/g;
    function escapeReplace(c) {
      switch (c) {
       case "&":
        return "&amp;";

       case "<":
        return "&lt;";

       case ">":
        return "&gt;";

       case " ":
        return "&nbsp;";
      }
    }
    function escapeData(s) {
      return s.replace(escapeDataRegExp, escapeReplace);
    }
  }
  if (needsTemplate || needsCloning) {
    var nativeCloneNode = Node.prototype.cloneNode;
    TemplateImpl.cloneNode = function(template, deep) {
      var clone = nativeCloneNode.call(template, false);
      if (this.decorate) {
        this.decorate(clone);
      }
      if (deep) {
        clone.content.appendChild(nativeCloneNode.call(template.content, true));
        this.fixClonedDom(clone.content, template.content);
      }
      return clone;
    };
    TemplateImpl.fixClonedDom = function(clone, source) {
      if (!source.querySelectorAll) return;
      var s$ = source.querySelectorAll(TEMPLATE_TAG);
      var t$ = clone.querySelectorAll(TEMPLATE_TAG);
      for (var i = 0, l = t$.length, t, s; i < l; i++) {
        s = s$[i];
        t = t$[i];
        if (this.decorate) {
          this.decorate(s);
        }
        t.parentNode.replaceChild(s.cloneNode(true), t);
      }
    };
    var originalImportNode = document.importNode;
    Node.prototype.cloneNode = function(deep) {
      var dom = nativeCloneNode.call(this, deep);
      if (deep) {
        TemplateImpl.fixClonedDom(dom, this);
      }
      return dom;
    };
    document.importNode = function(element, deep) {
      if (element.localName === TEMPLATE_TAG) {
        return TemplateImpl.cloneNode(element, deep);
      } else {
        var dom = originalImportNode.call(document, element, deep);
        if (deep) {
          TemplateImpl.fixClonedDom(dom, element);
        }
        return dom;
      }
    };
    if (needsCloning) {
      HTMLTemplateElement.prototype.cloneNode = function(deep) {
        return TemplateImpl.cloneNode(this, deep);
      };
    }
  }
  if (needsTemplate) {
    window.HTMLTemplateElement = TemplateImpl;
  }
})();

(function(scope) {
  "use strict";
  if (!window.performance) {
    var start = Date.now();
    window.performance = {
      now: function() {
        return Date.now() - start;
      }
    };
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function() {
      var nativeRaf = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
      return nativeRaf ? function(callback) {
        return nativeRaf(function() {
          callback(performance.now());
        });
      } : function(callback) {
        return window.setTimeout(callback, 1e3 / 60);
      };
    }();
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function() {
      return window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || function(id) {
        clearTimeout(id);
      };
    }();
  }
  var workingDefaultPrevented = function() {
    var e = document.createEvent("Event");
    e.initEvent("foo", true, true);
    e.preventDefault();
    return e.defaultPrevented;
  }();
  if (!workingDefaultPrevented) {
    var origPreventDefault = Event.prototype.preventDefault;
    Event.prototype.preventDefault = function() {
      if (!this.cancelable) {
        return;
      }
      origPreventDefault.call(this);
      Object.defineProperty(this, "defaultPrevented", {
        get: function() {
          return true;
        },
        configurable: true
      });
    };
  }
  var isIE = /Trident/.test(navigator.userAgent);
  if (!window.CustomEvent || isIE && typeof window.CustomEvent !== "function") {
    window.CustomEvent = function(inType, params) {
      params = params || {};
      var e = document.createEvent("CustomEvent");
      e.initCustomEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable), params.detail);
      return e;
    };
    window.CustomEvent.prototype = window.Event.prototype;
  }
  if (!window.Event || isIE && typeof window.Event !== "function") {
    var origEvent = window.Event;
    window.Event = function(inType, params) {
      params = params || {};
      var e = document.createEvent("Event");
      e.initEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable));
      return e;
    };
    window.Event.prototype = origEvent.prototype;
  }
})(window.WebComponents);

window.HTMLImports = window.HTMLImports || {
  flags: {}
};

(function(scope) {
  var IMPORT_LINK_TYPE = "import";
  var useNative = Boolean(IMPORT_LINK_TYPE in document.createElement("link"));
  var hasShadowDOMPolyfill = Boolean(window.ShadowDOMPolyfill);
  var wrap = function(node) {
    return hasShadowDOMPolyfill ? window.ShadowDOMPolyfill.wrapIfNeeded(node) : node;
  };
  var rootDocument = wrap(document);
  var currentScriptDescriptor = {
    get: function() {
      var script = window.HTMLImports.currentScript || document.currentScript || (document.readyState !== "complete" ? document.scripts[document.scripts.length - 1] : null);
      return wrap(script);
    },
    configurable: true
  };
  Object.defineProperty(document, "_currentScript", currentScriptDescriptor);
  Object.defineProperty(rootDocument, "_currentScript", currentScriptDescriptor);
  var isIE = /Trident/.test(navigator.userAgent);
  function whenReady(callback, doc) {
    doc = doc || rootDocument;
    whenDocumentReady(function() {
      watchImportsLoad(callback, doc);
    }, doc);
  }
  var requiredReadyState = isIE ? "complete" : "interactive";
  var READY_EVENT = "readystatechange";
  function isDocumentReady(doc) {
    return doc.readyState === "complete" || doc.readyState === requiredReadyState;
  }
  function whenDocumentReady(callback, doc) {
    if (!isDocumentReady(doc)) {
      var checkReady = function() {
        if (doc.readyState === "complete" || doc.readyState === requiredReadyState) {
          doc.removeEventListener(READY_EVENT, checkReady);
          whenDocumentReady(callback, doc);
        }
      };
      doc.addEventListener(READY_EVENT, checkReady);
    } else if (callback) {
      callback();
    }
  }
  function markTargetLoaded(event) {
    event.target.__loaded = true;
  }
  function watchImportsLoad(callback, doc) {
    var imports = doc.querySelectorAll("link[rel=import]");
    var parsedCount = 0, importCount = imports.length, newImports = [], errorImports = [];
    function checkDone() {
      if (parsedCount == importCount && callback) {
        callback({
          allImports: imports,
          loadedImports: newImports,
          errorImports: errorImports
        });
      }
    }
    function loadedImport(e) {
      markTargetLoaded(e);
      newImports.push(this);
      parsedCount++;
      checkDone();
    }
    function errorLoadingImport(e) {
      errorImports.push(this);
      parsedCount++;
      checkDone();
    }
    if (importCount) {
      for (var i = 0, imp; i < importCount && (imp = imports[i]); i++) {
        if (isImportLoaded(imp)) {
          newImports.push(this);
          parsedCount++;
          checkDone();
        } else {
          imp.addEventListener("load", loadedImport);
          imp.addEventListener("error", errorLoadingImport);
        }
      }
    } else {
      checkDone();
    }
  }
  function isImportLoaded(link) {
    return useNative ? link.__loaded || link.import && link.import.readyState !== "loading" : link.__importParsed;
  }
  if (useNative) {
    new MutationObserver(function(mxns) {
      for (var i = 0, l = mxns.length, m; i < l && (m = mxns[i]); i++) {
        if (m.addedNodes) {
          handleImports(m.addedNodes);
        }
      }
    }).observe(document.head, {
      childList: true
    });
    function handleImports(nodes) {
      for (var i = 0, l = nodes.length, n; i < l && (n = nodes[i]); i++) {
        if (isImport(n)) {
          handleImport(n);
        }
      }
    }
    function isImport(element) {
      return element.localName === "link" && element.rel === "import";
    }
    function handleImport(element) {
      var loaded = element.import;
      if (loaded) {
        markTargetLoaded({
          target: element
        });
      } else {
        element.addEventListener("load", markTargetLoaded);
        element.addEventListener("error", markTargetLoaded);
      }
    }
    (function() {
      if (document.readyState === "loading") {
        var imports = document.querySelectorAll("link[rel=import]");
        for (var i = 0, l = imports.length, imp; i < l && (imp = imports[i]); i++) {
          handleImport(imp);
        }
      }
    })();
  }
  whenReady(function(detail) {
    window.HTMLImports.ready = true;
    window.HTMLImports.readyTime = new Date().getTime();
    var evt = rootDocument.createEvent("CustomEvent");
    evt.initCustomEvent("HTMLImportsLoaded", true, true, detail);
    rootDocument.dispatchEvent(evt);
  });
  scope.IMPORT_LINK_TYPE = IMPORT_LINK_TYPE;
  scope.useNative = useNative;
  scope.rootDocument = rootDocument;
  scope.whenReady = whenReady;
  scope.isIE = isIE;
})(window.HTMLImports);

(function(scope) {
  var modules = [];
  var addModule = function(module) {
    modules.push(module);
  };
  var initializeModules = function() {
    modules.forEach(function(module) {
      module(scope);
    });
  };
  scope.addModule = addModule;
  scope.initializeModules = initializeModules;
})(window.HTMLImports);

window.HTMLImports.addModule(function(scope) {
  var CSS_URL_REGEXP = /(url\()([^)]*)(\))/g;
  var CSS_IMPORT_REGEXP = /(@import[\s]+(?!url\())([^;]*)(;)/g;
  var path = {
    resolveUrlsInStyle: function(style, linkUrl) {
      var doc = style.ownerDocument;
      var resolver = doc.createElement("a");
      style.textContent = this.resolveUrlsInCssText(style.textContent, linkUrl, resolver);
      return style;
    },
    resolveUrlsInCssText: function(cssText, linkUrl, urlObj) {
      var r = this.replaceUrls(cssText, urlObj, linkUrl, CSS_URL_REGEXP);
      r = this.replaceUrls(r, urlObj, linkUrl, CSS_IMPORT_REGEXP);
      return r;
    },
    replaceUrls: function(text, urlObj, linkUrl, regexp) {
      return text.replace(regexp, function(m, pre, url, post) {
        var urlPath = url.replace(/["']/g, "");
        if (linkUrl) {
          urlPath = new URL(urlPath, linkUrl).href;
        }
        urlObj.href = urlPath;
        urlPath = urlObj.href;
        return pre + "'" + urlPath + "'" + post;
      });
    }
  };
  scope.path = path;
});

window.HTMLImports.addModule(function(scope) {
  var xhr = {
    async: true,
    ok: function(request) {
      return request.status >= 200 && request.status < 300 || request.status === 304 || request.status === 0;
    },
    load: function(url, next, nextContext) {
      var request = new XMLHttpRequest();
      if (scope.flags.debug || scope.flags.bust) {
        url += "?" + Math.random();
      }
      request.open("GET", url, xhr.async);
      request.addEventListener("readystatechange", function(e) {
        if (request.readyState === 4) {
          var redirectedUrl = null;
          try {
            var locationHeader = request.getResponseHeader("Location");
            if (locationHeader) {
              redirectedUrl = locationHeader.substr(0, 1) === "/" ? location.origin + locationHeader : locationHeader;
            }
          } catch (e) {
            console.error(e.message);
          }
          next.call(nextContext, !xhr.ok(request) && request, request.response || request.responseText, redirectedUrl);
        }
      });
      request.send();
      return request;
    },
    loadDocument: function(url, next, nextContext) {
      this.load(url, next, nextContext).responseType = "document";
    }
  };
  scope.xhr = xhr;
});

window.HTMLImports.addModule(function(scope) {
  var xhr = scope.xhr;
  var flags = scope.flags;
  var Loader = function(onLoad, onComplete) {
    this.cache = {};
    this.onload = onLoad;
    this.oncomplete = onComplete;
    this.inflight = 0;
    this.pending = {};
  };
  Loader.prototype = {
    addNodes: function(nodes) {
      this.inflight += nodes.length;
      for (var i = 0, l = nodes.length, n; i < l && (n = nodes[i]); i++) {
        this.require(n);
      }
      this.checkDone();
    },
    addNode: function(node) {
      this.inflight++;
      this.require(node);
      this.checkDone();
    },
    require: function(elt) {
      var url = elt.src || elt.href;
      elt.__nodeUrl = url;
      if (!this.dedupe(url, elt)) {
        this.fetch(url, elt);
      }
    },
    dedupe: function(url, elt) {
      if (this.pending[url]) {
        this.pending[url].push(elt);
        return true;
      }
      var resource;
      if (this.cache[url]) {
        this.onload(url, elt, this.cache[url]);
        this.tail();
        return true;
      }
      this.pending[url] = [ elt ];
      return false;
    },
    fetch: function(url, elt) {
      flags.load && console.log("fetch", url, elt);
      if (!url) {
        setTimeout(function() {
          this.receive(url, elt, {
            error: "href must be specified"
          }, null);
        }.bind(this), 0);
      } else if (url.match(/^data:/)) {
        var pieces = url.split(",");
        var header = pieces[0];
        var body = pieces[1];
        if (header.indexOf(";base64") > -1) {
          body = atob(body);
        } else {
          body = decodeURIComponent(body);
        }
        setTimeout(function() {
          this.receive(url, elt, null, body);
        }.bind(this), 0);
      } else {
        var receiveXhr = function(err, resource, redirectedUrl) {
          this.receive(url, elt, err, resource, redirectedUrl);
        }.bind(this);
        xhr.load(url, receiveXhr);
      }
    },
    receive: function(url, elt, err, resource, redirectedUrl) {
      this.cache[url] = resource;
      var $p = this.pending[url];
      for (var i = 0, l = $p.length, p; i < l && (p = $p[i]); i++) {
        this.onload(url, p, resource, err, redirectedUrl);
        this.tail();
      }
      this.pending[url] = null;
    },
    tail: function() {
      --this.inflight;
      this.checkDone();
    },
    checkDone: function() {
      if (!this.inflight) {
        this.oncomplete();
      }
    }
  };
  scope.Loader = Loader;
});

window.HTMLImports.addModule(function(scope) {
  var Observer = function(addCallback) {
    this.addCallback = addCallback;
    this.mo = new MutationObserver(this.handler.bind(this));
  };
  Observer.prototype = {
    handler: function(mutations) {
      for (var i = 0, l = mutations.length, m; i < l && (m = mutations[i]); i++) {
        if (m.type === "childList" && m.addedNodes.length) {
          this.addedNodes(m.addedNodes);
        }
      }
    },
    addedNodes: function(nodes) {
      if (this.addCallback) {
        this.addCallback(nodes);
      }
      for (var i = 0, l = nodes.length, n, loading; i < l && (n = nodes[i]); i++) {
        if (n.children && n.children.length) {
          this.addedNodes(n.children);
        }
      }
    },
    observe: function(root) {
      this.mo.observe(root, {
        childList: true,
        subtree: true
      });
    }
  };
  scope.Observer = Observer;
});

window.HTMLImports.addModule(function(scope) {
  var path = scope.path;
  var rootDocument = scope.rootDocument;
  var flags = scope.flags;
  var isIE = scope.isIE;
  var IMPORT_LINK_TYPE = scope.IMPORT_LINK_TYPE;
  var IMPORT_SELECTOR = "link[rel=" + IMPORT_LINK_TYPE + "]";
  var importParser = {
    documentSelectors: IMPORT_SELECTOR,
    importsSelectors: [ IMPORT_SELECTOR, "link[rel=stylesheet]:not([type])", "style:not([type])", "script:not([type])", 'script[type="application/javascript"]', 'script[type="text/javascript"]' ].join(","),
    map: {
      link: "parseLink",
      script: "parseScript",
      style: "parseStyle"
    },
    dynamicElements: [],
    parseNext: function() {
      var next = this.nextToParse();
      if (next) {
        this.parse(next);
      }
    },
    parse: function(elt) {
      if (this.isParsed(elt)) {
        flags.parse && console.log("[%s] is already parsed", elt.localName);
        return;
      }
      var fn = this[this.map[elt.localName]];
      if (fn) {
        this.markParsing(elt);
        fn.call(this, elt);
      }
    },
    parseDynamic: function(elt, quiet) {
      this.dynamicElements.push(elt);
      if (!quiet) {
        this.parseNext();
      }
    },
    markParsing: function(elt) {
      flags.parse && console.log("parsing", elt);
      this.parsingElement = elt;
    },
    markParsingComplete: function(elt) {
      elt.__importParsed = true;
      this.markDynamicParsingComplete(elt);
      if (elt.__importElement) {
        elt.__importElement.__importParsed = true;
        this.markDynamicParsingComplete(elt.__importElement);
      }
      this.parsingElement = null;
      flags.parse && console.log("completed", elt);
    },
    markDynamicParsingComplete: function(elt) {
      var i = this.dynamicElements.indexOf(elt);
      if (i >= 0) {
        this.dynamicElements.splice(i, 1);
      }
    },
    parseImport: function(elt) {
      elt.import = elt.__doc;
      if (window.HTMLImports.__importsParsingHook) {
        window.HTMLImports.__importsParsingHook(elt);
      }
      if (elt.import) {
        elt.import.__importParsed = true;
      }
      this.markParsingComplete(elt);
      if (elt.__resource && !elt.__error) {
        elt.dispatchEvent(new CustomEvent("load", {
          bubbles: false
        }));
      } else {
        elt.dispatchEvent(new CustomEvent("error", {
          bubbles: false
        }));
      }
      if (elt.__pending) {
        var fn;
        while (elt.__pending.length) {
          fn = elt.__pending.shift();
          if (fn) {
            fn({
              target: elt
            });
          }
        }
      }
      this.parseNext();
    },
    parseLink: function(linkElt) {
      if (nodeIsImport(linkElt)) {
        this.parseImport(linkElt);
      } else {
        linkElt.href = linkElt.href;
        this.parseGeneric(linkElt);
      }
    },
    parseStyle: function(elt) {
      var src = elt;
      elt = cloneStyle(elt);
      src.__appliedElement = elt;
      elt.__importElement = src;
      this.parseGeneric(elt);
    },
    parseGeneric: function(elt) {
      this.trackElement(elt);
      this.addElementToDocument(elt);
    },
    rootImportForElement: function(elt) {
      var n = elt;
      while (n.ownerDocument.__importLink) {
        n = n.ownerDocument.__importLink;
      }
      return n;
    },
    addElementToDocument: function(elt) {
      var port = this.rootImportForElement(elt.__importElement || elt);
      port.parentNode.insertBefore(elt, port);
    },
    trackElement: function(elt, callback) {
      var self = this;
      var done = function(e) {
        elt.removeEventListener("load", done);
        elt.removeEventListener("error", done);
        if (callback) {
          callback(e);
        }
        self.markParsingComplete(elt);
        self.parseNext();
      };
      elt.addEventListener("load", done);
      elt.addEventListener("error", done);
      if (isIE && elt.localName === "style") {
        var fakeLoad = false;
        if (elt.textContent.indexOf("@import") == -1) {
          fakeLoad = true;
        } else if (elt.sheet) {
          fakeLoad = true;
          var csr = elt.sheet.cssRules;
          var len = csr ? csr.length : 0;
          for (var i = 0, r; i < len && (r = csr[i]); i++) {
            if (r.type === CSSRule.IMPORT_RULE) {
              fakeLoad = fakeLoad && Boolean(r.styleSheet);
            }
          }
        }
        if (fakeLoad) {
          setTimeout(function() {
            elt.dispatchEvent(new CustomEvent("load", {
              bubbles: false
            }));
          });
        }
      }
    },
    parseScript: function(scriptElt) {
      var script = document.createElement("script");
      script.__importElement = scriptElt;
      script.src = scriptElt.src ? scriptElt.src : generateScriptDataUrl(scriptElt);
      scope.currentScript = scriptElt;
      this.trackElement(script, function(e) {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        scope.currentScript = null;
      });
      this.addElementToDocument(script);
    },
    nextToParse: function() {
      this._mayParse = [];
      return !this.parsingElement && (this.nextToParseInDoc(rootDocument) || this.nextToParseDynamic());
    },
    nextToParseInDoc: function(doc, link) {
      if (doc && this._mayParse.indexOf(doc) < 0) {
        this._mayParse.push(doc);
        var nodes = doc.querySelectorAll(this.parseSelectorsForNode(doc));
        for (var i = 0, l = nodes.length, n; i < l && (n = nodes[i]); i++) {
          if (!this.isParsed(n)) {
            if (this.hasResource(n)) {
              return nodeIsImport(n) ? this.nextToParseInDoc(n.__doc, n) : n;
            } else {
              return;
            }
          }
        }
      }
      return link;
    },
    nextToParseDynamic: function() {
      return this.dynamicElements[0];
    },
    parseSelectorsForNode: function(node) {
      var doc = node.ownerDocument || node;
      return doc === rootDocument ? this.documentSelectors : this.importsSelectors;
    },
    isParsed: function(node) {
      return node.__importParsed;
    },
    needsDynamicParsing: function(elt) {
      return this.dynamicElements.indexOf(elt) >= 0;
    },
    hasResource: function(node) {
      if (nodeIsImport(node) && node.__doc === undefined) {
        return false;
      }
      return true;
    }
  };
  function nodeIsImport(elt) {
    return elt.localName === "link" && elt.rel === IMPORT_LINK_TYPE;
  }
  function generateScriptDataUrl(script) {
    var scriptContent = generateScriptContent(script);
    return "data:text/javascript;charset=utf-8," + encodeURIComponent(scriptContent);
  }
  function generateScriptContent(script) {
    return script.textContent + generateSourceMapHint(script);
  }
  function generateSourceMapHint(script) {
    var owner = script.ownerDocument;
    owner.__importedScripts = owner.__importedScripts || 0;
    var moniker = script.ownerDocument.baseURI;
    var num = owner.__importedScripts ? "-" + owner.__importedScripts : "";
    owner.__importedScripts++;
    return "\n//# sourceURL=" + moniker + num + ".js\n";
  }
  function cloneStyle(style) {
    var clone = style.ownerDocument.createElement("style");
    clone.textContent = style.textContent;
    path.resolveUrlsInStyle(clone);
    return clone;
  }
  scope.parser = importParser;
  scope.IMPORT_SELECTOR = IMPORT_SELECTOR;
});

window.HTMLImports.addModule(function(scope) {
  var flags = scope.flags;
  var IMPORT_LINK_TYPE = scope.IMPORT_LINK_TYPE;
  var IMPORT_SELECTOR = scope.IMPORT_SELECTOR;
  var rootDocument = scope.rootDocument;
  var Loader = scope.Loader;
  var Observer = scope.Observer;
  var parser = scope.parser;
  var importer = {
    documents: {},
    documentPreloadSelectors: IMPORT_SELECTOR,
    importsPreloadSelectors: [ IMPORT_SELECTOR ].join(","),
    loadNode: function(node) {
      importLoader.addNode(node);
    },
    loadSubtree: function(parent) {
      var nodes = this.marshalNodes(parent);
      importLoader.addNodes(nodes);
    },
    marshalNodes: function(parent) {
      return parent.querySelectorAll(this.loadSelectorsForNode(parent));
    },
    loadSelectorsForNode: function(node) {
      var doc = node.ownerDocument || node;
      return doc === rootDocument ? this.documentPreloadSelectors : this.importsPreloadSelectors;
    },
    loaded: function(url, elt, resource, err, redirectedUrl) {
      flags.load && console.log("loaded", url, elt);
      elt.__resource = resource;
      elt.__error = err;
      if (isImportLink(elt)) {
        var doc = this.documents[url];
        if (doc === undefined) {
          doc = err ? null : makeDocument(resource, redirectedUrl || url);
          if (doc) {
            doc.__importLink = elt;
            this.bootDocument(doc);
          }
          this.documents[url] = doc;
        }
        elt.__doc = doc;
      }
      parser.parseNext();
    },
    bootDocument: function(doc) {
      this.loadSubtree(doc);
      this.observer.observe(doc);
      parser.parseNext();
    },
    loadedAll: function() {
      parser.parseNext();
    }
  };
  var importLoader = new Loader(importer.loaded.bind(importer), importer.loadedAll.bind(importer));
  importer.observer = new Observer();
  function isImportLink(elt) {
    return isLinkRel(elt, IMPORT_LINK_TYPE);
  }
  function isLinkRel(elt, rel) {
    return elt.localName === "link" && elt.getAttribute("rel") === rel;
  }
  function hasBaseURIAccessor(doc) {
    return !!Object.getOwnPropertyDescriptor(doc, "baseURI");
  }
  function makeDocument(resource, url) {
    var doc = document.implementation.createHTMLDocument(IMPORT_LINK_TYPE);
    doc._URL = url;
    var base = doc.createElement("base");
    base.setAttribute("href", url);
    if (!doc.baseURI && !hasBaseURIAccessor(doc)) {
      Object.defineProperty(doc, "baseURI", {
        value: url
      });
    }
    var meta = doc.createElement("meta");
    meta.setAttribute("charset", "utf-8");
    doc.head.appendChild(meta);
    doc.head.appendChild(base);
    doc.body.innerHTML = resource;
    if (window.HTMLTemplateElement && HTMLTemplateElement.bootstrap) {
      HTMLTemplateElement.bootstrap(doc);
    }
    return doc;
  }
  if (!document.baseURI) {
    var baseURIDescriptor = {
      get: function() {
        var base = document.querySelector("base");
        return base ? base.href : window.location.href;
      },
      configurable: true
    };
    Object.defineProperty(document, "baseURI", baseURIDescriptor);
    Object.defineProperty(rootDocument, "baseURI", baseURIDescriptor);
  }
  scope.importer = importer;
  scope.importLoader = importLoader;
});

window.HTMLImports.addModule(function(scope) {
  var parser = scope.parser;
  var importer = scope.importer;
  var dynamic = {
    added: function(nodes) {
      var owner, parsed, loading;
      for (var i = 0, l = nodes.length, n; i < l && (n = nodes[i]); i++) {
        if (!owner) {
          owner = n.ownerDocument;
          parsed = parser.isParsed(owner);
        }
        loading = this.shouldLoadNode(n);
        if (loading) {
          importer.loadNode(n);
        }
        if (this.shouldParseNode(n) && parsed) {
          parser.parseDynamic(n, loading);
        }
      }
    },
    shouldLoadNode: function(node) {
      return node.nodeType === 1 && matches.call(node, importer.loadSelectorsForNode(node));
    },
    shouldParseNode: function(node) {
      return node.nodeType === 1 && matches.call(node, parser.parseSelectorsForNode(node));
    }
  };
  importer.observer.addCallback = dynamic.added.bind(dynamic);
  var matches = HTMLElement.prototype.matches || HTMLElement.prototype.matchesSelector || HTMLElement.prototype.webkitMatchesSelector || HTMLElement.prototype.mozMatchesSelector || HTMLElement.prototype.msMatchesSelector;
});

(function(scope) {
  var initializeModules = scope.initializeModules;
  var isIE = scope.isIE;
  if (scope.useNative) {
    return;
  }
  initializeModules();
  var rootDocument = scope.rootDocument;
  function bootstrap() {
    window.HTMLImports.importer.bootDocument(rootDocument);
  }
  if (document.readyState === "complete" || document.readyState === "interactive" && !window.attachEvent) {
    bootstrap();
  } else {
    document.addEventListener("DOMContentLoaded", bootstrap);
  }
})(window.HTMLImports);

window.CustomElements = window.CustomElements || {
  flags: {}
};

(function(scope) {
  var flags = scope.flags;
  var modules = [];
  var addModule = function(module) {
    modules.push(module);
  };
  var initializeModules = function() {
    modules.forEach(function(module) {
      module(scope);
    });
  };
  scope.addModule = addModule;
  scope.initializeModules = initializeModules;
  scope.hasNative = Boolean(document.registerElement);
  scope.isIE = /Trident/.test(navigator.userAgent);
  scope.useNative = !flags.register && scope.hasNative && !window.ShadowDOMPolyfill && (!window.HTMLImports || window.HTMLImports.useNative);
})(window.CustomElements);

window.CustomElements.addModule(function(scope) {
  var IMPORT_LINK_TYPE = window.HTMLImports ? window.HTMLImports.IMPORT_LINK_TYPE : "none";
  function forSubtree(node, cb) {
    findAllElements(node, function(e) {
      if (cb(e)) {
        return true;
      }
      forRoots(e, cb);
    });
    forRoots(node, cb);
  }
  function findAllElements(node, find, data) {
    var e = node.firstElementChild;
    if (!e) {
      e = node.firstChild;
      while (e && e.nodeType !== Node.ELEMENT_NODE) {
        e = e.nextSibling;
      }
    }
    while (e) {
      if (find(e, data) !== true) {
        findAllElements(e, find, data);
      }
      e = e.nextElementSibling;
    }
    return null;
  }
  function forRoots(node, cb) {
    var root = node.shadowRoot;
    while (root) {
      forSubtree(root, cb);
      root = root.olderShadowRoot;
    }
  }
  function forDocumentTree(doc, cb) {
    _forDocumentTree(doc, cb, []);
  }
  function _forDocumentTree(doc, cb, processingDocuments) {
    doc = window.wrap(doc);
    if (processingDocuments.indexOf(doc) >= 0) {
      return;
    }
    processingDocuments.push(doc);
    var imports = doc.querySelectorAll("link[rel=" + IMPORT_LINK_TYPE + "]");
    for (var i = 0, l = imports.length, n; i < l && (n = imports[i]); i++) {
      if (n.import) {
        _forDocumentTree(n.import, cb, processingDocuments);
      }
    }
    cb(doc);
  }
  scope.forDocumentTree = forDocumentTree;
  scope.forSubtree = forSubtree;
});

window.CustomElements.addModule(function(scope) {
  var flags = scope.flags;
  var forSubtree = scope.forSubtree;
  var forDocumentTree = scope.forDocumentTree;
  function addedNode(node, isAttached) {
    return added(node, isAttached) || addedSubtree(node, isAttached);
  }
  function added(node, isAttached) {
    if (scope.upgrade(node, isAttached)) {
      return true;
    }
    if (isAttached) {
      attached(node);
    }
  }
  function addedSubtree(node, isAttached) {
    forSubtree(node, function(e) {
      if (added(e, isAttached)) {
        return true;
      }
    });
  }
  var hasThrottledAttached = window.MutationObserver._isPolyfilled && flags["throttle-attached"];
  scope.hasPolyfillMutations = hasThrottledAttached;
  scope.hasThrottledAttached = hasThrottledAttached;
  var isPendingMutations = false;
  var pendingMutations = [];
  function deferMutation(fn) {
    pendingMutations.push(fn);
    if (!isPendingMutations) {
      isPendingMutations = true;
      setTimeout(takeMutations);
    }
  }
  function takeMutations() {
    isPendingMutations = false;
    var $p = pendingMutations;
    for (var i = 0, l = $p.length, p; i < l && (p = $p[i]); i++) {
      p();
    }
    pendingMutations = [];
  }
  function attached(element) {
    if (hasThrottledAttached) {
      deferMutation(function() {
        _attached(element);
      });
    } else {
      _attached(element);
    }
  }
  function _attached(element) {
    if (element.__upgraded__ && !element.__attached) {
      element.__attached = true;
      if (element.attachedCallback) {
        element.attachedCallback();
      }
    }
  }
  function detachedNode(node) {
    detached(node);
    forSubtree(node, function(e) {
      detached(e);
    });
  }
  function detached(element) {
    if (hasThrottledAttached) {
      deferMutation(function() {
        _detached(element);
      });
    } else {
      _detached(element);
    }
  }
  function _detached(element) {
    if (element.__upgraded__ && element.__attached) {
      element.__attached = false;
      if (element.detachedCallback) {
        element.detachedCallback();
      }
    }
  }
  function inDocument(element) {
    var p = element;
    var doc = window.wrap(document);
    while (p) {
      if (p == doc) {
        return true;
      }
      p = p.parentNode || p.nodeType === Node.DOCUMENT_FRAGMENT_NODE && p.host;
    }
  }
  function watchShadow(node) {
    if (node.shadowRoot && !node.shadowRoot.__watched) {
      flags.dom && console.log("watching shadow-root for: ", node.localName);
      var root = node.shadowRoot;
      while (root) {
        observe(root);
        root = root.olderShadowRoot;
      }
    }
  }
  function handler(root, mutations) {
    if (flags.dom) {
      var mx = mutations[0];
      if (mx && mx.type === "childList" && mx.addedNodes) {
        if (mx.addedNodes) {
          var d = mx.addedNodes[0];
          while (d && d !== document && !d.host) {
            d = d.parentNode;
          }
          var u = d && (d.URL || d._URL || d.host && d.host.localName) || "";
          u = u.split("/?").shift().split("/").pop();
        }
      }
      console.group("mutations (%d) [%s]", mutations.length, u || "");
    }
    var isAttached = inDocument(root);
    mutations.forEach(function(mx) {
      if (mx.type === "childList") {
        forEach(mx.addedNodes, function(n) {
          if (!n.localName) {
            return;
          }
          addedNode(n, isAttached);
        });
        forEach(mx.removedNodes, function(n) {
          if (!n.localName) {
            return;
          }
          detachedNode(n);
        });
      }
    });
    flags.dom && console.groupEnd();
  }
  function takeRecords(node) {
    node = window.wrap(node);
    if (!node) {
      node = window.wrap(document);
    }
    while (node.parentNode) {
      node = node.parentNode;
    }
    var observer = node.__observer;
    if (observer) {
      handler(node, observer.takeRecords());
      takeMutations();
    }
  }
  var forEach = Array.prototype.forEach.call.bind(Array.prototype.forEach);
  function observe(inRoot) {
    if (inRoot.__observer) {
      return;
    }
    var observer = new MutationObserver(handler.bind(this, inRoot));
    observer.observe(inRoot, {
      childList: true,
      subtree: true
    });
    inRoot.__observer = observer;
  }
  function upgradeDocument(doc) {
    doc = window.wrap(doc);
    flags.dom && console.group("upgradeDocument: ", doc.baseURI.split("/").pop());
    var isMainDocument = doc === window.wrap(document);
    addedNode(doc, isMainDocument);
    observe(doc);
    flags.dom && console.groupEnd();
  }
  function upgradeDocumentTree(doc) {
    forDocumentTree(doc, upgradeDocument);
  }
  var originalCreateShadowRoot = Element.prototype.createShadowRoot;
  if (originalCreateShadowRoot) {
    Element.prototype.createShadowRoot = function() {
      var root = originalCreateShadowRoot.call(this);
      window.CustomElements.watchShadow(this);
      return root;
    };
  }
  scope.watchShadow = watchShadow;
  scope.upgradeDocumentTree = upgradeDocumentTree;
  scope.upgradeDocument = upgradeDocument;
  scope.upgradeSubtree = addedSubtree;
  scope.upgradeAll = addedNode;
  scope.attached = attached;
  scope.takeRecords = takeRecords;
});

window.CustomElements.addModule(function(scope) {
  var flags = scope.flags;
  function upgrade(node, isAttached) {
    if (node.localName === "template") {
      if (window.HTMLTemplateElement && HTMLTemplateElement.decorate) {
        HTMLTemplateElement.decorate(node);
      }
    }
    if (!node.__upgraded__ && node.nodeType === Node.ELEMENT_NODE) {
      var is = node.getAttribute("is");
      var definition = scope.getRegisteredDefinition(node.localName) || scope.getRegisteredDefinition(is);
      if (definition) {
        if (is && definition.tag == node.localName || !is && !definition.extends) {
          return upgradeWithDefinition(node, definition, isAttached);
        }
      }
    }
  }
  function upgradeWithDefinition(element, definition, isAttached) {
    flags.upgrade && console.group("upgrade:", element.localName);
    if (definition.is) {
      element.setAttribute("is", definition.is);
    }
    implementPrototype(element, definition);
    element.__upgraded__ = true;
    created(element);
    if (isAttached) {
      scope.attached(element);
    }
    scope.upgradeSubtree(element, isAttached);
    flags.upgrade && console.groupEnd();
    return element;
  }
  function implementPrototype(element, definition) {
    if (Object.__proto__) {
      element.__proto__ = definition.prototype;
    } else {
      customMixin(element, definition.prototype, definition.native);
      element.__proto__ = definition.prototype;
    }
  }
  function customMixin(inTarget, inSrc, inNative) {
    var used = {};
    var p = inSrc;
    while (p !== inNative && p !== HTMLElement.prototype) {
      var keys = Object.getOwnPropertyNames(p);
      for (var i = 0, k; k = keys[i]; i++) {
        if (!used[k]) {
          Object.defineProperty(inTarget, k, Object.getOwnPropertyDescriptor(p, k));
          used[k] = 1;
        }
      }
      p = Object.getPrototypeOf(p);
    }
  }
  function created(element) {
    if (element.createdCallback) {
      element.createdCallback();
    }
  }
  scope.upgrade = upgrade;
  scope.upgradeWithDefinition = upgradeWithDefinition;
  scope.implementPrototype = implementPrototype;
});

window.CustomElements.addModule(function(scope) {
  var isIE = scope.isIE;
  var upgradeDocumentTree = scope.upgradeDocumentTree;
  var upgradeAll = scope.upgradeAll;
  var upgradeWithDefinition = scope.upgradeWithDefinition;
  var implementPrototype = scope.implementPrototype;
  var useNative = scope.useNative;
  function register(name, options) {
    var definition = options || {};
    if (!name) {
      throw new Error("document.registerElement: first argument `name` must not be empty");
    }
    if (name.indexOf("-") < 0) {
      throw new Error("document.registerElement: first argument ('name') must contain a dash ('-'). Argument provided was '" + String(name) + "'.");
    }
    if (isReservedTag(name)) {
      throw new Error("Failed to execute 'registerElement' on 'Document': Registration failed for type '" + String(name) + "'. The type name is invalid.");
    }
    if (getRegisteredDefinition(name)) {
      throw new Error("DuplicateDefinitionError: a type with name '" + String(name) + "' is already registered");
    }
    if (!definition.prototype) {
      definition.prototype = Object.create(HTMLElement.prototype);
    }
    definition.__name = name.toLowerCase();
    if (definition.extends) {
      definition.extends = definition.extends.toLowerCase();
    }
    definition.lifecycle = definition.lifecycle || {};
    definition.ancestry = ancestry(definition.extends);
    resolveTagName(definition);
    resolvePrototypeChain(definition);
    overrideAttributeApi(definition.prototype);
    registerDefinition(definition.__name, definition);
    definition.ctor = generateConstructor(definition);
    definition.ctor.prototype = definition.prototype;
    definition.prototype.constructor = definition.ctor;
    if (scope.ready) {
      upgradeDocumentTree(document);
    }
    return definition.ctor;
  }
  function overrideAttributeApi(prototype) {
    if (prototype.setAttribute._polyfilled) {
      return;
    }
    var setAttribute = prototype.setAttribute;
    prototype.setAttribute = function(name, value) {
      changeAttribute.call(this, name, value, setAttribute);
    };
    var removeAttribute = prototype.removeAttribute;
    prototype.removeAttribute = function(name) {
      changeAttribute.call(this, name, null, removeAttribute);
    };
    prototype.setAttribute._polyfilled = true;
  }
  function changeAttribute(name, value, operation) {
    name = name.toLowerCase();
    var oldValue = this.getAttribute(name);
    operation.apply(this, arguments);
    var newValue = this.getAttribute(name);
    if (this.attributeChangedCallback && newValue !== oldValue) {
      this.attributeChangedCallback(name, oldValue, newValue);
    }
  }
  function isReservedTag(name) {
    for (var i = 0; i < reservedTagList.length; i++) {
      if (name === reservedTagList[i]) {
        return true;
      }
    }
  }
  var reservedTagList = [ "annotation-xml", "color-profile", "font-face", "font-face-src", "font-face-uri", "font-face-format", "font-face-name", "missing-glyph" ];
  function ancestry(extnds) {
    var extendee = getRegisteredDefinition(extnds);
    if (extendee) {
      return ancestry(extendee.extends).concat([ extendee ]);
    }
    return [];
  }
  function resolveTagName(definition) {
    var baseTag = definition.extends;
    for (var i = 0, a; a = definition.ancestry[i]; i++) {
      baseTag = a.is && a.tag;
    }
    definition.tag = baseTag || definition.__name;
    if (baseTag) {
      definition.is = definition.__name;
    }
  }
  function resolvePrototypeChain(definition) {
    if (!Object.__proto__) {
      var nativePrototype = HTMLElement.prototype;
      if (definition.is) {
        var inst = document.createElement(definition.tag);
        nativePrototype = Object.getPrototypeOf(inst);
      }
      var proto = definition.prototype, ancestor;
      var foundPrototype = false;
      while (proto) {
        if (proto == nativePrototype) {
          foundPrototype = true;
        }
        ancestor = Object.getPrototypeOf(proto);
        if (ancestor) {
          proto.__proto__ = ancestor;
        }
        proto = ancestor;
      }
      if (!foundPrototype) {
        console.warn(definition.tag + " prototype not found in prototype chain for " + definition.is);
      }
      definition.native = nativePrototype;
    }
  }
  function instantiate(definition) {
    return upgradeWithDefinition(domCreateElement(definition.tag), definition);
  }
  var registry = {};
  function getRegisteredDefinition(name) {
    if (name) {
      return registry[name.toLowerCase()];
    }
  }
  function registerDefinition(name, definition) {
    registry[name] = definition;
  }
  function generateConstructor(definition) {
    return function() {
      return instantiate(definition);
    };
  }
  var HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
  function createElementNS(namespace, tag, typeExtension) {
    if (namespace === HTML_NAMESPACE) {
      return createElement(tag, typeExtension);
    } else {
      return domCreateElementNS(namespace, tag);
    }
  }
  function createElement(tag, typeExtension) {
    if (tag) {
      tag = tag.toLowerCase();
    }
    if (typeExtension) {
      typeExtension = typeExtension.toLowerCase();
    }
    var definition = getRegisteredDefinition(typeExtension || tag);
    if (definition) {
      if (tag == definition.tag && typeExtension == definition.is) {
        return new definition.ctor();
      }
      if (!typeExtension && !definition.is) {
        return new definition.ctor();
      }
    }
    var element;
    if (typeExtension) {
      element = createElement(tag);
      element.setAttribute("is", typeExtension);
      return element;
    }
    element = domCreateElement(tag);
    if (tag.indexOf("-") >= 0) {
      implementPrototype(element, HTMLElement);
    }
    return element;
  }
  var domCreateElement = document.createElement.bind(document);
  var domCreateElementNS = document.createElementNS.bind(document);
  var isInstance;
  if (!Object.__proto__ && !useNative) {
    isInstance = function(obj, ctor) {
      if (obj instanceof ctor) {
        return true;
      }
      var p = obj;
      while (p) {
        if (p === ctor.prototype) {
          return true;
        }
        p = p.__proto__;
      }
      return false;
    };
  } else {
    isInstance = function(obj, base) {
      return obj instanceof base;
    };
  }
  function wrapDomMethodToForceUpgrade(obj, methodName) {
    var orig = obj[methodName];
    obj[methodName] = function() {
      var n = orig.apply(this, arguments);
      upgradeAll(n);
      return n;
    };
  }
  wrapDomMethodToForceUpgrade(Node.prototype, "cloneNode");
  wrapDomMethodToForceUpgrade(document, "importNode");
  document.registerElement = register;
  document.createElement = createElement;
  document.createElementNS = createElementNS;
  scope.registry = registry;
  scope.instanceof = isInstance;
  scope.reservedTagList = reservedTagList;
  scope.getRegisteredDefinition = getRegisteredDefinition;
  document.register = document.registerElement;
});

(function(scope) {
  var useNative = scope.useNative;
  var initializeModules = scope.initializeModules;
  var isIE = scope.isIE;
  if (useNative) {
    var nop = function() {};
    scope.watchShadow = nop;
    scope.upgrade = nop;
    scope.upgradeAll = nop;
    scope.upgradeDocumentTree = nop;
    scope.upgradeSubtree = nop;
    scope.takeRecords = nop;
    scope.instanceof = function(obj, base) {
      return obj instanceof base;
    };
  } else {
    initializeModules();
  }
  var upgradeDocumentTree = scope.upgradeDocumentTree;
  var upgradeDocument = scope.upgradeDocument;
  if (!window.wrap) {
    if (window.ShadowDOMPolyfill) {
      window.wrap = window.ShadowDOMPolyfill.wrapIfNeeded;
      window.unwrap = window.ShadowDOMPolyfill.unwrapIfNeeded;
    } else {
      window.wrap = window.unwrap = function(node) {
        return node;
      };
    }
  }
  if (window.HTMLImports) {
    window.HTMLImports.__importsParsingHook = function(elt) {
      if (elt.import) {
        upgradeDocument(wrap(elt.import));
      }
    };
  }
  function bootstrap() {
    upgradeDocumentTree(window.wrap(document));
    window.CustomElements.ready = true;
    var requestAnimationFrame = window.requestAnimationFrame || function(f) {
      setTimeout(f, 16);
    };
    requestAnimationFrame(function() {
      setTimeout(function() {
        window.CustomElements.readyTime = Date.now();
        if (window.HTMLImports) {
          window.CustomElements.elapsed = window.CustomElements.readyTime - window.HTMLImports.readyTime;
        }
        document.dispatchEvent(new CustomEvent("WebComponentsReady", {
          bubbles: true
        }));
      });
    });
  }
  if (document.readyState === "complete" || scope.flags.eager) {
    bootstrap();
  } else if (document.readyState === "interactive" && !window.attachEvent && (!window.HTMLImports || window.HTMLImports.ready)) {
    bootstrap();
  } else {
    var loadEvent = window.HTMLImports && !window.HTMLImports.ready ? "HTMLImportsLoaded" : "DOMContentLoaded";
    window.addEventListener(loadEvent, bootstrap);
  }
})(window.CustomElements);

(function(scope) {
  var style = document.createElement("style");
  style.textContent = "" + "body {" + "transition: opacity ease-in 0.2s;" + " } \n" + "body[unresolved] {" + "opacity: 0; display: block; overflow: hidden; position: relative;" + " } \n";
  var head = document.querySelector("head");
  head.insertBefore(style, head.firstChild);
})(window.WebComponents);
            
        },
        
        speechsynthesis: function(){

  var splitText = function(text, delimeters, limit){
    var sentences = [];

    // split text by multiple delimeters
    var reduce = function(text, index) {
      if (delimeters[index] && text.trim().length) {

        if (text.indexOf(delimeters[index]) > -1) {

          var s = 1;
          var splitted = text.split(delimeters[index]);
          splitted.forEach(function(words){
            if (words.length) {
              var suffix = '';
              if (s != splitted.length) {
                suffix = delimeters[index];
              }
              words = (words + suffix).trim();
            }

            if (words.length && words.length <= limit) {
              sentences.push(words);
            }
            else {
              reduce(words, index + 1);
            }

            s++;
          });
        }
        else {
          reduce(text, index + 1);
        }
      }
      else if (text.length) {
        var regexp = new RegExp('.{1,' + limit + '}', 'g'); // /.{1,100}/g
        var parts = text.match(regexp);
        while (parts.length > 0) {
          sentences.push(parts.shift().trim());
        }
      }
    };
    
    reduce(text, 0);

    var result = [];
    // merge short sentences
    sentences.forEach(function(sentence){
      if (! result.length) {
        result.push(sentence);
      }
      else if (result[result.length - 1].length + sentence.length + 1 <= limit) {
        result[result.length - 1] += ' ' + sentence;
      }
      else {
        result.push(sentence);
      }
    });

    return result;
  };

  var SpeechSynthesisUtterancePolyfill = function(text){

    /**
     * Identify the polyfill usage
     */

    this.isPolyfill = true;

    /**
     * SpeechSynthesisUtterance Attributes
     */
    
    this.text = text || '';
    this.lang = document.documentElement.lang || 'en-US';
    this.volume = 1.0; // 0 to 1
    this.rate = 1.0; // 0.1 to 10
    // These attributes are not supported:
    this.voiceURI = 'native';
    this.pitch = 1.0; //0 to 2;

    /**
     * SpeechSynthesisUtterance Events
     */
    
    this.onstart = undefined;
    this.onend = undefined;
    this.onerror = undefined;
    this.onpause = undefined;
    this.onresume = undefined;
    // These attributes are not supported:
    this.onmark = undefined;
    this.onboundary = undefined;


    this.corsProxyServer = 'http://www.corsproxy.com/';

    /**
     * Private parts
     */
    
    var that = this;

    var startTime;
    var endTime;
    var event = {
      charIndex: undefined,
      elapsedTime: undefined,
      name: undefined
    };

    var updateElapsedTime = function(){
      endTime = new Date().getTime();
      event.elapsedTime = (endTime - (startTime || endTime)) / 1000;
    };

    var getAudioUrl = function(corsProxyServer, text, lang){
      return [corsProxyServer, 'translate.google.com/translate_tts?ie=UTF-8&q=', encodeURIComponent(text) , '&tl=', lang].join('');
    };

    this._initAudio = function(){
      var sentences = [];
      that._ended = false;
      var audio = new Audio();

      audio.addEventListener('play', function() {
        updateElapsedTime();

        if (! startTime) {
          startTime = new Date().getTime();
          if (that.onstart) {
            that.onstart(event);
          }
        }
        else {
          if (that.onresume) {
            that.onresume(event);
          }
        }
      }, false);

      audio.addEventListener('ended', function() {

        if (sentences.length) {
          var audioURL = getAudioUrl(that.corsProxyServer, sentences.shift(), that.lang);
          audio.src = audioURL;
          audio.play();
        }
        else {
          updateElapsedTime();
          that._ended = true;
          if (that.onend) {
            that.onend(event);
          }
        }
        
      }, false);

      audio.addEventListener('error', function() {
        updateElapsedTime();
        that._ended = true;
        if (that.onerror) {
          that.onerror(event);
        }
      }, false);

      audio.addEventListener('pause', function() {
        if (!that._ended) {
          updateElapsedTime();
          if (that.onpause) {
            that.onpause(event);
          }
        }
      }, false);

      // Google Translate limit is 100 characters, we need to split longer text
      // we use the multiple delimeters

      var LIMIT = 100;
      if (that.text.length > LIMIT) {

        sentences = splitText(that.text, ['.', '!', '?', ':', ';', ',', ' '], LIMIT);

      }
      else {
        sentences.push(that.text);
      }

      var audioURL = getAudioUrl(that.corsProxyServer, sentences.shift(), that.lang);
      audio.src = audioURL;
      audio.volume = that.volume;
      audio.playbackRate = that.rate;

      return audio;
    };

    return this;
  };

  var SpeechSynthesisPolyfill = function(){

    /**
     * Identify the polyfill usage
     */

    this.isPolyfill = true;

    /**
     * SpeechSynthesis Attributes
     */

    this.pending = false;
    this.speaking = false;
    this.paused = false;

    /**
     * Private parts
     */

    var that = this;
    var audio = new Audio();
    var utteranceQueue = [];

    var playNext = function(utteranceQueue){
      var SpeechSynthesisUtterancePolyfill = utteranceQueue.shift();

      that.speaking = false;
      if (utteranceQueue.length) {
        that.pending = true;
      }
      else {
        that.pending = false;
      }

      if (SpeechSynthesisUtterancePolyfill) {
        audio = SpeechSynthesisUtterancePolyfill._initAudio();
        attachAudioEvents(audio, SpeechSynthesisUtterancePolyfill);
        resume();
      }
    };

    var attachAudioEvents = function(audio, SpeechSynthesisUtterancePolyfill) {

      audio.addEventListener('play', function() {
        // console.log('SpeechSynthesis audio play');
      }, false);

      audio.addEventListener('ended', function() {
        // console.log('SpeechSynthesis audio ended');
        if (SpeechSynthesisUtterancePolyfill._ended) {
          playNext(utteranceQueue);
        }
      }, false);

      audio.addEventListener('error', function() {
        // console.log('SpeechSynthesis audio error');
        playNext(utteranceQueue);
      }, false);

      audio.addEventListener('pause', function() {
        // console.log('SpeechSynthesis audio pause');
      }, false);
    };

    var speak = function(SpeechSynthesisUtterancePolyfill){

      that.pending = true;
      utteranceQueue.push(SpeechSynthesisUtterancePolyfill);

      if (that.speaking || that.paused) {
        // do nothing else
      }
      else {
        playNext(utteranceQueue);
      }
    };

    var cancel = function(){
      audio.src = '';
      audio = undefined;
      audio = new Audio();

      that.pending = false;
      that.speaking = false;
      that.paused = false;
      utteranceQueue = [];
      playNext(utteranceQueue);
    };

    var pause = function(){
      audio.pause();
      that.speaking = false;
      that.paused = true;
    };

    var resume = function(){
      if (audio.src) {
        audio.play();
        that.speaking = true;
      }
      else {
        playNext(utteranceQueue);
      }

      that.paused = false;
    };

    // Method is not supported
    var getVoices = function(){
      return [];
    };

    return {
      /**
       * Identify the polyfill usage
       */

      'isPolyfill': true,

      /**
       * SpeechSynthesis Methods
       */

      'pending': that.pending,
      'speaking': that.speaking,
      'paused': that.paused,

      'speak': function(SpeechSynthesisUtterancePolyfill){
        speak(SpeechSynthesisUtterancePolyfill);
      },

      'cancel': function(){
        cancel();
      },

      'pause': function(){
        pause();
      },

      'resume': function(){
        resume();
      },

      'getVoices': function(){
        getVoices();
      },

    };
  };

  var nativeSpeechSynthesisSupport = function(){
    return window.speechSynthesis && window.SpeechSynthesisUtterance ? true : false;
  };

  var getSpeechSynthesis = function(){
    return nativeSpeechSynthesisSupport() ? window.speechSynthesis : window.speechSynthesisPolyfill;
  };

  var getSpeechSynthesisUtterance = function(){
    return nativeSpeechSynthesisSupport() ? window.SpeechSynthesisUtterance : window.SpeechSynthesisUtterancePolyfill;
  };

  window.SpeechSynthesisUtterancePolyfill = SpeechSynthesisUtterancePolyfill;
  window.speechSynthesisPolyfill = new SpeechSynthesisPolyfill();
  window.nativeSpeechSynthesisSupport = nativeSpeechSynthesisSupport;
  window.getSpeechSynthesis = getSpeechSynthesis;
  window.getSpeechSynthesisUtterance = getSpeechSynthesisUtterance;
            
        }
        
    };
    /* jshint ignore:end */
    
    // Load Necessary Polyfills
    $.pf.polyfill = function(){

        // load [WebComponents]
        if(!window.WebComponents) $.pf.webcomponents();

        // load [SpeechSynthesis]
        $.pf.speechsynthesis();

    }();
    
    $.smarty = function(settings){
        
        var defaults = {
            /*
             * window: The window object equivalent to the browser window.
             * - Helps to identify the window from inside an <iframe> object
             */
            window: parent.window,
            /*
             * frameSelector: The LMS selector where a frame document may be found.
             * - Helps to identify the <iframe> where the document is stored
             * - For D2L, use #ContentView
             */
            frameSelector: '#ContentView',
            /*
             * fixedSelector: The LMS selector where any fixed header elements appear.
             * - Helps to identify the fixed header portion of the document
             * - For D2L, use .d2l-minibar
             */
            fixedSelector: '.d2l-minibar',
            /*
             * selectorPrefix: The HTML tag prefix used for Smarty elements.
             * - Must end with a "-" to adhere to proper syntax.
             */
            selectorPrefix: 'smarty-',
            /*
             * focusClass: The class given to a tabbable element when it has focus.
             * - Can be used for toggling accessibile styles
             */
            focusClass: 'tabfocus',
            /*
             * className: The class given to Smarty elements.
             * - Used to identify outermost Smarty objects
             */
            className: 'smarty',
            /*
             * transitionSpeed: The speed at which transitions take place.
             * - Used for chaining and/or calling subsequent animations
             * - Requires that the same transitionSpeed be set in CSS configurations
             */
            transitionSpeed: 0.25,
            crosswords: {
                /*
                 * enabled: If the use of crosswords are enabled or disabled.
                 * - Toggles crosswords on or off
                 */
                enabled: true,
                /*
                 * selector: The base HTML tag used for crosswords.
                 * - Gets prefixed with the value in selectorPrefix
                 */
                selector: 'crossword',
                /*
                 * name: The text name given to crosswords.
                 * - Outputs as text to the end user where applicable
                 */
                name: 'crossword',
                /*
                 * fontResize: If cell font size should be resized based on grid width.
                 * - Enlarges small fonts on larger screens
                 * - Uses default font size for smaller screens
                 */
                fontResize: true,
                /*
                 * fontRatio: The cell's font size relative to the grid's width.
                 * - Requires that fontResize = true
                 * - Kicks in when the crossword grid is >= respondAt
                 */
                fontRatio: 700 / 11,
                /*
                 * minWidth: The minimum cell width for all cells in the crossword grid.
                 * - Should equal the cells' (.grid td) min-width CSS property
                 */
                minWidth: 20,
                /*
                 * cellSpacing: The spacing between cells in the crossword grid.
                 * - Used to set the cellspacing="" attribute of the grid table.
                 */
                cellSpacing: 2,
                /*
                 * cellPadding: The padding inside cells in the crossword grid.
                 * - Used to set the cellpadding="" attribute of the grid table.
                 */
                cellPadding: 2,
                /* 
                 * respondAt: The minimum width of the crossword grid.
                 * - Set programatically. 
                 * - Calculated based on the following formula:
                 * ---- (#gridColumns x minWidth) + (#gridColumns * cellSpacing)
                 */
                // respondAt:
                /*
                 * acceptJSON: If crosswords should check for JSON crossword data.
                 * - Checks for data-file on the crossword element
                 */
                acceptJSON: true,
                /*
                 * acceptXML: If crosswords should check for XML crossword data.
                 * - Checks for data-file on the crossword element
                 */
                acceptXML: true,
            },
            fillInTheBlanks: {
                /*
                 * enabled: If the use of fillInTheBlanks are enabled or disabled.
                 * - Toggles fillInTheBlanks on or off
                 */
                enabled: false,
                /*
                 * selector: The base HTML tag used for fillInTheBlanks.
                 * - Gets prefixed with the value in selectorPrefix
                 */
                selector: 'fillblank',
                /*
                 * name: The text name given to fillInTheBlanks.
                 * - Outputs as text to the end user where applicable
                 */
                name: 'fill-in-the-blanks'
            },
            flashcards: {
                /*
                 * enabled: If the use of flashcards are enabled or disabled.
                 * - Toggles flashcards on or off
                 */
                enabled: true,
                /*
                 * selector: The base HTML tag used for flashcards.
                 * - Gets prefixed with the value in selectorPrefix
                 */
                selector: 'flashcard',
                /*
                 * name: The text name given to flashcards.
                 * - Outputs as text to the end user where applicable
                 */
                name: 'flashcards',
                /*
                 * aspectRatio: The aspect ratio of each card.
                 * - Equates to the height of the card relative to its width
                 */
                aspectRatio: 3 / 5,
                /*
                 * fontResize: If card font size should be resized based on card width.
                 * - Enlarges small fonts on larger screens
                 * - Uses default font size for smaller screens
                 */
                fontResize: true,
                /*
                 * fontRatio: The card's font size relative to the flashcard's width.
                 * - Requires that fontResize = true
                 * - Kicks in when the flashcard width is >= respondAt
                 */
                fontRatio: 400 / 16,
                /* 
                 * respondAt: The minimum width of a flashcard before font resizing.
                 * - Requires that fontResize = true
                 * - Requires that a fontRatio is given
                 */
                respondAt: 400,
                /*
                 * acceptJSON: If flashcards should check for JSON flashcard data.
                 * - Checks for data-file on the flashcard element
                 */
                acceptJSON: true,
                /*
                 * acceptXML: If flashcards should check for XML flashcard data.
                 * - Checks for data-file on the flashcard element
                 */
                acceptXML: true,
            },
            quizzes: {
                /*
                 * enabled: If the use of quizzes are enabled or disabled.
                 * - Toggles quizzes on or off
                 */
                enabled: true,
                /*
                 * selector: The base HTML tag used for quizzes.
                 * - Gets prefixed with the value in selectorPrefix
                 */
                selector: 'quiz',
                /*
                 * name: The text name given to quizzes.
                 * - Outputs as text to the end user where applicable
                 */
                name: 'quiz',
                /* 
                 * respondAt: The minimum width before responsive styles kick in.
                 * - Requires that the CSS breakpoint for quizzes is equivalent
                 */
                respondAt: 600,
                /* 
                 * questionTypes: The question type IDs for quiz questions.
                 * - Used for identifying question types
                 * - Changes not recommended
                 */
                questionTypes: {
                    multiChoice: 'multi-choice',
                    multiAnswer: 'multi-answer',
                    shortAnswer: 'short-answer',
                    trueFalse: 'true-false'
                },
                /*
                 * acceptJSON: If quizzes should check for JSON quiz data.
                 * - Checks for data-file on the quiz element
                 */
                acceptJSON: true,
                /*
                 * acceptXML: If quizzes should check for XML quiz data.
                 * - Checks for data-file on the quiz element
                 */
                acceptXML: true,
                /*
                 * defaultMode: The default mode for all quizzes.
                 * - Used when a quiz's data-mode attribute is not set
                 */
                defaultMode: 'sliding'
            },
            dragAndDrops: {
                /*
                 * enabled: If the use of dragAndDrops are enabled or disabled.
                 * - Toggles dragAndDrops on or off
                 */
                enabled: false,
                /*
                 * selector: The base HTML tag used for dragAndDrops.
                 * - Gets prefixed with the value in selectorPrefix
                 */
                selector: 'dragdrop',
                /*
                 * name: The text name given to dragAndDrops.
                 * - Outputs as text to the end user where applicable
                 */
                name: 'drag-and-drop'
            },
            matching: {
                /*
                 * enabled: If the use of matching is enabled or disabled.
                 * - Toggles matching on or off
                 */
                enabled: false,
                /*
                 * selector: The base HTML tag used for matching.
                 * - Gets prefixed with the value in selectorPrefix
                 */
                selector: 'matching',
                /*
                 * name: The text name given to matching.
                 * - Outputs as text to the end user where applicable
                 */
                name: 'matching'
            },
            pickALetter: {
                /*
                 * enabled: If the use of pickALetter is enabled or disabled.
                 * - Toggles pickALetter on or off
                 */
                enabled: false,
                /*
                 * selector: The base HTML tag used for pickALetter.
                 * - Gets prefixed with the value in selectorPrefix
                 */
                selector: 'pickletter',
                /*
                 * name: The text name given to pickALetter.
                 * - Outputs as text to the end user where applicable
                 */
                name: 'pick-a-letter'
            },
            ordering: {
                /*
                 * enabled: If the use of ordering is enabled or disabled.
                 * - Toggles ordering on or off
                 */
                enabled: false,
                /*
                 * selector: The base HTML tag used for ordering.
                 * - Gets prefixed with the value in selectorPrefix
                 */
                selector: 'ordering',
                /*
                 * name: The text name given to ordering.
                 * - Outputs as text to the end user where applicable
                 */
                name: 'ordering'
            },
            readSpeaker: {
                /*
                 * enabled: If ReadSpeaker app is also used for accessibility.
                 * - Toggles the skipClass on or off
                 */
                enabled: true,
                /*
                 * skipClass: The class used by the ReadSpeaker app to ignore text.
                 * - Ignores text that should not be read aloud
                 */
                skipClass: 'rs_skip'
            },
            /*
             * debuggingMode: Enables or disables debugging mode.
             * - For developmental use only.
             */
            debuggingMode: true
        },
        
        // initialize default and user settings
            config = $.extend(defaults, settings);
        
        // define window
        var $window = $(config.window);
        var $document = $(config.window.document);
        
        // detect document frames
        if($.isset(config.frameSelector)){
            
            // initialize frame to false
            config.frameEnabled = false;
            
            // check for frame element and enable if applicable
            if($.exists($document.find(config.frameSelector + ' iframe')))
                config.frameEnabled = true;
        }
        
        // save config
        $.smarty.config = config;
        
        // configure window
        $window.width = $window.innerWidth();
        $window.height = $window.innerHeight();
        
        // enable debugging
        if(config.debuggingMode){
            
            // set debugging configurations
            $window[0].smartyDebug = {
                
                guideCounter: 0,
                
                guideIDs: [],
                
                guidePrefix: 'smarty-debug-guide-'
                
            };
            
            // add window guide
            $window[0].smartyDebug.newGuide = function(options){

                // increment counter
                $window[0].smartyDebug.guideCounter++;

                // get settings
                var settings = $.extend({
                    prefix: $window[0].smartyDebug.guidePrefix,
                    id: $window[0].smartyDebug.guideCounter,
                    horizontal: true,
                    color: 'red',
                    position: '0px',
                    text: '',
                    'z-index': 99999
                },options);
                
                // configure ID
                if($window[0].smartyDebug.guideIDs.indexOf(settings.id) > -1)
                    settings.id = $window[0].smartyDebug.guideCounter;

                // create guide
                $('<div>',{
                    id: settings.prefix + settings.id,
                    text: settings.text + ' [ID: ' + settings.id + ']'
                }).css({
                    position: 'absolute',
                    width: settings.horizontal ? '100vw' : '1px',
                    height: settings.horizontal ? '1px' : '100vh',
                    color: settings.color,
                    background: settings.color,
                    top: settings.horizontal ? settings.position : 0,
                    left: settings.horizontal ? 0 : settings.position
                }).appendTo($($window[0].document.body));
                
                // save id
                $window[0].smartyDebug.guideIDs.push(settings.id);
                
                return 'ID: ' + settings.id;

            };
                
            // erase window guide
            $window[0].smartyDebug.eraseGuide = function(id){
                    
                // find by ID
                var $guide = $($window[0].document.body)
                                .find($window[0].smartyDebug.guidePrefix + id);
                    
                // check for existance
                if($.exists($guide)){
                    
                    // delete guide
                    $guide.remove();
                    
                    // erase id
                    $window[0].smartyDebug.splice($window[0].smartyDebug.indexOf(id),1);
                    
                    // decrement counter
                    $window[0].smartyDebug.guideCounter--;
                    
                    return true;
                    
                }
                  
                return false;
                
            };
                
        }
    
        // initialize smarty
        var init = {
            
            // classify smarty elements
            classify: function(){
                
                var prefix = config.selectorPrefix;
                
                var $smarties = $()
                                .add(prefix + config.crosswords.selector)
                                .add(prefix + config.fillInTheBlanks.selector)
                                .add(prefix + config.flashcards.selector)
                                .add(prefix + config.quizzes.selector)
                                .add(prefix + config.dragAndDrops.selector)
                                .add(prefix + config.matching.selector)
                                .add(prefix + config.pickALetter.selector)
                                .add(prefix + config.ordering.selector);
                
                $smarties.each(function(i){
                    var tagName = $(this).prop('tagName').toLowerCase(); 
                    if(tagName.indexOf(config.selectorPrefix) === 0){
                        $(this).smartClass(config.className,'add');
                    }
                });
                
            },
            
            // register additional elements
            register: function(){
                
                // collect customs elements
                var customs = function(){
                    var customElements = [];
                    $.each(config,function(key, configuration){
                        if ($.isset(configuration.selector))
                            customElements.push(configuration.selector);
                    });
                    return customElements;
                }();

                // register custom elements
                var register = function(){  
                    var customs = arguments.length == 1 ? arguments[0] : $.makeArray(arguments);
                    if(document.registerElement){
                        $.each(customs,function(key,reg){
                            var element = config.selectorPrefix + reg; 
                            var prototype = Object.create(HTMLElement.prototype);
                            document.registerElement(element,prototype);
                        });

                    }
                };
                                 
                // start registering...
                register(customs);

                // finish registering...
                register(
                    
                    // register elements for all smarties
                    'blank',
                
                    // register elements for quizzes
                    'intro',
                    'question',
                    'answer',
                    'score',
                    'tracker',
                    'report',
                    'feedback',
                    'attempts',
                    'timer',
                    'hint',
                
                    // register elements for crosswords
                    'clue',
                    'across',
                    'down',
                    'modal',
                    'popclue',
                
                    // register elements for flashcards
                    'card',
                    'stack',
                    'front',
                    'back',
                    'sidebar',
                    'pane',
                    'placeholder',
                    'flipper',
                    'progress',
                    'info'
                        
                    );
                
            },
            
            // unwrap injected paragraph tags (common problem with LMS WYSIWYG editors)
            unwrap: function(callback){
                
                // find all smarties
                var $smarties = $(':smarty()');
                
                $smarties.each(function(){
                    
                    if($(this).parent('p').length > 0) $(this).unwrap('p');
                    
                });
                
                if($.isset(callback)) callback();
                
            },
            
            // initialize quizzes
            quizzes: function(){
                
                // capture quizzes
                var $quizzes = $(':smarty(' + config.quizzes.selector + ')');

                $quizzes.each(function(i){
                    
                    // capture quiz
                    var $quiz = $(this);
                    
                    // prepare quiz setup
                    var setup = function(){
                        
                        // capture quiz elements
                        var $intro = $quiz.find(':smarty(intro)'),
                            $questions = $quiz.find(':smarty(question)'),
                            $blanks = $quiz.find(':smarty(blank)'),
                            $frames = $quiz.find('iframe'),
                            $title,
                            $timer,
                            $checkBtn,
                            $instaBtns,
                            $nextBtn,
                            $prevBtn,
                            $doneBtn;
                        
                        // exit it no questions are found
                        if($questions.length === 0) return false;
                    
                        // set quiz ID
                        var quizID = 'quiz' + (i+1);
                        $quiz.attr('id',quizID);

                        // capture quiz properties
                        var title = $quiz.attr('data-title'),
                            mode = $quiz.attr('data-mode'),
                            back = $quiz.attr('data-back'),
                            timed = $quiz.attr('data-timed'),
                            shuffle = {
                                questions: $quiz.attr('data-shuffle-questions'),
                                answers: $quiz.attr('data-shuffle-answers')
                            },
                            points = 0,
                            box = {
                                width: 0,
                                height: 0
                            },
                            time;

                        // configure back
                        back = $.isset(back) ? parseBool(back) : true;

                        // configure mode
                        mode = $.isset(mode) ? mode : config.quizzes.defaultMode;

                        // configure timed
                        timed = !$.isset(timed) ? false : 
                                $.isBoolean(timed) ? parseBool(timed) : timed;

                        // configure shuffle
                        shuffle.questions = $.isset(shuffle.questions) ? 
                                                parseBool(shuffle.questions) : false;
                        shuffle.answers = $.isset(shuffle.answers) ? 
                                                parseBool(shuffle.answers) : false;

                        // setup title
                        if($.isset(title)){

                            $title = $('<div>',{
                                class: 'title',
                                html: title
                            }).prependTo($quiz);

                        }

                        // setup timer
                        if(timed !== false && $.exists($intro)){

                            $timer = $('<' + config.selectorPrefix + 'timer>',{
                                html: '<div>' +
                                      '<div class="text"></div>' +
                                      '<div class="time"></div>' +
                                      '</div>'
                            }).appendTo($quiz);

                            // running timer
                            if(timed === true){

                                $timer.attr({
                                    'data-start': 0,
                                    'data-end': false,
                                    'data-time': 0
                                }); 

                            } 
                            // countdown timer
                            else {

                                var _regex = {
                                    hhmmss: /(\d){1,2}:(\d){2}:(\d){2}/g,
                                    mmss: /(\d){1,2}:(\d){2}/g,
                                    ss: /(\d){1,2}/g
                                };

                                if(_regex.hhmmss.test(timed)){
                                    time = timed.parseTime('hhmmss');
                                } else if(_regex.mmss.test(timed)){
                                    time = timed.parseTime('mmss');
                                } else if(_regex.ss.test(timed)){
                                    time = timed.parseTime('ss');
                                }

                                if($.isset(time)){
                                    $timer.attr({
                                        'data-start': time.t,
                                        'data-end': 0,
                                        'data-time': time.t
                                    });
                                }

                            }

                        }

                        // setup blanks
                        $blanks.each(function(i){

                            var $underline = $('<span>',{
                                class: 'underline'
                            }).appendTo($(this));

                        });

                        // setup quiz events
                        $quiz
                        .on('quiz:done',function(event){

                            // create a report
                            $(this).createReport(); 

                        })
                        .on('quiz:timeout',function(event){

                            // timeout the quiz
                            $(this).timeoutQuiz();

                        })
                        .on('quiz:check',function(event){

                            // check questions
                            $(this).checkAnswer(event)
                            
                            // trigger quiz change
                                   .trigger('quiz:change');

                        })
                        .on('quiz:feedback',function(){

                            // show the report
                            $(this).viewReport();

                        })
                        .on('quiz:score',function(event){

                            // update running score
                            $(this).runningScore(event);

                        })
                        .on('quiz:time',function(event){

                            // initialize timer
                            if($.isset(timed) && timed !== false) $(this).smartTimer();

                        })
                        .on('quiz:track',function(event){

                            // update the question tracker
                            $(this).questionTrack(function(){

                                // trigger stats events
                                $quiz.trigger($.Event('quiz:track:stats',{
                                    init: event.init,
                                    update: event.update,
                                    create: event.create
                                }));

                            });

                        })
                        .on('quiz:track:stats',function(event){ 

                            // update tracker stats
                            if(!event.init) $(this).trackerStats(event);

                        })
                        .on('quiz:change',function(event){
                            
                            // resize frames each time an event is fired
                            $frames.each(function(){
                                $(this).trigger('frame:resize');
                            });
                            
                        });

                        // setup intro
                        if($.exists($intro)){

                            // wrap inner contents
                            var $contents = $intro.wrapInner('<div>').children('div');

                            // setup title
                            if($.isset(title)){

                                var _$title = $('<div>',{
                                    class: 'title',
                                    html: '<span>' + title + '</span>'
                                }).prependTo($contents);

                            }

                            var _$notif;

                            // setup timed notification
                            if(timed !== false &&  timed !== true){

                                _$notif = $('<div>',{
                                    class: 'notif-timed',
                                    html: 'You have approximately ' +
                                           '<span class="fa fa-hourglass-start"></span> ' +
                                           '<span>' +
                                                time.t.toTime().h.pad(2) + ':' +
                                                time.t.toTime().m.pad(2) + ':' +
                                                time.t.toTime().s.pad(2) +  
                                           '</span>' +
                                           ' to complete this quiz.'
                                }).appendTo($contents);

                            } else if(timed === true){

                                _$notif = $('<div>',{
                                    class: 'notif-timed',
                                    html: 'Your quiz will be ' +
                                          '<span class="fa fa-clock-o"></span> ' +
                                          '<span>timed</span>.'
                                }).appendTo($contents);

                            }

                            // setup start button
                            var _$startBtn = $('<button>',{
                                class: 'btn-start',
                                type: 'button',
                                html: 'Start Quiz',
                            }).appendTo($contents).on('click',function(){

                                // remove the intro
                                $(this).smartRemove();

                                // trigger quiz timer
                                $quiz.trigger('quiz:time');

                            });

                        }

                        // shuffle questions
                        if(shuffle.questions) $questions = $questions.shuffle();

                        // number questions
                        $questions.smartNumber('decimal');
                        
                        // make frames fluid
                        $frames.fluidFrames();
 
                        // setup questions
                        $questions.each(function(q){

                            // capture question
                            var $question = $(this),
                                $answers = $question.find(':smarty(answer)'),
                                $corrects = $answers.filter('[data-answer]:not([data-answer="false"])'),
                                $feedback = $question.find(':smarty(feedback)'),
                                $hint = $question.find(':smarty(hint)'),
                                $text,
                                $instaBtn,
                                $attempts,
                                $attemptsBtn;

                            // set question ID
                            var questionID = quizID + '-q' + (q+1);
                            $question.attr('id',questionID);

                            // capture question properties
                            var _points = $question.attr('data-points'),
                                _type;

                            // capture box size from first question
                            if(q === 0){
                                box.width += $question.find('.question-num').outerWidth();
                                box.height += $question.find('.question-num').outerHeight();
                            }

                            // determine answer type
                            switch(true){
                                // =1 correct answer(s) && >1 answer option(s)
                                case $corrects.length == 1 && $answers.length > 1:
                                    // MULTIPLE CHOICE [multi-choice]
                                    _type = config.quizzes.questionTypes.multiChoice;
                                    break;
                                // >1 correct answer(s) && >1 answer option(s)
                                case $corrects.length > 1 && $answers.length > 1:
                                    // MULTIPLE ANSWER [multi-answer]
                                    _type = config.quizzes.questionTypes.multiAnswer;
                                    break;
                                // =1 correct answer(s) && =1 answer option(s)
                                case $corrects.length == 1 && $answers.length == 1:
                                    // SHORT ANSWER [short-answer]
                                    _type = config.quizzes.questionTypes.shortAnswer;
                                    break;
                                // =0 correct answer(s) && =0 answer option(s)
                                case $corrects.length === 0 && $answers.length === 0:
                                    // TRUE/FALSE [true-false]
                                    _type = config.quizzes.questionTypes.trueFalse;
                                    break;
                            }
 
                            // save type on question
                            $question.attr('data-question-type',_type);

                            // setup points
                            _points = $.isset(_points) ? parseFloat(_points) : 1;

                            // calculate quiz points
                            points += _points;

                            // set current question 
                            if(q === 0 && mode == 'sliding') $question.smartClass('curr');
                            
                            // pull question text
                            $question.questionNodes = $($question[0].childNodes)
                            .filter(function(n,node){
                                return  node.nodeType === 3; 
                            }).each(function(n,node){
                                node.nodeValue = node.nodeValue.trim();
                            }).filter(function(n,node){
                                return $.isset(node.nodeValue);
                            });
                            
                            // grab other possible text nodes
                            $question.questionNodes = $question.questionNodes.add(
                                $question.children('table, p')
                            );
                  
                            // wrap question text
                            $text = $('<span>',{
                                class: 'question-txt'
                            }).insertBefore($question.questionNodes.first());
                            
                            // add text to wrapper
                            $.each($question.questionNodes,function(n,node){
                                
                                switch(node.nodeType){
                                      
                                    // text node
                                    case 3:
                                        
                                        $text.html($text.html() + $(node).text());
                                        
                                        break;
                                        
                                    // element node
                                    case 1:
                                        
                                        $text.html($text.html() + $(node).outerHTML());
                                        
                                        break;
                                        
                                }
                                
                            });
                            
                            // remove old text nodes
                            $question.questionNodes.remove();

                            // shuffle answers
                            if(shuffle.answers && $answers.length > 1) 
                                $answers = $answers.shuffle();

                            // number answers
                            $answers.smartNumber('alpha');

                            // count correct answers
                            $question.attr('data-answer-count',$corrects.length);

                            // setup feedback
                            if($.exists($feedback)){

                                var _$message = $('<span>',{
                                    class: 'message'
                                }).smartClass('hide');

                                $feedback.wrapInner(_$message);

                            }
                            
                            // Prepare to capture hint display setting
                            var _showHint = false;
                           
                            // setup hint
                            if($.exists($hint)){
                                
                                // Check for hint display setting
                                if($hint.is('[data-show="true"]')) _showHint = true;
                      
                                var _$hint = $('<span>',{
                                        class: 'hint',
                                    }).smartClass(
                                        (_showHint === true ? 'show' : 'hide')
                                    ),
                                    _$text = $('<span>',{
                                        class: 'hint-txt',
                                        text: 'Hint'
                                    });
                                
                                $hint.wrapInner(_$hint).find('.hint').prepend(_$text);
                                
                            }

                            // setup MULTIPLE CHOICE [multi-choice]
                            // setup MULTIPLE ANSWER [multi-answer]
                            // setup SHORT ANSWER [short-answer]
                            if(_type == config.quizzes.questionTypes.multiChoice ||
                               _type == config.quizzes.questionTypes.multiAnswer ||
                               _type == config.quizzes.questionTypes.shortAnswer){

                                // setup answer options
                                $answers.each(function(a){

                                    // capture answer
                                    var $answer = $(this),
                                        $number = $answer.find('.answer-num');

                                    // set answer ID
                                    var answerID = questionID + '-a' + (a+1);
                                    $answer.attr('id',answerID);

                                    // capture answer properties
                                    var _value = $answer.attr('data-answer-num');

                                        var _$text, 
                                            _$input, 
                                            _$toggle;

                                        // find answer text
                                        $answer.textNodes = $($answer[0].childNodes)
                                            .filter(function(n,node){
                                                return node.nodeType === 3;
                                            }).each(function(n,node){
                                                node.nodeValue = node.nodeValue.trim();
                                            }).filter(function(n,node){
                                                return $.isset(node.nodeValue);
                                            });

                                        // setup MULTIPLE CHOICE [multi-choice]
                                        if(_type == config.quizzes.questionTypes.multiChoice){

                                            // setup a toggle for the radio button
                                            _$toggle = $('<label>',{
                                                class: 'answer-radio',
                                                for: questionID + _value,
                                            }).css({
                                                width: box.width + 'px',
                                                height: box.height + 'px'
                                            }).prependTo($answer);

                                            // setup a radio button
                                            _$input = $('<input>',{
                                                type: 'radio',
                                                name: questionID,
                                                id: questionID + _value,
                                                value: _value
                                            }).prependTo($answer);

                                            if($.isset($answer.text)){

                                                // wrap answer text
                                                _$text = $('<label>',{
                                                    class: 'answer-txt',
                                                    for: questionID + _value,
                                                    text: $answer.textNodes.text()
                                                }).appendTo($answer);

                                                // remove old text node
                                                $answer.textNodes.remove();

                                            }

                                        } else

                                        // setup for MULTIPLE ANSWER [multi-answer]
                                        if(_type == config.quizzes.questionTypes.multiAnswer){

                                            // setup a toggle for the checkbox
                                            _$toggle = $('<label>',{
                                                class: 'answer-checkbox',
                                                for: questionID + _value
                                            }).css({
                                                width: box.width + 'px',
                                                height: box.height + 'px'
                                            }).prependTo($answer);

                                            // setup a checkbox
                                            _$input = $('<input>',{
                                                type: 'checkbox',
                                                name: questionID,
                                                id: questionID + _value,
                                                value: _value
                                            }).prependTo($answer);

                                            if($.isset($answer.text)){

                                                // wrap answer text
                                                _$text = $('<label>',{
                                                    class: 'answer-txt',
                                                    for: questionID + _value,
                                                    text: $answer.textNodes.text()
                                                }).appendTo($answer);

                                                // remove old text node
                                                $answer.textNodes.remove();

                                            }

                                        } else

                                        // setup for SHORT ANSWER [short-answer]
                                        if(_type == config.quizzes.questionTypes.shortAnswer){

                                            // setup a textbox field
                                            _$input = $('<input>',{
                                                type: 'text',
                                                id: answerID
                                            }).prependTo($answer);

                                        } 

                                    });

                            } else 

                            // setup TRUE/FALSE [true-false]   
                            if(_type == config.quizzes.questionTypes.trueFalse){

                                    // setup true and false answer options
                                    var $answer = {
                                            true: $('<' + config.selectorPrefix + 'answer>'),
                                            false: $('<' + config.selectorPrefix + 'answer>')
                                        },
                                        $input = {
                                            true: $('<input>',{
                                                type: 'radio',
                                                name: questionID,
                                                id: questionID + '-true',
                                                value: true
                                            }).prependTo($answer.true),
                                            false: $('<input>',{
                                                type: 'radio',
                                                name: questionID,
                                                id: questionID + '-false',
                                                value: false
                                            }).prependTo($answer.false)
                                        },
                                        $button = {
                                            true: $('<label>',{
                                                class: 'btn-true',
                                                html: '<span>True</span>',
                                                for: questionID + '-true'
                                            }).appendTo($answer.true),
                                            false: $('<label>',{
                                                class: 'btn-false',
                                                html: '<span>False</span>',
                                                for: questionID + '-false'
                                            }).appendTo($answer.false)
                                        };

                                    // add answer options to question
                                    $question.find('.question-txt')
                                             .after($answer.true,$answer.false);

                                    // capture answer properties
                                    var _answer = $question.attr('data-answer');

                                    // make sure an answer was provided
                                    if($.isset(_answer)){
                                        
                                        // parse as boolean
                                        _answer = parseBool(_answer);

                                        // set answer attributes on answers
                                        if(_answer === true){
                                            $answer.true.attr('data-answer',true);
                                            $answer.false.attr('data_answer',false);
                                        } else { 
                                            $answer.false.attr('data-answer',true);
                                            $answer.true.attr('data-answer',false);
                                        }

                                        // remove answer attribute from question
                                        $question.removeAttr('data-answer');

                                    } 
                                    // remove the invalid question
                                    else {

                                        $question.remove();

                                    }

                            }

                            // setup STREAMLINE mode
                            if(mode == 'streamline'){

                                $instaBtn = $('<button>',{
                                    type: 'button',
                                    html: '<span class="fa fa-check"></span>' +
                                           'Check',
                                    class: 'btn-insta',
                                }).on('click',function(){

                                    if(!$(this).is('.disable'))
                                        // trigger quiz check
                                        $quiz.trigger($.Event('quiz:check',{
                                            checkAll: false,
                                            targetQuestion: $(this).parent()
                                        }));

                                }).appendTo($question);

                            }

                            // setup attempts counter
                            $attempts = $('<' + config.selectorPrefix + 'attempts>',{
                                html:   '<span>' +
                                            '<span class="text">Attempts</span> ' +
                                            '<span class="total"></span>' + ' / ' +
                                            '<span class="max"></span>' + ' ' +
                                            // attempts button will go here
                                        '</span>'
                            }).appendTo($question);

                            // setup attempts button
                            $attemptsBtn = $('<button>',{
                                class: 'info',
                                type: 'button',
                                title: 'Click for more details.',
                                html: '<span class="fa fa-question-circle"></span>'
                            }).appendTo($attempts.children('span')).on('click',function(){

                                // find attempt stats
                                var hasStats = $.exists($attempts.find('.stats'));

                                // trigger question attempt stats
                                $question.trigger($.Event('question:attempt:stats',{
                                    create: hasStats ? false : true,
                                    remove: hasStats ? true : false
                                }));

                            });

                            // setup question events
                            $question
                            .on('question:check',function(event){

                                // check the question
                                $(this).checkQuestion(function(points){

                                    // trigger question attempt
                                    $question.trigger('question:attempt')

                                    // trigger question status update
                                           .trigger('question:status')

                                    // trigger question feedback
                                            .trigger($.Event('question:feedback',{
                                                points: points
                                            }));
                                    
                                    // trigger question hint
                                    $question.trigger($.Event('question:hint',{
                                        points: points,
                                        showing: _showHint
                                    }));

                                    // trigger quiz toggle
                                    $quiz.trigger('quiz:toggle');

                                });

                            })
                            .on('question:attempt',function(event){

                                // update question attempts
                                $(this).updateAttempts(event,function(attempts){

                                    if(!event.init) $question.toggleChecking(attempts);

                                }); 

                            })
                            .on('question:attempt:stats',function(event){

                                // update question attempt stats
                                $(this).attemptStats(event);

                            })
                            .on('question:status',function(event){

                                // update question status
                                $(this).updateStatus(function(){

                                    // trigger quiz tracking
                                    $quiz.trigger($.Event('quiz:track',{
                                        update: true
                                    }));

                                });

                            })
                            .on('question:feedback',function(event){

                                // provide question feedback
                                $(this).sendFeedback(event);
                                
                                // trigger quiz change
                                $quiz.trigger('quiz:change');

                            })
                            .on('question:hint',function(event){
                                
                                // provide question hint
                                $(this).giveHint(event);
                                
                            });

                            // initialize attempts and status
                            $question.trigger($.Event('question:attempt',{
                                init: true
                            })).trigger($.Event('question:status',{
                                init: true
                            }));

                        });

                        // setup check button
                        $checkBtn = $('<button>',{
                            type: 'button',
                            html: '<span class="fa fa-check"></span>' +
                                  (mode == 'sliding' ? 'Check Answer' : 'Check All'),
                            class: 'btn-check'
                        }).appendTo($quiz).on('click',function(){

                            if(!$(this).is('.disable')){

                                // for SLIDING mode
                                if(mode == 'sliding')
                                    // check CURRENT QUESTION in SLIDING mode
                                    $quiz.trigger($.Event('quiz:check',{
                                        checkAll: false
                                    }));

                                // for STREAMLINE mode
                                if(mode == 'streamline')
                                    // check ALL QUESTIONS in STREAMLINE mode
                                    $quiz.trigger($.Event('quiz:check',{
                                        checkAll: true
                                    }));

                            }

                        });

                        // setup STREAMLINE mode
                        if(mode == 'streamline'){

                            // capture instant buttons
                            $instaBtns = $questions.find('.btn-insta');

                            // setup done button
                             var $btnDone = $('<button>',{
                                class: 'btn-done',
                                type: 'button',
                                text: 'Done'
                            }).on('click',function(){

                                 // trigger quiz done
                                 if(!$(this).is('.disable')) $quiz.trigger('quiz:done');

                             }).on('button:created',function(){

                                 // toggle the done button
                                 $quiz.toggleDoneBtn();

                             }).appendTo($quiz).trigger('button:created');

                            // setup quiz events
                            $quiz
                            .on('quiz:scroll',function(event){

                                // scroll the quiz
                                $(this).scrollQuiz(event)

                                // trigger tracking
                                       .trigger($.Event('quiz:track',{
                                            update: true
                                       }));

                            })
                            .on('quiz:toggle',function(event){

                                // toggle done button
                                $(this).toggleDoneBtn();

                            });

                            // setup window scroll listener
                            $window.on('scroll',function(event){

                                // trigger quiz scrolling event
                                $quiz.trigger('quiz:scroll');

                            });

                        } 

                        // setup SLIDING mode
                        else if(mode == 'sliding') {

                            // setup quiz events
                            $quiz
                            .on('quiz:question:next',function(event){

                                // get the next question
                                $(this).nextQuestion(function(){

                                    // update question tracker
                                    $quiz.trigger('quiz:track')

                                    // trigger the question changed event
                                         .trigger('quiz:question:changed');

                                }); 

                            })
                            .on('quiz:question:previous',function(event){

                                // get the previous question
                                $(this).prevQuestion(function(){

                                    // update question tracker
                                    $quiz.trigger('quiz:track')

                                    // trigger the question changed event
                                         .trigger('quiz:question:changed');

                                });

                            })
                            .on('quiz:question:changed',function(event){

                                // toggle buttons
                                $(this).toggleCheckBtn()
                                       .togglePrevBtn()
                                       .toggleNextBtn()
                                       .trigger('quiz:change');

                            })
                            .on('quiz:notend',function(event){

                                // remove the done button
                                $(this).removeDoneBtn();

                            })
                            .on('quiz:end',function(event){

                                // create the done button
                                $(this).createDoneBtn(function(){

                                    // toggle the done button
                                    $(this).toggleDoneBtn();

                                });

                            })
                            .on('quiz:toggle',function(event){

                                // toggle buttons
                                $(this).toggleDoneBtn()
                                       .togglePrevBtn()
                                       .toggleNextBtn();

                            });

                            // setup sliding buttons
                            if($questions.length > 1){

                                $prevBtn = $('<button>',{
                                    type: 'button',
                                    html: '<span class="fa fa-chevron-left fa-lg"></span>',
                                    title: 'Previous',
                                    class: 'btn-prev'
                                }).on('click',function(){

                                    // trigger the previous question event
                                    if(!$(this).is('.disable'))
                                       $quiz.trigger('quiz:question:previous');

                                }).on('button:created',function(){

                                    // toggle the previous button
                                    $quiz.togglePrevBtn();

                                }).appendTo($quiz).trigger('button:created');

                                $nextBtn = $('<button>',{
                                    type: 'button',
                                    html: '<span class="fa fa-chevron-right fa-lg"></span>',
                                    title: 'Next',
                                    class: 'btn-next',
                                }).on('click',function(){

                                    // trigger the next question event
                                    if(!$(this).is('.disable'))
                                       $quiz.trigger('quiz:question:next');

                                }).on('button:created',function(){

                                    // toggle the next button
                                    $quiz.toggleNextBtn();

                                }).appendTo($quiz).trigger('button:created');

                            }

                        }

                        // setup score
                        var $score = $('<' + config.selectorPrefix + 'score>',{
                            'data-max': points,
                            'data-total': 0,
                            html:   '<span>' +
                                        '<span class="text">Running Score</span> ' +
                                        '<span class="total"></span>' + ' / ' +
                                        '<span class="max"></span>' +
                                    '</span>'
                        }).appendTo($quiz).on('score:created',function(){

                            // trigger the score event
                            $quiz.trigger($.Event('quiz:score',{
                                init: true
                            }));

                        }).trigger('score:created');

                        // setup question tracker
                        var $tracker = $('<' + config.selectorPrefix + 'tracker>',{
                            html:   '<span>' +
                                        '<span class="text">Question</span> ' +
                                        '<span class="current"></span>' + ' / ' +
                                        '<span class="total"></span>' + ' ' +
                                        // tracker button will go here
                                    '</span>'
                        }).appendTo($quiz).on('tracker:created',function(){

                            // trigger the track event
                            $quiz.trigger($.Event('quiz:track',{
                                init: true
                            }));

                        }).trigger('tracker:created');

                        // setup question tracker button
                        var $trackerBtn = $('<button>',{
                            class: 'info',
                            type: 'button',
                            html: '<span class="fa fa-question-circle"></span>',
                            title: 'Click for more details.'
                        }).on('click',function(){

                            var hasStats = $.exists($tracker.find('.stats'));

                            // trigger the stats event
                            $quiz.trigger($.Event('quiz:track:stats',{
                                create: hasStats ? false : true,
                                remove: hasStats ? true : false
                            }));

                        }).appendTo($tracker.children('span'));
                
                    };
            
                    // prepare quiz parse
                    var parse = function(type,DATA,callback){
            
                        // exit for unwanted types
                        if(type != 'XML' && type != 'JSON') return false;

                        $.each(DATA,function(d,data){
            
                            // normalize data
                            var _data = {};
            
                            // normalize by type
                            switch(type){
            
                                case 'XML': 
                                    
                                    // capture question
                                    var question = $(this);
                                    
                                    // save preliminary data
                                    _data.question = question.find('question').text();
                                    _data.feedback = question.find('feedback').text();
                                    _data.hint = question.find('hint').text();
                                    _data.hintattempts = question.find('hint').attr('attempts');
                                    _data.hintshow = question.find('hint').attr('show');
                                    _data.id = question.attr('id');
                                    _data.attempts = question.attr('attempts');
                                    _data.points = question.attr('points');
                                    _data.type = question.attr('type');
                                    
                                    // build answers and options
                                    var options = question.find('option');
                                    
                                    // save options and answers
                                    switch(true){
                                            
                                        // MULTI-CHOICE / MULTI-ANSWER
                                        case options.length > 1:
                                            
                                            // build option and answer arrays
                                            _data.options = [];
                                            _data.answer = [];
                                            
                                            // save options and answers
                                            options.each(function(o){
                                                
                                                // save option
                                                _data.options.push($(this).text());
                                                
                                                // save answer
                                                if($(this).is('[answer="true"]')) 
                                                    _data.answer.push(o + 1);
                                                
                                            });
                                            
                                            break;
                                            
                                        // SHORT ANSWER
                                        case options.length == 1:
                                            
                                            // save answer
                                            _data.answer = options.text();
                                            
                                            // save alternates
                                            if($.isset(options.attr('alts')))
                                                _data.alts = options.attr('alts').split(',');
                                            
                                            // save case sensitivity
                                            _data.matchcase = $.isset(options.attr('matchcase')) ?
                                                options.attr('matchcase') : false;
                                            
                                            break;
                                            
                                        // TRUE/FALSE
                                        case options.length === 0:
                                            
                                            // save options
                                            _data.options = [true,false];
                                            
                                            // save answer
                                            _data.answer = question.find('question').attr('answer');
                                            
                                            break;
                                            
                                    }
               
                                    break;
            
                                case 'JSON':
            
                                    _data = {
                                        question: data.question,
                                        answer: data.answer,
                                        type: data.type,
                                        points: data.points,
                                        options: data.options,
                                        id: data.id,
                                        feedback: data.feedback,
                                        matchcase: data.matchcase,
                                        hint: data.hint,
                                        hintattempts: data.hintattempts,
                                        hintshow: data.hintshow,
                                        alts: data.alts,
                                        attempts: data.attempts
                                    };
                                    
                                    break;
            
                            }
                        
                            // ignore invalid question data
                            if(!$.isset(_data.question)) return true;
                            if(!$.isset(_data.answer)) return true;

                            // build questions
                            var _$Q = $('<'+config.selectorPrefix+'question>',{
                                'data-points': $.isset(_data.points) ? _data.points : 1,
                                'data-attempts': $.isset(_data.attempts) ? _data.attempts : 'infinite',
                                'data-id': $.isset(_data.id) ? _data.id : ''
                            }).html(_data.question);

                            // detect question types
                            _data.questionType = [ 
                                'multichoice', 
                                'multianswer', 
                                'shortanswer', 
                                'truefalse'
                            ];
                            _data.questionIs = false;

                            // type given
                            if($.isset(_data.type) && _data.questionType.indexOf(_data.type) > 0){
                                _data.questionIs = _data.type;
                            } 

                            // type not given
                            else {

                                // TRUE/FALSE if:
                                // - _data.options = [true,false] 
                                // - _data.options = [false,true]
                                if($.isset(_data.options) &&
                                   (_data.options.compare([true,false]) || 
                                   _data.options.compare([false,true]))){
                                    _data.questionIs = _data.questionType[3];
                                } else

                                // SHORT ANSWER if:
                                // - typeof _data.options = undefined
                                // - typeof _data.answer = string / numbwe
                                if(!$.isset(_data.options) && !$.isArray(_data.answer)){
                                    _data.questionIs = _data.questionType[2];
                                } else

                                // MULTI-ANSWER if:
                                // - typeof _data.options = array && _data.options.length > 1 
                                // - typeof _data.answer = array && _data.answer.length > 1
                                if($.isset(_data.options) &&
                                   ($.isArray(_data.options) && _data.options.length > 1) &&
                                   ($.isArray(_data.answer) && _data.answer.length > 1)){
                                    _data.questionIs = _data.questionType[1];
                                } else

                                // MULTI-CHOICE if:
                                // - typeof _data.answer = array && _data.answer.length = 1
                                //      || typeof _data.answer = string
                                // - typeof _data.options = array && _data.options.length > 1
                                if($.isset(_data.options) &&
                                   ($.isArray(_data.options) && _data.options.length > 1) &&
                                   (($.isArray(_data.answer) && _data.answer.length == 1) ||
                                    !$.isArray(_data.answer))){
                                    _data.questionIs = _data.questionType[0];
                                }

                            }

                            // exit if question type cannot be identified
                            if(_data.questionIs === false) return true;

                            // prepare an answer setting method
                            var setAnswer = function(index){

                                var answer = false;

                                if(!$.isArray(_data.answer)){

                                    if(_data.answer - 1 == index) answer = true;

                                } else {

                                    // loop through answers
                                    $.each(_data.answer,function(_index,_value){

                                        // compare answer value to current answer index
                                        if(_value - 1 == index){

                                            // save answer
                                            answer = true;

                                            // break loop
                                            return false;

                                        }

                                    });

                                }

                                return answer;
                            };

                            // prepare answer alternative method
                            var setAlternates = function(data){

                                var alts = '';

                                if($.isset(data)){

                                    // single alternate
                                    if(!$.isArray(data)){

                                        alts += data;

                                    }

                                    // multiple alternates
                                    else {

                                        alts += data.join(';');
                                    }

                                }

                                return alts;
                            };

                            // build answers
                            var _$A = $();

                            // build by question type
                            switch(_data.questionIs){

                                // MULTI-CHOICE
                                case _data.questionType[0]:
                                // MULTI-ANSWER
                                case _data.questionType[1]:

                                    // loop through options
                                    $.each(_data.options,function(_o,_option){

                                        // build answer
                                        var _$a = $('<' + config.selectorPrefix + 'answer>',{
                                            'data-answer': setAnswer(_o)
                                        }).html(_option);

                                        // add to answers
                                        _$A = _$A.add(_$a);

                                    });

                                    // add answers to question
                                    _$Q.append(_$A);

                                    break;

                                // SHORT ANSWER
                                case _data.questionType[2]:

                                    // build answer
                                    var _$a = $('<' + config.selectorPrefix + 'answer>',{
                                        'data-answer': _data.answer,
                                        'data-answer-alts': setAlternates(_data.alts),
                                        'data-case-sensitive': $.isset(_data.matchcase) ?
                                            _data.matchcase : false
                                    });

                                    // add to answers
                                    _$A = _$A.add(_$a);

                                    // add answers to question
                                    _$Q.append(_$A);

                                    break;

                                // TRUE/FALSE
                                case _data.questionType[3]:

                                    // configure answer if array
                                    if($.isArray(_data.answer)) 
                                        _data.answer = _data.answer[0];

                                    // configure answer if numeric
                                    if($.isNumeric(_data.answer)) 
                                        _data.answer = _data.options[_data.answer - 1];

                                    // add answer to question
                                    _$Q.attr('data-answer',_data.answer);

                                    break;

                            }

                            // add feedback to question
                            if($.isset(_data.feedback))
                                $('<' + config.selectorPrefix + 'feedback>')
                                    .html(_data.feedback)
                                    .appendTo(_$Q);

                            // add hint to question
                            if($.isset(_data.hint))
                                $('<' + config.selectorPrefix + 'hint>',{
                                    'data-attempts': $.isset(_data.hintattempts) ?
                                            _data.hintattempts : 1,
                                    'data-show': $.isset(_data.hintshow) ?
                                            _data.hintshow : false
                                })
                                    .html(_data.hint)
                                    .appendTo(_$Q);

                            // add question to quiz
                            $quiz.append(_$Q);
                                
                        });
    
                        if($.isset(callback)) callback();
    
                        return true;
                    };
            
                    // check for a data file (JSON)
                    var file = $.isset($quiz.attr('data-file')) ? 
                        $quiz.attr('data-file') : false;
                    
                    // load JSON file data
                    if(file !== false && 
                       config.quizzes.acceptJSON && 
                       file.endsWith('.json')){
                        
                        // load JSON
                        $.getJSON(file,function(JSON){  
                            
                            // parse JSON data then setup quiz
                            parse('JSON',JSON,setup);
                            
                        });
                        
                    }  else
                    
                    // load XML file data
                    if(file !== false && 
                       config.quizzes.acceptXML && 
                       file.endsWith('.xml')){
                        
                        // load XML
                        $.ajax({
                            type: 'GET',
                            url: file,
                            dataType: 'xml',
                            success: function(XML){
                                
                                // parse XML data then setup quiz
                                parse('XML',$(XML).find('quiz > question'),setup);
                                
                            }
                        });
                        
                    }
                    
                    // no file data to load
                    else {
                        
                        // immediately begin quiz setup
                        setup();
                        
                    }

                });
            
            },
            
            // initialize crosswords
            crosswords: function(){
                
                // setup a crossword object for saving data
                $.smarty.crossword = {
                    data: {}
                };
                
                var $crosswords = $(':smarty(' + config.crosswords.selector + ')');
        
                $crosswords.each(function(i){
                    
                    var $crossword = $(this);
                    
                    // prepare crossword setup
                    var setup = function(){
                    
                        // capture the current crossword
                        var $clues = $crossword.find(':smarty(clue)'),
                            $acrosses = $clues.filter('[data-direction="across"]'), 
                            $across,
                            $downs = $clues.filter('[data-direction="down"]'), 
                            $down,
                            $title,
                            $grid, 
                            $cells,
                            $incompatible,
                            $inputs,
                            $blanks = $clues.find(':smarty(blank)'),
                            $resetBtn,
                            $revealBtn;

                        // set the crossword id
                        var crosswordID = config.crosswords.selector + (i+1);

                        $crossword.attr('id',crosswordID);

                        // set the crossword title
                        var title = $crossword.attr('data-title');

                        if($.isset(title))
                            $title = $('<div>',{
                                class: 'title',
                                text: title
                            }).prependTo($crossword);

                        // add underlines to blanks
                        $blanks.each(function(i){

                            // create underline
                            var $underline = $('<span>',{
                                class: 'underline'
                            }).appendTo($(this));

                        });

                        // capture crossword data
                        var data = [];

                        $clues.each(function(i){
                            // temporary data
                            var _data = $(this).clueData();    
                            // save data
                            data.push(_data);
                        });

                        // sort
                        data.sort(function(a,b){
                            return a.start.y - b.start.y || a.start.x - b.start.x;    
                        });

                        var _number = {
                            x: 1,
                            y: 1,
                            n: 1
                        };

                        // number
                        $.each(data,function(index,object){
                            // check number
                            if(_number.x == object.start.x && 
                               _number.y == object.start.y){
                                // set number 
                                object.number = _number.n;
                            } else {
                                // increment the number 
                                _number.n += 1;
                                // save the new coordinates
                                _number.x = object.start.x;
                                _number.y = object.start.y;
                                // set number
                                object.number = _number.n;
                            }
                        });

                        // save data globablly
                        $.smarty.crossword.data[crosswordID] = data;

                        // calculate the grid
                        var grid = {
                            rows: 0,
                            cols: 0
                        };

                        $.each(data,function(index,word){
                            if(grid.rows < word.end.y) grid.rows = word.end.y;
                            if(grid.cols < word.end.x) grid.cols = word.end.x;
                        });

                        // create the grid
                        $grid = $('<table>',{
                            class: 'grid',
                            cellspacing: config.crosswords.cellSpacing,
                            cellpadding: config.crosswords.cellPadding,
                            'data-rows': grid.rows,
                            'data-cols': grid.cols
                        });

                        $.repeat(grid.rows,function(y){
                            var $row = $('<tr>');
                            $.repeat(grid.cols,function(x){
                                var $col = $('<td>',{
                                    'data-coords': x + ',' + y
                                }).css({
                                    width: 'calc(100% / ' + grid.cols + ')' 
                                }).appendTo($row);
                            });
                            $row.appendTo($grid);
                        });

                        // set respond at configuration value
                        config.crosswords.respondAt = grid.cols * config.crosswords.minWidth
                                                + grid.cols * config.crosswords.cellSpacing;

                        // save respond at configuration value globally
                        $.smarty.config.crosswords.respondAt = config.crosswords.respondAt;

                        $grid.appendTo($crossword);

                        // capture grid cells
                        $cells = $grid.find('td');

                        // setup a cell sizing method
                        $grid.on('grid:resize',function(){

                            // resize cells
                            $cells.each(function(i){

                                // square the cell
                                $(this).height($(this).width());

                                // resize the font
                                if(config.crosswords.fontResize &&
                                   $grid.width() >= config.crosswords.respondAt)
                                    $(this).find('input').css({
                                        'font-size': $grid.width() /
                                                     config.crosswords.fontRatio + 'px' 
                                    });


                            }); 

                        });

                        // setup crossword puzzle
                        $.each(data,function(index,word){

                            var coords = {};

                            var $targets = $(),
                                $inputs;

                            if(word.direction == 'across'){

                                // capture word coordinates
                                coords.x = [];
                                coords.y = word.start.y;

                                for(var x = word.start.x; x <= word.end.x; x++)
                                    coords.x.push(x);

                                $cells.each(function(i){
                                    var _coords = $(this).getCoords();
                                    if(coords.x.indexOf(_coords.x) > -1 && 
                                       _coords.y == coords.y)
                                        $targets = $targets.add($(this));
                                });

                                // apply settings to target cells
                                $targets.each(function(i){
                                    $(this).smartClass('word across','add'); 
                                });

                                // setup inputs
                                $targets.each(function(i){

                                    // capture the current target cell
                                    var $target = $(this);

                                    // setup properties
                                    var werd = word.answer,
                                        name = crosswordID + '-' + werd,
                                        char = werd.charAt(i),
                                        num = word.number;

                                    // check for an input
                                    var $input = $target.find('input');

                                    if(!$.exists($input)){

                                        // create an input
                                        $input = $('<input>',{
                                            type: 'text',
                                            maxlength: 1,
                                            'data-char': char
                                        }).appendTo($target);

                                    }

                                    // add properties to input
                                    $input.attr({
                                        'data-across': name,
                                        'data-across-word': werd,
                                        'data-across-number': num,
                                        'data-across-first': (i === 0 ? true : false),
                                        'data-across-last': (i == $targets.length - 1 ? 
                                                             true : false)
                                    });

                                    // set numbers on the first letters
                                    if(i === 0){

                                        // check for a number
                                        var $number = $target.find('.number');

                                        if(!$.exists($number)){

                                            // create a number
                                            $number = $('<span>',{
                                                class: 'number',
                                                html: word.number
                                            }).appendTo($target);


                                        }

                                        // set tabindex
                                        $target.find('input').attr('tabindex',0)
                                                             .attr('data-no-tab',false);

                                    } else {

                                        // unset tabindex
                                        $target.find('input').attr('tabindex',-1)
                                                             .attr('data-no-tab',true);

                                    }

                                });

                                $inputs = $targets.find('input');

                                // setup highlighting
                                $inputs.each(function(i){ 
                                    $(this).on('focus blur',function(event){
                                        if(event.type == 'focus')
                                            $(this).smartClass('curr','add');
                                        if(event.type == 'blur')
                                            $(this).smartClass('curr','remove');
                                        var name = $(this).attr('data-across');
                                        var $letters = $('input[data-across="'+ name +'"]');
                                        $letters.each(function(r){ 
                                            if(event.type == 'focus')
                                                $(this).smartClass('highlight','add');
                                            if(event.type == 'blur')
                                                $(this).smartClass('highlight','remove');
                                        });
                                    });
                                });

                            } 
                            else if (word.direction == 'down'){

                                coords.x = word.start.x;
                                coords.y = [];

                                for(var y = word.start.y; y <= word.end.y; y++)
                                    coords.y.push(y);

                                $cells.each(function(i){
                                    var _coords = $(this).getCoords();
                                    if(coords.y.indexOf(_coords.y) > -1 && 
                                       _coords.x == coords.x)
                                        $targets = $targets.add($(this));
                                });

                                // apply settings to target cells
                                $targets.each(function(i){
                                    $(this).smartClass('word down','add');
                                });

                                // setup inputs
                                $targets.each(function(i){

                                    // capture the current target cell
                                    var $target = $(this);

                                    // setup properties
                                    var werd = word.answer,
                                        name = crosswordID + '-' + werd,
                                        char = werd.charAt(i),
                                        num = word.number;

                                    // check for an input
                                    var $input = $target.find('input');

                                    if(!$.exists($input)){

                                        // create an input
                                        $input = $('<input>',{
                                            type: 'text',
                                            maxlength: 1,
                                            'data-char': char,
                                        }).appendTo($target);


                                    }

                                    // add properties to input
                                    $input.attr({
                                        'data-down': name,
                                        'data-down-word': werd,
                                        'data-down-number': num,
                                        'data-down-first': (i === 0 ? true : false),
                                        'data-down-last': (i == $targets.length - 1 ? 
                                                             true: false)
                                    });

                                    // set numbers on the first letters
                                    if(i === 0){

                                        // check for a number
                                        var $number = $target.find('.number');

                                        if(!$.exists($number)){

                                            // create a number
                                            $number = $('<span>',{
                                                class: 'number',
                                                html: word.number
                                            }).appendTo($target);


                                        }

                                        // set tabindex
                                        $target.find('input').attr('tabindex',0)
                                                             .attr('data-no-tab',false);

                                    } else {

                                        // unset tabindex
                                        $target.find('input').attr('tabindex',-1)
                                                             .attr('data-no-tab',true);

                                    }

                                });

                                $inputs = $targets.find('input');

                                // setup highlighting
                                $inputs.each(function(i){ 
                                    $(this).on('focus blur',function(event){
                                        if(event.type == 'focus')
                                            $(this).smartClass('curr','add');
                                        if(event.type == 'blur')
                                            $(this).smartClass('curr','remove');
                                        var name = $(this).attr('data-down');
                                        var $letters = $('input[data-down="'+ name +'"]');
                                        $letters.each(function(r){ 
                                            if(event.type == 'focus')
                                                $(this).smartClass('highlight','add');
                                            if(event.type == 'blur')
                                                $(this).smartClass('highlight','remove');
                                        });
                                    });
                                });

                            }  

                        });

                        // capture inputs
                        $inputs = $cells.find('input');

                        // setup event handlers on inputs
                        $inputs.each(function(i){

                            // capture the current input
                            var $input = $(this);

                            var keys = {
                                tab: 9,
                                left: 37,
                                up: 38,
                                right: 39,
                                down: 40,
                                backspace: 8,
                                delete: 46,
                                letters: [65,90]
                            };

                            // setup keyboard handlers
                            $input.on('keydown',function(event){

                                keys.code = event.keyCode;
                                keys.shift = event.shiftKey;
                                keys.meta = event.metaKey;
                                keys.ctrl = event.ctrlKey;  

                                switch(true){

                                    // for letters only
                                    case    keys.code >= keys.letters[0] && 
                                            keys.code <= keys.letters[1]:

                                        // allow new letters to automatically replace
                                        $input.replaceInput(event)

                                        // move to the next input when a letter is entered
                                              .nextInput()

                                        // trigger value change event
                                              .trigger('change:value');

                                        break;

                                    // for delete key only
                                    case    keys.code == keys.delete:

                                        // let backspace and delete clear the current letter
                                        $input.clearInput()

                                        // trigger value change event
                                              .trigger('change:value');

                                        break;

                                    // for backspace key only
                                    case    keys.code == keys.backspace:

                                        // let backspace clear the current letter
                                        $input.clearInput()

                                        // trigger value change event
                                              .trigger('change:value')

                                        // allow backspace to clear previous letter(s)
                                              .previousInput()

                                        // retrigger value change event on previous letter(s)
                                              .trigger('change:value');

                                        break;

                                    // for arrow keys only
                                    case    keys.code == keys.left ||
                                            keys.code == keys.right ||
                                            keys.code == keys.up ||
                                            keys.code == keys.down:

                                        // move between inputs when using arrow keys
                                        $input.shiftInput(event);

                                        break;

                                    // for tab keys
                                    case    keys.code == keys.tab:

                                        // reset the input direction
                                        if($.smarty.crossword.inputDirection !== false)
                                            $.smarty.crossword.inputDirection = false;

                                        // always tab from the first letter of a word
                                        $input.shiftTab(event);

                                        break;

                                    // for all invalid characters and keys
                                    case   (keys.code < keys.letters[0] || 
                                           keys.code > keys.letters[1]) &&
                                           keys.code != keys.tab &&
                                           keys.code != keys.left &&
                                           keys.code != keys.up &&
                                           keys.code != keys.down &&
                                           keys.code != keys.right &&
                                           keys.code != keys.backspace &&
                                           keys.code != keys.delete:

                                        // disallow invalid characters from being entered
                                        event.preventDefault();

                                        break;

                                }

                            });

                            // setup focus/blur handlers
                            $input.on('focus blur',function(event){

                                // highlight the cooresponding clue(s) in the clue list(s)
                                $(this).highlightClue(event)
                                
                                // create a popout clue for users
                                       .popoutClue();

                            });

                            // setup change handlers
                            $input.on('change:value',function(event){

                                // check off clues in the clue list
                                $(this).checkoffWord()

                                // check the crossword puzzle
                                       .checkCrossword();

                            });

                        });

                        // create clue containers
                        $across = $('<' + config.selectorPrefix + 'across>',{
                                        html: '<span class="title">Across</span>'
                                    }).append($acrosses).appendTo($crossword);
                        $down = $('<' + config.selectorPrefix + 'down>',{
                                        html: '<span class="title">Down</span>'
                                    }).append($downs).appendTo($crossword);

                        // number clues
                        $clues.each(function(){

                            // capture clue
                            var $clue = $(this);

                            // setup clue events
                            $clue.on('clue:checkoff',function(event){
                                $(this).checkoffClue(event); 
                            });

                            // wrap clue text
                            var $text = $clue.wrapInner('<span class="clue-txt">')
                                             .children('.clue-txt');
                            // create clue box
                            var $box = $('<span>',{
                                class: 'clue-box',
                                html: '<span></span>'
                            }).insertBefore($text);

                            // setup clue box events
                            $box.on('click',function(){
                                $clue.trigger($.Event('clue:checkoff',{
                                    autoCheckoff: false
                                }));
                            });

                            // create checkbox
                            var $checkbox = $('<input>',{
                                type: 'checkbox'
                            }).insertBefore($box);

                            // create number
                            var $number = $('<span>',{
                                class: 'clue-num'
                            });

                            // temporary data
                            var _data = $clue.clueData();

                            // find number
                            $.each(data,function(index,comp){
                                if(comp.answer == _data.answer && 
                                   comp.direction == _data.direction &&
                                   comp.text == _data.text){

                                    // save it
                                    $number.html('<span>' + comp.number + '</span>');

                                    // determine direction
                                    $clue.attr('data-number',comp.number);

                                }
                            });

                            $clue.prepend($number);

                        });

                        // reorder clues
                        $acrosses = $.reorder($acrosses,'data-number','ASC');
                        $downs = $.reorder($downs,'data-number','ASC');

                        // create reset button
                        $resetBtn = $('<button>',{
                            type: 'button',
                            class: 'btn-reset',
                            text: 'Reset Puzzle'
                        }).insertAfter($grid);

                        // setup reset button
                        $resetBtn.on('click',function(){
                            $crossword.trigger('crossword:reset');
                        });

                        // create reveal button
                        $revealBtn = $('<button>',{
                            type: 'button',
                            class: 'btn-reveal',
                            text: 'Reveal Answers'
                        }).insertAfter($resetBtn);

                        // setup reveal button
                        $revealBtn.on('click',function(){
                            $crossword.trigger('crossword:reveal');
                        });

                        // setup crossword events
                        $crossword
                        .on('crossword:reset',function(event){
                            $(this).resetCrossword();
                        })
                        .on('crossword:reveal',function(event){
                            $(this).revealCrossword();
                        })
                        .on('crossword:validate',function(event){ 
                            $(this).validateCrossword(event,function(){

                                // reset accessibility
                                $.smarty.accessibility.setup();

                            });
                        })
                        .on('crossword:complete',function(event){
                            $(this).completeCrossword();
                        })
                        .on('crossword:resize',function(event){
                            $(this).compatibilityCrossword(function(){
                                $grid.trigger('grid:resize');
                            });
                        });

                        // prepare for incompatible screens
                        $crossword.trigger('crossword:resize');

                        // in case the initial trigger wasn't fired
                        $window.on('load',function(){
                            $crossword.trigger('crossword:resize');
                        });

                        // setup resize event
                        $window.on('resize',function(){
                            $crossword.trigger('crossword:resize');
                        });
                        
                    };
                    
                    // prepare crossword parse
                    var parse = function(type,DATA,callback){
                        
                        if(type != 'XML' && type != 'JSON') return false;
                        
                        $.each(DATA,function(d,data){
                            
                            // normalize data
                            var _data = {};
                            
                            // normalize by type
                            switch(type){
                                    
                                case 'XML':
                                    
                                    // capture clue 
                                    var clue = $(this);
                                    
                                    // save preliminary data
                                    _data.prompt = clue.find('prompt').text();
                                    _data.answer = clue.attr('answer');
                                    _data.position = clue.attr('position').split(',');
                                    _data.direction = clue.attr('direction');
                           
                                    break;
                                    
                                case 'JSON':
                                    
                                    _data = {
                                        prompt: data.prompt,
                                        answer: data.answer,
                                        position: data.position,
                                        direction: data.direction
                                    };
                                    
                                    break;
                                    
                            }
                            
                            // skip invalid clue data
                            if(!$.isset(_data.prompt)) return true;
                            if(!$.isset(_data.answer)) return true;
                            if(!$.isset(_data.position)) return true;
                            if(!$.isset(_data.direction)) return true;

                            // build clue
                            var _$clue = $('<' + config.selectorPrefix + 'clue>',{
                                'data-answer': _data.answer,
                                'data-position': _data.position.join(','),
                                'data-direction': _data.direction
                            }).html(' ' + _data.prompt);

                            // add clue to crossword
                            $crossword.append(_$clue);
                            
                        });
                        
                        if($.isset(callback)) callback();
                        
                        return true;
                    };
                    
                    // check for a data file (JSON)
                    var file = $.isset($crossword.attr('data-file')) ? 
                        $crossword.attr('data-file') : false;
                    
                    // load JSON file data
                    if(file !== false && 
                       config.crosswords.acceptJSON && 
                       file.endsWith('.json')){
                        
                        // load JSON
                        $.getJSON(file,function(JSON){
                            
                            // parse JSON then setup crossword
                            parse('JSON',JSON,setup);
                            
                        });
                        
                    } else
                    
                    // load XML file data
                    if(file !== false && 
                       config.crosswords.acceptXML && 
                       file.endsWith('.xml')){
                        
                        // load XML
                        $.ajax({
                            type: 'GET',
                            url: file,
                            dataType: 'xml',
                            success: function(XML){
                                
                                // parse XML then setup crossword
                                parse('XML',$(XML).find('crossword > clue'),setup);
                                
                            }
                        });
                        
                    }
                    
                    // no file data to load
                    else { 
                        
                        // immediately begin crossword setup
                        setup();
                        
                    }
                    
                });
                
            },
                
            // initialize flashcards
            flashcards: function(){
                
                // setup a flashcard object for saving data
                $.smarty.flashcard = {
                    cardLock: false
                };
                
                var $flashcards = $(':smarty(' + config.flashcards.selector + ')');
                
                $flashcards.each(function(i){
                    
                    // capture flashcard
                    var $flashcard = $(this);
                    
                    // prepare flashcard setup
                    var setup = function(){
                    
                        var $cards = $flashcard.find(':smarty(card)'),
                            $title,
                            $stack,
                            $pane,
                            $ttsBtn,
                            $sidebar,
                            $tracker,
                            $progress,
                            $flipper,
                            $placeholder,
                            $flipBtn,
                            $shuffleBtn,
                            $firstBtn,
                            $nextBtn, 
                            $prevBtn,
                            $lastBtn;
                        
                        // exit if no cards are found
                        if($cards.length === 0) return false;

                        // set the flashcard ID
                        var flashcardID = config.flashcards.selector + (i+1);

                        $flashcard.attr('id',flashcardID);

                        // capture attributes
                        var title = $flashcard.attr('data-title'),
                            side = $flashcard.attr('data-side'),
                            flipback = $flashcard.attr('data-flipback');

                        // setup side
                        if(!$.isset(side)){

                            side = 'front';

                            $flashcard.attr('data-side',side);

                        }

                        // setup title
                        if($.isset(title)){

                            $title = $('<div>',{
                                class: 'title',
                                html: '<span>' + title + '</span>'
                            }).prependTo($flashcard);

                        }

                        // setup sidebar
                        $sidebar = $('<' + config.selectorPrefix + 'sidebar>')
                                        .appendTo($flashcard);

                        // setup pane
                        $pane = $('<' + config.selectorPrefix + 'pane>')
                            .smartClass('hide')
                            .appendTo($flashcard);

                        // setup text-to-speech button
                        $ttsBtn = $('<button>',{
                            type: 'button',
                            class: 'btn-tts',
                            title: 'Listen',
                            html: '<span class="fa fa-volume-down fa-2x"></span>'
                        }).appendTo($pane);

                        $ttsBtn.on('click',function(){ 

                            // capture button
                            var $btn = $(this),
                                $pauseBtn = $btn.siblings('.btn-tts-pause'),
                                $stopBtn = $btn.siblings('.btn-tts-stop');

                            // capture text to be spoken
                            var text = $btn.parent().find(':smarty(info).show').text();

                            // clear the queue
                            $.tts.cancel();

                            // start speaking new text
                            var $speech = $($.tts.speak(text))

                            // setup speech events
                            .on('speech:start',function(event){

                                // check for pause button
                                if(!$.exists($pauseBtn)){

                                    // setup a pause button
                                    $pauseBtn = $('<button>',{
                                        type: 'button',
                                        class: 'btn-tts-pause',
                                        title: 'Pause',
                                        tabindex: 0,
                                        html: '<span class="fa fa-pause fa-lg"></span>'
                                    }).insertAfter($btn).on('focus blur',function(){

                                        $(this).smartClass(config.focusClass);

                                    }).on('click',function(){

                                        // determine whether to PAUSE or RESUME
                                        if($.tts.isPaused()){

                                            // trigger RESUME event if PAUSED
                                            $speech.trigger('speech:resume');

                                        } else {

                                            // trigger PAUSE event if PLAYING
                                            $speech.trigger('speech:pause');

                                        }

                                        // cancel subsequent events
                                        return false;

                                    }).on('keydown',function(event){

                                        // detect keys
                                        var key = {
                                            code: event.keyCode,
                                            enter: 13
                                        };

                                        // allow enter key to simulate click
                                        if(key.code == key.enter){

                                            // prevent default
                                            event.preventDefault();

                                            // simulate click
                                            $pauseBtn.click();

                                            // stop sequential events
                                            return false;

                                        }

                                    });

                                }

                                // check for stop button
                                if(!$.exists($stopBtn)){

                                    // setup a stop button
                                    $stopBtn = $('<button>',{
                                        type: 'button',
                                        class: 'btn-tts-stop',
                                        title: 'Stop',
                                        tabindex: 0,
                                        html: '<span class="fa fa-stop fa-lg"></span>'
                                    }).insertAfter($pauseBtn).on('focus blur',function(){

                                        $(this).smartClass(config.focusClass);

                                    }).on('click',function(){

                                        // trigger CANCEL event
                                        $speech.trigger('speech:cancel');

                                        // cancel subsequent events
                                        return false;

                                    }).on('keydown',function(event){

                                        // detect keys
                                        var key = {
                                            code: event.keyCode,
                                            enter: 13
                                        };

                                        // allow enter key to simulate click
                                        if(key.code == key.enter){

                                            // prevent default
                                            event.preventDefault();

                                            // simulate click
                                            $stopBtn.click();

                                            // stop sequential events
                                            return false;

                                        }

                                    });

                                }

                                // toggle speaking attribute
                                $btn.attr('data-speaking',$.tts.isSpeaking());

                            })
                            .on('speech:end',function(event){

                                // toggle speaking attribute
                                $btn.attr('data-speaking',$.tts.isSpeaking());

                                // remove PAUSE button
                                $pauseBtn.remove();

                                // remove STOP button
                                $stopBtn.remove();

                            })
                            .on('speech:cancel',function(event){

                                // CANCEL current speech
                                $.tts.cancel();

                                // trigger END event
                                $speech.trigger('speech:end');

                            })
                            .on('speech:pause',function(event){

                                // PAUSE speaking
                                $.tts.pause();

                                // toggle speaking attribute
                                $btn.attr('data-speaking',$.tts.isSpeaking());

                                // toggle PLAY button state
                                $pauseBtn.find('span').smartClass('fa-pause fa-play');

                            })
                            .on('speech:resume',function(){

                                // RESUME speaking
                                $.tts.resume();

                                // toggle speaking attribute
                                $btn.attr('data-speaking',$.tts.isSpeaking());

                                // toggle PAUSE button state
                                $pauseBtn.find('span').smartClass('fa-pause fa-play');

                            })
                            .on('end',function(){

                                // trigger END event
                                //$speech.trigger('speech:end');

                            })
                            .trigger('speech:start');

                            // use an interval to detect ONEND if undefined
                            if($speech.end === undefined){

                                // listen for when speech has ended
                                var listen = setInterval(function(){

                                    if($.tts.isSpeaking() === false){

                                        // clear listening interval
                                        clearInterval(listen);

                                        // trigger END event
                                        $speech.trigger('speech:end');

                                    }   

                                },100);

                            }

                            return false;

                        });

                        // put cards in stack
                        $stack = $('<' + config.selectorPrefix + 'stack>')
                                    .append($cards)
                                    .appendTo($flashcard);

                        // setup tracker
                        $tracker = $('<' + config.selectorPrefix + 'tracker>',{
                            html: '<div>' +
                                    '<span class="text">' +
                                        'Flashcard' +
                                    '</span> ' +
                                    '<span class="tracker">' +
                                        '<span class="current">' +
                                            1 +
                                        '</span> / <span class="total">' +
                                            $cards.length +
                                        '</span>' +
                                    '</span>' +
                                '</div>'
                        }).appendTo($sidebar);

                        // setup progress
                        $progress = $('<' + config.selectorPrefix + 'progress>',{
                            'data-for': 'tracker',
                            html: '<span class="bar"></span>',
                            'data-progress': parseFloat(1 / $cards.length * 100) + '%'
                        }).insertBefore($tracker);

                        $progress.on('progress:update',function(){

                            var $bar = $(this).find('.bar').css({
                                width: $(this).attr('data-progress')
                            });

                        });

                        // initialize progress bar
                        $progress.trigger('progress:update');

                        // setup flipper
                        $flipper = $('<' + config.selectorPrefix + 'flipper>',{
                            html: '<div>' +
                                    '<span class="text">' +
                                        'Showing' +
                                    '</span> ' +
                                    '<span class="side">' +
                                        side.concat('s') +
                                    '</span>' +
                                '</div>'
                        }).appendTo($sidebar);

                        // setup flip button
                        $flipBtn = $('<button>',{
                            type: 'button',
                            class: 'btn-flip',
                            title: 'Flip Cards',
                            html: '<span class="fa fa-refresh"></span>' +
                                  'Flip'
                        }).appendTo($sidebar);

                        $flipBtn.on('click',function(){

                            $flashcard.swapSides();

                            $cards.each(function(){

                                $(this).trigger('card:flip');

                            });

                        });

                        // setup shuffle button
                        $shuffleBtn = $('<button>',{
                            type: 'button',
                            class: 'btn-shuffle',
                            title: 'Shuffle Cards',
                            html: '<span class="fa fa-random"></span>' +
                                  'Shuffle'
                        }).appendTo($sidebar);

                        $shuffleBtn.on('click',function(){

                            $cards = $cards.shuffleCards();

                        });

                        // setup cards
                        $cards.each(function(c){

                            var $card = $(this),
                                $frames = $card.find('iframe'),
                                $info = $card.find(':smarty(info)');

                            // set a card ID
                            var cardID = flashcardID + '-card' + [c+1];

                            $card.attr('id',cardID);

                            // setup info
                            if($.exists($info)){

                                $card.attr('data-info',true);

                                $info.attr({
                                    'data-for': cardID
                                }).smartClass('hide').appendTo($pane);

                            } else {

                                $card.attr('data-info',false);

                            }

                            // capture card data
                            var data = {
                                answer: $card.attr('data-answer'),
                                question: $card.contents()
                            };
                            
                            // make frames fluid
                            $frames.fluidFrames();

                            // add a title to the card
                            $card.attr('title','Click to Flip');

                            // setup the card's front and back
                            var $front = $('<' + config.selectorPrefix + 'front>')
                                .append($('<div>',{
                                        class: 'text'
                                    }).append(data.question)
                                ).appendTo($card),
                                $back = $('<' + config.selectorPrefix + 'back>')
                                .append($('<div>',{
                                        class: 'text'
                                    }).html(data.answer)
                                ).appendTo($card);

                            var $sides = [ $front, $back ];

                            // setup front and back sides
                            $.repeat($sides.length,function(i){

                                // setup text-to-speech buttons
                                var $btnTTS = $('<button>',{
                                    type: 'button',
                                    class: 'btn-tts',
                                    title: 'Listen',
                                    html: '<span class="fa fa-volume-down fa-2x"></span>'
                                }).appendTo($sides[i-1]);

                                $btnTTS.on('click',function(event){

                                    // capture the button
                                    var $btn = $(this),
                                        $pauseBtn = $btn.siblings('.btn-tts-pause'),
                                        $stopBtn = $btn.siblings('.btn-tts-stop');

                                    // get the text to be spoken
                                    var text = $btn.siblings('.text').text();

                                    // clear the queue
                                    $.tts.cancel();

                                    // start speaking new text
                                    var $speech = $($.tts.speak(text))

                                    // setup speech events
                                    .on('speech:start',function(event){

                                        // check for pause button
                                        if(!$.exists($pauseBtn)){

                                            // setup a pause button
                                            $pauseBtn = $('<button>',{
                                                type: 'button',
                                                class: 'btn-tts-pause',
                                                title: 'Pause',
                                                tabindex: 0,
                                                html: '<span class="fa fa-pause fa-lg"></span>'
                                            }).insertAfter($btn).on('focus blur',function(){

                                                $(this).smartClass(config.focusClass);

                                            }).on('click',function(){

                                                // determine whether to PAUSE or RESUME
                                                if($.tts.isPaused()){

                                                    // trigger RESUME event if PAUSED
                                                    $speech.trigger('speech:resume');

                                                } else {

                                                    // trigger PAUSE event if PLAYING
                                                    $speech.trigger('speech:pause');

                                                }

                                                // cancel subsequent events
                                                return false;

                                            }).on('keydown',function(event){

                                                // detect keys
                                                var key = {
                                                    code: event.keyCode,
                                                    enter: 13
                                                };

                                                // allow enter key to simulate click
                                                if(key.code == key.enter){

                                                    // prevent default
                                                    event.preventDefault();

                                                    // simulate click
                                                    $pauseBtn.click();

                                                    // stop sequential events
                                                    return false;

                                                }

                                            });

                                        }

                                        // check for stop button
                                        if(!$.exists($stopBtn)){

                                            // setup a stop button
                                            $stopBtn = $('<button>',{
                                                type: 'button',
                                                class: 'btn-tts-stop',
                                                title: 'Stop',
                                                tabindex: 0,
                                                html: '<span class="fa fa-stop fa-lg"></span>'
                                            }).insertAfter($pauseBtn).on('focus blur',function(){

                                                $(this).smartClass(config.focusClass);

                                            }).on('click',function(){

                                                // trigger CANCEL event
                                                $speech.trigger('speech:cancel');

                                                // cancel subsequent events
                                                return false;

                                            }).on('keydown',function(event){

                                                // detect keys
                                                var key = {
                                                    code: event.keyCode,
                                                    enter: 13
                                                };

                                                // allow enter key to simulate click
                                                if(key.code == key.enter){

                                                    // prevent default
                                                    event.preventDefault();

                                                    // simulate click
                                                    $stopBtn.click();

                                                    // stop sequential events
                                                    return false;

                                                }

                                            });

                                        }

                                        // toggle speaking attribute
                                        $btn.attr('data-speaking',$.tts.isSpeaking());

                                    })
                                    .on('speech:end',function(event){

                                        // toggle speaking attribute
                                        $btn.attr('data-speaking',$.tts.isSpeaking());

                                        // remove PAUSE button
                                        $pauseBtn.remove();

                                        // remove STOP button
                                        $stopBtn.remove();

                                    })
                                    .on('speech:cancel',function(event){

                                        // CANCEL current speech
                                        $.tts.cancel();

                                        // trigger END event
                                        $speech.trigger('speech:end');

                                    })
                                    .on('speech:pause',function(event){

                                        // PAUSE speaking
                                        $.tts.pause();

                                        // toggle speaking attribute
                                        $btn.attr('data-speaking',$.tts.isSpeaking());

                                        // toggle PLAY button state
                                        $pauseBtn.find('span').smartClass('fa-pause fa-play');

                                    })
                                    .on('speech:resume',function(){

                                        // RESUME speaking
                                        $.tts.resume();

                                        // toggle speaking attribute
                                        $btn.attr('data-speaking',$.tts.isSpeaking());

                                        // toggle PAUSE button state
                                        $pauseBtn.find('span').smartClass('fa-pause fa-play');

                                    })
                                    .on('end',function(){

                                        // trigger END event
                                        $speech.trigger('speech:end');

                                    })
                                    .trigger('speech:start');

                                    // use an interval to detect ONEND if undefined
                                    if($speech.end === undefined){

                                        // listen for when speaking stops
                                        var listen = setInterval(function(){

                                            if($.tts.isSpeaking() === false){

                                                // clear listening interval
                                                clearInterval(listen);

                                                // trigger END event
                                                $speech.trigger('speech:end');

                                            }


                                        },100);

                                    }

                                    return false;

                                });

                                // setup click-to-flip notifications
                                var $ctfNotif = $('<div>',{
                                    class: 'notif-ctf',
                                    html: '<span class="fa fa-undo"></span>' +
                                          'Click to Flip'
                                }).appendTo($sides[i-1]);

                            });

                            // set flip attribute
                            if(side == 'front') $card.attr('data-flip','front');
                            if(side == 'back') $card.attr('data-flip','back');

                            // setup card events
                            $card.on('card:resize',function(event){

                                $(this).css({
                                    height: $card.outerWidth() 
                                            * config.flashcards.aspectRatio + 'px'
                                });

                                if(config.flashcards.fontResize &&
                                   $card.outerWidth() >= config.flashcards.respondAt)
                                    $(this).find('.text').css({
                                        'font-size': $card.outerWidth() /
                                                     config.flashcards.fontRatio + 'px' 
                                    });

                            })
                            .on('card:flip',function(event){

                                $(this).flipCard(function(){
                                    $flashcard.rsToggle();
                                });

                                if($(this).is('.curr')) $(this).trigger('card:info');

                                // reset accessibility
                                setTimeout(function(){
                                    $.smarty.accessibility.setup();
                                },config.transitionSpeed * 1000);
                                
                                // trigger card change
                                $(this).trigger('card:change');

                            })
                            .on('card:next',function(event){

                                $(this) .nextCard(false,function(){
                                            $flashcard.rsToggle();
                                        })
                                    
                                // trigger card info
                                        .trigger('card:info')
                                
                                // trigger card change
                                        .trigger('card:change');

                                // reset accessibility
                                setTimeout(function(){
                                    $.smarty.accessibility.setup();
                                },config.transitionSpeed * 1000 * 4);

                            })
                            .on('card:previous',function(event){ 

                                $(this) .prevCard(false,function(){
                                            $flashcard.rsToggle();
                                        })
                                    
                                // trigger card info
                                        .trigger('card:info')
                                
                                // trigger card change
                                       .trigger('card:change');

                                // reset accessibility
                                setTimeout(function(){
                                    $.smarty.accessibility.setup();
                                },config.transitionSpeed * 1000 * 4);

                            })
                            .on('card:start',function(event){

                                $(this) .toggleFirst()
                                        .togglePrev()
                                        .trigger('card:info');

                            })
                            .on('card:between',function(event){ 

                                $(this) .toggleNext()
                                        .togglePrev()
                                        .toggleFirst()
                                        .toggleLast();

                            })
                            .on('card:end',function(event){

                                $(this) .toggleLast()
                                        .toggleNext();

                            })
                            .on('card:shuffle',function(event){

                                $(this) .toggleNext()
                                        .togglePrev()
                                        .toggleFirst()
                                        .toggleLast();

                            })
                            .on('card:first',function(event){

                                $(this) .firstCard(function(){
                                            $flashcard.rsToggle();
                                        })
                                        .toggleFirst()
                                        .togglePrev()
                                
                                // trigger card info
                                        .trigger('card:info')
                                
                                // trigger card change
                                        .trigger('card:change');

                            })
                            .on('card:last',function(event){

                                $(this) .lastCard(function(){
                                            $flashcard.rsToggle();
                                        })
                                        .toggleLast()
                                        .toggleNext()
                                
                                // trigger card info
                                        .trigger('card:info')
                                
                                // trigger card change
                                        .trigger('card:change');

                            })
                            .on('card:info',function(event){

                                $(this).toggleInfo()
                                
                                // trigger card change
                                       .trigger('card:change');
                            })
                            .on('card:change',function(event){
                                
                                // resize each frame
                                $frames.each(function(){
                                    $(this).trigger('frame:resize');
                                });
                                
                            });

                            // set the inital card size
                            $card.trigger('card:resize');

                            // allow resizing of cards when the window resizes
                            $window.on('resize',function(){

                                $card.trigger('card:resize');                         
                            });

                            // setup card flipping
                            $card.on('click',function(){
                                $(this).trigger('card:flip');
                            });

                        });

                        // setup placeholder
                        $placeholder = $('<' + config.selectorPrefix + 'placeholder>')
                            .prependTo($stack);

                        $placeholder.on('placeholder:resize',function(event){

                            $(this).css({
                                height: $placeholder.outerWidth() 
                                        * config.flashcards.aspectRatio + 'px'
                            });

                        });

                        // allow resizing of placeholder when the window resizes
                        $window.on('resize',function(){

                            $placeholder.trigger('placeholder:resize');

                        });

                        // set the initial placeholder size
                        $placeholder.trigger('placeholder:resize');

                        // setup first button
                        $firstBtn = $('<button>',{
                            class: 'btn-first',
                            title: 'Go to First',
                            html: '<span class="fa fa-chevron-left fa-lg"></span>'
                                + '<span class="fa fa-chevron-left fa-lg"></span>'
                        }).appendTo($stack);

                        $firstBtn.on('click',function(){
                            $cards.filter('.curr').trigger('card:first');
                        });

                        // setup previous button
                        $prevBtn = $('<button>',{
                            class: 'btn-prev',
                            title: 'Previous',
                            html: '<span class="fa fa-chevron-left fa-lg"></span>'
                        }).appendTo($stack);

                        $prevBtn.on('click',function(){
                            $cards.filter('.curr').trigger('card:previous');
                        });

                        // setup next button
                        $nextBtn = $('<button>',{
                            type: 'button',
                            class: 'btn-next',
                            title: 'Next',
                            html: '<span class="fa fa-chevron-right fa-lg"></span>'
                        }).appendTo($stack);

                        $nextBtn.on('click',function(){
                            $cards.filter('.curr').trigger('card:next');
                        });

                        // setup last button
                        $lastBtn = $('<button>',{
                            class: 'btn-last',
                            title: 'Go to Last',
                            html: '<span class="fa fa-chevron-right fa-lg"></span>'
                                + '<span class="fa fa-chevron-right fa-lg"></span>'
                        }).appendTo($stack);

                        $lastBtn.on('click',function(){
                            $cards.filter('.curr').trigger('card:last');
                        });

                        // assign card order
                        $cards.first().smartClass('curr').trigger('card:start');
                        $cards.first().next().smartClass('next');

                        // setup readspeaker
                        $flashcard.rsToggle();
                        
                    };
                    
                    // prepare flashcard parse
                    var parse = function(type,DATA,callback){
                        
                        // exit for unwanted types
                        if(type != 'XML' && type != 'JSON') return false;

                        $.each(DATA,function(d,data){
                            
                            // normalize data
                            var _data = {};
                            
                            // normalize by type
                            switch(type){
                                    
                                case 'XML':
                                    
                                    // capture card
                                    var card = $(this);
                                    
                                    // save preliminary data
                                    _data.prompt = card.find('prompt').text();
                                    _data.answer = card.attr('answer');
                                    _data.info = card.find('info').text();
                                    
                                    break;
                                    
                                case 'JSON':
                                    
                                    _data = {
                                        prompt: data.prompt,
                                        answer: data.answer,
                                        info: data.info
                                    };
                                    
                                    break;
                                    
                            }
                            
                            // skip invalid card data
                            if(!$.isset(_data.prompt)) return true;
                            if(!$.isset(_data.answer)) return true;

                            // build card
                            var _$card = $('<' + config.selectorPrefix + 'card>',{
                                'data-answer': _data.answer
                            }).html(_data.prompt);

                            // add info
                            if($.isset(_data.info))
                                $('<' + config.selectorPrefix + 'info>')
                                    .html(_data.info)
                                    .appendTo(_$card);

                            // add card to flashcard
                            $flashcard.append(_$card);
                            
                        });
                        
                        if($.isset(callback)) callback();
                        
                        return true;
                    };
                    
                    // check for a data file (JSON)
                    var file = $.isset($flashcard.attr('data-file')) ? 
                        $flashcard.attr('data-file') : false;
                    
                    // load JSON file data
                    if(file !== false && 
                       config.flashcards.acceptJSON && 
                       file.endsWith('.json')){
                        
                        // load JSON
                        $.getJSON(file,function(JSON){
                            
                            // parse JSON data then setup flashcards
                            parse('JSON',JSON,setup);
                            
                        });
                        
                    } else
                    
                    // load XML file data
                    if(file !== false && 
                       config.flashcards.acceptXML && 
                       file.endsWith('.xml')){
                        
                        // load XML
                        $.ajax({
                            type: 'GET',
                            url: file,
                            dataType: 'xml',
                            success: function(XML){
                                
                                // parse XML data then setup flashcards
                                parse('XML',$(XML).find('flashcard > card'),setup);
                                
                            }
                        });
                        
                    }
                    
                    // no file data to load
                    else {
                        
                        // immediately begin flashcard setup
                        setup();
                        
                    }
                    
                });
                
            }
            
        };
        
        // create a collection of accessibility features
        $.smarty.accessibility = {
            tabbables:  // general
                        ':smarty() button, :smarty() a, ' +
                        // quiz
                        ' :smarty() label.answer-radio, :smarty() label.answer-checkbox, ' +
                        // crossword
                        ':smarty() input[type="text"][data-no-tab="false"], ' +
                        ':smarty() span.clue-box, ' +
                        // flashcard
                        ':smarty(card).curr, :smarty(info)',
            untabbables: // flashcard
                         ':smarty(card):not(.curr), :smarty(card):not(.curr) button, ' +
                         ':smarty(card):attr(data-flip,front).curr :smarty(back) button, ' +
                         ':smarty(card):attr(data-flip,back).curr :smarty(front) button ',
            clickables: // general
                        ':smarty() button, :smarty() a, ' +
                        // quiz
                        ':smarty() label.answer-radio, :smarty() label.answer-checkbox, ' +
                        // crossword
                        ':smarty() span.clue-box, ' +
                        // flashcard
                        ':smarty(card) ',
            setup: function(){ 
               
                // setup tabbables
                var $tabbables = $(this.tabbables);

                $tabbables.each(function(i){

                    if(!$(this).is('[tabindex="0"]')){

                        $(this).attr('tabindex',0);
                        
                        if($(this).is('[data-accessible="false"]'))
                           $(this).attr('data-accessible',true);

                        $(this).on('focus blur',function(){

                            $(this).smartClass(config.focusClass);
                        });

                    }

                });
                
                // setup untabbables
                var $untabbables = $(this.untabbables);
                
                $untabbables.each(function(i){
                    
                    if($(this).is('[tabindex="0"]')){ 
                        
                        $(this).attr('tabindex',-1);
                        
                        if($(this).is('[data-accessible="true"]'))
                           $(this).attr('data-accessible',false);
                        
                        $(this).unbind('focus blur');
                        
                    }
                    
                });

                // setup clickables
                var $clickables = $(this.clickables);

                $clickables.each(function(i){

                    if(!$(this)[0].hasAttribute('data-accessible')){

                        $(this).attr('data-accessible',true);

                        $(this).on('keydown',function(e){

                            if($(this).is('[data-accessible="true"]')){
                                if(e.keyCode === 13){

                                    e.preventDefault();

                                    $(this).click();
                                    
                                    return false;
                                }
                            }

                        });

                    }

                });

            }
        };
            
        $(window).on('WebComponentsReady',function(){

            init.classify();

            init.register();

            init.unwrap(function(){
                
                if(config.quizzes.enabled) init.quizzes();
                if(config.crosswords.enabled) init.crosswords();
                if(config.flashcards.enabled) init.flashcards();

                // setup initial accessibility
                $.smarty.accessibility.setup();
                
            });

        });
        
    };

    $.fn.fluidFrames = function(){
        
        // capture frames
        var $frames = $(this);

        // exit if not frames are found
        if($frames.length === 0) return false;
        
        // setup frame size function
        var SIZE = function(frame){
            
            // capture frame
            var $frame = $(frame);
            
            // prepare size
            var size = {
                oldWidth: parseInt($frame.attr('width')),
                oldHeight: parseInt($frame.attr('height'))
            };

            // calculate aspect ratio
            size.aspectRatio = size.oldHeight / size.oldWidth;

            // save frame properties
            $frame.attr({
                'data-aspect-ratio': size.aspectRatio
            });

        };

        // setup frame resize function
        var RESIZE = function(frame){

            // capture frame
            var $frame = $(frame);
            
            // prepare size
            var size = {
                aspectRatio: parseFloat($frame.attr('data-aspect-ratio')),
                parentWidth: $frame.parent().width(),
                parentHeight: $frame.parent().height()
            };

            // calculate frame new size
            size.newWidth = size.parentWidth;
            size.newHeight = size.newWidth * size.aspectRatio;

            // setup frame size
            $frame.css({
                width: size.newWidth + 'px',
                height: size.newHeight + 'px'
            });

        };
                
        // setup each frame
        $frames.each(function(){

            // capture the frame
            $frame = $(this);
                   
            // setup frame events
            $frame
                .on('frame:size',function(){
                
                    SIZE(this);
                
                })
                .on('frame:resize',function(){
                
                    var frame = this;
                
                    setTimeout(function(){
                        RESIZE(frame);
                    },10);
             
                });

            // force frame sizing with window
            $($.smarty.config.window)
                .on('load resize',function(){
                    $frame.trigger('frame:resize');
                });

            // trigger initial resize
            $frame.trigger('frame:size')
                  .trigger('frame:resize');
                    
        });

        return true;
        
    };
    
    $.fn.smartClass = function(classes,direction){
        var element = $(this);
        classes = $.toArray(classes);
        if(direction == 'add'){
            $.each(classes,function(key,clazz){
                if(!element.hasClass(clazz)) element.addClass(clazz);
            });
        } else if(direction == 'remove'){
            $.each(classes,function(key,clazz){
                if(element.hasClass(clazz)) element.removeClass(clazz);
            });
        } else {
            $.each(classes,function(key,clazz){
                if(element.hasClass(clazz)){
                    element.removeClass(clazz); 
                } else {
                    element.addClass(clazz); 
                }
            });
        }
        return element; 
    };
    
    $.fn.smartNumber = function(type,pre,suf){
        var $els = $(this);
        var prefix, 
            suffix;
        if(type == 'decimal'){
            prefix = $.isset(pre) ? pre : '';
            suffix = $.isset(suf) ? suf : '';
            $els.each(function(i){
                var decimal = i + 1;
                var $decimal = $('<span>',{
                    class: 'question-num',
                    html: '<span>' + prefix + decimal + suffix + '</span>'
                });
                $(this).prepend($decimal).attr('data-question-num',decimal);
                $decimal.after(' ');
            });
        } else if(type == 'alpha'){ 
            prefix = $.isset(pre) ? pre : '';
            suffix = $.isset(suf) ? suf : '';
            var abc = $.toArray('a b c d e f g h i j k l m n o p q r s t u v w x y z');
            var count = 1;
            var beta = '';
            var alpha = abc[count-1];
            var nextAlpha = function(){
                count++;
                if(count % 27 === 0){
                    beta = beta === '' ? abc[0] : abc[abc.indexOf(beta)+1];
                    alpha = abc[count-27];
                } else {
                    alpha = abc[abc.indexOf(alpha)+1];
                }
            };
            var num = {
                corrects: $els.filter('[data-answer="true"]').length,
                answers: $els.length
            };
            $els.each(function(i){
                var qID = $(this).parent().attr('id');
                var aID = qID + alpha;
                var type;
                if(num.corrects == 1 && num.answers > 1) 
                    type = $.smarty.config.quizzes.questionTypes.multiChoice;
                if(num.corrects > 1 && num.answers > 1)
                    type = $.smarty.config.quizzes.questionTypes.multiAnswer;
                if (num.corrects == 1 && num.answers == 1)
                    type = $.smarty.config.quizzes.questionTypes.shortAnswer;
                if(num.corrects === 0 && num.answers === 0)
                    type = $.smarty.config.quizzes.questionTypes.trueFalse;
                if(type == $.smarty.config.quizzes.questionTypes.multiChoice || 
                   type == $.smarty.config.quizzes.questionTypes.multiAnswer){
                    var $alpha = $('<label>',{
                        class: 'answer-num',
                        for: aID,
                        html: '<span>' +
                                prefix + beta + alpha.toUpperCase() + suffix + 
                              '</span>'
                    });
                    $(this).prepend($alpha).attr('data-answer-num',alpha);
                    $alpha.after(' ');
                    nextAlpha();
                }
            }); 
        }
    };
    
    $.fn.scrollQuiz = function(event){
        
        var $quiz = $(this),
            $tracker = $quiz.find(':smarty(tracker)'),
            $stats = $tracker.find('.stats'),
            $score = $quiz.find(':smarty(score)'),
            $timer = $quiz.find(':smarty(timer)'),
            $window = $($.smarty.config.window),
            $document = $($.smarty.config.window.document),
            $frame,
            $fixed;
        
        var frameEnabled = $.smarty.config.frameEnabled,
            frameSelector = $.smarty.config.frameSelector,
            fixedSelector = $.smarty.config.fixedSelector,
            frameExists = false,
            fixedExists = false;
        
        // configure frame and fixed
        if(frameEnabled){
            
            // set frame
            if($.isset(frameSelector) && $.exists($document.find(frameSelector))){
                frameExists = true;
                $frame = $document.find(frameSelector);
            }
                
            // set fixed
            if($.isset(fixedSelector) && $.exists($document.find(fixedSelector))){
                fixedExists = true;
                $fixed = $document.find(fixedSelector);
            }
                
            
        }
        
        // capture measurements and positioning
        $window.top = $window.scrollTop();
        $window.height = $window.innerHeight();
        $window.width = $window.innerWidth();
        $quiz.top = $quiz.offset().top;
        $quiz.height = $quiz.height();
        $tracker.height = $tracker.outerHeight();
        $score.height = $score.outerHeight();
        $timer.height = $.exists($timer) ? $timer.outerHeight() : 0;
        $stats.height = $.exists($stats) ? $stats.outerHeight() : 0;
        
        // measure frame and fixed if exist
        var frameTop = frameExists ? $frame.offset().top : 0,
            fixedHeight = fixedExists ? $fixed.height() : 0;
        
        var buffer = 5,
            point = {
                start:    $quiz.top 
                        + frameTop
                        - fixedHeight
                        + buffer
            };
        
        // for LARGE windows
        if($window.width > $.smarty.config.quizzes.respondAt){
      
            // configure stopping point
            point.stop =      $quiz.top
                            + frameTop
                            - fixedHeight
                            + $quiz.height
                            - $tracker.height 
                            - $score.height
                            - $timer.height
                            - $stats.height
                            - (buffer * 2);
            
            // start scrolling...
            switch(true){
                    
                // window is BETWEEN starting point AND stopping point     
                case $window.top >= point.start && $window.top <= point.stop:

                    // affix the tracker to the VIEWPORT
                    $tracker.css({
                        top:  (buffer * 1)
                            + ($window.top - point.start) + 'px'
                    });

                    // affix the score BELOW the tracker
                    $score.css({
                        top:  (buffer * 2)
                            + $tracker.height 
                            + $stats.height
                            + ($window.top - point.start) + 'px'
                    });

                    // affix the timer BELOW the score
                    if($.exists($timer))
                        $timer.css({
                            top:  (buffer * 3)
                                + $tracker.height
                                + $score.height
                                + $stats.height 
                                + ($window.top - point.start) + 'px'
                        });

                    break;

                // window is BELOW stoping point
                case $window.top > point.stop:

                    // affix tracker to quiz BOTTOM
                    $tracker.css({
                        top:  point.stop
                            - point.start
                            + (buffer * 1) + 'px'
                    });

                    // affix score to quiz BOTTOM
                    $score.css({
                        top:  point.stop
                            - point.start
                            + $tracker.height
                            + (buffer * 2) + 'px'
                    });

                    // affix timer to quiz BOTTOM
                    if($.exists($timer))
                        $timer.css({
                            top:  point.stop
                                - point.start
                                + $tracker.height
                                + $score.height
                                + (buffer * 3) + 'px'
                        });

                    break;

                // window is ABOVE starting point
                case $window.top < point.start:

                    // unfix tracker
                    $tracker.css({
                        top: ''
                    });

                    // check for stats
                    if($.exists($stats)){

                        // move score BELOW stats
                        $score.css({
                            top:  $score.height
                                + $stats.height
                                + (buffer * 2) + 'px'
                        });

                        // move timer BELOW score
                        if($.exists($timer))
                            $timer.css({
                                top:  $score.height
                                    + $stats.height
                                    + $timer.height
                                    + (buffer * 1) + 'px'
                            });

                    } else {

                        // unfix score
                        $score.css({
                            top: ''
                        });

                        // unfix timer
                        if($.exists($timer))
                            $timer.css({
                                top: ''
                            });

                    }

                    break;

            }
            
        } 
        
        // for SMALL screens
        else { 
            
            // configure stopping point
            point.stop =    $quiz.top 
                            + $quiz.height
                            - $stats.height;
            
            // start scrolling...
            switch(true){
                // window is BETWEEN starting point AND stoping point     
                case $window.top >= point.start && $window.top <= point.stop:

                    // affix the score to the VIEWPORT
                    $score.css({
                        position: 'fixed',
                        top: buffer + 'px',
                        'box-shadow': '2px 2px 8px rgba(0,0,0,0.5)'
                    });

                    // affix the timer to the VIEWPORT
                    if($.exists($timer))
                        $timer.css({
                            position: 'fixed',
                            top: buffer + 'px',
                            'box-shadow': '2px 2px 8px rgba(0,0,0,0.5)'
                        });
                    
                    // affix the tracker BELOW the score and timer
                    $tracker.css({
                        position: 'fixed',
                        top: (buffer * 4) + $score.height + 'px',
                        'box-shadow': '2px 2px 8px rgba(0,0,0,0.5)'
                    });

                    break;

                // window is BELOW stoping point
                // or window is ABOVE starting point
                case $window.top > point.stop ||
                     $window.top < point.start:

                    // unfix tracker
                    $tracker.css({
                        position: '',
                        top:  '',
                        'box-shadow': ''
                    });

                    // unfix score
                    $score.css({
                        position: '',
                        top:  '',
                        'box-shadow': ''
                    });

                    // unfix timer 
                    if($.exists($timer))
                        $timer.css({
                            position: '',
                            top: '',
                            'box-shadow': ''
                        });

                    break;

            }
            
        }

        return $quiz;
        
    };

    $.fn.timeoutQuiz = function(event){
        
        var $quiz = $(this),
            $checkBtn = $quiz.find('.btn-check');
 
        var mode = $quiz.attr('data-mode');
        
        // configure mode
        mode = $.isset(mode) ? mode : $.smarty.config.quizzes.defaultMode;
        
        // set timeout attribute
        $quiz.attr('data-timeout',true);
        
        // disbale check button
        $checkBtn.disableBtn();
        
        // for STREAMLINE mode
        if(mode == 'streamline'){
            
            // capture instant buttons
            var $instaBtns = $quiz.find('.btn-insta');
            
            // disable instant buttons
            $instaBtns.each(function(i){
                
                $(this).disableBtn();
                
            });
            
        }
        
        // trigger quiz toggle
        $quiz.trigger('quiz:toggle');
 
        return $quiz;
        
    };
    
    $.fn.nextQuestion = function(callback){
        
        var $quiz = $(this),
            $curr = $quiz.find(':smarty(question).curr'),
            $next = $curr.next(':smarty(question)');
        
        if($.exists($next)){
            
            var top = $curr.position().top;
            
            $curr.smartClass('next').css('top',top);
            $next.smartClass('move');
            
            setTimeout(function(){
                
                $curr.smartClass('transition');
                $next.smartClass('transition');
                
            },100);
            
            setTimeout(function(){
                
                $curr.smartClass('curr next transition').css('top','');
                $next.smartClass('curr move transition');
                
                // fire callback
                if($.isset(callback)) callback();
                
            },$.smarty.config.transitionSpeed * 1000 + 200);
            
        }
            
        return $quiz;
        
    };
    
    $.fn.prevQuestion = function(callback){
        
        var $quiz = $(this),
            $curr = $quiz.find(':smarty(question).curr'),
            $prev = $curr.prev(':smarty(question)');
        
        if($.exists($prev)){
            
            var top = $curr.position().top;
            
            $curr.smartClass('prev').css('top',top);
            $prev.smartClass('move');
            
            setTimeout(function(){
                
                $curr.smartClass('transition');
                $prev.smartClass('transition');
                
            },100);
            
            setTimeout(function(){
                
                $curr.smartClass('curr prev transition').css('top','');
                $prev.smartClass('curr move transition');
                
                // fire callback
                if($.isset(callback)) callback();
                
            },$.smarty.config.transitionSpeed * 1000 + 200);
            
        }
        
        return $quiz;
        
    };
    
    $.fn.checkAnswer = function(event){
        
        var $quiz = $(this),
            $question;
       
        var mode = $quiz.attr('data-mode');
        
        // configure mode
        mode = $.isset(mode) ? mode : $.smarty.config.quizzes.defaultMode;

        // check ALL questions
        if(event.checkAll){
            
            // capture all questions
            var $questions = $quiz.find(':smarty(question)');
            
            $questions.each(function(q){
                
                // check all questions
                $(this).trigger('question:check');
                
            });
        
        } 
        
        // check SINGLE question
        else { 
            
            // for SLIDING mode
            if(mode == 'sliding'){
                
                // capture the current question
                $question = $quiz.find(':smarty(question).curr');
                
                // check the current question
                if($.exists($question)) $question.trigger('question:check');
 
            } 
            
            // for STREAMLINE mode
            else if(mode == 'streamline'){
              
                // capture the toggle's question
                $question = $(event.targetQuestion);
                
                // check the toggle's question
                if($.exists($question)) $question.trigger('question:check');
               
            }
            
        }
        
        return $quiz;
        
    };
    
    $.fn.checkQuestion = function(callback){
        
        var $question = $(this),
            $answers = $question.find(':smarty(answer)'),
            $nextBtn = $question.parent().find('.btn-next'),
            $prevBtn = $question.parent().find('.btn-prev');
        
            // capture values for correct and selected answers
        var values = $answers.getValues(),
            
            // calculate the percentages
            percentCorrect = values.selected.correct / values.correct.count,
            percentSelected = values.selected.correct / values.selected.count,
            percentScore = percentCorrect * percentSelected,
  
            // calculate question score and points
            points;
 
            // configure percent score
            percentScore = isNaN(percentScore) ? 0 : percentScore;
          
        // save question score 
        $question.attr('data-percent-correct',percentScore);
        
        setTimeout(function(){
        
            points = $question.calculatePoints();
            
            // fire callback
            if($.isset(callback)) callback(points);
            
        },10);

        return $question;
        
    };
    
    $.fn.togglePrevBtn = function(){
        
        var $quiz = $(this),
            $questions = $quiz.find(':smarty(question)'),
            $current = $questions.filter('.curr'),
            $first = $questions.first(),
            $last = $questions.last(),
            $button = $quiz.find('.btn-prev');
        
        var back = $quiz.attr('data-back'),
            timeout = $quiz.attr('data-timeout');
        
        var isFirst = $current[0] === $first[0],
            isLast = $current[0] === $last[0];
        
        // configure back
        back = $.isset(back) ? parseBool(back) : true;
        
        // button scenarios
        switch(true){
            // current question IS first question
            case (isFirst):
                $button.disableBtn();
                // trigger nonending
                if(!isLast) $quiz.trigger('quiz:notend');
                break;
            // back is ENABLED and current question IS NOT first question
            case (back && !isFirst):
                $button.enableBtn();
                // trigger nonending
                if(!isLast) $quiz.trigger('quiz:notend');
                break;
        }
        
        return $quiz;
        
    };
    
    $.fn.toggleNextBtn = function(){ 
        
        var $quiz = $(this),
            $questions = $quiz.find(':smarty(question)'),
            $current = $questions.filter('.curr'),
            $first = $questions.first(),
            $last = $questions.last(),
            $button = $quiz.find('.btn-next');
        
        var back = $quiz.attr('data-back'),
            timeout = $quiz.attr('data-timeout'),
            check = $current.attr('data-check-disabled'),
            disable = $button.is('.disable');

        var isLast = $current[0] == $last[0];

        // configure back
        back = $.isset(back) ? parseBool(back) : true;
        // configure timeout
        timeout = $.isset(timeout) ? parseBool(timeout) : false; 
        // configure check
        check = $.isset(check) ? parseBool(check) : false;
  
        // button scenarios
        switch(true){
            // quiz IS NOT timed out
            // back is DISABLED
            // question is UNANSWERED
            // current question IS NOT last question
            case (!timeout && !back && !check && !timeout && !isLast): 

                $button.disableBtn(); 
                break;
                
            // quiz IS NOT timed out
            // back is DISABLED
            // question is ANSWERED
            // current question IS NOT last question
            case (!timeout && !back && check && !isLast):  
       
                $button.enableBtn();
                break;
                
            // quiz IS NOT timed out
            // back is ENABLED
            // current question IS NOT last question
            case (!timeout && back && !isLast): 
    
                $button.enableBtn();
                break;
                
            // quiz IS NOT timed out
            // current question IS last question
            case (!timeout && isLast): 
    
                $button.disableBtn();
                
                // trigger ending
                if(!disable) $quiz.trigger('quiz:end');
                
                break;
                
            // quiz IS timed out
            // current question IS NOT last question
            case (timeout && !isLast):
                
                $button.enableBtn();
                break;
                
            // quiz IS timed out
            // current question IS last question
            case (timeout && isLast):
                
                $button.disableBtn();
                
                // trigger ending
                if(!disable) $quiz.trigger('quiz:end');
                
                break;
        }
        
        return $quiz;
        
    };
    
    $.fn.toggleCheckBtn = function(){
        
        var $quiz = $(this),
            $questions = $quiz.find(':smarty(question)'),
            $checkBtn = $quiz.find('.btn-check'),
            $current = $questions.filter('.curr');
        
        switch(true){
            // checking DISABLED
            case    $current.is('[data-check-disabled="true"]') || 
                    $quiz.is('[data-timeout="true"]'):
                        $checkBtn.disableBtn();
                        break;
            // checking ENABLED
            default:
                        $checkBtn.enableBtn();
                        break;
        }
        
        return $quiz;

    };

    $.fn.removeDoneBtn = function(){
        
        var $quiz = $(this),
            $button = $quiz.find('.btn-done');
        
        if($.exists($button)) $button.remove();
        
        return $quiz;
        
    };

    $.fn.createDoneBtn = function(callback){
        
        var $quiz = $(this),
            $button = $quiz.find('.btn-done');
        
        if(!$.exists($button)) {
            
            button = $('<button>',{
                class: 'btn-done',
                type: 'button',
                text: 'Done'
            }).on('click',function(){
                
                // trigger quiz done
                if(!$(this).is('.disable')) $quiz.trigger('quiz:done');
                
            }).on('button:created',function(){
                
                // toggle the done button
                $quiz.toggleDoneBtn();
                
                // fire callback
                if($.isset(callback)) callback();
                
            }).insertAfter($quiz.find('.btn-next')).trigger('button:created');
            
        }
        
        return $quiz;
        
    };
    
    $.fn.toggleChecking = function(attempts){
        
        var $question = $(this), 
            $quiz = $question.closest(':smarty(' + 
                                      $.smarty.config.quizzes.selector + ')'),
            $questions = $quiz.find(':smarty(question)'),
            $checkBtn = $quiz.find('.btn-check');
    
        var mode = $quiz.attr('data-mode'),
            percentCorrect = parseFloat($question.attr('data-percent-correct'));
        
        // configure mode
        mode = $.isset(mode) ? mode : $.smarty.config.quizzes.defaultMode;
        
        // toggle buttons in STREAMLINE mode
        if(mode == 'streamline'){
            
            // capture instant button
            var $instaBtn = $question.find('.btn-insta');
            
            // toggle instant button
            switch(true){
                // limit on attempts allowed
                // AND (max attempts reached OR 100% correct)
                case attempts.max !== false &&
                     (attempts.total - attempts.incomplete == attempts.max ||
                      percentCorrect == 1):
                    $instaBtn.disableBtn();
                    $question.attr('data-check-disabled',true);
                    break;
                // no limit on attempts allowed
                // AND 100% correct
                case attempts.max === false && percentCorrect == 1: 
                    $instaBtn.disableBtn();
                    $question.attr('data-check-disabled',true);
                    break;
                default:
                    $question.attr('data-check-disabled',false);  
                    break;
            }
            
            // tally disabled instant buttons
            var allDisabled = $.vote($questions,function(question){
                var isDisabled = $(question).attr('data-check-disabled');
                return $.isset(isDisabled) ? parseBool(isDisabled) : false;
            });

            // toggle check button
            switch(true){
                // all instant buttons disabled
                case allDisabled:
                    $checkBtn.disableBtn();
            }
   
        } 
        
        // toggle buttons in SLIDING mode
        else if(mode == 'sliding'){ 
            
            // toggle check button
            switch(true){
                // limit on attempts allowed
                // AND (max attempts reached OR 100% correct)
                case attempts.max !== false && 
                     (attempts.total - attempts.incomplete == attempts.max || 
                      percentCorrect == 1):
                    $checkBtn.disableBtn();
                    $question.attr('data-check-disabled',true);
                    break;
                // no limit on attempts allowed
                // AND 100% correct
                case attempts.max === false && percentCorrect == 1:
                    $checkBtn.disableBtn();
                    $question.attr('data-check-disabled',true);
                    break;
                default:
                    $question.attr('data-check-disabled',false);
                    break;
            }

        }
        
        return $question;
        
    };
    
    $.fn.toggleDoneBtn = function(){ 
        
        var $quiz = $(this),
            $button = $quiz.find('.btn-done'),
            $tracker = $quiz.find(':smarty(tracker)'),
            $questions = $quiz.find(':smarty(question)'),
            $current = $questions.filter('.curr'),
            $last = $questions.last();
        
        var mode = $quiz.attr('data-mode'),
            unanswered = $tracker.attr('data-questions-unanswered'),
            timeout = $quiz.attr('data-timeout');
        
        var isLast = $current[0] === $last[0];
        
        // configure mode
        mode = $.isset(mode) ? mode : $.smarty.config.quizzes.defaultMode;
        // configure unanswered
        unanswered = $.isset(unanswered) ? parseInt(unanswered) : $questions.length;
        // configure timeout
        timeout = $.isset(timeout) ? parseBool(timeout) : false;
   
        if($.exists($button)){
            
            // toggle done button
            switch(true){
                // questions are ANSWERED
                // mode is SLIDING
                // current question IS last question
                case unanswered === 0 && mode == 'sliding' && isLast:
                    $button.removeAttr('title').enableBtn();
                    break;
                // questions are ANSWERED
                // mode is STREAMLINE
                case unanswered === 0 && mode == 'streamline':
                    $button.removeAttr('title').enableBtn();
                    break;
                // quiz has TIMED OUT
                case timeout:
                    $button.attr({
                        title: 'Allotted time expired. Please submit your responses.'
                    }).enableBtn();
                    break;
                // default
                default:
                    $button.attr({
                        title: 'You have ' + unanswered + ' unanswered question(s). '
                             + 'Please answer all questions before proceeding.'
                    }).disableBtn();
                    break;
            }
            
        }
    
        return $quiz;
        
    };
        
    $.fn.disableBtn = function(){
        
        var $btn = $(this);

        $btn.smartClass('disable','add');
        
        if($btn[0].hasAttribute('onclick')){
            $btn.attr('data-onclick',$btn.attr('onclick'))
            .removeAttr('onclick');
        }
        
        return $btn;
        
    };
        
    $.fn.enableBtn = function(){
        
        var $btn = $(this);
        
        $btn.smartClass('disable','remove');
        
        if($btn[0].hasAttribute('data-onclick')){
            $btn.attr('onclick',$btn.attr('data-onclick'))
            .removeAttr('data-onclick');
        }
        
        return $btn;
        
    };
    
    $.fn.updateAttempts = function(event,callback){
        
        var $question = $(this),
            $answers = $question.find(':smarty(answer)'),
            $attempts = $question.find(':smarty(attempts)'),
            $stats = $attempts.find('.stats');
        
        var values = $answers.getValues(),
            attempts = {
                total: $question.attr('data-attempts-total'),
                pass: $question.attr('data-attempts-pass'),
                partial: $question.attr('data-attempts-partial'),
                incomplete: $question.attr('data-attempts-incomplete'),
                fail: $question.attr('data-attempts-fail'),
                max: $question.attr('data-attempts')
            },
            percentCorrect = parseFloat($question.attr('data-percent-correct')),
            infinity = '&#8734;';
  
        // configure attempts
        attempts.total = $.isset(attempts.total) ? 
                                parseInt(attempts.total) : 0;
        attempts.pass = $.isset(attempts.pass) ? 
                                parseInt(attempts.pass) : 0;
        attempts.partial = $.isset(attempts.partial) ? 
                                parseInt(attempts.partial) : 0;
        attempts.incomplete = $.isset(attempts.incomplete) ? 
                                parseInt(attempts.incomplete) : 0;
        attempts.fail = $.isset(attempts.fail) ? 
                                parseInt(attempts.fail) : 0;
        attempts.max = $.isset(attempts.max) && 
                            $.isNumeric(attempts.max) && parseInt(attempts.max) !== 0 ?
                                parseInt(attempts.max) : false;

        // initialize
        if(event.init){
            
            $question.attr({
                'data-attempts-total': attempts.total,
                'data-attempts-pass': attempts.pass,
                'data-attempts-partial': attempts.partial,
                'data-attempts-incomplete': attempts.incomplete,
                'data-attempts-fail': attempts.fail
            });
            
        } 
            
        // =100% correct
        else if(values.selected.count >= 1 && percentCorrect == 1){
            
            attempts.total++;
            attempts.pass++;
            
            $question.attr({
                'data-attempts-total': attempts.total,
                'data-attempts-pass': attempts.pass
            });
            
        } 
        
        // >=1% correct
        else if(values.selected.count >= 1 && percentCorrect >= 0.1){
            
            attempts.total++;
            attempts.partial++;
            
            $question.attr({
                'data-attempts-total': attempts.total,
                'data-attempts-partial': attempts.partial
            });
        
        } 
        
        // =0% correct
        else if(values.selected.count >= 1 && percentCorrect === 0){
            
            attempts.total++;
            attempts.fail++;
            
            $question.attr({
                'data-attempts-total': attempts.total,
                'data-attempts-fail': attempts.fail
            });
            
        } 
        
        // =0 selected
        else if(values.selected.count === 0){
            
            attempts.total++;
            attempts.incomplete++;
            
            $question.attr({
                'data-attempts-total': attempts.total,
                'data-attempts-incomplete': attempts.incomplete
            }); 
            
        }
        
        // configure attempts
        attempts.valid = attempts.total - attempts.incomplete;
        
        // update max and total attempts 
        $attempts.find('.total').html(attempts.valid);
        $attempts.find('.max').html((attempts.max !== false ? attempts.max : infinity));
   
        // update stats
        if($.exists($stats)) 
            $question.trigger($.Event('question:attempt:stats',{
                update: true
            }));

        // fire callback
        if($.isset(callback)) callback(attempts);
  
    };
    
    $.fn.updateStatus = function(callback){
        
        var $question = $(this),
            $quiz = $question.closest(':smarty(' + 
                                      $.smarty.config.quizzes.selector + ')');
        
        var attempts = {
            total: parseInt($question.attr('data-attempts-total')),
            incomplete: parseInt($question.attr('data-attempts-incomplete'))
        };
        
        // configure attempts
        attempts.valid = attempts.total - attempts.incomplete; 
        
        if($.isset(attempts.valid) && attempts.valid > 0){
            
            $question.attr('data-answered',true);
            
        } else {
            
            $question.attr('data-answered',false);
            
        }
        
        if($.isset(callback)) callback();
        
        return $question;
        
    };
    
    $.fn.answerType = function(){
        return $(this).parent().attr('data-question-type');
    };
    
    $.fn.getValues = function(){
        
        var $answers = $(this),
            $corrects = $answers.filter('[data-answer="true"]'); 
        
        var result = {
                correct: {
                    count: 0,
                    correct: 0,
                    values: []
                },
                selected: {
                    count: 0,
                    correct: 0,
                    values: []
                }
            },
            type = $answers.answerType();
        
        // for MULTIPLE ANSWER [multi-answer]
        if(type == $.smarty.config.quizzes.questionTypes.multiAnswer){ 
            
            // get correct answer value(s)
            (function(){
             
                // tally count
                result.correct.count = $corrects.length;
                
                $corrects.each(function(c){
                    
                    var _$correct = $(this),
                        _$input = _$correct.find('input');
                    
                    // capture the value
                    var _value = _$input.val().toUpperCase();
                    
                    // toggle the checked state
                    _$correct.checkedState();
                    
                    // tally correct
                    if(_$input.is(':checked')) result.correct.correct++;
                    
                    // save values
                    result.correct.values.push(_value);
                    
                });
            
            })();
            
            // get selected answer value(s)
            (function(){
                
                $answers.each(function(a){
                    
                    var _$selected = $(this),
                        _$input = _$selected.find('input');
                    
                    // capture the value
                    var _value = _$input.val().toUpperCase();
                    
                    // toggle the checked state
                    _$selected.checkedState();
                    
                    
                    if(_$input.is(':checked')){
                        
                        // tally count
                        result.selected.count++;
                        
                        // tally correct
                        if($corrects.indexEl(_$selected) > -1) result.selected.correct++;
                        
                        // save values
                        result.selected.values.push(_value);
                        
                    }
                    
                });
                
            })();
            
        } 
        
        // for MULTIPLE CHOICE [multi-choice]
        // and TRUE/FALSE [true-false]
        else if(type == $.smarty.config.quizzes.questionTypes.multiChoice ||
                  type == $.smarty.config.quizzes.questionTypes.trueFalse){
            
            var _$inputs = $answers.find('input'),
                _$checked = _$inputs.filter(':checked'),
                _$correct = $corrects.find('input');
            
            // capture values
            var _value = {
                checked: _$checked.val(),
                correct: _$correct.val()
            };
            
            // get correct answer value
            (function(){
                
                // tally count
                result.correct.count++;
                
                // tally correct
                if($.exists(_$checked) && _value.checked == _value.correct)
                    result.correct.correct++;
                
                // collect value
                if(type == $.smarty.config.quizzes.questionTypes.trueFalse){
                    
                    // titlecase TRUE/FALSE values
                    result.correct.values.push(_value.correct.toTitleCase());
                    
                } 
                else {
                    
                    // uppercase MULTIPLE CHOICE values
                    result.correct.values.push(_value.correct.toUpperCase());
                }
                
            })();
            
            // get selected answer value
            (function(){
                
                if($.exists(_$checked)){
                    
                    // tally count
                    result.selected.count++;
                    
                    // tally correct
                    if(_value.checked == _value.correct) 
                        result.selected.correct++;
                    
                    // collect value
                    if(type == $.smarty.config.quizzes.questionTypes.trueFalse){
                        
                        // titelcase TRUE/FALSE values
                        result.selected.values.push(_value.checked.toTitleCase());
                        
                    }
                    else {
                        
                        // uppercase MULTIPLE CHOICE values
                        result.selected.values.push(_value.checked.toUpperCase());
                    }
                    
                }
                
            })();
            
            // toggle checked state
            $answers.checkedState();
            
        } 
        
        // for SHORT ANSWER [short-answer]
        else if(type == $.smarty.config.quizzes.questionTypes.shortAnswer){
            
            var _$input = $answers.find('input');
            
            var _sensitive = $answers.attr('data-case-sensitive'),
                _values = {
                    correct: $answers.attr('data-answer'),
                    user: _$input.val(),
                    alternates: $answers.attr('data-answer-alts')
                };
     
            // configure case sensitivity
            _sensitive = $.isset(_sensitive) ? parseBool(_sensitive) : false;
        
            // configure value alternates
            if(!$.isset(_values.alternates)){
                _values.alternates = false;
            } else {
                _values.alternates = _values.alternates.split(',');
                
                $.each(_values.alternates,function(_i,_v){
                    _values.alternates[_i] = $.trim(_v);
                });
            }

            // get correct answer value
            (function(){
                
                // tally count
                result.correct.count++;
                
                // tally correct when CASE SENSITIVE
                if(_sensitive){
                    
                    if(_values.user == _values.correct ||
                        (_values.alternates !== false && 
                        $.inArray(_values.user,_values.alternates) > -1))
                            result.correct.correct++;
                    
                } 
                // tally correct when NOT CASE SENSITIVE
                else {
                   
                    var _lowers = {
                        correct: _values.correct.toLowerCase(),
                        user: _values.user.toLowerCase(),
                        alternates: []
                    };
                    
                    // configure lower alternates
                    if(_values.alternates === false){
                        _lowers.alternates = false;
                    } else {
                        $.each(_values.alternates,function(_i,_v){
                            _lowers.alternates[_i] = _v.toLowerCase();
                        });
                    }

                    if(_lowers.user == _lowers.correct ||
                      (_lowers.alternates !== false &&
                       $.inArray(_lowers.user,_lowers.alternates) > -1))
                        result.correct.correct++;
                }
                
                // save value
                result.correct.values.push(_values.correct);
                
            })();
            
            // get selected answer value
            (function(){
            
                // tally count
                if($.isset(_values.user)) result.selected.count++;
                
                // tally correct when CASE SENSITIVE
                if(_sensitive){ 
                    
                    if(_values.user == _values.correct ||
                        (_values.alternates !== false && 
                        $.inArray(_values.user,_values.alternates) > -1))
                            result.selected.correct++;
                    
                } 
                // tally correct when NOT CASE SENSITIVE
                else {
                    
                    var _lowers = {
                        correct: _values.correct.toLowerCase(),
                        user: _values.user.toLowerCase(),
                        alternates: []
                    };
                    
                    // configure lower alternates
                    if(_values.alternates === false){
                        _lowers.alternates = false;
                    } else {
                        $.each(_values.alternates,function(_i,_v){
                            _lowers.alternates[_i] = _v.toLowerCase();
                        });
                    }
                    
                    if(_lowers.user == _lowers.correct ||
                      (_lowers.alternates !== false &&
                       $.inArray(_lowers.user,_lowers.alternates) > -1))
                        result.selected.correct++;
                }
                
                // save value
                result.selected.values.push(_values.user);
                
            })();

            // toggle answered state
            $answers.answeredState();
            
        }
        
        return result;
    };
    
    $.fn.checkedState = function(){
        
        var $answers = $(this);
        
        $answers.each(function(i){
            
            var _$answer = $(this),
                _$input = _$answer.find('input');
            
            // is SELECTED
            if(_$input.is(':checked') && !_$answer.is('[data-selected="true"]')){
                
                _$answer.attr('data-selected',true);
                
            } 
            
            // is NOT SELECTED
            else if(!_$input.is(':checked')){
                
                _$answer.attr('data-selected',false);
                
            }
            
        });
        
        return $answers;
        
    };
    
    $.fn.answeredState = function(){ 
        
        var $answer = $(this),
            $input = $answer.find('input');
        
        var sensitive = $answer.attr('data-case-sensitive'),
            values = {
                correct: $answer.attr('data-answer'),
                user: $input.val(),
                alternates: $answer.attr('data-answer-alts')
            };
        
        // configure case sensitivity
        sensitive = $.isset(sensitive) ? parseBool(sensitive) : false;
        
        // configure value alternates
        if(!$.isset(values.alternates)){
            values.alternates = false;
        } else {
            values.alternates = values.alternates.split(',');
            
            $.each(values.alternates,function(_i,_v){
                values.alternates[_i] = $.trim(_v);
            });
        }

        // configure values if NOT CASE SENSITIVE
        if(!sensitive){
            
            values.correct = values.correct.toLowerCase();
            values.user = values.user.toLowerCase();
            
            if(values.alternates === false){
                values.alternates = false;
            } else {
                $.each(values.alternates,function(_i,_v){
                    values.alternates[_i] = _v.toLowerCase();
                });
            }
            
        }
    
        // ANSWERED and CORRECT
        if($.isset(values.user) &&
           values.user == values.correct || 
           (values.alternates !== false && 
            $.inArray(values.user,values.alternates) > -1)){
            
            $answer.attr('data-answered',true);
            $answer.attr('data-answered-state','pass');
            
        } 
        
        // ANSWERED but NOT CORRECT
        else if($.isset(values.user) &&
                  values.user !== values.correct &&
                 (values.alternates === false || 
                  (values.alternates !== false && 
                   $.inArray(values.user,values.alternates) == -1))){
            
            $answer.attr('data-answered',true);
            $answer.attr('data-answered-state','fail');
            
        } 
        
        // UNANSWERED
        else if(!$.isset(values.user)){
            
            $answer.attr('data-answered',false);
            $answer.attr('data-answered-state','incomplete');
            
        } 
        
        // UNANSWERED and TIMED OUT
        else {
            
            $answer.attr('data-answered',false);
            $answer.attr('data-answered-state','fail');
            
        }
        
        return $answer;
        
    };
    
    $.fn.setupFeedback = function(){
        
        var $question = $(this),
            $feedback = $question.find(':smarty(feedback)');
        
        if(!$.exists($feedback))
            $feedback = $('<' + $.smarty.config.selectorPrefix + 'feedback>')
                            .appendTo($question);
        
        return $feedback;
        
    };
 
    $.fn.sendFeedback = function(event){
        
        var $question = $(this), 
            $feedback = $question.setupFeedback(),
            $earned = $feedback.find('.pts-earned'),
            $possible = $feedback.find('.pts-possible'),
            $attempts = $feedback.find('.pts-attempts'),
            $points = $feedback.find('.pts-response'),
            $response = $feedback.find('.check-response'),
            $message = $feedback.find('.message');
        
        var attempts = $question.parseAttempts(),
            points = event.points;
 
        // update or create EARNED POINTS display
        if($.exists($earned)){
            
            $earned.text(points.earned.toDecimals(2));
            
        } 
        else {

            $earned = $('<span>',{
               class: 'pts-earned',
               text: points.earned.toDecimals(2)
            });
            
        }
                                        
        // update or create POSSIBLE POINTS display
        if($.exists($possible)){
            
            $possible.text(points.possible.toDecimals(2));
            
        } 
        else {
            
            $possible = $('<span>',{
                class: 'pts-possible',
                text: points.possible.toDecimals(2)
            });
            
        }
        
        // update or create ATTEMPTS display
        if($.exists($attempts)){
            
            $attempts.text(attempts.valid);
            
        } 
        else {
            
            $attempts = $('<span>',{
                class: 'pts-attempts',
                text: attempts.valid
            });
            
        }
        
        // update or create TOTAL POINTS display
        if($.exists($points)){
            
            $points.html(
                'You earned ' + 
                    $earned.outerHTML() + 
                ' / ' + 
                    $possible.outerHTML() + 
                ' points on ' +
                    $attempts.outerHTML() +
                ' attempt(s).'
            );
            
        } 
        else {
            
            $points = $('<div>',{
                class: 'pts-response',
                html:   'You earned ' + 
                            $earned.outerHTML() + 
                        ' / ' + 
                            $possible.outerHTML() + 
                        ' points on ' + 
                            $attempts.outerHTML() + 
                        ' attempt(s).'
            });
            
        }
        
        // update or create FEEDBACK RESPONSE
        if($.exists($response)){
            
            $response.html(
                $question.feedbackResponse()
            );
            
        } 
        else {
            
            $response = $('<span>',{
                class: 'check-response',
                html: $question.feedbackResponse()
            });
            
            // add RESPONSE in the appropriate place
            if($.exists($message)){
                
                $message.before($response,$points);
                
            } 
            else {
                
                $feedback.append($response,$points);
                
            }
            
        }
        
        // update MESSAGE display
        if($.exists($message)){
            
            $question.feedbackMessage();
            
        }
        
        return $feedback;
        
    };
    
    $.fn.feedbackMessage = function(){
        
        var $question = $(this),
            $answers = $question.find(':smarty(answer)'),
            $feedback = $question.children(':smarty(feedback)'),
            $message = $feedback.find('.message');
        
        var percentCorrect = parseFloat($question.attr('data-percent-correct')),
            attempts = {
                total: parseInt($question.attr('data-attempts-total')),
                incomplete: parseInt($question.attr('data-attempts-incomplete')),
                max: $question.attr('data-attempts')
            };
        
        // configure attempts
        attempts.max = $.isNumeric(attempts.max) ? parseInt(attempts.max) : -1;
        attempts.valid = attempts.total - attempts.incomplete;
        
        // toggle the feedback message
        if(percentCorrect == 1 || attempts.valid == attempts.max){
            
            $message.smartClass('hide show');
            
        }
        
        return $message;
        
    };
    
    $.fn.feedbackResponse = function(){
        
        var $question = $(this),
            $answers = $question.find(':smarty(answer)'),
            $answer,
            $select,
            $signal;
        
        var values = $answers.getValues(),
            percentCorrect = parseFloat($question.attr('data-percent-correct')),
            attempts = {
                total: parseInt($question.attr('data-attempts-total')),
                incomplete: parseInt($question.attr('data-attempts-incomplete')),
                max: $question.attr('data-attempts')
            },
            response = '',
            answer = '',
            selection = '',
            classes = {
                pass: 'pass',
                partial: 'partial',
                incomplete: 'incomplete',
                fail: 'fail'
            },
            type = $question.attr('data-question-type');
  
        // configure attempts
        attempts.max = $.isNumeric(attempts.max) ? parseInt(attempts.max) : -1;
        attempts.valid = attempts.total - attempts.incomplete;
        
        // for MULTIPLE CHOICE [multi-choice]
        // and TRUE/FALSE [true-false]
        // and SHORT ANSWER [short-answer]
        if(type == $.smarty.config.quizzes.questionTypes.multiChoice ||
           type == $.smarty.config.quizzes.questionTypes.trueFalse ||
           type == $.smarty.config.quizzes.questionTypes.shortAnswer){
         
            // setup feedback based on scenarios
            switch(true){
                // question ANSWERED and =100% correct
                case values.selected.count >= 1 && percentCorrect == 1:
                    
                    $signal = $('<strong>',{
                        class: classes.pass,
                        text: 'Correct.'
                    });
                    
                    $answer = $('<strong>',{
                        class: classes.pass,
                        text: values.correct.values[0]
                    });
                 
                    $select = $('<strong>',{
                        class: classes.pass,
                        text: values.selected.values[0]
                    });
                    
                    selection += $select.outerHTML();
                    answer += $answer.outerHTML();
                    
                    response += 'You answered ' + selection + '. ';
                    response += 'The correct answer is ' + answer + '. ';
                    
                    break;
                    
                // question ANSWERED and =0% correct
                case values.selected.count >= 1 && percentCorrect === 0:
                
                    $signal = $('<strong>',{
                        class: classes.fail,
                        text: 'Wrong.'
                    });
                    
                    $answer = $('<strong>',{
                        class: classes.pass,
                        text: values.correct.values[0]
                    });
                    
                    $select = $('<strong>',{
                        class: classes.fail,
                        text: values.selected.values[0]
                    });
                    
                    selection += $select.outerHTML();
                    answer += $answer.outerHTML();
                    
                    response += 'You answered ' + selection + '. ';
                    
                    if(attempts.max > -1 && attempts.valid == attempts.max)
                        response += 'The correct answer is ' + answer + '. ';
                    
                    break;
                    
                // question UNANSWERED
                case values.selected.count === 0:
                    
                    $signal = $('<strong>',{
                        class: classes.incomplete,
                        text: 'Try again.'
                    });
                    
                    response = 'Please select an answer from above.';
                    
                    // set a more appropriate message SHORT ANSWER questions
                    if(type == $.smarty.config.quizzes.questionTypes.shortAnswer)
                        response = 'Please provide an answer in the field above.';
                    
                    break;
            }
            
        }
        
        // for MULTIPLE ANSWER [multi-answer]
        else if(type == $.smarty.config.quizzes.questionTypes.multiAnswer){
            
            // setup feedback based on scenarios
            switch(true){
                // question ANSWERED and =100% correct
                case values.selected.count >= 1 && percentCorrect == 1:
                    
                    $signal = $('<strong>',{
                        class: classes.pass,
                        text: 'Correct.'
                    });
                    
                    $.each(values.correct.values,function(_key,_value){
                        
                        $answer = $('<strong>',{
                            class: classes.pass,
                            text: _value
                        });
                        
                        switch(true){
                            case _key != values.correct.count - 1 &&
                                 values.correct.count > 2:
                                
                                answer += $answer.outerHTML() + ', ';
                                break;
                                
                            case _key != values.correct.count - 1 &&
                                 values.correct.count == 2:
                                
                                answer += $answer.outerHTML() + ' ';
                                break;
                                
                            default:
                                
                                answer += 'and ' + $answer.outerHTML();
                                break;
                        }

                    });
                    
                    $.each(values.selected.values,function(_key,_value){
                        
                        $select = $('<strong>',{
                            class: classes.pass,
                            text: _value
                        });
                        
                        switch(true){
                            case _key != values.selected.count - 1 && 
                                 values.selected.count > 2:
                                
                                selection += $select.outerHTML() + ', ';
                                break;
                                
                            case _key != values.selected.count - 1 && 
                                 values.selected.count == 2:
                                
                                selection += $select.outerHTML() + ' ';
                                break;
                                
                            case values.selected.count == 1:
                                
                                selection += $select.outerHTML();
                                break;
                                
                            default:
                                
                                selection += 'and ' + $select.outerHTML();
                                break;
                        }
                        
                    });
                    
                    response += 'You answered ' + selection + '. ';
                    response += 'The correct answers are ' + answer + '. ';
                    
                    break;
                    
                // question ANSWERED and >0% correct
                case values.selected.count >= 1 && percentCorrect > 0:
                    
                    $signal = $('<strong>',{
                        class: classes.partial,
                        text: 'Almost.'
                    });
                    
                    $.each(values.selected.values,function(_key,_value){
                        
                        // configure variable class
                        classes.variable = values.correct.values.indexOf(_value) != -1 ?
                                                classes.partial : classes.partial;
                        
                        var $select = $('<strong>',{
                            class: classes.variable,
                            text: _value
                        });
                        
                        switch(true){
                            case _key != values.selected.count - 1 &&
                                 values.selected.count > 2:
                                
                                selection += $select.outerHTML() + ', ';
                                break;
                                
                            case _key != values.selected.count - 1 &&
                                 values.selected.count == 2:
                                
                                selection += $select.outerHTML() + ' ';
                                break;
                                
                            case values.selected.count == 1:
                                
                                selection += $select.outerHTML();
                                break;
                                
                            default:
                                
                                selection += 'and ' + $select.outerHTML();
                                break;       
                        }

                    });
                    
                    $.each(values.correct.values,function(_key,_value){
                        
                        // configure variable class
                        classes.variable = values.selected.values.indexOf(_value) != -1 ?
                                                classes.pass : classes.fail;
                        
                        var $answer = $('<strong>',{
                            class: classes.variable,
                            text: _value
                        });
                        
                        switch(true){
                            case _key != values.correct.count - 1 &&
                                 values.correct.count > 2:
                                
                                answer += $answer.outerHTML() + ', ';
                                break;
                            
                            case _key != values.correct.count - 1 &&
                                 values.correct.count == 2:
                                
                                answer += $answer.outerHTML() + ' ';
                                break;
                                
                            default:
                                
                                answer += 'and ' + $answer.outerHTML();
                                break;
                        }
 
                    });
                    
                    response += 'You answered ' + selection + '. ';
                    
                    if(attempts.max > -1 && attempts.valid == attempts.max)
                        response += 'The correct answers are ' + answer + '. ';
                    
                    break;
                    
                // question ANSWERED and =0% correct
                case values.selected.count >= 1 && percentCorrect === 0:
                    
                    $signal = $('<strong>',{
                        class: classes.fail,
                        text: 'Wrong.'
                    });
                    
                    $.each(values.correct.values,function(_key,_value){
                        
                        // configure variable class
                        classes.variable = values.selected.values.indexOf(_value) != -1 ?
                                                classes.pass : classes.fail;
                        
                        $answer = $('<strong>',{
                            class: classes.variable,
                            text: _value
                        });
                        
                        switch(true){
                            case _key != values.correct.count - 1 &&
                                 values.correct.count > 2:
                                
                                answer += $answer.outerHTML() + ', ';
                                break;
                            
                            case _key != values.correct.count - 1 &&
                                 values.correct.count == 2:
                                
                                answer += $answer.outerHTML() + ' ';
                                break;
                                
                            default:
                                
                                answer += 'and ' + $answer.outerHTML();
                                break;
                        }

                    });
                    
                    $.each(values.selected.values,function(_key,_value){
                        
                        // configure variable class
                        classes.variable = values.correct.values.indexOf(_value) != -1 ?
                                                classes.pass : classes.fail;
                        
                        $select = $('<strong>',{
                            class: classes.variable,
                            text: _value
                        });
                        
                        switch(true){
                            case _key != values.selected.count - 1 &&
                                 values.selected.count > 2:

                                selection += $select.outerHTML() + ', ';
                                break;

                            case _key != values.selected.count - 1 &&
                                 values.selected.count == 2:

                                selection += $select.outerHTML() + ' ';
                                break;
                                
                            case values.selected.count == 1:
                                
                                selection += $select.outerHTML();
                                break;
                                
                            default:
                                
                                selection += 'and ' + $select.outerHTML();
                                break;
                                
                        }

                    });
                    
                    response += 'You answered ' + selection + '. ';
                    
                    if(attempts.max > -1 && attempts.valid == attempts.max)
                        response += 'The correct answers are ' + answer + '. ';
                    
                    break;
                    
                // question UNANSWERED
                case values.selected.count === 0:
                    
                    $signal = $('<strong>',{
                        class: classes.incomplete,
                        text: 'Try again.'
                    });
                        
                    response = 'Please select an answer from above.';
                    
                    break;
            }
            
        }
            
        return $signal.outerHTML() + ' ' + response;
    
    };

    $.fn.parseAttempts = function(){
        
        var $question = $(this);
        
        // get attempt data
        var attempts = {
            total: parseInt($question.attr('data-attempts-total')),
            incomplete: parseInt($question.attr('data-attempts-incomplete')),
            max: $question.attr('data-attempts')
        };
        
        // configure attempts
        attempts.max = $.isNumeric(attempts.max) ? parseInt(attempts.max) : false;
        attempts.valid = attempts.total - attempts.incomplete;
        
        return attempts;
        
    };

    $.fn.giveHint = function(event){
        
        var $question = $(this),
            $hint = $question.find(':smarty(hint)');
        
        var attempts = $question.parseAttempts(), 
            points = event.points;

        // make sure hint exists and not showing
        if(!$.exists($hint)) return false;
        if(event.showing === true) return false;
        if($hint.find('.hint').is('.show')) return false;

        // configure attempts
        attempts.required = $.isset($hint.attr('data-attempts')) ?
                            parseInt($hint.attr('data-attempts')) : 1;

        // configure points
        points.percent = points.earned / points.possible;

        // question not answered AND minimum attempts met
        if(points.percent < 1 && attempts.valid >= attempts.required){

            // show hint
            $hint.find('.hint').smartClass('hide show');

        }
        
        return $question;
        
    };
    
    $.fn.calculatePoints = function(){
        
        var $question = $(this),
            $quiz = $question.closest(':smarty(' + 
                                        $.smarty.config.quizzes.selector + ')');
        
        var percentCorrect = parseFloat($question.attr('data-percent-correct')),
            points = {
                possible: parseFloat($question.attr('data-points')),
                earned: 0
            };
        
        // configure points earned
        points.earned += points.possible * percentCorrect;
        
        // save points earned to question
        $question.attr('data-points-earned',points.earned);
        
        // update the quiz's score
        $quiz.trigger($.Event('quiz:score',{
            update: true
        }));
        
        return points;
        
    };
    
    $.fn.runningScore = function(event){
        
        var $quiz = $(this),
            $questions = $quiz.find(':smarty(question)'),
            $score = $quiz.find(':smarty(score)');
        
        // capture point total (earned) and max (possible)
        var points = {
            total: [],
            max: []
        };
        
        $questions.each(function(i){
            
            // capture possible and earned points
            var possible = $(this).attr('data-points');
            var earned = $(this).attr('data-points-earned');
            
            // configure possible and earned points
            possible = $.isset(possible) ? parseFloat(possible) : 0;
            earned = $.isset(earned) ? parseFloat(earned) : 0;
            
            // save possible and earned points
            points.total.push(earned);
            points.max.push(possible);
            
        });
     
        // sum total and max points
        points.total = points.total.sum();
        points.max = points.max.sum();
  
        // set the score
        $score.attr('data-total',points.total);
        
        // display points
        $score.find('.total').html(points.total.toDecimals(2));
        $score.find('.max').html(points.max.toDecimals(2));
        
        return $quiz;
        
    };
    
    $.fn.questionTrack = function(callback){
        
        var $quiz = $(this),
            $questions = $quiz.find(':smarty(question)'),
            $tracker = $quiz.find(':smarty(tracker)'),
            $current;
        
        var mode = $quiz.attr('data-mode'),
            tracker;
        
        // configure mode
        mode = $.isset(mode) ? mode : $.smarty.config.quizzes.defaultMode;
        
        // for SLIDING mode
        if(mode == 'sliding'){
            
            // capture current question
            $current = $questions.filter('.curr');
            
        } 
        
        // for STREAMLINE mode
        else if(mode == 'streamline') {
            
            var $tops = [],
                $target;
            
            var tops = [], 
                buffer = 150;
            
            $questions.each(function(q){
                
                // save question
                $tops.push($(this));
                
                // save top position
                tops.push($(this).offset().top - buffer);
                
            });
  
            tops.forEach(function(_value,_index){
                
                // capture question
                var _$temp = $tops[_index];
                
                // calculate question positioning 
                _$temp.top = _value;
                _$temp.bottom = _$temp.top + _$temp.height();
                
                // capture window
                var _$window = $($.smarty.config.window);
                
                // calculate window poitioning
                _$window.top = _$window.scrollTop();
                _$window.bottom = _$window.top + _$window.innerHeight();
                
                // set a new target each time one of the following conditions are met
                if(_index === 0 ||
                   (_index == tops.length - 1 && _$window.top > _$temp.bottom) ||
                   (_$window.top > $target.bottom && _$window.top <= _$temp.bottom)){
                    
                    $target = _$temp;
                    $target.top = _$temp.top;
                    $target.bottom = _$temp.bottom;
                  
                }

            });
            
      
            
            // capture current question
            $current = $target;
            
        }
        
        // capture tracker data
        tracker = {
            current: $current.attr('data-question-num'),
            total: $questions.length,
            unanswered: $questions.filter('[data-answered="false"]').length,
            answered: $questions.filter('[data-answered="true"]').length
        };
        
        // set tracker data
        $tracker.attr({
            'data-questions-current': tracker.current,
            'data-questions-total': tracker.total,
            'data-questions-answered': tracker.answered,
            'data-questions-unanswered': tracker.unanswered
        });
        
        // set tracker display data
        $tracker.find('.current').html(tracker.current);
        $tracker.find('.total').html(tracker.total);

        // fire callback
        if($.isset(callback)) callback();
        
        return $quiz;
        
    };

    $.fn.statsPush = function(){
        
        var $stats = $(this),
            $tracker = $stats.closest(':smarty(tracker)'),
            $quiz = $tracker.closest(':smarty(' + 
                                     $.smarty.config.quizzes.selector + ')'),
            $timer = $quiz.find(':smarty(timer)'),
            $score = $quiz.find(':smarty(score)');
        
        // capture mode
        var mode = $quiz.attr('data-mode');
        
        // configure mode
        mode = $.isset(mode) ? mode : $.smarty.config.quizzes.defaultMode;
        
        // start taking measurements
        $stats.height = $stats.outerHeight();
        $score.height = $.exists($score) ? $score.outerHeight() : 0;
        $score.top = $.exists($score) ? parseInt($score.css('top')) : 0;
        $timer.height = $.exists($timer) ? $timer.outerHeight() : 0;
        $timer.top = $.exists($timer) ? parseInt($timer.css('top')) : 0;
        
        // start pushing
        if(mode == 'streamline' && $.exists($score)){
            
            $score.smartClass('transition');
            
            setTimeout(function(){
                
                // finish taking measurements
                $stats.height = $stats.outerHeight();
                
                // move the score position
                $score.css({
                    top: $stats.height + $score.top + 'px'
                });
                
                
                setTimeout(function(){
                    
                    $score.smartClass('transition');
                    
                },$.smarty.config.transitionSpeed * 1000);
                
            },$.smarty.config.transitionSpeed * 1000 + 200);
        }
        
        // finish pushing
        if($.exists($timer)){ 
            
            $timer.smartClass('transition');
            
            setTimeout(function(){
                
                // finish taking measurements
                $stats.height = $stats.outerHeight();
                
                $timer.css({
                    top: $stats.height + $timer.top + 'px'
                });
                
                setTimeout(function(){
                    
                    $timer.smartClass('transition');
                    
                },$.smarty.config.transitionSpeed * 1000);
                
            },$.smarty.config.transitionSpeed * 1000 + 200);
            
        }
        
        return $stats;
        
    };

    $.fn.statsPull = function(){ 
        
        var $stats = $(this),
            $tracker = $stats.closest(':smarty(tracker)'),
            $quiz = $tracker.closest(':smarty(' + 
                                     $.smarty.config.quizzes.selector + ')'),
            $timer = $quiz.find(':smarty(timer)'),
            $score = $quiz.find(':smarty(score)');
        
        // start pulling
        if($.exists($score)){
            
            $score.smartClass('transition').css('top','');
            
            setTimeout(function(){
                
                $score.smartClass('transition');
                
            },$.smarty.config.transitionSpeed * 1000);
            
        }
        
        // finish pulling
        if($.exists($timer)){
            
            $timer.smartClass('transition').css('top','');
            
            setTimeout(function(){
                
                $timer.smartClass('transition');
                
            },$.smarty.config.transitionSpeed * 1000);
            
        }
        
        return $stats;
        
    };

    $.fn.trackerStats = function(event){ 
       
        var $quiz = $(this),
            $tracker = $quiz.find(':smarty(tracker)'),
            $score = $quiz.find(':smarty(score)'),
            $timer = $quiz.find(':smarty(timer)'),
            $stats = $tracker.find('.stats'),
            $window = $($.smarty.config.window);
        
        var mode = $quiz.attr('data-mode'),
            stats = {
                current: parseInt($tracker.attr('data-questions-current')),
                total: parseInt($tracker.attr('data-questions-total')),
                answered: parseInt($tracker.attr('data-questions-answered')),
                unanswered: parseInt($tracker.attr('data-questions-unanswered'))
            };
        
        // configure mode
        mode = $.isset(mode) ? mode : $.smarty.config.quizzes.defaultMode;
        
        // configure window
        $window.width = $window.innerWidth();
        
        // initialize stats
        if(!$.exists($stats) && event.create){
                   
            // setup stats data
            $stats.current = $('<div>',{
                class: 'stat-current',
                html: 'Current: <span>' + stats.current + '</span>'
            });
            $stats.total = $('<div>',{
                class: 'stat-total',
                html: 'Total: <span>' + stats.total + '</span>'
            });
            $stats.answered = $('<div>',{
                class: 'stat-answered',
                html: 'Answered: <span>' + stats.answered + '</span>'
            });  
            $stats.unanswered = $('<div>',{
                class: 'stat-unanswered',
                html: 'Unanswered: <span>' + stats.unanswered + '</span>'
            });
            
            // setup stats
            $stats = $('<div>',{
                class: 'stats',
            })
                .append($stats.current,
                        $stats.total,
                        $stats.answered,
                        $stats.unanswered)
                .smartClass('hide')
                .on('tracker:open',function(){

                    // redefine stats
                    $stats = $(this);
                
                    // transition
                    $stats.smartClass('transition');
                
                    setTimeout(function(){
                        
                        $stats.smartClass('hide show');
                        
                        // triggers stats push
                        $stats.trigger('tracker:push');
                        
                        setTimeout(function(){
                        
                            $stats.smartClass('transition');

                        },$.smarty.config.transitionSpeed * 1000 + 200);
                        
                    },10);
                    
                })
                .on('tracker:close',function(){
                
                    // redefine stats
                    $stats = $(this);
                
                    $stats.smartClass('transition show hide');
            
                    setTimeout(function(){

                        // trigger stats pull
                        $stats.trigger('tracker:pull');

                        // remove 
                        $stats.remove();

                    },$.smarty.config.transitionSpeed * 1000);
                
                })
                .on('tracker:push',function(){
                
                    // redefine stats
                    $stats = $(this);
                
                    // PUSH floating elements DOWN
                    if($window.width > $.smarty.config.quizzes.respondAt)
                        $stats.statsPush();
                
                })
                .on('tracker:pull',function(){
                
                    // redefine stats
                    $stats = $(this);
                
                    // PULL floating elements UP
                    if($window.width > $.smarty.config.quizzes.respondAt)
                       $stats.statsPull();
                
                })
                .on('tracker:update',function(){
                
                    // redefine stats
                    $stats = $(this);
               
                    // capture new stats
                    stats = {
                        current: parseInt($tracker.attr('data-questions-current')),
                        total: parseInt($tracker.attr('data-questions-total')),
                        answered: parseInt($tracker.attr('data-questions-answered')),
                        unanswered: parseInt($tracker.attr('data-questions-unanswered'))
                    };
                
                    // update stats
                    $stats.current = $stats.find('.stat-current > span').html(
                        stats.current);
                    $stats.total = $stats.find('.stat-total > span').html(
                        stats.total);
                    $stats.answered = $stats.find('.stat-answered > span').html(
                        stats.answered);
                    $stats.unanswered = $stats.find('.stat-unanswered > span').html(
                        stats.unanswered);
                
                })
                .appendTo($tracker)
                .trigger('tracker:open');

        } 
        
        // update stats
        else if($.exists($stats) && event.update){
            
            // trigger stats update
            $stats.trigger('tracker:update');
            
        } 
        
        // delete stats
        else if($.exists($stats) && event.remove){
            
            // trigger stats close
            $stats.trigger('tracker:close');
            
        }
        
        return $quiz;
        
    };
    
    $.fn.attemptStats = function(event){
        
        var $question = $(this),
            $quiz = $question.closest(':smarty(' + 
                                     $.smarty.config.quizzes.selector + ')'),
            $attempts = $question.find(':smarty(attempts)'),
            $stats = $attempts.find('.stats');

        var stats = {
                allowed: $question.attr('data-attempts'),
                total: parseInt($question.attr('data-attempts-total')),
                incompletes: parseInt($question.attr('data-attempts-incomplete')),
                corrects: parseInt($question.attr('data-attempts-pass')),
                almosts: parseInt($question.attr('data-attempts-partial')),
                wrongs: parseInt($question.attr('data-attempts-fail'))
            },
            infinity = '&#8734;';
     
        // configure stats
        stats.allowed = $.isNumeric(stats.allowed) ? parseInt(stats.allowed) : infinity;
        stats.valids = stats.total - stats.incompletes;
        
        // initialize stats
        if(!$.exists($stats) && event.create){

            // setup stats data
            $stats.allowed = $('<div>',{
                class: 'stat-allowed',
                html: 'Allowed: <span>' + stats.allowed + '</span>'
            });
            $stats.total = $('<div>',{
                class: 'stat-total',
                html: 'Total: <span>' + stats.total + '</span>'
            });
            $stats.valids = $('<div>',{
                class: 'stat-valids',
                html: 'Valids: <span>' + stats.valids + '</span>'
            });
            $stats.incompletes = $('<div>',{
                class: 'stat-incompletes',
                html: 'Incompletes: <span>' + stats.incompletes + '</span>'
            });
            $stats.corrects = $('<div>',{
                class: 'stat-corrects',
                html: 'Corrects: <span>' + stats.corrects + '</span>'
            });
            $stats.almosts = $('<div>',{
                class: 'stat-almosts',
                html: 'Almosts: <span>' + stats.almosts + '</span>'
            });
            $stats.wrongs = $('<div>',{
                class: 'stat-wrongs',
                html: 'Wrongs: <span>' + stats.wrongs + '</span>'
            });
            
            // setup stats
            $stats = $('<div>',{
                class: 'stats',
            }).append($stats.allowed,
                      $stats.total,
                      $stats.valids,
                      $stats.incompletes,
                      $stats.corrects,
                      $stats.almosts,
                      $stats.wrongs)
              .smartClass('hide')
              .on('attempts:open',function(){
                
                // redefine stats
                $stats = $(this);
                
                // transition
                $stats.smartClass('transition');
                
                setTimeout(function(){
                    
                    $stats.smartClass('hide show');
                    
                    setTimeout(function(){
                    
                        $stats.smartClass('transition');

                    },$.smarty.config.transitionSpeed * 1000 + 200);
                    
                },10);
                
              })
              .on('attempts:update',function(){
                
                    // redefine stats
                    $stats = $(this);
                
                    // capture new stats
                    stats = {
                        allowed: $question.attr('data-attempts'),
                        total: parseInt($question.attr('data-attempts-total')),
                        incompletes: parseInt($question
                                              .attr('data-attempts-incomplete')),
                        corrects: parseInt($question.attr('data-attempts-pass')),
                        almosts: parseInt($question.attr('data-attempts-partial')),
                        wrongs: parseInt($question.attr('data-attempts-fail'))
                    };
                
                    // configure new stats
                    stats.allowed = $.isNumeric(stats.allowed) ? 
                                        parseInt(stats.allowed) : infinity;
                    stats.valids = stats.total - stats.incompletes;
                
                    // update stats data
                    $stats.allowed = $stats.find('.stat-allowed > span').html(
                        stats.allowed);
                    $stats.total = $stats.find('.stat-total > span').html(
                        stats.total);
                    $stats.valids = $stats.find('.stat-valids > span').html(
                        stats.valids);
                    $stats.incompletes = $stats.find('.stat-incompletes > span').html(
                        stats.incompletes);
                    $stats.corrects = $stats.find('.stat-corrects > span').html(
                        stats.corrects);
                    $stats.almosts = $stats.find('.stat-almosts > span').html(
                        stats.almosts);
                    $stats.wrongs = $stats.find('.stat-wrongs > span').html(
                        stats.wrongs);
                
              })
              .on('attempts:close',function(){
             
                    // redefine stats
                    $stats = $(this);
        
                    $stats.smartClass('transition show hide');
                    
                    setTimeout(function(){
                    
                        $stats.remove();

                    },$.smarty.config.transitionSpeed * 1000);
                
              })
              .appendTo($attempts)
              .trigger('attempts:open');
            
        } 
        
        // update stats
        else if($.exists($stats) && event.update){
            
            // trigger stats update
            $stats.trigger('attempts:update');
            
        } 
        
        // remove stats
        else if($.exists($stats) && event.remove){
            
            // trigger stats close
            $stats.trigger('attempts:close');
            
        }
        
        return $question;
        
    };
    
    $.fn.createReport = function(){
        
        var $quiz = $(this),
            $questions = $quiz.find(':smarty(question)'),
            $report = $quiz.find(':smarty(report)');

        if(!$.exists($report)){
            
            var $score = $quiz.find(':smarty(score)'),
                $timer = $quiz.find(':smarty(timer)');
            
            var points = {
                    total: parseFloat($score.attr('data-total')),
                    max: parseFloat($score.attr('data-max')),
                },
                attempts = {
                    total: [],
                    pass: [],
                    partial: [],
                    fail: [],
                    incomplete: []
                },
                time = {},
                name = $.smarty.config.quizzes.selector;
            
            // tally attempts
            $questions.each(function(i){
                
                var $question = $(this);
                
                attempts.total.push(
                    parseInt($question.attr('data-attempts-total')));
                attempts.incomplete.push(
                    parseInt($question.attr('data-attempts-incomplete')));
                attempts.pass.push(
                    parseInt($question.attr('data-attempts-pass')));
                attempts.partial.push(
                    parseInt($question.attr('data-attempts-partial')));
                attempts.fail.push(
                    parseInt($question.attr('data-attempts-fail')));
                
            });
          
            // sum tallies
            attempts.total = attempts.total.sum();
            attempts.pass = attempts.pass.sum();
            attempts.partial = attempts.partial.sum();
            attempts.fail = attempts.fail.sum();
            attempts.incomplete = attempts.incomplete.sum();
            
            // calculate average attempts
            attempts.average = (attempts.total-attempts.incomplete) / $questions.length;
            
            // calculate percentage points
            points.percent = Math.round((points.total / points.max) * 100);
            
            // correct percentage errors (0 / 0 = NaN)
            points.percent = isNaN(points.percent) ? 0 : points.percent;
            
            // create report items
            var _$title,
                _$score,
                _$attempts,
                _$timer = '',
                _$feedback = $(),
                _$viewBtn,
                _$report,
                _$results,
                _$popout,
                _$contents;

            // capture times if a timer is present
            if($.exists($timer)){ 
                
                // capture times
                time.start = $timer.attr('data-start');
                time.end = $timer.attr('data-end');
                time.time = $timer.attr('data-time');
                time.out = $quiz.attr('data-timeout');
                
                // configure times
                time.start = parseInt(time.start);
                time.end = $.isNumeric(time.end) ? parseInt(time.end) : false;
                time.time = parseInt(time.time);
                time.type = time.end === false ? 'timer' : 'countdown';
                time.out = $.isset(time.out) ? parseBool(time.out) : false;
                time.expr = time.type == 'countdown' ? time.start.toTime() : false;
                time.total = time.type == 'countdown' ? 
                                (time.start-time.time).toTime() :
                                time.time.toTime();
                time.rem = time.time.toTime();
                
                _$timer = $('<div>',{
                    class: 'timer',
                    html: (time.out ? 
                              'Timed out after ' +
                              '<span>' +
                                time.expr.h.pad(2) + ':' +
                                time.expr.m.pad(2) + ':' +
                                time.expr.s.pad(2) +
                              '</span>' :
                              'Completed in ' +
                              '<span>' +
                                time.total.h.pad(2) + ':' +
                                time.total.m.pad(2) + ':' +
                                time.total.s.pad(2) +
                              (time.type == 'countdown' ? 
                              '</span> with <span>' + 
                                time.rem.h.pad(2) + ':' +
                                time.rem.m.pad(2) + ':' +
                                time.rem.s.pad(2) +
                              '</span> remaining' : 
                              ''))
                }); 
                
            }
 
            // preliminary setup
            _$title = $('<div>',{
                class: 'h1 header',
                html: name.toTitleCase(true) + ' Complete'
            });
            _$score = $('<div>',{
                class: 'score',
                html: points.percent + '%'
            });
            _$score.title = $('<div>',{
                class: 'h2 score-title',
                html: 'You Scored:'
            });
            _$attempts = $('<div>',{
                class: 'attempts',
                html: 'averaging <span>'
                        + attempts.average.toDecimals(1)
                        + '</span> attempt(s) per question'
            });
            _$attempts.title = $('<div>',{
                class: 'attempts-title',
                html: ''
            });
     
            // loop through questions and capture question feedback
            $questions.each(function(q){
                
                var $question = $(this),
                    $answers = $question.find(':smarty(answer)'),
                    $corrects = $answers.filter('[data-answer]:not([data-answer="false"])'),
                    $selects = $answers.filter('[data-selected="true"]'),
                    $feedback = $question.find(':smarty(feedback)'),
                    $hint = $question.find(':smarty(hint) .hint'),
                    $check = $feedback.find('.check-response'),
                    $points = $feedback.find('.pts-response'),
                    $message = $feedback.find('.message').smartClass('show'),
                    $frames = $question.find('iframe');
                
                var _check = $.exists($check) ? 
                        $check.children('strong').first().attr('class') : false;
                
                // configure question
                $question.number = $question.find('.question-num');
                $question.text = $question.find('.question-txt');
                
                var _$number = $question.number.clone(true),
                    _$text = $question.text.clone(true),
                    _$question = $('<div>',{
                        class: 'q',
                    }).append(_$number,_$text),
                    _$answers = $(),
                    _$Q;
                
                // configure blanks
                _$text.find(':smarty(blank)').each(function(){
                    $(this).replaceWith('<span class="blank">' +
                                            '<span class="underline"></span>' +
                                        '</span>');
                });
                
                // format number
                if(_check !== false) _$number.smartClass(_check + '-bg','add');

                // loop through answers and capture answer feedback
                $answers.each(function(a){
                    
                    var $answer = $(this);
                    
                    var _$num, _$txt, _$ans,
                        isSelect, isAnswer, allCorrect;
                    
                    var _type = $question.attr('data-question-type');
                    
                    // for MULTIPLE CHOICE [multi-choice]
                    // and MULTIPLE ANSWER [multi-answer]
                    if(_type == $.smarty.config.quizzes.questionTypes.multiChoice || 
                       _type == $.smarty.config.quizzes.questionTypes.multiAnswer){
                        
                        // configure answer
                        $answer.number = $answer.find('.answer-num');
                        $answer.text = $answer.find('.answer-txt');
                        
                        _$num = $('<span>',{
                                class: 'answer-num',
                                html: $answer.number.html()
                            });
                        _$txt = $('<span>',{
                                class: 'answer-txt',
                                html: $answer.text.html()
                            });
                        _$ans = $('<div>',{
                                class: 'a',
                            }).append(_$num,_$txt);
                        
                        isSelect = $answer.is('[data-selected="true"]');
                        isAnswer = $answer.is('[data-answer="true"]');
                        allCorrect = $corrects[0] === $selects[0];
                        
                        // format answer option feedback
                        switch(true){
                            // answer IS selected 
                            // answer IS NOT correct
                            case isSelect && !isAnswer:
                                _$num.smartClass('fail-bg');
                                break;
                            // answer IS selected
                            // answer IS correct
                            // all correct answers ARE selected
                            case isSelect && isAnswer && allCorrect:
                                _$num.smartClass('pass-bg');
                                break;
                            // answer IS selected
                            // answer IS correct
                            // all correct answers ARE NOT selected
                            case isSelect && isAnswer && !allCorrect:
                                _$num.smartClass('partial-bg');
                                break;
                            // answer IS correct
                            case isAnswer:
                                _$num.smartClass('pass-bg');
                                break;
                        }

                        // save answer feedback
                        _$answers = _$answers.add(_$ans);
                        
                    } else
                    
                    // for SHORT ANSWER [short-answer]
                    if(_type == $.smarty.config.quizzes.questionTypes.shortAnswer){
                        
                        // configure answer
                        $answer.input = $answer.find('input');
                        
                        // capture short answer values
                        var _values = {
                            correct: $answer.attr('data-answer'),
                            user: $answer.input.val(),
                            alternates: $answer.attr('data-answer-alts')
                        },
                            _sensitive = $answer.attr('data-case-sensitive'),
                            _state = $answer.attr('data-answered-state');
                       
                        // configure values
                        if(!$.isset(_values.alternates)){
                            _values.alternates = false;
                        } else {
                            _values.alternates = _values.alternates.split(',');
                            
                            $.each(_values.alternates,function(_i,_v){
                                _values.alternates[_i] = $.trim(_v);
                            });
                        }
                        
                        // configure case sensitivity
                         _sensitive = $.isset(_sensitive) ? 
                                        parseBool(_sensitive) : false;  
                        
                        // configure alternates
                        if(_values.alternates !== false)
                            _values.alternates.unshift(_values.correct);
        
                        // setup short answer feedback
                        var _$input = $('<div>',{
                                class: 'answer-user',
                                html: _values.user
                            }),
                            _$case = $('<div>',{
                                class: 'answer-case',
                                html: '<div>Case Sensitive:</div>'
                                      + '<div>'
                                        + (_sensitive ? 'Yes' : 'No')
                                      + '</div>'
                            }),
                            _$corr = $('<div>',{
                                class: 'answer-corr',
                                html: '<div>Correct Answer:</div> ' 
                                      + '<div>' 
                                        + _values.correct
                                      + '</div>'
                            }),
                            _$alts = $('<div>',{
                                class: 'answer-alts',
                                html: '<div>Accepted Answer(s):</div>'
                                      + '<div>'
                                        + (_values.alternates === false ?
                                                _values.correct :
                                                _values.alternates.join(',')
                                                                  .replace(/\,/g,', '))
                                      + '</div>'
                            });
                        
                        _$ans = $('<div>',{
                                class: 'a'
                            }).append(_$input,_$case,_$alts);
                        
                        var isAnswered = $answer.is('[data-answered="true"]');
                        
                        // format answer value feedback
                        switch(true){
                            // question is ANSWERED 
                            // question state is PASS
                            case isAnswered && _state == 'pass':
                                _$input.smartClass('pass-bg');
                                break;
                            // question is ANSWERED
                            // question state is FAIL
                            case isAnswered && _state == 'fail':
                                _$input.smartClass('fail-bg');
                                break;
                            // question is UNANSWERED
                            // question state is INCOMPLETE
                            case !isAnswered && _state == 'incomplete':
                                _$input.smartClass('incomplete-bg').html('&nbsp;');
                                break;
                        }
                        
                        // save answer feedback
                        _$answers = _$answers.add(_$ans);

                    } else
                    
                    // for TRUE/FALSE [true-false]
                    if(_type == $.smarty.config.quizzes.questionTypes.trueFalse){
                        
                        // configure answer
                        $answer.text = $answer.find('label');
                        
                        var _$btn = $('<span>',{
                                class: 'answer-btn',
                                html: '<span>' 
                                        + $answer.text.html() 
                                    + '</span>'
                            });
                            
                        _$ans = $('<div>',{
                                class: 'a'
                            }).append(_$btn);
                        
                        isSelect = $answer.is('[data-selected="true"]');
                        isAnswer = $answer.is('[data-answer="true"]');
                        allCorrect = $corrects[0] === $selects[0];
                        
                        // format answer option feedback
                        switch(true){
                            // answer IS selected
                            // answer IS NOT correct
                            case isSelect && !isAnswer:
                                _$btn.smartClass('fail-bg');
                                break;
                            // answer IS selected
                            // answer IS correct
                            // all correct answers ARE selected
                            case isSelect && isAnswer && allCorrect:
                                _$btn.smartClass('pass-bg');
                                break;
                            // answer IS selected
                            // answer IS correct
                            // all correct answers ARE NOT selected
                            case isSelect && isAnswer && !allCorrect:
                                _$btn.smartClass('partial-bg');
                                break;
                            // answer IS correct
                            case isAnswer:
                                _$btn.smartClass('pass-bg');
                                break;
                        }
                        
                        // save answer feedback
                        _$answers = _$answers.add(_$ans);
                        
                    }
                    
                });
            
                // setup question feedback
                _$Q = $('<div>',{
                    class: 'question',
                    tabindex: 0
                }).append(_$question,_$answers);
                
                if($.exists($check)) _$Q.append($check);
                if($.exists($message)) _$Q.append($message);
                if($.exists($points)) _$Q.append($points);
                if($.exists($hint)) _$Q.append($hint.smartClass('show hide','remove'));
                
                // setup frame feedback
                if($.exists($frames)){

                    $frames.css({
                        width: '',
                        height: ''
                    }).each(function(){
                        
                        var _aspectRatio = parseFloat($(this).attr('data-aspect-ratio')),
                            _wrapper = $('<div>',{
                                class: 'frame-fluid'
                            }).css({
                                'padding-bottom': (_aspectRatio * 100) + '%'
                            });
                        
                        $(this).wrap(_wrapper);
                        
                    });
                }
                
                // save question feedback
                _$feedback = _$feedback.add(_$Q);
                 
            });
            
            // remaining setup
            _$viewBtn = $('<button>',{
                type: 'button',
                class: 'btn-view',
                text: 'View Feedback'
            }).on('click',function(){
                $quiz.trigger('quiz:feedback');
            });
            _$report = $('<div>',{
                class: 'report'
            }).append(_$title.clone(true),
                      _$score.title.clone(true),
                      _$score.clone(true),
                      _$attempts.title.clone(true),
                      _$attempts.clone(true),
                      _$timer.clone(true),
                      _$viewBtn);
            _$results = $('<div>',{
                class: 'results',
            }).append(_$title,
                      _$score.title,
                      _$score,
                      _$attempts.title,
                      _$attempts,
                      _$timer);
            _$popout = $('<div>',{
                class: 'feedback'
            }).smartClass('hide').append(_$results,_$feedback);
            _$contents = $('<div>',{
                id: $quiz.attr('id') + '-report'
            }).append(_$report,_$popout);
            
            $report = $('<' + $.smarty.config.selectorPrefix + 'report>')
                .append(_$contents).appendTo($quiz);

        }
  
        // reset accessibility
        $.smarty.accessibility.setup();
        
        return $quiz;
        
    };

    $.fn.smartRemove = function(target){
        var $toggle = $(this),
            $target = $.isset(target) ? $(target) : $toggle.parent();
        var loop = 1, max = 100;
        while($target.prop('tagName').toLowerCase()
              .indexOf($.smarty.config.selectorPrefix) !== 0 && loop <= max){
            $target = $target.parent();
            loop++;
        } 
        if($.exists($target)) $target.remove();
    };

    $.fn.smartTimer = function(){
        
        var $quiz = $(this),
            $timer = $quiz.find(':smarty(timer)'),
            $time = $timer.find('.time'),
            $text = $timer.find('.text');
        
        var timing = {
                start: parseInt($timer.attr('data-start')),
                end: $timer.attr('data-end'),
                time: parseInt($timer.attr('data-time'))
            },
            time = timing.start.toTime(),
            timer;
        
        // configure timing
        timing.end = $.isNumeric(timing.end) ? parseInt(timing.end) : false;
        timing.type = timing.end === false ? 'timer' : 'countdown';
        
        // set initial timeout
        $quiz.attr('data-timeout',false);
        
        // setup TIMER
        if(timing.type == 'timer'){
            
            // set initial time
            $time.html(
                '<span class="fa fa-clock-o"></span> ' +
                time.h.pad(2) + ':' + time.m.pad(2) + ':' + time.s.pad(2)
            );
        
            var ticker = timing.time;
            
            $text.html('Time Elapsed:');
            
            timer = setInterval(function(){
                
                ticker++;
                
                time = ticker.toTime();
                
                $time.html(
                    '<span class="fa fa-clock-o"></span> ' +
                    time.h.pad(2) + ':' + time.m.pad(2) + ':' + time.s.pad(2)
                );
                
                $timer.attr('data-time',ticker);
                
            },1000);
                
        } 
        
        // setup COUNTDOWN
        else if(timing.type == 'countdown'){
            
            // set initial time
            $time.html(
                '<span class="fa fa-hourglass-start"></span> ' +
                time.h.pad(2) + ':' + time.m.pad(2) + ':' + time.s.pad(2)
            );

            var countdown = timing.time;
            
            $text.html('Time Remaining:');
            
            if(countdown <= 10) $time.smartClass('warn','add');

            timer = setInterval(function(){
                
                countdown--;
                    
                time = countdown.toTime();

                $time.html(
                    (countdown <= timing.end ?
                        '<span class="fa fa-hourglass-end"></span> ' :
                        '<span class="fa fa-hourglass-half"></span> ') +
                    time.h.pad(2) + ':' + time.m.pad(2) + ':' + time.s.pad(2)
                );
                
                if(countdown <= 10) $time.smartClass('warn','add');

                $timer.attr('data-time',countdown);
                
                if(countdown <= timing.end) {
                    
                    clearInterval(timer);
                    
                    $quiz.trigger('quiz:timeout');
                    
                }
                
            },1000);
            
        }
        
        $quiz.on('quiz:done',function(){ 
            clearInterval(timer);
        });
        
    };
    
    $.fn.viewReport = function(){
        
        var $quiz = $(this),
            $report = $quiz.find(':smarty(report)'),
            $contents = $report.find('#' + $quiz.attr('id') + '-report'),
            $feedback = $contents.find('.feedback'),
            $document = $($quiz[0].ownerDocument),
            $stylesheets = $document.find('link[rel="stylesheet"]'),
            $styleblocks = $document.find('style'),
            $scriptsheets = $document.find('script');

        var $window = $.windowOpen({
            html: $feedback.clone(true).smartClass('hide show'),
            title: 'Feedback',
            stylesheets: function(){
                
                var hrefs = [];
                
                $stylesheets.each(function(){                       
                    hrefs.push($(this).prop('href'));
                });
                
                return hrefs;
                
            }(),
            styleblocks: function(){
                
                var blocks = [];
                
                $styleblocks.each(function(){
                    blocks.push(this.outerHTML);
                });
                
                return blocks;
                
            }(),
            scriptsheets: function(){
                
                var srcs = [];
                
                $scriptsheets.each(function(){
                    srcs.push($(this).attr('src'));
                });
                
                return srcs;
            }()
        });
        
        return $quiz;
        
    };
    
    $.fn.outerHTML = function(){
        return $(this)[0].outerHTML;
    };
    
    $.fn.indexEl = function(el){
        
        var nodes = $(this);
        var index = -1;
        
        for(var i = 0; i < nodes.length; i++){
           
            if($(nodes[i])[0] == el[0]) index = i;
            
        }
        
        return index;
        
    };

    $.fn.clueData = function(){
        
        var data = {
            clue: $.trim($(this).html()),
            answer: $.trim(
                $(this).attr('data-answer').replace(' ','')
            ).toUpperCase(),
            start: {
                x: parseInt($(this).attr('data-position').split(',')[0]),
                y: parseInt($(this).attr('data-position').split(',')[1])
            },
            direction: $(this).attr('data-direction')
        };
        data.end = {
            x: data.direction == 'down' ? data.start.x :
                data.answer.length + data.start.x - 1,
            y: data.direction == 'across' ? data.start.y :
                data.answer.length + data.start.y - 1
        }; 
          
        return data;
    };

    $.fn.inputData = function(){
        
        var $input = $(this);
        
        var data = {
            direction: $input[0].hasAttribute('data-across') ?
                        $input[0].hasAttribute('data-down') ? 
                        'intersection' : 'across' : 'down',
            ends: {},
            name: {},
            index: false
        };
        
        if(data.direction == 'across'){
            
            data.name.across = $input.attr('data-across');
            data.name.down = false;
            data.ends.first = parseBool($input.attr('data-across-first'));
            data.ends.last = parseBool($input.attr('data-across-last'));
            
        }  
        
        else if(data.direction == 'down'){
            
            data.name.across = false;
            data.name.down = $input.attr('data-down');
            data.ends.first = parseBool($input.attr('data-down-first'));
            data.ends.last = parseBool($input.attr('data-down-last'));
            
        }
        
        else if(data.direction == 'intersection'){
            
            data.name.across = $input.attr('data-across');
            data.name.down = $input.attr('data-down');
            data.ends.first = parseBool($input.attr('data-across-first')) &&
                    parseBool($input.attr('data-down-first')) ?
                    'both' : parseBool($input.attr('data-across-first')) ?
                    'across' : parseBool($input.attr('data-down-first')) ?     
                    'down' : false;
            data.ends.last =  parseBool($input.attr('data-across-last')) &&
                    parseBool($input.attr('data-down-last')) ?
                    'both' : parseBool($input.attr('data-across-last')) ?
                    'across' : parseBool($input.attr('data-down-last')) ?
                    'down' : false;
            
        }
        
        return data;
            
    };

    $.fn.checkoffClue = function(event){
        
        var $clue = $(this),
            $checkbox = $clue.find('input[type="checkbox"]');
        
        if(event.autoCheckoff){
            
            if(event.wordCompleted){
                
                if(!$checkbox.is(':checked')) $checkbox.prop('checked',true);
                
            } else {
                
                if($checkbox.is(':checked')) $checkbox.prop('checked',false);
                
            }
            
        } else {
            
            if($checkbox.is(':checked')){
                
                $checkbox.prop('checked',false);
                
            } else {
                
                $checkbox.prop('checked',true);
                
            }
            
        }
        
    };

    $.fn.checkoffWord = function(){
        
        var $letter = $(this),
            $cell = $letter.parent(),
            $crossword = $cell.closest(':smarty(' 
                                       + $.smarty.config.crosswords.selector + ')'),
            $clues = $crossword.find(':smarty(clue)'),
            $words = [];
        
        var crosswordID = $crossword.attr('id'),
            data = $letter.inputData(),
            words = [];
        
        if(data.direction == 'across'){
                
            // find the letters in the word
            $words.push($('input:attr(data-across,' + data.name.across + ')')); 
            
            // capture the word
            words.push($letter.attr('data-across-word'));
            
        }
        
        else if(data.direction == 'down'){
            
            // find the letters in the word
            $words.push($('input:attr(data-down,' + data.name.down + ')')); 
            
            // capture the word
            words.push($letter.attr('data-down-word'));
            
        }
        
        else if(data.direction == 'intersection'){
            
            // find the letters in the word
            $words.push($('input:attr(data-across,' + data.name.across + ')')); 
            $words.push($('input:attr(data-down,' + data.name.down + ')')); 
            
            // capture the word
            words.push($letter.attr('data-across-word'));
            words.push($letter.attr('data-down-word'));
            
        }
        
        $.each($words,function(index,$letters){
            
            var isComplete = $.vote($letters,function(letter){
                return $.isset($(letter).val());
            });
        
            $crossword.data = $.smarty.crossword.data[crosswordID];
            
            // lookup the clue in data
            var _word,
                _data;

            $.each($crossword.data,function(_i,_d){ 
                if(_d.answer == words[index]) _word = _d.answer;
            });

            // find the matching clue
            var $clue;

            $clues.each(function(i){

                var _data = $(this).clueData();

                if(_data.answer == _word) $clue = $(this);

            });
            
            if(isComplete){

                // checkoff clue
                $clue.trigger($.Event('clue:checkoff',{
                    autoCheckoff: true,
                    wordCompleted: true
                }));
                
            } else {

                // un-checkoff clue
                $clue.trigger($.Event('clue:checkoff',{
                    autoCheckoff: true,
                    wordCompleted: false
                }));
                
                
            }
            
        });
        
        return $letter;
        
    };

    $.fn.highlightClue = function(event){
        
        var $input = $(this),
            $crossword = $input.closest(':smarty.smarty'),
            $clues = $crossword.find(':smarty(clue)'),
            $clue;
        
        // capture data
        var data = $input.inputData(),
            number, clue;
                            
        if(data.direction == 'across'){
            
            // capture number
            number = parseInt($input.attr('data-across-number'));  
            
            // find clue(s)
            $clue = $clues.filter('[data-number="' + number + '"]');
            
        }
          
        else if(data.direction == 'down'){
            
            // capture number
            number = parseInt($input.attr('data-down-number')); 
            
            // find clue(s)
            $clue = $clues.filter('[data-number="' + number + '"]');
            
        }
        
        else if(data.direction == 'intersection'){
            
            number = [ 
                parseInt($input.attr('data-across-number')),
                parseInt($input.attr('data-down-number'))
            ];
                
            // find clue(s)
            $clue = $clues.filter('[data-number="' + number[0] + '"],' +
                                  '[data-number="' + number[1] + '"]');
            
        }
        
        // add highlighting
        $clue.each(function(i){
                
            if(event.type == 'focus') $(this).smartClass('highlight','add');
            if(event.type == 'blur') $(this).smartClass('highlight','remove');

        });

        return $input;
        
    };

    $.fn.popoutClue = function(remove){
        
        var $popclue,
            $input;

        if(remove === true){
            
            var $toggle = $(this);
            
            if($(this).is(':smarty(popclue)')){
                $popclue = $(this);
            } else {
                $popclue = $toggle.closest(':smarty(' 
                                  + $.smarty.config.crosswords.selector + ')')
                                  .find(':smarty(popclue)');
            }

            $popclue.smartClass('transition');
            
            setTimeout(function(){
                
                $popclue.smartClass('pop');
                
                setTimeout(function(){
                    
                    $popclue.remove();
                    
                },$.smarty.config.transitionSpeed * 100 + 200);
                
            },10);
            
        } 
        
        else {
            
            $input = $(this);
            
            var $crossword = $input.closest(':smarty.smarty'),
                $grid = $crossword.find('table.grid'),
                $inputs = $grid.find('input'),
                $clues,
                $title,
                $number,
                $clue,
                $window = $($.smarty.config.window),
                $document = $($.smarty.config.window.document),
                $frame;
            
            $popclue = $crossword.find(':smarty(popclue)');
        
            // configure window
            $window.top = $window.scrollTop();
            $window.left = $window.scrollLeft();
            $window.width = $window.innerWidth();
            $window.height = $window.innerHeight();
            
            // configure frame
            if($.smarty.config.frameEnabled)
                $frame = $document.find($.smarty.config.frameSelector + ' iframe')
                                  .contents();
            
            if($.isset($frame)){
                $frame.top = $frame.offset().top;
                $frame.left = $frame.offset().left;
            } else {
                $frame = {
                    top: 0,
                    left: 0
                };
            }
            
            // configure input
            $input.top = $input.offset().top + $frame.top - $window.top +
                         ($frame.top > 0 ? $window.top - $frame.top : 0);
            $input.left = $input.offset().left + $frame.left - $window.left +
                          ($frame.top > 0 ? $window.left - $frame.left : 0);
            $input.width = $input.outerWidth();
            $input.height = $input.outerHeight();
            
            var buffer = 10,
                boundary = {},
                number,
                position = {};

            // capture data
            $crossword.data = $.smarty.crossword.data[$crossword.attr('id')];
            $input.data = $input.inputData();        
            
            if($input.data.direction == 'across'){
                
                number = parseInt($input.attr('data-across-number'));
                
                $.each($crossword.data,function(_index,_data){
                    if(_data.number == number) clue = _data.clue;
                 }); 

                $number = $('<span>',{
                    class: 'pop-num',
                    html: '<span>' + number + '</span>'
                });

                $clue = $('<span>',{
                    class: 'pop-txt',
                    html: clue
                });

                $title = $('<div>',{
                    class: 'pop-ttl',
                    html: 'Across'
                });

            }

            else if($input.data.direction == 'down'){

                number = parseInt($input.attr('data-down-number'));
                
                $.each($crossword.data,function(_index,_data){
                    if(_data.number == number) clue = _data.clue;
                 });
                
                $number = $('<span>',{
                    class: 'pop-num',
                    html: '<span>' + number + '</span>'
                });

                $clue = $('<span>',{
                    class: 'pop-txt',
                    html: clue
                });

                $title = $('<div>',{
                    class: 'pop-ttl',
                    html: 'Down'
                });

            }

            else if($input.data.direction == 'intersection'){

                number = [
                    parseInt($input.attr('data-across-number')),
                    parseInt($input.attr('data-down-number')),
                ];
                
                clue = [];
                
                $.each($crossword.data,function(_index,_data){
                    if(_data.number == number[0]) clue[0] = _data.clue;
                    if(_data.number == number[1]) clue[1] = _data.clue;
                 });
                
                $number = [
                    $('<span>',{
                        class: 'pop-num',
                        html: '<span>' + number[0] + '</span>'
                    }),
                    $('<span>',{
                        class: 'pop-num',
                        html: '<span>' + number[1] + '</span>'
                    }),
                ];

                $clue = [
                    $('<span>',{
                        class: 'pop-txt',
                        html: clue[0]
                    }),
                    $('<span>',{
                        class: 'pop-txt',
                        html: clue[1]
                    }),
                ];

                $title = [
                    $('<div>',{
                        class: 'pop-ttl',
                        html: 'Across'
                    }),
                    $('<div>',{
                        class: 'pop-ttl',
                        html: 'Down'
                    })
                ];

            }

            if($.exists($popclue)){

                // clear popclue
                $popclue.find('div').remove();
                
                // update popclue
                $.repeat($number.length,function(i){

                    var $container = $('<div>').append($number[i-1])
                                               .append($clue[i-1]);

                    $popclue.append($title[i-1])
                            .append($container);

                });

            } else {

                // create popclue
                $popclue = $('<' + $.smarty.config.selectorPrefix + 'popclue>')
                    .appendTo($crossword);

                $.repeat($number.length,function(i){

                    var $container = $('<div>').append($number[i-1])
                                               .append($clue[i-1]);

                    $popclue.append($title[i-1])
                            .append($container);

                });

                // transition in
                $popclue.smartClass('transition');

                setTimeout(function(){

                    $popclue.smartClass('pop');

                    setTimeout(function(){

                        $popclue.smartClass('transition');

                    },$.smarty.config.transitionSpeed * 1000 + 200);

                },10);

            }
            
            // configure popclue
            $popclue.width = $popclue.outerWidth();
            $popclue.height = $popclue.outerHeight();
            
            // configure boundaries
            boundary.left = $(window).scrollLeft() + buffer;
            boundary.top = $window.top + buffer;
            boundary.right = $(window).width() - $popclue.width - buffer;
            boundary.bottom = $window.height - $popclue.height - buffer;

            // configure position
            if($input.left + $input.width <= boundary.right){ 
                position.left = $input.left + $input.width + 'px';
            } else if($input.left - $popclue.width >= boundary.left){ 
                position.left = $input.left - $popclue.width + 'px';
            } else { 
                position.left = boundary.left + 'px';
            }
            
            if($input.top + $input.height + buffer <= boundary.bottom){
                position.top = $input.top + $input.height + buffer + 'px';
            } else {
                position.top = $input.top - $popclue.height - buffer + 'px';
            }

            if($input.left + $input.width > boundary.right &&
               $input.left - $popclue.width < boundary.left){
                position.width = $input.left - boundary.left + 'px';
            } else {
                position.width = '';
            }
        
            // position popclue
            $popclue.css({
                left: position.left,
                top: position.top,
                width: position.width
            });
            
            // configure popclue to be removed automatically on scroll or resize
            $window.on('scroll resize',function(){
                
                $.debounce(function(){
                    $popclue.popoutClue(true);
                },100,true);
                
            });
            
            // remove popclue when an input is no longer in focus
            $input.on('blur',function(){ 

                setTimeout(function(){
                    
                    // capture the current focus element
                    var $focus = $(':focus');
   
                    var index = $inputs.indexEl($focus);

                    if(index == -1)
                        // remove the popcule
                        $popclue.popoutClue(true);
                    
                },10);

            });
            
        }

        return $input;
        
    };
    
    $.fn.nextInput = function(){
        
        var $letter = $(this),
            $cell = $letter.parent(),
            $grid = $cell.parent('table'),
            $cells = $grid.find('td'),
            $letters;
        
        var data = $letter.inputData();
    
        var coords = $cell.getCoords();

        // setup next methods
        var next = {
            
            across: function(){
                
                if($letter.is('[data-across-last="true"]')){
                    
                    // clear the last input direction
                    $.smarty.crossword.inputDirection = false;
                    
                } else {
                
                    // find the letters in the word
                    $letters = $('input:attr(data-across,' + data.name.across + ')'); 

                    // set the index of the current letter
                    index = $letters.indexEl($letter);

                    // make sure we're not on the last letter
                    if(data.ends.last === false || data.ends.last != 'across'){

                        // move to the next input
                        $letter.on('keyup',function(){

                            $letters.eq(index + 1).focus();

                            $letter.unbind('keyup');

                        });

                        // save the last input direction or clear it                
                        $.smarty.crossword.inputDirection = 'across';

                        return $letters.eq(index + 1); 

                    } else {

                        // clear the last input direction
                        $.smarty.crossword.inputDirection = false;

                        return $letter;

                    }
                    
                }
                
            },
            
            down: function(){
                
                if($letter.is('[data-down-last="true"]')){
                    
                    // clear the last input direction
                    $.smarty.crossword.inputDirection = false;
                    
                } else {
                
                    // find the letters in the word
                    $letters = $('input:attr(data-down,' + data.name.down + ')'); 

                    // set the index of the current letter
                    index = $letters.indexEl($letter);

                    // make sure we're not on the last letter
                    if(data.ends.last === false || data.ends.last != 'down'){

                        // move to the next input
                        $letter.on('keyup',function(){

                            $letters.eq(index + 1).focus();

                            $letter.unbind('keyup');

                        });

                        // save the last input direction
                        $.smarty.crossword.inputDirection = 'down';

                        return $letters.eq(index + 1);

                    } else {

                        // clear the last input direction
                        $.smarty.crossword.inputDirection = false;

                        return $letter;

                    }
                    
                }
                
            }
            
        };
                        
        if(data.direction == 'across'){

            // go to the next input
            next.across();
            
        } 
        
        else if(data.direction == 'down'){

            // go to the next input
            next.down();
            
        } 
        
        else if(data.direction == 'intersection'){ 

            // check the last input direction and act accordingly
            if($.smarty.crossword.inputDirection == 'across'){
                
                next.across();
                
            } else if($.smarty.crossword.inputDirection == 'down'){
                
                next.down();
                
            } else { 
                
                if(data.ends.first == 'across'){
                    
                    next.across();
                    
                } else if(data.ends.first == 'down'){
                    
                    next.down();
                    
                } else {
                    
                    // capture the input above and to the left
                    var $above = $cells.filter('[data-coords="' 
                                               + coords.x + ',' + (coords.y - 1)
                                               + '"]').find('input');
                    var $left = $cells.filter('[data-coords="' 
                                               + (coords.x - 1) + ',' + coords.y
                                               + '"]').find('input');
                    
                    if($.exists($above) && $.isset($above.val()) &&
                       (!$.exists($left) || !$.isset($left.val()))){
                        
                        next.down();
                        
                    } 
                    
                    else if($.exists($left) && $.isset($left.val()) &&
                           (!$.exists($above) || !$.isset($above.val()))){
                        
                        next.across();
                        
                    }
                    
                    else {
                    
                        next.across();
                        
                    }
                    
                }
                
            }
            
        }
        
        return $letter;
        
    };

    $.fn.previousInput = function(){
        
        var $letter = $(this),
            $cell = $letter.parent(),
            $grid = $cell.parent('table'),
            $cells = $grid.find('td'),
            $letters;
        
        var data = $letter.inputData();
    
        var coords = $cell.getCoords();

        // setup next methods
        var previous = {
            
            across: function(){
                
                if($letter.is('[data-across-first="true"]')){
                    
                    // clear the last clear direction
                    $.smarty.crossword.clearDirection = false;
                    
                } else {
                
                    // find the letters in the word
                    $letters = $('input:attr(data-across,' + data.name.across + ')'); 

                    // set the index of the current letter
                    index = $letters.indexEl($letter);

                    // make sure we're not on the first letter
                    if(data.ends.first === false || data.ends.first != 'across'){

                        // move to the previous input
                        $letter.on('keyup',function(){

                            $letters.eq(index - 1).focus().clearInput();

                            $letter.unbind('keyup');

                        });

                        // save the last clear direction or clear it                
                        $.smarty.crossword.clearDirection = 'across';

                        return $letters.eq(index - 1); 

                    } else {

                        // clear the last clear direction
                        $.smarty.crossword.clearDirection = false;

                        return $letter;

                    }
                    
                }
                
            },
            
            down: function(){
                
                if($letter.is('[data-down-first="true"]')){
                    
                    // clear the last clear direction
                    $.smarty.crossword.clearDirection = false;
                    
                } else {
                
                    // find the letters in the word
                    $letters = $('input:attr(data-down,' + data.name.down + ')'); 

                    // set the index of the current letter
                    index = $letters.indexEl($letter);

                    // make sure we're not on the first letter
                    if(data.ends.first === false || data.ends.first != 'down'){

                        // move to the next input
                        $letter.on('keyup',function(){

                            $letters.eq(index - 1).focus().clearInput();

                            $letter.unbind('keyup');

                        });

                        // save the last clear direction
                        $.smarty.crossword.clearDirection = 'down';

                        return $letters.eq(index - 1);

                    } else {

                        // clear the last clear direction
                        $.smarty.crossword.clearDirection = false;

                        return $letter;

                    }
                    
                }
                
            }
            
        };
                        
        if(data.direction == 'across'){

            // go to the next input
            previous.across();
            
        } 
        
        else if(data.direction == 'down'){

            // go to the next input
            previous.down();
            
        } 
        
        else if(data.direction == 'intersection'){ 

            // check the last clear direction and act accordingly
            if($.smarty.crossword.clearDirection == 'across'){
                
                previous.across();
                
            } else if($.smarty.crossword.clearDirection == 'down'){
                
                previous.down();
                
            } else { 
                
                if(data.ends.first == 'across'){
                    
                    previous.across();
                    
                } else if(data.ends.first == 'down'){
                    
                    previous.down();
                    
                } else {
                    
                    // capture the input above and to the left
                    var $above = $cells.filter('[data-coords="' 
                                               + coords.x + ',' + (coords.y - 1)
                                               + '"]').find('input');
                    var $left = $cells.filter('[data-coords="' 
                                               + (coords.x - 1) + ',' + coords.y
                                               + '"]').find('input');
                    
                    if($.exists($above) && $.isset($above.val()) &&
                       (!$.exists($left) || !$.isset($left.val()))){
                        
                        previous.down();
                        
                    } 
                    
                    else if($.exists($left) && $.isset($left.val()) &&
                           (!$.exists($above) || !$.isset($above.val()))){
                        
                        previous.across();
                        
                    }
                    
                    else {
                    
                        previous.across();
                        
                    }
                    
                }
                
            }
            
        }
        
        return $letter;
        
    };

    $.fn.shiftInput = function(event){
        
        var $input = $(this),
            $cell = $input.parent(),
            $grid = $input.closest('table.grid'),
            $cells = $grid.find('td');
        
        var coords = $cell.getCoords();
        
        var grid = {
            rows: {
                first: 1,
                last: parseInt($grid.attr('data-rows')),
            },
            cols: {
                first: 1,
                last: parseInt($grid.attr('data-cols'))
            }
        };
        
        var keys = {
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            code: event.keyCode
        };
        
        // setup shift methods
        var shift = {
            
            up: function(){
                
                // make sure cell isn't in the FIRST ROW
                if(coords.y != grid.rows.first){
                    
                    var $target = $cells.filter('[data-coords="' +
                                                    coords.x + ',' + (coords.y - 1) +
                                               '"]');
                    
                    // look for input and focus
                    if($.exists($target.find('input'))){
                        
                        $target.find('input').focus();
                        
                        return $target.find('input');
                        
                    }
                    
                }

            },
             
            down: function(){
                
                // make sure cell isn't in the LAST ROW
                if(coords.y != grid.rows.last){
                    
                    var $target = $cells.filter('[data-coords="' +
                                                    coords.x + ',' + (coords.y + 1) +
                                               '"]');
                    
                    // look for input and focus
                    if($.exists($target.find('input'))){
                        
                        $target.find('input').focus();
                        
                        return $target.find('input');
                        
                    }

                    
                }
                
            },
            
            left: function(){
                
                // make sure cell isn't in the FIRST COLUMN
                if(coords.x != grid.cols.first){
                    
                    var $target = $cells.filter('[data-coords="' +
                                                    (coords.x - 1) + ',' + coords.y +
                                               '"]');
                    
                    // look for input and focus
                    if($.exists($target.find('input'))){
                        
                        $target.find('input').focus();
                        
                        return $target.find('input');
                    
                    }
                    
                }
                
            },
            
            right: function(){
                
                 // make sure cell isn't in the LAST COLUMN
                if(coords.x != grid.cols.last){
                    
                    var $target = $cells.filter('[data-coords="' +
                                                    (coords.x + 1) + ',' + coords.y +
                                               '"]');
                    
                    // look for input and focus
                    if($.exists($target.find('input'))){
                        
                        $target.find('input').focus();
                        
                        return $target.find('input');
                        
                    }
                    
                }
                
            }
            
        };
        
        // UP
        if(keys.code == keys.up){
           
            shift.up();
            
        // DOWN
        } else if(keys.code == keys.down){
            
            shift.down();
            
        // LEFT
        } else if(keys.code == keys.left){
            
            shift.left();
            
        // RIGHT
        } else if(keys.code == keys.right){
            
            shift.right();
            
        }
        
        return $input;
        
    };

    $.fn.shiftTab = function(event){
       
        var $letter = $(this);

        var tabindex = parseInt($letter.attr('tabindex'));
        
        if(tabindex == -1){
            
            // prevent default event
            event.preventDefault();
            
            var $cell = $letter.parent(),
                $grid = $cell.closest('table.grid'),
                $cells = $grid.find('td'),
                $tabbables = $cells.find('input[tabindex="0"]'),
                $letters, 
                $first,
                $focus;
            
            var keys = {
                code: event.keyCode,
                shift: event.shiftKey,
                tab: 9
            };
            
            var data = $letter.inputData(),
                coords = $cell.getCoords(),
                index;
            
            // setup a lettering method
            var getLetters = function(dir){
                return $('input:attr(data-' + dir + ',' + data.name[dir] + ')');
            };
            
            // ACROSS
            if(data.direction == 'across'){

                // find the letters in the word
                $letters = getLetters('across');

            }

            // DOWN
            else if(data.direction == 'down'){

                // find the letters in the word
                $letters = getLetters('down');    

            }
            
            // INTERSECTION
            else if(data.direction == 'intersection'){
                
                // check the last input direction and act accordingly
                if($.smarty.crossword.inputDirection == 'across'){

                    $letters = getLetters('across');

                } else if($.smarty.crossword.inputDirection == 'down'){

                    $letters = getLetters('down');

                } else { 

                    if(data.ends.last == 'across' || data.ends.first == 'across'){

                        $letters = getLetters('across');

                    } else if(data.ends.last == 'down' || data.ends.first == 'down'){

                        $letters = getLetters('down');

                    } else {

                        // capture the input above and to the left
                        var $above = $cells.filter('[data-coords="' 
                                                   + coords.x + ',' + (coords.y - 1)
                                                   + '"]').find('input');
                        var $left = $cells.filter('[data-coords="' 
                                                   + (coords.x - 1) + ',' + coords.y
                                                   + '"]').find('input');

                        if($.exists($above) && $.isset($above.val()) &&
                           (!$.exists($left) || !$.isset($left.val()))){

                            $letters = getLetters('down');

                        } 

                        else if($.exists($left) && $.isset($left.val()) &&
                               (!$.exists($above) || !$.isset($above.val()))){

                            $letters = getLetters('across');

                        }

                        else {

                            $letters = getLetters('across');

                        }

                    }

                }
                
            }
       
            // find the first letter in the word
            $first = $letters.filter('[tabindex="0"]').first();
            
            // determine the letter's index out of all tabbables
            index = $tabbables.indexEl($first);
            
            // TAB
            if(keys.code == keys.tab && !keys.shift){
                
                // make sure the first letter isn't the LAST tabbable
                if(index !== $tabbables.length - 1){

                    // move to the NEXT tabbable
                    $focus = $tabbables.eq(index + 1).focus();
                    
                }
                
                else {
                    
                    // move to the FIRST LETTER
                    $focus = $first.focus();
                    
                }
                
            }
            
            // SHIFT+TAB
            if(keys.code == keys.tab && keys.shift){
                
                // make sure the first letter isn't the FIRST tabbable
                if(index !== 0){
                    
                    // move to the PREVIOUS tabbable
                    $focus = $tabbables.eq(index - 1).focus();
                    
                } else {
                    
                    // move to the FIRST LETTER
                    $focus = $first.focus();
                    
                }
                
            }
            
        }
    
        return $letter;
        
    };

    $.fn.replaceInput = function(event){
        return $(this).val(String.fromCharCode(event.keyCode).toUpperCase());
    };

    $.fn.clearInput = function(){
        return $(this).val(''); 
    };

    $.fn.compatibilityCrossword = function(callback){
        
        var $crossword = $(this),
            $grid = $crossword.find('.grid'),
            $buttons = $crossword.find('button'),
            $clues = $crossword.find(':smarty(down), :smarty(across)'),
            $incompatible = $crossword.find('.notif-incompatible'),
            $window = $($.smarty.config.window);
        
        var buffer = 20;
        
        // configue window
        $window.width = $window.innerWidth();
        $window.height = $window.innerHeight();
     
        // check for incompatibility
        if($window.width - buffer > $.smarty.config.crosswords.respondAt){
            
            // toggle incompatibility
            $crossword.attr('data-incompatible',false);
            
            // remove incompatible notification
            if($.exists($incompatible)) $incompatible.remove();
            
            // show hidden elements
            $grid.smartClass('incompatible','remove');
            $buttons.each(function(){
                $(this).smartClass('incompatible','remove');
            });
            $clues.each(function(){
                $(this).smartClass('incompatible','remove');
            });           
            
        } else {
            
            // toggle incompatibility
            $crossword.attr('data-incompatible',true);
            
            // create incompatible notification
            if(!$.exists($incompatible)){
                
                $incompatible = $('<div>',{
                    class: 'notif-incompatible',
                    html: 'Yikes, the crossword puzzle won\'t fit! '
                        + 'Please enlarge your browser window, '
                        + 'or use a device with a larger screen.'
                }).appendTo($crossword);
                
            }
            
            // hide visible elements
            $grid.smartClass('incompatible','add');
            $buttons.each(function(){
                $(this).smartClass('incompatible','add');
            });
            $clues.each(function(){
                $(this).smartClass('incompatible','add');
            });  
            
        }
        
        if($.isset(callback)) callback();
        
        return $crossword;
        
    };

    $.fn.checkCrossword = function(){
        
        var $input = $(this),
            $cell = $input.parent(),
            $grid = $cell.closest('table.grid'),
            $crossword = $grid.closest(':smarty('
                                       + $.smarty.config.crosswords.selector + ')'),
            $cells = $grid.find('td'),
            $inputs = $cells.find('input'),
            $letters;
        
        var mode = $.isset($crossword.attr('data-check')) ? 
                        $crossword.attr('data-check') : 'puzzle';
      
        if(mode == 'letters'){
            
            if($.isset($input.val()))
                $crossword.trigger($.Event('crossword:validate',{
                    validateMode: mode,
                    targetInputs: $input
                }));
            
        } 
        
        else if(mode == 'words'){
            
            var data = $input.inputData(),
                words = [];
           
            var $words = [];
            
            if(data.direction == 'across'){
                
                $letters = [
                    $('input:attr(data-across,' + data.name.across + ')')
                ];
                
                // find the letters in the word
                $words.push($($letters[0])); 
                
                // capture the word
                words.push($($letters[0]).attr('data-across-word'));
         
            }
            
            else if(data.direction == 'down'){
                
                $letters = [
                    $('input:attr(data-down,' + data.name.down + ')')
                ];
                
                // find the letters in the word
                $words.push($($letters)[0]); 
                
                // capture the word
                words.push($($letters[0]).attr('data-down-word'));
                
            }
            
            else if(data.direction == 'intersection'){
                
                $letters = [
                    $('input:attr(data-across,' + data.name.across + ')'),
                    $('input:attr(data-down,' + data.name.down + ')')
                ];
                
                // find the letters in the word
                $words.push($($letters[0])); 
                $words.push($($letters[1])); 
                
                // capture the word
                words.push($($letters[0]).attr('data-across-word'));
                words.push($($letters[0]).attr('data-down-word'));
                
            }
            
            $.each($words,function(index,$word){
              
                var isComplete = $.vote($word,function(letter){
                    return $.isset($(letter).val());
                });

                // complete words
                if(isComplete){
                    
                    $crossword.trigger($.Event('crossword:validate',{
                        validateMode: mode,
                        completedWord: true,
                        targetInputs: $word
                    }));
                    
                }
                
                // incomplete words
                else {
                    
                    $crossword.trigger($.Event('crossword:validate',{
                        validateMode: mode,
                        completedWord: false,
                        targetInputs: $word
                    }));
                    
                }
                
            });
            
        }
        
        else if(mode == 'puzzle'){
            
            var isComplete = $.vote($inputs,function(input){
                return $.isset($(input).val());
            });
         
            if(isComplete){
                
                $crossword.trigger($.Event('crossword:validate',{
                    validateMode: mode
                }));
                
            }
            
        }
        
        return $crossword;
        
    };

    $.fn.resetCrossword = function(){
        
        var $crossword = $(this),
            $grid = $crossword.find('table.grid'),
            $inputs = $grid.find('input'),
            $dialog = $crossword.find(':smarty(modal)'),
            $checkBtn = $crossword.find('.btn-check'),
            $resetBtn = $crossword.find('.btn-reset');
        
        
        if(!$.exists($dialog)){
            
            $dialog = $crossword.dialogBox({
                
                attachTo: $resetBtn,
                attachmentMethod: 'after',
                headerText: 'Confirm Reset',
                bodyText: '<p>Are you sure you want to reset this crossword puzzle?</p>'
                
            }).on('dialog:open dialog:close',function(){
                
                // reset accessibility
                $.smarty.accessibility.setup();
                
            }).on('dialog:confirm',function(){
                
                $inputs.each(function(i){
                    
                    if($.isset($(this).val())) $(this).clearInput();
                    
                    // trigger value change event
                    $(this).trigger('change:value');
                    
                });
                
                // remove check answer button
                if($.exists($checkBtn)) $checkBtn.remove();
                
            });
            
        }
        
    };

    $.fn.revealCrossword = function(){
        
        var $crossword = $(this),
            $grid = $crossword.find('table.grid'),
            $inputs = $grid.find('input'),
            $dialog = $crossword.find(':smarty(modal)'),
            $revealBtn = $crossword.find('.btn-reveal');
        
        
        if(!$.exists($dialog)){
            
            $dialog = $crossword.dialogBox({
                
                attachTo: $revealBtn,
                attachmentMethod: 'after',
                headerText: 'Confirm Reveal',
                bodyText: '<p>Are you sure you want to reveal this crossword puzzle?</p>'
                
            }).on('dialog:open dialog:close',function(){
                
                // reset accessibility
                $.smarty.accessibility.setup();
                
            }).on('dialog:confirm',function(){
                
                $inputs.each(function(i){
                    
                    // reveal answer
                    $(this).val($(this).attr('data-char'));
                    
                    // trigger value change event
                    $(this).trigger('change:value');
                    
                });
                
            });
            
        }
        
    };

    $.fn.validateCrossword = function(event,callback){
        
        var $crossword = $(this),
            $grid = $crossword.find('table.grid'),
            $cells = $grid.find('td'),
            $inputs = $cells.find('input'),
            $buttons = $crossword.children('button'),
            $targets,
            $doneBtn = $buttons.filter('.btn-done');
        
        var count, _count;
   
        if(event.validateMode == 'puzzle'){
        
            var $checkBtn = $crossword.find('.btn-check');
            
            if(!$.exists($checkBtn)){

                // create check button
                $checkBtn = $('<button>',{
                    class: 'btn-check',
                    html: '<span class="fa fa-check"></span>'
                        + 'Check Answers',
                }).insertAfter($buttons.last());

                $checkBtn.on('click',function(){
                    
                    count = $inputs.validateInputs();
                    
                    // passes validation
                    if(count.invalid === 0){
                        
                        if(!$.exists($doneBtn)){
                        
                            // create done button
                            $doneBtn = $('<button>',{
                                class: 'btn-done',
                                text: 'Done'
                            }).on('button:created',function(){
                                
                                // fire callback
                                if($.isset(callback)) callback();
                                
                            }).on('click',function(){
                                
                                $crossword.trigger('crossword:complete');
                                
                                // remove itself
                                $doneBtn.remove();
                                
                            }).insertAfter($checkBtn).trigger('button:created');

                            // remove check button
                            if($.exists($checkBtn)) $checkBtn.remove();
                         
                        }
                        
                    }

                });

            }
            
        } 
        
        else if(event.validateMode == 'letters'){
            
            $targets = event.targetInputs;
            
            count = $targets.validateInputs();
            
            // passes validation
            if(count.invalid === 0){
                
                _count = $inputs.statusInputs();
                
                if(_count.unanswered === 0){
                        
                    if(!$.exists($doneBtn)){

                        // create done button
                        $doneBtn = $('<button>',{
                            class: 'btn-done',
                            text: 'Done'
                        }).on('button:created',function(){
                            
                            // fire callback
                            if($.isset(callback)) callback();
                            
                        }).on('click',function(){
                            
                            $crossword.trigger('crossword:complete');
                            
                            // remove itself
                            $doneBtn.remove();
                            
                        }).insertAfter($buttons.last()).trigger('button:created');

                    }
                    
                }
                
            }
            
        }
        
        else if(event.validateMode == 'words'){
            
            // complete words
            if(event.completedWord){
                
                $targets = event.targetInputs;
                
                count = $targets.validateInputs();
              
                // passes validation
                if(count.invalid === 0){
                
                    _count = $inputs.statusInputs();
                    
                    // toggle done button when all are words completed
                    if(_count.unanswered === 0){
                        
                        if(!$.exists($doneBtn)){
                        
                            // create done button
                            $doneBtn = $('<button>',{
                                class: 'btn-done',
                                text: 'Done'
                            }).on('button:created',function(){
                                
                                // fire callback
                                if($.isset(callback)) callback();
                                
                            }).on('click',function(){
                                
                                $crossword.trigger('crossword:complete');
                                
                                // remove itself
                                $doneBtn.remove();
                                
                            }).insertAfter($buttons.last());
                         
                        }
                        
                    }
                    
                }
                
            } 
            
        }
        
        return $crossword;
        
    };

    $.fn.validateInputs = function(){
        
        var $inputs = $(this);
        
        var count = {
            valid: 0,
            invalid: 0
        };

        $inputs.each(function(i){

            var value = $(this).val().toUpperCase();
            var answer = $(this).attr('data-char');

            if(value == answer){

                count.valid++;
                $(this).attr('data-valid',true);

            } else {

                count.invalid++;
                $(this).attr('data-valid',false);

            }

        });
        
        return count;
        
    };

    $.fn.statusInputs = function(){
        
        var $inputs = $(this);
        
        var count = {
            answered: 0,
            unanswered: 0
        };
        
        $inputs.each(function(i){
            
            var value = $(this).val();
            
            if($.isset(value)){
                
                count.answered++;
                
            } else {
                
                count.unanswered++;
                
            }
            
        });
        
        return count;
        
    };

    $.fn.completeCrossword = function(){
        
        var $crossword = $(this),
            $inputs = $crossword.find('table.grid td input'),
            $doneBtn = $crossword.find('.btn-done'),
            $dialog = $crossword.dialogBox({
                
                attachTo: $doneBtn,
                attachmentMethod: 'after',
                headerText: 'Crossword Complete',
                bodyText: '<p>'
                            + 'Great job! '
                            + 'Click '
                            + '<strong>Continue</strong>'
                            + ' to reset the crossword puzzle now.'
                        + '</p>'
                
            }).on('dialog:open dialog:close',function(){
                
                // reset accessibility
                $.smarty.accessibility.setup();
                
            }).on('dialog:confirm',function(){
                
                $inputs.each(function(i){
                    
                    // clear the input values
                    $(this).clearInput()
                    
                    // trigger the value change event
                           .trigger('change:value')
                    
                    // remove data-valid attributes
                           .removeAttr('data-valid');
                    
                });
                
            });
        
    }; 

    $.fn.getCoords = function(){
        return {
            x: parseInt($.toArray($(this).attr('data-coords'),',')[0]),
            y: parseInt($.toArray($(this).attr('data-coords'),',')[1])
        };
    };

    $.fn.getSize = function(){
        return {
            rows: parseInt($(this).attr('data-rows')),
            cols: parseInt($(this).attr('data-cols'))
        };
    };

    $.fn.toggleInfo = function(){
        
        var $card = $(this),
            $flashcard = $card.closest(':smarty(' 
                                       + $.smarty.config.flashcards.selector + ')'),
            $pane = $flashcard.find(':smarty(pane)'),
            $info = $pane.find(':smarty(info).show'),
            $infoBtn = $pane.find('.btn-info');
        
        var info = parseBool($card.attr('data-info')),
            side = $card.attr('data-flip'),
            cardID = $card.attr('id');
        
        // setup methods
        var show = function(){ 
            var els = $.makeArray(arguments); 
            $.each(els,function(index,$el){
                $el.smartClass('hide','remove').smartClass('show','add');
            });
        };
        
        var hide = function(){
            var els = $.makeArray(arguments);
            $.each(els,function(index,$el){
                $el.smartClass('show','remove').smartClass('hide','add');
            });
        };

        $infoBtn.create = function(callback){
            if(!$.exists($infoBtn)){
                 $infoBtn = $('<button>',{
                    type: 'button',
                    title: 'Learn More',
                    class: 'btn-info',
                    'data-open': false,
                    html: '<span class="fa fa-question fa-2x"></span>'
                }).appendTo($pane);
                
                hide($infoBtn);

                setTimeout(function(){
                    callback();
                },10); 
                
                $infoBtn.trigger('info:created');
                return $infoBtn;
            }
        };

        $infoBtn.show = function(callback){
            if(!$.exists($infoBtn)){
                $infoBtn.create(function(){
                    show($infoBtn);
                });
            } else {
                show($infoBtn);
            }
            if($.isset(callback)) callback();
            return $infoBtn;
        };

        $infoBtn.hide = function(callback){
            if($.exists($infoBtn)){
                hide($infoBtn);
                    setTimeout(function(){
                        $infoBtn.remove();
                    },$.smarty.config.transitionSpeed * 1000 + 200);
            }
            if($.isset(callback)) callback();
            return $infoBtn;
        };
   
        if(info){
           
            $info = $pane.find('[data-for="' + cardID + '"]');
  
            if(side == 'back'){
               
                $infoBtn.show().on('click',function(){ 
                    if($infoBtn.is('[data-open="true"]')){ 
                        hide($info,$pane);
                        $infoBtn.attr('data-open',false);
                    } else { 
                        show($info,$pane);
                        $infoBtn.attr('data-open',true);
                    }
                    
                    // trigger card change
                    $card.trigger('card:change');
                    
                });
                
            } else if(side == 'front'){
                
                $infoBtn.hide(function(){
                    hide($info,$pane);
                });
                
            }
            
        } else {
            
            if($.exists($infoBtn)){
                
                $infoBtn.hide(function(){
                    hide($info,$pane);
                });
                
            }
            
        }
        
        return $card;
        
    };

    $.fn.toggleNext = function(){ 
        
        var $card = $(this),
            $stack = $card.parent(),
            $cards = $stack.find(':smarty(card)'),
            $first = $cards.first(),
            $last = $cards.last(),
            $nextBtn = $stack.find('.btn-next');
    
        // CURRENT card = LAST card
        if($card[0] === $last[0]){
            
            $nextBtn.disableBtn();
            
        } else { 
            
            $nextBtn.enableBtn();
            
        }
        
        return $card;
        
    };

    $.fn.togglePrev = function(){ 
                                      
        var $card = $(this),
            $stack = $card.parent(),
            $cards = $stack.find(':smarty(card)'),
            $first = $cards.first(),
            $last = $cards.last(),
            $prevBtn = $stack.find('.btn-prev');
   
        // CURRENT card = FIRST card
        if($card[0] === $first[0]){
            
            $prevBtn.disableBtn();
            
        } else {
            
            $prevBtn.enableBtn();
            
        }
        
        return $card;
        
    };

    $.fn.toggleFirst = function(){ 
        
        var $card = $(this),
            $stack = $card.parent(),
            $cards = $stack.find(':smarty(card)'),
            $first = $cards.first(),
            $firstBtn = $stack.find('.btn-first');
    
        // CURRENT card = FIRST card
        if($card[0] === $first[0]){
            
            $firstBtn.disableBtn();
            
        } else { 
            
            $firstBtn.enableBtn();
            
        }
        
        return $card;
        
    };

    $.fn.toggleLast = function(){ 
        
        var $card = $(this),
            $stack = $card.parent(),
            $cards = $stack.find(':smarty(card)'),
            $last = $cards.last(),
            $lastBtn = $stack.find('.btn-last');
    
        // CURRENT card = LAST card
        if($card[0] === $last[0]){
            
            $lastBtn.disableBtn();
            
        } else { 
            
            $lastBtn.enableBtn();
            
        }
        
        return $card;
        
    };

    $.fn.swapSides = function(){
        
        var $flashcard = $(this),
            $flipper = $flashcard.find(':smarty(flipper) .side');
    
        var side = ['front','back'];
            
        if($flashcard.is('[data-side="' + side[0] + '"]')){

            $flashcard.attr('data-side',side[1]);
            
            $flipper.html(side[1].concat('s'));

        } else {

            $flashcard.attr('data-side',side[0]);
            
            $flipper.html(side[0].concat('s'));

        }
        
        return $flashcard;
        
    };

    $.fn.rsSkip = function(){
        
        var $card = $(this),
            $front = $card.find(':smarty(front)'),
            $back = $card.find(':smarty(back)');
        
        var side = $card.attr('data-flip'),
            skip = $.smarty.config.readSpeaker.skipClass;
        
        if($.smarty.config.readSpeaker.enabled){
            
            if($card.is('.curr')){
            
                if($card.is('.' + skip)) $card.smartClass(skip,'remove');

                if(side == 'front'){
                    if($front.is('.' + skip)) $front.smartClass(skip,'remove');
                    if(!$back.is('.' + skip)) $back.smartClass(skip,'add');
                }

                else if(side == 'back'){
                    if($back.is('.' + skip)) $back.smartClass(skip,'remove');
                    if(!$front.is('.' + skip)) $front.smartClass(skip,'add');
                }
                
            }
            
            else {
                
                $card.smartClass(skip,'add');
                
            }
            
        }
        
        return $card;
        
    };

    $.fn.rsToggle = function(){
        
        var $flashcard = $(this),
            $cards = $flashcard.find(':smarty(card)');
        
        if($.smarty.config.readSpeaker.enabled){
            
            $cards.each(function(){
                $(this).rsSkip();
            });
            
        }
        
        return $flashcard;
        
    };

    $.fn.flipCard = function(callback){
        
        var $card = $(this);
        
        var side = ['front','back'];
            
        if($card.is('[data-flip="' + side[0] + '"]')){

            $card.attr('data-flip',side[1]);

        } else {

            $card.attr('data-flip',side[0]);

        }
        
        if($.isset(callback)) callback();
        
        return $card;
        
    };

    $.fn.nextCard = function(locked,callback){
        
        var $current = $(this),
            $stack = $current.parent(),
            $flashcard = $stack.closest(':smarty(' 
                                        + $.smarty.config.flashcards.selector + ')'),
            $cards = $stack.find(':smarty(card)'),
            $first = $cards.first(),
            $last = $cards.last(),
            $next = $current.siblings('.next'),
            $prev = $current.siblings('.prev'),
            $then,
            $nextBtn = $stack.find('.btn-next');
        
        var flipback = $.isset($flashcard.attr('data-flipback')) ?
                            parseBool($flashcard.attr('data-flipback')) : true,
            side = $.isset($flashcard.attr('data-side')) ? 
                        $flashcard.attr('data-side') : 'front';
        
        if(!$nextBtn.is('.disable') && $.exists($next) && (locked || !$.smarty.flashcard.cardLock)){
            
            // switch ON the card lock
            if(!locked) $.smarty.flashcard.cardLock = true;
            
            // update the tracker
            $next.trackCard();
            
            // clear previous
            if($.exists($prev)) $prev.smartClass('prev');
            
            if($next[0] !== $last[0]){
                
                // setup next of next
                $then = $next.next().smartClass('next');
                
                $next.trigger('card:between');
                
            } else {
                
                $next.trigger('card:end');
                
            }

            // move to next card
            $current.smartClass('transition');
            $next.smartClass('transition');

            setTimeout(function(){

                $current.smartClass('move next');

                setTimeout(function(){

                    $next.smartClass('move');

                    setTimeout(function(){

                        $next.smartClass('move next transition curr');
                        $current.smartClass('move curr next transition prev');
                        
                        setTimeout(function(){
                            
                            // flip the current card back to its right side
                            if(flipback){
                                
                                if($current.attr('data-flip') !== side) 
                                    $current.attr('data-flip',side);
                                
                            }
                            
                            // switch OFF the card lock
                            if(!locked) $.smarty.flashcard.cardLock = false;
                            if(!locked && $.isset(callback)) callback();
                            
                        },10);

                    },$.smarty.config.transitionSpeed * 1000 + 200);

                },$.smarty.config.transitionSpeed * 1000 + 200);

            },10);

            return $next;
            
        }
        
        if($.isset(callback)) callback();
        
        return $current;
        
    };

    $.fn.prevCard = function(locked,callback){
        
        var $current = $(this),
            $stack = $current.parent(),
            $flashcard = $stack.closest(':smarty(' 
                                        + $.smarty.config.flashcards.selector + ')'),
            $cards = $stack.find(':smarty(card)'),
            $first = $cards.first(),
            $last = $cards.last(),
            $prev = $current.siblings('.prev'),
            $next = $current.siblings('.next'),
            $then,
            $prevBtn = $stack.find('.btn-prev');
        
        var flipback = $.isset($flashcard.attr('data-flipback')) ?
                            parseBool($flashcard.attr('data-flipback')) : true,
            side = $.isset($flashcard.attr('data-side')) ? 
                        $flashcard.attr('data-side') : 'front';

        if(!$prevBtn.is('.disable') && $.exists($prev) && (!$.smarty.flashcard.cardLock || locked)){
 
            // switch ON the card lock
            if(!locked) $.smarty.flashcard.cardLock = true;
            
            // update the tracker
            $prev.trackCard();
            
            // clear next
            if($.exists($next)) $next.smartClass('next');

            if($prev[0] !== $first[0]){
                
                // setup previous of previous
                $then = $prev.prev().smartClass('prev');
                
                $prev.trigger('card:between');
                
            } else {
                
                $prev.trigger('card:start');
                
            }
                
            // move to previous card
            $current.smartClass('transition');
            $prev.smartClass('transition');

            setTimeout(function(){

                $current.smartClass('move prev');

                setTimeout(function(){

                    $prev.smartClass('move');

                    setTimeout(function(){

                        $prev.smartClass('move prev transition curr');
                        $current.smartClass('move curr prev transition next');
                        
                        setTimeout(function(){
                            
                            // flip the current card back to its right side
                            if(flipback){
                                
                                if($current.attr('data-flip') !== side) 
                                    $current.attr('data-flip',side);
                                
                            }
                            
                            // switch OFF the card lock
                            if(!locked) $.smarty.flashcard.cardLock = false;
                            if(!locked && $.isset(callback)) callback();
                            
                        },10);

                    },$.smarty.config.transitionSpeed * 1000 + 200);

                },$.smarty.config.transitionSpeed * 1000 + 200);

            },10);

            return $prev;
            
        }
        
        if($.isset(callback)) callback();
        
        return $current;
        
    };

    $.fn.firstCard = function(callback){
        
        var $curr = $(this),
            $stack = $curr.parent(),
            $cards = $stack.find(':smarty(card)'),
            $first = $cards.first(),
            $firstBtn = $stack.find('.btn-first');
        
        if(!$firstBtn.is('.disable') && !$.smarty.flashcard.cardLock){
            
            // switch ON the card lock
            $.smarty.flashcard.cardLock = true;
 
            setTimeoutLoop(function(){ // function
                
                $curr = $curr.prevCard(true);
                
            },$.smarty.config.transitionSpeed * 1000 
              + (1000 - $.smarty.config.transitionSpeed) // delay
             ,$cards.indexEl($curr) // iterations
             ,function(){ // callback
                
                // switch OFF the card lock
                $.smarty.flashcard.cardLock = false;
                
                // reset accessibility
                setTimeout(function(){
                    $.smarty.accessibility.setup();
                },$.smarty.config.transitionSpeed * 1000 * 4);
                
            });
            
        }
        
        if($.isset(callback)) callback();
        
        return $curr;
        
    };

    $.fn.lastCard = function(callback){
        
        var $curr = $(this),
            $stack = $curr.parent(),
            $cards = $stack.find(':smarty(card)'),
            $last = $cards.last(),
            $lastBtn = $stack.find('.btn-last');
        
        if(!$lastBtn.is('.disable') && !$.smarty.flashcard.cardLock){
            
            // switch ON the card lock
            $.smarty.flashcard.cardLock = true;
 
            setTimeoutLoop(function(){ // function
                
                $curr = $curr.nextCard(true);
                
            },$.smarty.config.transitionSpeed * 1000 
              + (1000 - $.smarty.config.transitionSpeed) // delay
             ,$cards.length - ($cards.indexEl($curr) + 1) // iterations
             ,function(){ // callback
                
                // switch OFF the card lock
                $.smarty.flashcard.cardLock = false;
                
                // reset accessibility
                setTimeout(function(){
                    $.smarty.accessibility.setup();
                },$.smarty.config.transitionSpeed * 1000 * 4);
                
            });
            
        }
        
        if($.isset(callback)) callback();
        
        return $curr;
        
    };

    $.fn.trackCard = function(){
        
        var $card = $(this),
            $stack = $card.parent(),
            $cards = $stack.find(':smarty(card)'),
            $flashcard = $stack.closest(':smarty(' 
                                        + $.smarty.config.flashcards.selector + ')'),
            $tracker = $flashcard.find(':smarty(tracker) .tracker .current'),
            $progress = $flashcard.find(':smarty(progress)[data-for="tracker"]');
        
        var current = $cards.indexEl($card) + 1,
            total = $cards.length;
        
        $tracker.html(current);
        
        $progress.attr('data-progress', parseFloat(current / total * 100) + '%')
                 .trigger('progress:update');
        
        return $card;
        
    };

    $.fn.shuffleCards = function(){
        
        var $cards = $(this),
            $flashcard = $cards.closest(':smarty(' 
                                        + $.smarty.config.flashcards.selector + ')'),
            $shuffleBtn = $flashcard.find('.btn-shuffle');
        
        // shuffle cards
        $cards = $cards.shuffle();
                        
        setTimeout(function(){ 

            var $curr = $cards.filter('.curr'),
                $next = $cards.filter('.next'),
                $prev = $cards.filter('.prev'),
                $first = $cards.first(),
                $last = $cards.last();

            if($.exists($next)) $next.smartClass('next');
            if($.exists($prev)) $prev.smartClass('prev');

            if($curr[0] !== $last[0]) $next = $curr.next();
            if($curr[0] !== $first[0]) $prev = $curr.prev();

            if($.exists($next)) $next.smartClass('next');
            if($.exists($prev)) $prev.smartClass('prev');

            $curr.trigger('card:shuffle');
                              
            // update the tracker
            $curr.trackCard();

        },100);
        
        return $cards;
        
    };

    $.fn.dialogBox = function(options){
        
        var defaults = {
            attachTo: $(this),
            attachmentMethod: 'prepend',
            tagName: $.smarty.config.selectorPrefix + 'modal',
            transitionData: {
                classes: false,
                speed: $.smarty.config.transitionSpeed,
                property: 'top',
                easing: 'ease-in-out',
                from: function($el){
                    return - $el.outerHeight();
                },
                to: 0,
                classList: {
                    from: false,
                    to: false,
                    transition: false
                },
            },
            dialogStyle: {},
            dialogEvents: {
                confirm: 'dialog:confirm',
                cancel: 'dialog:cancel',
                open: 'dialog:open',
                close: 'dialog:close'
            },
            enabledButtons: {
                confirm: true,
                cancel: true
            },
            buttonText: {
                confirm: '<span class="fa fa-check"></span> Continue',
                cancel: '<span class="fa fa-times"></span> Cancel'
            },
            buttonProperties: {
                confirm: {
                    type: 'button',
                    class: 'btn-confirm'
                },
                cancel: {
                    type: 'button',
                    class: 'btn-cancel',
                }
            },
            buttonStyle: {
                confirm: {},
                cancel: {}
            },
            headerText: 'Confirmation Required',
            headerStyle: {},
            bodyText: '<p>Are you sure you want to continue?</p>',
            bodyStyle: {},
            footStyle: {}
        };
        
        var settings = $.extend(defaults,options);
        
        // setup transition method
        $.fn.transition = function(direction){
            
            var $dialog = $(this);
            
            // transition in
            if(direction === true){
                
                if(settings.transitionData.classes){
                    
                    $dialog.smartClass(settings.transitionData.classList.transition);
                    
                    setTimeout(function(){
                        
                        $dialog.smartClass(
                            settings.transitionData.classList.from + ' ' + 
                            settings.transitionData.classList.to
                        );
                        
                        setTimeout(function(){
                            
                            $dialog.trigger(settings.dialogEvents.open);
                            
                            $dialog.smartClass(
                                settings.transitionData.classList.transition);
                            
                        },settings.transitionData.speed * 1000 + 200);
                        
                    },10);
                    
                }
                
                else {
                        
                    $dialog.css(settings.transitionData.property,
                            (typeof settings.transitionData.from == 'function' ?
                                settings.transitionData.from($dialog) :
                                settings.transitionData.from));

                    setTimeout(function(){

                        $dialog.css(settings.transitionData.property,
                                (typeof settings.transitionData.to == 'function' ?
                                    settings.transitionData.to($dialog) :
                                    settings.transitionData.to));
                        
                        $dialog.trigger(settings.dialogEvents.open);

                    },10);
                    
                }
                
            }
            
            // transition out
            else if(direction === false){
                
                if(settings.transitionData.classes){
                    
                    $dialog.smartClass(settings.transitionData.classList.transition);
                    
                    setTimeout(function(){
                        
                        $dialog.smartClass(
                            settings.transitionData.classList.to + ' ' + 
                            settings.transitionData.classList.from
                        );
                        
                        setTimeout(function(){
                            
                            $dialog.trigger(settings.dialogEvents.close);
                            
                            $dialog.remove();
                            
                        },settings.transitionData.speed * 1000 + 200);
                        
                    },10);
                    
                } 
                
                else {
                        
                    $dialog.css(settings.transitionData.property, 
                                (typeof settings.transitionData.from == 'function' ?
                                    settings.transitionData.from($dialog) : 
                                    settings.transitionData.from));

                    setTimeout(function(){
                        
                        $dialog.trigger(settings.dialogEvents.close);

                        $dialog.remove();

                    },settings.transitionData.speed * 1000 + 200);
                    
                }
                
            }
            
            return $(this);
            
        };
        
        // setup buttons
        var $buttons = [],
            $button;
        
        if(settings.enabledButtons.confirm){
            
            // create button
            $button = $('<button>',settings.buttonProperties.confirm)
                                .css(settings.buttonStyle.confirm)
                                .html(settings.buttonText.confirm);
            
            // save button
            $buttons.push($button);
            
            // setup event handlers
            $button.on('click',function(event){
                
                var $dialog = $(this).closest(settings.tagName);
                
                $dialog.trigger(settings.dialogEvents.confirm);
                
                $dialog.transition(false);
                
            });
            
        }
            
        if(settings.enabledButtons.cancel){
            
            // create button
            $button = $('<button>',settings.buttonProperties.cancel)
                                .css(settings.buttonStyle.cancel)
                                .html(settings.buttonText.cancel);
            
            // save button
            $buttons.push($button);
         
            // setup event handlers
            // setup event handlers
            $button.on('click',function(event){
                
                var $dialog = $(this).closest(settings.tagName);
                
                $dialog.trigger(settings.dialogEvents.cancel);
                
                $dialog.transition(false);
                
            });
            
        }
            
        // setup header, body, and footer
        var $head = $('<div>',{
                class: 'head',
                html: settings.headerText
            }).css(settings.headerStyle),
            $body = $('<div>',{
                class: 'body',
                html: settings.bodyText
            }).css(settings.bodyStyle),
            $foot = $('<div>',{
                class: 'foot'
            }).css(settings.footStyle);
        
        // add buttons to the footer
        $.repeat($buttons.length,function(i){
            $foot.append($buttons[i-1]);
        });
        
        // setup the dialog box
        var $dialog = $('<' + settings.tagName + '>')
                        .append($head,$body,$foot)
                        .css(settings.dialogStyle);
      
        // setup transition
        if(!settings.transitionData.classes){
           
            $dialog.css({
                        transition: settings.transitionData.property + ' ' +
                                    settings.transitionData.speed + 's ' +
                                    settings.transitionData.easing
                    });
            
        }

        if(settings.attachmentMethod == 'append'){
            settings.attachTo.append($dialog);
        }
        
        else if(settings.attachmentMethod == 'prepend'){
            settings.attachTo.prepend($dialog);
        }
        
        else if(settings.attachmentMethod == 'before'){
            settings.attachTo.before($dialog);
        }
        
        else if(settings.attachmentMethod == 'after'){
            settings.attachTo.after($dialog);
        }
        
        // display the dialog
        $dialog.transition(true);
            
        // return dialog
        return $dialog;
        
    };

    $.fn.shuffle = function(){
        
        var elements = $(this).get();
    
        var randomize = function(max){
            
            return Math.floor(Math.random() * max);
            
        };
        
        var shuffled = $.map(elements, function(){
            
            var randex = randomize(elements.length),
                
                random = $(elements[randex]).clone(true)[0];
            
            elements.splice(randex,1);
            
            return random;
            
        });
 
        this.each(function(i){
             
            $(this).replaceWith($(shuffled[i])); 
                  
        });

        return $(shuffled);
        
    };

    $.fn.computedCSS = function(property){
        
        property = $.isset(property) ? property : false;

        var style = window.getComputedStyle($(this)[0],null);
        
        if(property !== false)
            style = style.getPropertyValue(property);
        
        return style;
        
    };

    $.debounce = function(func,delay,now){
        
        var timeout;
            
        var ctx = this,
            args = arguments;

        var after = function(){

            timeout = false;

            if(now) func.apply(ctx,args);

        };

        var immediate = now && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(after,delay);

        if(immediate) func.apply(ctx,args);
        
    };

    $.repeat = function(count,func){
        
        for(var i = 1; i <= count; i++){
            
            func(i);
            
        }
        
    };
    
    $.exists = function(elem){
        return elem.length > 0 ? true : false;
    };

    $.reorder = function($nodes,attribute,order){
        
        // capture parent of nodes
        var $parent = $nodes.eq(0).parent();

        // capture attributes from nodes
        var nodes = [];
        
        $nodes.each(function(n){
            nodes.push({
                node: $(this),
                number: parseInt($(this).attr(attribute))
            });
        });
        
        // sort nodes
        if(order == 'ASC' || !$.isset(order)){
            nodes.sort(function(a,b){
                return a.number - b.number;
            });
        } else if(order == 'DESC'){
            nodes.sort(function(a,b){
                return b.number - a.number;
            });
        }
        
        var $renode = $();
        
        // reorder nodes
        $.each(nodes,function(index,node){
            // capture the node
            var $node = $parent.find(node.node);
            // move to bottom of parent
            $node.appendTo($parent);
            // save to reordered node list
            $renode = $renode.add($node);
        });
        
        // return reordered nodes
        return $renode;
        
    };

    $.isset = function(varb){
        return varb !== undefined && varb !== null && varb !== '' ? true : false;
    };
    
    $.index = function(object,key){
        
        var index = -1;
        var loop = 0;
        
        $.each(object,function(property,value){
            
            if(property == key) index = loop;
                
            loop++;
            
        });
        
        return index;
        
    };

    $.isBoolean = function(obj){
        if(typeof obj === 'boolean' || obj == 'true' || obj == 'false')
            return true;
        return false;
    };
        
    $.windowOpen = function(options){
        
        var defaults = {
            url: false,
            target: '_blank',
            title: false,
            html: false,
            stylesheets: false,
            styleblocks: false,
            scriptsheets: false,
            scriptblocks: false,
            callback: false,
            features: {
                titlebar: true,
                menubar: true,
                location: false,
                resizable: true,
                scrollbars: true,
                status: true,
                dependent: false,
                width: 0,
                height: 0
            }
        };
 
        var settings = $.extend(defaults,options);

        settings.strings = {
            features: '',
            url: '',
            name: '',
            target: '',
        };
        
        settings.elements = {
            style: $(),
            script: $()
        };
   
        $.each(settings.features,function(key,value){
            if(typeof value === 'boolean' || (typeof value === 'number' && value !== 0))
                settings.strings.features += key + '=' + Number(value);
            var index = $.index(settings.features,key);
            if(index != Object.keys(settings.features).length - 1) 
                settings.strings.features += ',';
        });
        
        settings.strings.url = settings.url !== false ? settings.url : '';
        settings.strings.name = settings.name !== false ? settings.name : '';
        settings.strings.target = settings.target !== false ? settings.target : '';
      
        // stylesheets
        if(settings.stylesheets !== false){
            
            settings.stylesheets.forEach(function(style,index){
                
                // load stylesheets
                settings.elements.style = settings.elements.style.add(
                    $('<link>',{
                        rel: 'stylesheet',
                        href: style.trim()
                    })
                );
                
            });
            
        }
        
        // styleblocks
        if(settings.styleblocks !== false){
            
            settings.styleblocks.forEach(function(style,index){
                
                // load stylesheets
                settings.elements.style = settings.elements.style.add(
                    $(style)
                );
                
            });
            
        }
     
        // scriptsheets
        if(settings.scriptsheets !== false){
            
            settings.scriptsheets.forEach(function(script,index){
                
                // load scriptshets
                settings.elements.script = settings.elements.script.add(
                    $('<script>',{
                        src: script.trim()
                    })
                );

            });
            
        }
        
        // scriptblocks
        if(settings.scriptblocks !== false){
            
            settings.scriptblocks.forEach(function(script,index){
                
                // load scriptblocks
                settings.elements.script = settings.elements.script.add(
                    $(script)
                );
                
            });
            
        }

        var w = window.open(settings.strings.url,
                            settings.strings.target,
                            settings.strings.features);
        
        if(settings.title !== false){
            w.document.title = settings.title;
        }
        if(settings.html !== false){
            w.document.body.innerHTML = 
                w.document.body.innerHTML + settings.html.outerHTML();
        }
        if(settings.stylesheets !== false || settings.styleblocks !== false){
            w.document.head.innerHTML = 
                w.document.head.innerHTML + settings.elements.style.outerHTML();
        }
        if(settings.scriptsheets !== false || settings.scriptblocks !== false){
            w.document.body.innerHTML = 
                w.document.body.innerHTML + settings.elements.script.outerHTML();
        }
        if(settings.callback !== false){
            settings.callback( $(w.document) );
        }
        
        return $(w);
        
    };

    $.toArray = function(string,separator){
        if($.isset(separator)){ 
            if(string.indexOf(separator) > -1)
                return string.split(separator);
        } else {
            if(string.indexOf(' ') > -1)
                return string.split(' ');
        }
        return [string];
    };

    $.vote = function(voters,ballet){
        
        var votes = [];
        
        $.each(voters,function(index,voter){
            
            var vote = function(voter){
                
                return ballet(voter);
                
            };
 
            if(vote(voter)){
                
                votes.push(true);
                
            } else {
                
                votes.push(false);
                
            }
            
        });
  
        if(votes.every(function(vote){ return vote === true; })) return true;
        
        return false;
        
    };

    $.extend($.expr[':'],{
        
        smarty: function(element,index,selector){ 
            var prefix = RegExp.escape($.smarty.config.selectorPrefix);
            var filter = !$.isset(selector[3]) ? '' : selector[3];
            var regex = new RegExp('^' + prefix + filter,'i');
            return regex.test(element.nodeName);
        },
        
        attr: function(element,index,selector){
            var attr = $.toArray(selector[3],',');
            return $(element).is('[' + attr[0] + '="' + attr[1] + '"]');
        },
        
    });

    // Text-to-Speech
    $.tts = {
        
        synthesizer: window.getSpeechSynthesis(),
        utterance: window.getSpeechSynthesisUtterance(),
        
        voices: function(){
            return this.synthesizer.getVoices();
        },
        
        isPaused: function(){
            return this.synthesizer.paused;
        },
        
        isPending: function(){
            return this.synthesizer.pending;
        },
        
        isSpeaking: function(){
            return this.synthesizer.speaking;
        },
        
        getProxy: function(utterance){
            return utterance.corsProxyServer;
        },
        
        useProxy: function(utterance,proxy){
            utterance.corsProxyServer = proxy;
        },
        
        speak: function(message,options){

            var tts = new this.utterance(message);
            
            $.tts.useProxy(tts,window.location.protocol + '//crossorigin.me/');

            this.voices.byName = function(name){
                return this.voices.filter(function(voice){ 
                    return voice.name == name; 
                })[0];
            };

            this.voices.byLang = function(lang){
                return this.voices.filter(function(voice){ 
                    return voice.lang == lang; 
                });
            };

            var defaults = {
                lang: 'en-US',
                volume: 1.0,
                rate: 1.0
            };

            var settings = $.extend(defaults,options);

            for(var key in settings)
                tts[key] = settings[key];

            this.synthesizer.speak(tts);
            
            return tts;

        },
        
        cancel: function(){ 
            return this.synthesizer.cancel(); 
        },
        
        pause: function(){
            return this.synthesizer.pause();
        },
        
        resume: function(){
            return this.synthesizer.resume();
        }
        
    };
    
}(jQuery));

function parseBool(str){
    if($.isset(str)) 
        return str == 'true';
    return false;
}

function setTimeoutLoop(func,delay,iterations,callback){

    var start = iterations.start || 1,
        stop = iterations.stop || iterations;

    return setTimeout(function(){
        
        func();

        start++;

        if(start <= stop){

            setTimeout(function(){
                
                iterations = {
                    start: start,
                    stop: stop
                };

                setTimeoutLoop(func,delay,iterations,callback);

            },delay);

        } else {
            
            callback();
            
        }
        
    },0);

}

// array methods
Array.prototype.add = function(){
    var args = $.makeArray(arguments); 
    var arr = this.concat(args); 
    return arr;
};

Array.prototype.remove = function(){
    var args = $.makeArray(arguments);
    for(var i = 0; i < args.length; i++){
        var x;
        for(var n = 0; n < this.length; n++){
            if(this[n] == args[i]) x = n;
        }
        if(x > -1) this.splice(x,1); 
    }
    return this;
};

Array.prototype.sum = function(){
    var sum = 0;
    for(var i = 0; i < this.length; i++){
        sum += this[i];
    }
    return sum;
};

Array.prototype.count = function(identif){
    var cnt;
    if($.isset(identif)){
        cnt = 0;
        $.each(this,function(i,n){ 
            if(n == identif) cnt++;
        });
    } else {
        cnt = {};
        $.each(function(i,n){
            count[n] = (count[n] || 0) + 1;
        });
    }
    return cnt;
};

Array.prototype.compare = function(comp){
    
    // check that both are set
    if(!$.isset(this) || !$.isset(comp)) return false;
    
    // check if both are non-arrays
    if(this === comp) return true;
    
    // check if array lengths are equal
    if(this.length != comp.length) return false;
    
    // check that each value is equal
    $.each(this,function(index,value){
        if(value !== comp[index]) return false;
    });
    
    return true;
}

// string methods
String.prototype.toTitleCase = function(spec){
    var regex;
    if(!$.isset(spec)) spec = false;
    if(!spec) regex = /(\w)*[\S*]/g;
    if(spec) regex = /(\w)*[\S|\-|\/|\\*]/g;
    var titleCase = this.replace(regex,function(str){ 
        return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
    });
    return titleCase;
};

String.prototype.parseTime = function(format){
    var arr = this.split(':');
    var time = {};
    if(format == 'hhmmss' || format == 'hmmss'){
        time.h = parseInt(arr[0]);
        time.m = parseInt(arr[1]);
        time.s = parseInt(arr[2]);
        time.t = (time.h * 3600) + (time.m * 60) + time.s;
    } else if(format == 'mmss' || format == 'mss'){
        time.h = 0;
        time.m = parseInt(arr[0]);
        time.s = parseInt(arr[1]);
        time.t = (time.h * 3600) + (time.m * 60) + time.s;
    } else if(format == 'ss' || format == 's'){
        time.h = 0;
        time.m = 0;
        time.s = parseInt(arr[0]);
        time.t = (time.h * 3600) + (time.m * 60) + time.s;
    } else {
        time = this;
    }
    return time;
};

// regex methods
RegExp.escape = function(str) {
  return String(str).replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
};

// number methods
Number.prototype.toDecimals = function(places){
    
    var fixed = this, 
        decimals = 0;

    if(this.toString().indexOf('.') > -1)
        decimals = (fixed.toString().length - 1) - fixed.toString().indexOf('.');

    if(decimals > places)
        if(Math.round(fixed) != fixed) fixed = fixed.toFixed(places);

    return fixed;
        
};

Number.prototype.pad = function(width,padder){
    if(!$.isset(padder)) padder = '0';
    var stringy = this.toString();
    return stringy.length >= width ? 
        stringy : new Array(width - stringy.length + 1).join(padder) + stringy;
};

Number.prototype.toTime = function(){
    return {
        h: Math.floor(this / 3600),
        m: Math.floor((this % 3600) / 60),
        s: Math.floor((this % 3600) % 60)
    };
};

// initialize smarty on document ready
$(document).ready(function(){

    $.smarty();
    
});