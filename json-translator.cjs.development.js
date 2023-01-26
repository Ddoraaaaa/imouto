'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var translate$1 = _interopDefault(require('@vitalets/google-translate-api'));
var bingTranslator = require('bing-translate-api');
var createHttpProxyAgent = _interopDefault(require('http-proxy-agent'));
var fs = require('fs/promises');
var axios = _interopDefault(require('axios'));
var cwait = require('cwait');
var bluebird = require('bluebird');
var loading = _interopDefault(require('loading-cli'));
var fs$1 = require('fs');

function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return ContinueSentinel;
    }
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

var version = "1.6.1";

function getLanguageFromCode(language_code) {
  return getEnumKeyByEnumValue(getLanguages(), language_code);
}
function getCodeFromLanguage(language) {
  var languages = getLanguages();
  return languages[language];
}
function getEnumKeyByEnumValue(myEnum, enumValue) {
  var keys = Object.keys(myEnum).filter(function (x) {
    return myEnum[x] === enumValue;
  });
  return keys.length > 0 ? keys[0] : '';
}
function translationStatistic(totalTranslated, totalTranslation) {
  return totalTranslated + " of " + totalTranslation + " translated.";
}
var current_version = version;
var default_value = '-';
var translation_value_limit = 5000;

var cli_name = 'jsontt';
var success_color = '\x1b[32m';
var error_color = '\x1b[31m';
var info_color = '\x1b[34m';
var warn_color = '\x1b[33m';
function success(message) {
  console.log(success_color, "" + message, '\x1b[0m');
}
function error(message) {
  console.log(error_color, "" + message, '\x1b[0m');
}
function info(message) {
  console.log(info_color, "" + message, '\x1b[0m');
}
function warn(message) {
  console.log(warn_color, "" + message, '\x1b[0m');
}
var commands = {
  help1: '--help',
  help2: '-h'
};
var language_choices = {
  GoogleTranslate: "Google Translate (104 languages)",
  BingTranslate: 'Bing Microsoft Translate (110 languages) \x1b[33m**NEW**\x1b[0m',
  LibreTranslate: "Libre Translate (29 languages)",
  ArgosTranslate: "Argos Translate (17 languages)"
};
var messages = {
  cli: {
    welcome: "Welcome to the JSON translator. v" + current_version,
    usage: "Usage: \n\n\t" + cli_name + " <path/file.json> \n\t" + cli_name + " <path/file.json> <path/proxy_list.txt> \n\t" + cli_name + " " + commands.help1 + " \n\t" + cli_name + " " + commands.help2,
    from_source: 'From which source?',
    from_message: 'From which language?',
    to_message: 'To which language | languages? (Can select more than one with space bar)',
    no_selected_language: 'You didn`t select any language. Please try it again and select languages with the space bar.',
    creation_done: 'All files are created! You can find them in the same folder as the original JSON file.'
  },
  object: {},
  file: {
    no_path: "The path is not provided.",
    no_file_in_path: "Could not find the file in the path.",
    cannot_translate: "Could not translate the file.",
    cannot_save_file: "Could not save the file."
  }
};

function map(str) {
  // encode urls if exists in the str
  str = urlEncoder(str);
  var _mapByDoubleBracket = mapByDoubleBracket(str),
    db_map = _mapByDoubleBracket.map,
    initial_ignored_word = _mapByDoubleBracket.word;
  var _mapBySingleBracket = mapBySingleBracket(initial_ignored_word),
    sb_map = _mapBySingleBracket.map,
    ignored_word = _mapBySingleBracket.word;
  return {
    word: ignored_word,
    db_map: db_map,
    sb_map: sb_map
  };
}
function unMap(str, db_map, sb_map) {
  var word = unmapBySingleBracket(str, sb_map);
  word = unmapByDoubleBracket(word, db_map);
  // decode urls if exists in the str
  word = urlDecoder(word);
  return word;
}
function mapBySingleBracket(str) {
  return mapIgnoredValues(str, '{', '}', '{', '}');
}
function unmapBySingleBracket(str, map) {
  return unmapIgnoredValues(str, map, '{', '}', '{', '}');
}
function mapByDoubleBracket(str) {
  return mapIgnoredValues(str, '{{', '}}', '{', '}');
}
function unmapByDoubleBracket(str, map) {
  return unmapIgnoredValues(str, map, '{{', '}}', '{', '}');
}
function mapIgnoredValues(str, start, end, replaced_start, replaced_end) {
  var counter = 0;
  var map = {};
  var regex = new RegExp(start + "(.*?)" + end, 'g');
  var new_str = str.replace(regex, function (word) {
    word = word.substring(start.length, word.length - end.length);
    // const key = "*".repeat(counter)
    var key = counter;
    map["" + key] = word;
    var locked_ignored = replaced_start + key + replaced_end;
    counter++;
    return locked_ignored;
  });
  return {
    word: new_str,
    map: map
  };
}
function unmapIgnoredValues(str, map, start, end, replaced_start, replaced_end) {
  for (var _i = 0, _Object$entries = Object.entries(map); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _Object$entries[_i],
      key = _Object$entries$_i[0],
      value = _Object$entries$_i[1];
    var for_replace = replaced_start + key + replaced_end;
    str = str.replace(for_replace, start + value + end);
  }
  return str;
}
// URL detector & encode AND decoder
function urlEncoder(text) {
  // url finder regex => url
  var regex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!;:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!;:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!;:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;
  var new_text = text.replace(regex, function (url) {
    url = "{" + url + "}";
    return url;
  });
  return new_text;
}
function urlDecoder(text) {
  // url finder regex => {url}
  var regex = /{(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!;:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!;:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!;:,.]*\)|[A-Z0-9+&@#\/%=~_|$])}/gim;
  var new_text = text.replace(regex, function (url) {
    url = url.substring(1, url.length - 1);
    return url;
  });
  return new_text;
}

function plaintranslate(_x, _x2, _x3) {
  return _plaintranslate.apply(this, arguments);
}
function _plaintranslate() {
  _plaintranslate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(word, from, to) {
    var _ignorer$map, ignored_word, db_map, sb_map, translatedWord, proxy, agent;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ignorer$map = map(word), ignored_word = _ignorer$map.word, db_map = _ignorer$map.db_map, sb_map = _ignorer$map.sb_map;
            translatedWord = '';
            if (!(global.source === Sources.LibreTranslate)) {
              _context.next = 8;
              break;
            }
            _context.next = 5;
            return translateWithLibre(ignored_word, from, to);
          case 5:
            translatedWord = _context.sent;
            _context.next = 39;
            break;
          case 8:
            if (!(global.source === Sources.ArgosTranslate)) {
              _context.next = 14;
              break;
            }
            _context.next = 11;
            return translateWithArgos(ignored_word, from, to);
          case 11:
            translatedWord = _context.sent;
            _context.next = 39;
            break;
          case 14:
            if (!(global.source === Sources.BingTranslate)) {
              _context.next = 20;
              break;
            }
            _context.next = 17;
            return translateWithBing(ignored_word, from, to);
          case 17:
            translatedWord = _context.sent;
            _context.next = 39;
            break;
          case 20:
            if (!(global.proxyList && global.proxyList.length > 0 && global.proxyIndex !== -1)) {
              _context.next = 36;
              break;
            }
            proxy = global.proxyList[global.proxyIndex];
            if (!proxy) {
              _context.next = 29;
              break;
            }
            agent = createHttpProxyAgent("http://" + proxy);
            _context.next = 26;
            return translateWithGoogle(ignored_word, from, to, {
              agent: agent,
              timeout: 4000
            });
          case 26:
            translatedWord = _context.sent;
            _context.next = 34;
            break;
          case 29:
            error('there is no new proxy');
            global.proxyIndex = -1;
            // translate without proxy
            _context.next = 33;
            return translateWithLibre(ignored_word, from, to);
          case 33:
            translatedWord = _context.sent;
          case 34:
            _context.next = 39;
            break;
          case 36:
            _context.next = 38;
            return translateWithLibre(ignored_word, from, to);
          case 38:
            translatedWord = _context.sent;
          case 39:
            translatedWord = unMap(translatedWord, db_map, sb_map);
            return _context.abrupt("return", translatedWord);
          case 41:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _plaintranslate.apply(this, arguments);
}
function translateWithLibre(_x4, _x5, _x6) {
  if("qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM./123456789".includes(_x4[0])) {
    return _x4;
  }
  return _translateWithLibre.apply(this, arguments);
}
function _translateWithLibre() {
  _translateWithLibre = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(word, from, to) {
    var body, _yield$axios$post, data;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = {
              q: word,
              source: from,
              target: to
            };
            _context2.next = 3;
            return axios.post('http://127.0.0.1:5000/translate', body, {
              headers: {
                Origin: 'http://127.0.0.1:5000'
              }
            });
          case 3:
            _yield$axios$post = _context2.sent;
            data = _yield$axios$post.data;
            global.totalTranslated = global.totalTranslated + 1;
            return _context2.abrupt("return", data != null && data.translatedText ? data == null ? void 0 : data.translatedText : default_value);
          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _translateWithLibre.apply(this, arguments);
}
function translateWithArgos(_x7, _x8, _x9) {
  return _translateWithArgos.apply(this, arguments);
}
function _translateWithArgos() {
  _translateWithArgos = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(word, from, to) {
    var body, _yield$axios$post2, data;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            body = {
              q: word,
              source: from,
              target: to
            };
            _context3.next = 3;
            return axios.post('https://translate.argosopentech.com/translate', body, {
              headers: {
                Origin: 'https://translate.argosopentech.com',
                Referer: 'https://translate.argosopentech.com'
              }
            });
          case 3:
            _yield$axios$post2 = _context3.sent;
            data = _yield$axios$post2.data;
            global.totalTranslated = global.totalTranslated + 1;
            return _context3.abrupt("return", data != null && data.translatedText ? data == null ? void 0 : data.translatedText : default_value);
          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _translateWithArgos.apply(this, arguments);
}
function translateWithBing(_x10, _x11, _x12) {
  return _translateWithBing.apply(this, arguments);
}
function _translateWithBing() {
  _translateWithBing = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(word, from, to) {
    var _yield$bingTranslator, translation;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return bingTranslator.translate(word, from, to, true);
          case 2:
            _yield$bingTranslator = _context4.sent;
            translation = _yield$bingTranslator.translation;
            global.totalTranslated = global.totalTranslated + 1;
            return _context4.abrupt("return", translation);
          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _translateWithBing.apply(this, arguments);
}
function translateWithGoogle(_x13, _x14, _x15, _x16) {
  return _translateWithGoogle.apply(this, arguments);
}
function _translateWithGoogle() {
  _translateWithGoogle = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(word, from, to, options) {
    var _yield$translate, text;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return translate$1(safeValueTransition(word), {
              from: from,
              to: to
            }, {
              agent: options !== undefined ? options.agent : undefined
            });
          case 2:
            _yield$translate = _context5.sent;
            text = _yield$translate.text;
            global.totalTranslated = global.totalTranslated + 1;
            return _context5.abrupt("return", text);
          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _translateWithGoogle.apply(this, arguments);
}
function getFile(_x17) {
  return _getFile.apply(this, arguments);
}
function _getFile() {
  _getFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(objectPath) {
    var json_file;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            json_file = undefined;
            _context6.next = 3;
            return fs.readFile(objectPath, 'utf8').then(function (data) {
              json_file = data;
            })["catch"](function (_) {
              json_file = undefined;
            });
          case 3:
            return _context6.abrupt("return", json_file);
          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _getFile.apply(this, arguments);
}
function getRootFolder(path) {
  var arr = path.split('/');
  arr.pop();
  var root = arr.join('/');
  if (root === undefined || root === '') {
    root = './';
  }
  return root;
}
function saveFilePublic(_x18, _x19) {
  return _saveFilePublic.apply(this, arguments);
}
function _saveFilePublic() {
  _saveFilePublic = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(path, data) {
    var json;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            json = JSON.stringify(data);
            _context7.next = 3;
            return fs.writeFile(path, json, 'utf8').then(function (_) {})["catch"](function (_) {
              error(messages.file.cannot_save_file);
            });
          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _saveFilePublic.apply(this, arguments);
}
function safeValueTransition(value) {
  var value_safety = valueIsSafe(value);
  if (value_safety.is_safe === true) {
    return value;
  }
  switch (value_safety.type) {
    case nonSafeTypes["null"]:
    case nonSafeTypes.undefined:
    case nonSafeTypes.empty:
      value = default_value;
      break;
    case nonSafeTypes["long"]:
      value = value.substring(0, translation_value_limit);
      break;
  }
  return value;
}
function valueIsSafe(value) {
  var result = {
    is_safe: true,
    type: undefined
  };
  if (value === undefined) {
    result.is_safe = false;
    result['type'] = nonSafeTypes.undefined;
    return result;
  }
  if (value === null) {
    result.is_safe = false;
    result['type'] = nonSafeTypes["null"];
    return result;
  }
  if (value.length >= translation_value_limit) {
    result.is_safe = false;
    result['type'] = nonSafeTypes["long"];
    return result;
  }
  if (value === '') {
    result.is_safe = false;
    result['type'] = nonSafeTypes.empty;
    return result;
  }
  return result;
}
var nonSafeTypes;
(function (nonSafeTypes) {
  nonSafeTypes[nonSafeTypes["long"] = 0] = "long";
  nonSafeTypes[nonSafeTypes["undefined"] = 1] = "undefined";
  nonSafeTypes[nonSafeTypes["null"] = 2] = "null";
  nonSafeTypes[nonSafeTypes["empty"] = 3] = "empty";
})(nonSafeTypes || (nonSafeTypes = {}));

var MAX_SIMULTANEOUS_REQUEST = 3;
var queue = /*#__PURE__*/new cwait.TaskQueue(bluebird.Promise, MAX_SIMULTANEOUS_REQUEST);
function objectTranslator(_x, _x2, _x3) {
  return _objectTranslator.apply(this, arguments);
}
function _objectTranslator() {
  _objectTranslator = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(object, from, to) {
    var general_object;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(object && from && to)) {
              _context2.next = 13;
              break;
            }
            if (!(typeof to === 'object')) {
              _context2.next = 8;
              break;
            }
            general_object = [];
            _context2.next = 5;
            return Promise.all(Object.keys(to).map( /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(index) {
                var index_as_num, copy_object;
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        index_as_num = Number(index);
                        copy_object = JSON.parse(JSON.stringify(object));
                        _context.next = 4;
                        return deepDiver(copy_object, from, to[index_as_num]);
                      case 4:
                        general_object[index_as_num] = _context.sent;
                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));
              return function (_x7) {
                return _ref.apply(this, arguments);
              };
            }()));
          case 5:
            return _context2.abrupt("return", general_object);
          case 8:
            _context2.next = 10;
            return deepDiver(object, from, to);
          case 10:
            return _context2.abrupt("return", object);
          case 11:
            _context2.next = 14;
            break;
          case 13:
            throw new Error("Undefined values detected. Available ones: object: " + !!object + ", from: " + !!from + ", to: " + !!to);
          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _objectTranslator.apply(this, arguments);
}
function deepDiver(_x4, _x5, _x6) {
  return _deepDiver.apply(this, arguments);
}
function _deepDiver() {
  _deepDiver = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(object, from, to) {
    var has;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            has = Object.prototype.hasOwnProperty.bind(object);
            if (!(object === null)) {
              _context5.next = 3;
              break;
            }
            return _context5.abrupt("return", null);
          case 3:
            _context5.next = 5;
            return Promise.all(Object.keys(object).map( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(k) {
                return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        if (!has(k)) {
                          _context4.next = 9;
                          break;
                        }
                        _context4.t0 = typeof object[k];
                        _context4.next = _context4.t0 === 'object' ? 4 : _context4.t0 === 'string' ? 7 : 9;
                        break;
                      case 4:
                        _context4.next = 6;
                        return deepDiver(object[k], from, to);
                      case 6:
                        return _context4.abrupt("break", 9);
                      case 7:
                        global.totalTranslation = global.totalTranslation + 1;
                        return _context4.abrupt("return", queue.add( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
                          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                            while (1) {
                              switch (_context3.prev = _context3.next) {
                                case 0:
                                  _context3.next = 2;
                                  return plaintranslate(object[k], from, to).then(function (data) {
                                    // console.log(data, "printed data");
                                    object[k] = data;
                                  })["catch"](function (err) {
                                    // TODO: return error
                                    console.log('Translation error:', err);
                                  });
                                case 2:
                                  return _context3.abrupt("return", _context3.sent);
                                case 3:
                                case "end":
                                  return _context3.stop();
                              }
                            }
                          }, _callee3);
                        }))));
                      case 9:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));
              return function (_x8) {
                return _ref2.apply(this, arguments);
              };
            }()));
          case 5:
            return _context5.abrupt("return", object);
          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _deepDiver.apply(this, arguments);
}

function fileTranslator(_x, _x2, _x3) {
  return _fileTranslator.apply(this, arguments);
}
function _fileTranslator() {
  _fileTranslator = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(objectPath, from, to) {
    var file_from_path, json_obj, new_json_obj, latest_path, root_folder, file_name;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getFileFromPath(objectPath);
          case 2:
            file_from_path = _context2.sent;
            json_obj = file_from_path.json_obj;
            objectPath = file_from_path.objectPath;
            if (!(json_obj === undefined)) {
              _context2.next = 8;
              break;
            }
            error(messages.file.no_file_in_path);
            return _context2.abrupt("return");
          case 8:
            json_obj = {
              data: JSON.parse(json_obj)
            };
            _context2.next = 11;
            return objectTranslator(json_obj, from, to);
          case 11:
            new_json_obj = _context2.sent;
            if (!(new_json_obj === undefined)) {
              _context2.next = 15;
              break;
            }
            error(messages.file.cannot_translate);
            return _context2.abrupt("return");
          case 15:
            latest_path = objectPath.replace(/\\/g, '/');
            root_folder = getRootFolder(latest_path);
            if (!(Array.isArray(new_json_obj) === true && Array.isArray(to) === true)) {
              _context2.next = 21;
              break;
            }
            // multiple file saving
            new_json_obj.forEach( /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(element, index) {
                var current_json_obj, file_name;
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        current_json_obj = element.data;
                        file_name = "/" + to[index] + ".json";
                        _context.next = 4;
                        return saveFilePublic(root_folder + file_name, current_json_obj);
                      case 4:
                        success("For " + getLanguageFromCode(to[index]) + " --> " + to[index] + ".json created.");
                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));
              return function (_x5, _x6) {
                return _ref.apply(this, arguments);
              };
            }());
            _context2.next = 26;
            break;
          case 21:
            new_json_obj = new_json_obj.data;
            file_name = "/" + to + ".json";
            _context2.next = 25;
            return saveFilePublic(root_folder + file_name, new_json_obj);
          case 25:
            success("For " + getLanguageFromCode(to) + " --> " + to + ".json created.");
          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _fileTranslator.apply(this, arguments);
}
function getFileFromPath(_x4) {
  return _getFileFromPath.apply(this, arguments);
}
function _getFileFromPath() {
  _getFileFromPath = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(objectPath) {
    var json_obj;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getFile(objectPath);
          case 2:
            json_obj = _context3.sent;
            if (!(json_obj === undefined)) {
              _context3.next = 8;
              break;
            }
            objectPath = __dirname + '\\' + objectPath;
            _context3.next = 7;
            return getFile(objectPath);
          case 7:
            json_obj = _context3.sent;
          case 8:
            return _context3.abrupt("return", {
              json_obj: json_obj,
              objectPath: objectPath
            });
          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getFileFromPath.apply(this, arguments);
}

var Sources;
(function (Sources) {
  Sources["GoogleTranslate"] = "GoogleTranslate";
  Sources["LibreTranslate"] = "LibreTranslate";
  Sources["ArgosTranslate"] = "ArgosTranslate";
  Sources["BingTranslate"] = "BingTranslate";
})(Sources || (Sources = {}));
function getLanguages() {
  if (global.source === Sources.LibreTranslate) {
    return LibreTranslateLanguages;
  } else if (global.source === Sources.ArgosTranslate) {
    return ArgosTranslateLanguages;
  } else if (global.source === Sources.BingTranslate) {
    return BingTranslateLanguages;
  }
  return GoogleTranslateLanguages;
}
var LibreTranslateLanguages;
(function (LibreTranslateLanguages) {
  LibreTranslateLanguages["Automatic"] = "auto";
  LibreTranslateLanguages["English"] = "en";
  LibreTranslateLanguages["Arabic"] = "ar";
  LibreTranslateLanguages["Azerbaijani"] = "az";
  LibreTranslateLanguages["Chinese"] = "zh";
  LibreTranslateLanguages["Czech"] = "cs";
  LibreTranslateLanguages["Danish"] = "da";
  LibreTranslateLanguages["Dutch"] = "nl";
  LibreTranslateLanguages["Esperanto"] = "eo";
  LibreTranslateLanguages["Finnish"] = "fi";
  LibreTranslateLanguages["French"] = "fr";
  LibreTranslateLanguages["German"] = "de";
  LibreTranslateLanguages["Greek"] = "el";
  LibreTranslateLanguages["Hebrew"] = "iw";
  LibreTranslateLanguages["Hindi"] = "hi";
  LibreTranslateLanguages["Hungarian"] = "hu";
  LibreTranslateLanguages["Indonesian"] = "id";
  LibreTranslateLanguages["Irish"] = "ga";
  LibreTranslateLanguages["Italian"] = "it";
  LibreTranslateLanguages["Japanese"] = "ja";
  LibreTranslateLanguages["Korean"] = "ko";
  LibreTranslateLanguages["Persian"] = "fa";
  LibreTranslateLanguages["Polish"] = "pl";
  LibreTranslateLanguages["Portuguese"] = "pt";
  LibreTranslateLanguages["Russian"] = "ru";
  LibreTranslateLanguages["Slovak"] = "sk";
  LibreTranslateLanguages["Spanish"] = "es";
  LibreTranslateLanguages["Swedish"] = "sv";
  LibreTranslateLanguages["Turkish"] = "tr";
  LibreTranslateLanguages["Ukrainian"] = "uk";
})(LibreTranslateLanguages || (LibreTranslateLanguages = {}));
var ArgosTranslateLanguages;
(function (ArgosTranslateLanguages) {
  ArgosTranslateLanguages["Automatic"] = "auto";
  ArgosTranslateLanguages["English"] = "en";
  ArgosTranslateLanguages["Arabic"] = "ar";
  ArgosTranslateLanguages["Chinese"] = "zh";
  ArgosTranslateLanguages["French"] = "fr";
  ArgosTranslateLanguages["German"] = "de";
  ArgosTranslateLanguages["Hindi"] = "hi";
  ArgosTranslateLanguages["Indonesian"] = "id";
  ArgosTranslateLanguages["Irish"] = "ga";
  ArgosTranslateLanguages["Italian"] = "it";
  ArgosTranslateLanguages["Japanese"] = "ja";
  ArgosTranslateLanguages["Korean"] = "ko";
  ArgosTranslateLanguages["Polish"] = "pl";
  ArgosTranslateLanguages["Portuguese"] = "pt";
  ArgosTranslateLanguages["Russian"] = "ru";
  ArgosTranslateLanguages["Spanish"] = "es";
  ArgosTranslateLanguages["Turkish"] = "tr";
  ArgosTranslateLanguages["Vietnamese"] = "vi";
})(ArgosTranslateLanguages || (ArgosTranslateLanguages = {}));
var GoogleTranslateLanguages;
(function (GoogleTranslateLanguages) {
  GoogleTranslateLanguages["Automatic"] = "auto";
  GoogleTranslateLanguages["Afrikaans"] = "af";
  GoogleTranslateLanguages["Albanian"] = "sq";
  GoogleTranslateLanguages["Amharic"] = "am";
  GoogleTranslateLanguages["Arabic"] = "ar";
  GoogleTranslateLanguages["Armenian"] = "hy";
  GoogleTranslateLanguages["Azerbaijani"] = "az";
  GoogleTranslateLanguages["Basque"] = "eu";
  GoogleTranslateLanguages["Belarusian"] = "be";
  GoogleTranslateLanguages["Bengali"] = "bn";
  GoogleTranslateLanguages["Bosnian"] = "bs";
  GoogleTranslateLanguages["Bulgarian"] = "bg";
  GoogleTranslateLanguages["Catalan"] = "ca";
  GoogleTranslateLanguages["Cebuano"] = "ceb";
  GoogleTranslateLanguages["Chichewa"] = "ny";
  GoogleTranslateLanguages["Chinese_Simplified"] = "zh-CN";
  GoogleTranslateLanguages["Chinese_Traditional"] = "zh-TW";
  GoogleTranslateLanguages["Corsican"] = "co";
  GoogleTranslateLanguages["Croatian"] = "hr";
  GoogleTranslateLanguages["Czech"] = "cs";
  GoogleTranslateLanguages["Danish"] = "da";
  GoogleTranslateLanguages["Dutch"] = "nl";
  GoogleTranslateLanguages["English"] = "en";
  GoogleTranslateLanguages["Esperanto"] = "eo";
  GoogleTranslateLanguages["Estonian"] = "et";
  GoogleTranslateLanguages["Filipino"] = "tl";
  GoogleTranslateLanguages["Finnish"] = "fi";
  GoogleTranslateLanguages["French"] = "fr";
  GoogleTranslateLanguages["Frisian"] = "fy";
  GoogleTranslateLanguages["Galician"] = "gl";
  GoogleTranslateLanguages["Georgian"] = "ka";
  GoogleTranslateLanguages["German"] = "de";
  GoogleTranslateLanguages["Greek"] = "el";
  GoogleTranslateLanguages["Gujarati"] = "gu";
  GoogleTranslateLanguages["Haitian_Creole"] = "ht";
  GoogleTranslateLanguages["Hausa"] = "ha";
  GoogleTranslateLanguages["Hawaiian"] = "haw";
  GoogleTranslateLanguages["Hebrew"] = "iw";
  GoogleTranslateLanguages["Hindi"] = "hi";
  GoogleTranslateLanguages["Hmong"] = "hmn";
  GoogleTranslateLanguages["Hungarian"] = "hu";
  GoogleTranslateLanguages["Icelandic"] = "is";
  GoogleTranslateLanguages["Igbo"] = "ig";
  GoogleTranslateLanguages["Indonesian"] = "id";
  GoogleTranslateLanguages["Irish"] = "ga";
  GoogleTranslateLanguages["Italian"] = "it";
  GoogleTranslateLanguages["Japanese"] = "ja";
  GoogleTranslateLanguages["Javanese"] = "jw";
  GoogleTranslateLanguages["Kannada"] = "kn";
  GoogleTranslateLanguages["Kazakh"] = "kk";
  GoogleTranslateLanguages["Khmer"] = "km";
  GoogleTranslateLanguages["Korean"] = "ko";
  GoogleTranslateLanguages["Kurdish_Kurmanji"] = "ku";
  GoogleTranslateLanguages["Kyrgyz"] = "ky";
  GoogleTranslateLanguages["Lao"] = "lo";
  GoogleTranslateLanguages["Latin"] = "la";
  GoogleTranslateLanguages["Latvian"] = "lv";
  GoogleTranslateLanguages["Lithuanian"] = "lt";
  GoogleTranslateLanguages["Luxembourgish"] = "lb";
  GoogleTranslateLanguages["Macedonian"] = "mk";
  GoogleTranslateLanguages["Malagasy"] = "mg";
  GoogleTranslateLanguages["Malay"] = "ms";
  GoogleTranslateLanguages["Malayalam"] = "ml";
  GoogleTranslateLanguages["Maltese"] = "mt";
  GoogleTranslateLanguages["Maori"] = "mi";
  GoogleTranslateLanguages["Marathi"] = "mr";
  GoogleTranslateLanguages["Mongolian"] = "mn";
  GoogleTranslateLanguages["Myanmar_Burmese"] = "my";
  GoogleTranslateLanguages["Nepali"] = "ne";
  GoogleTranslateLanguages["Norwegian"] = "no";
  GoogleTranslateLanguages["Pashto"] = "ps";
  GoogleTranslateLanguages["Persian"] = "fa";
  GoogleTranslateLanguages["Polish"] = "pl";
  GoogleTranslateLanguages["Portuguese"] = "pt";
  GoogleTranslateLanguages["Punjabi"] = "pa";
  GoogleTranslateLanguages["Romanian"] = "ro";
  GoogleTranslateLanguages["Russian"] = "ru";
  GoogleTranslateLanguages["Samoan"] = "sm";
  GoogleTranslateLanguages["Scots_Gaelic"] = "gd";
  GoogleTranslateLanguages["Serbian"] = "sr";
  GoogleTranslateLanguages["Sesotho"] = "st";
  GoogleTranslateLanguages["Shona"] = "sn";
  GoogleTranslateLanguages["Sindhi"] = "sd";
  GoogleTranslateLanguages["Sinhala"] = "si";
  GoogleTranslateLanguages["Slovak"] = "sk";
  GoogleTranslateLanguages["Slovenian"] = "sl";
  GoogleTranslateLanguages["Somali"] = "so";
  GoogleTranslateLanguages["Spanish"] = "es";
  GoogleTranslateLanguages["Sundanese"] = "su";
  GoogleTranslateLanguages["Swahili"] = "sw";
  GoogleTranslateLanguages["Swedish"] = "sv";
  GoogleTranslateLanguages["Tajik"] = "tg";
  GoogleTranslateLanguages["Tamil"] = "ta";
  GoogleTranslateLanguages["Telugu"] = "te";
  GoogleTranslateLanguages["Thai"] = "th";
  GoogleTranslateLanguages["Turkish"] = "tr";
  GoogleTranslateLanguages["Ukrainian"] = "uk";
  GoogleTranslateLanguages["Urdu"] = "ur";
  GoogleTranslateLanguages["Uzbek"] = "uz";
  GoogleTranslateLanguages["Vietnamese"] = "vi";
  GoogleTranslateLanguages["Welsh"] = "cy";
  GoogleTranslateLanguages["Xhosa"] = "xh";
  GoogleTranslateLanguages["Yiddish"] = "yi";
  GoogleTranslateLanguages["Yoruba"] = "yo";
  GoogleTranslateLanguages["Zulu"] = "zu";
})(GoogleTranslateLanguages || (GoogleTranslateLanguages = {}));
var BingTranslateLanguages;
(function (BingTranslateLanguages) {
  BingTranslateLanguages["Automatic"] = "auto-detect";
  BingTranslateLanguages["Afrikaans"] = "af";
  BingTranslateLanguages["Albanian"] = "sq";
  BingTranslateLanguages["Amharic"] = "am";
  BingTranslateLanguages["Arabic"] = "ar";
  BingTranslateLanguages["Armenian"] = "hy";
  BingTranslateLanguages["Assamese"] = "as";
  BingTranslateLanguages["Azerbaijani"] = "az";
  BingTranslateLanguages["Bangla"] = "bn";
  BingTranslateLanguages["Bashkir"] = "ba";
  BingTranslateLanguages["Basque"] = "eu";
  BingTranslateLanguages["Bosnian"] = "bs";
  BingTranslateLanguages["Bulgarian"] = "bg";
  BingTranslateLanguages["Cantonese_Traditional"] = "yue";
  BingTranslateLanguages["Catalan"] = "ca";
  BingTranslateLanguages["Chinese_Literary"] = "lzh";
  BingTranslateLanguages["Chinese_Simplified"] = "zh-Hans";
  BingTranslateLanguages["Chinese_Traditional"] = "zh-Hant";
  BingTranslateLanguages["Croatian"] = "hr";
  BingTranslateLanguages["Czech"] = "cs";
  BingTranslateLanguages["Danish"] = "da";
  BingTranslateLanguages["Dari"] = "prs";
  BingTranslateLanguages["Divehi"] = "dv";
  BingTranslateLanguages["Dutch"] = "nl";
  BingTranslateLanguages["English"] = "en";
  BingTranslateLanguages["Estonian"] = "et";
  BingTranslateLanguages["Faroese"] = "fo";
  BingTranslateLanguages["Fijian"] = "fj";
  BingTranslateLanguages["Filipino"] = "fil";
  BingTranslateLanguages["Finnish"] = "fi";
  BingTranslateLanguages["French"] = "fr";
  BingTranslateLanguages["French_Canada"] = "fr-CA";
  BingTranslateLanguages["Galician"] = "gl";
  BingTranslateLanguages["Georgian"] = "ka";
  BingTranslateLanguages["German"] = "de";
  BingTranslateLanguages["Greek"] = "el";
  BingTranslateLanguages["Gujarati"] = "gu";
  BingTranslateLanguages["Haitian_Creole"] = "ht";
  BingTranslateLanguages["Hebrew"] = "he";
  BingTranslateLanguages["Hindi"] = "hi";
  BingTranslateLanguages["Hmong_Daw"] = "mww";
  BingTranslateLanguages["Hungarian"] = "hu";
  BingTranslateLanguages["Icelandic"] = "is";
  BingTranslateLanguages["Indonesian"] = "id";
  BingTranslateLanguages["Inuinnaqtun"] = "ikt";
  BingTranslateLanguages["Inuktitut"] = "iu";
  BingTranslateLanguages["Inuktitut_Latin"] = "iu-Latn";
  BingTranslateLanguages["Irish"] = "ga";
  BingTranslateLanguages["Italian"] = "it";
  BingTranslateLanguages["Japanese"] = "ja";
  BingTranslateLanguages["Kannada"] = "kn";
  BingTranslateLanguages["Kazakh"] = "kk";
  BingTranslateLanguages["Khmer"] = "km";
  BingTranslateLanguages["Klingon_Latin"] = "tlh-Latn";
  BingTranslateLanguages["Korean"] = "ko";
  BingTranslateLanguages["Kurdish_Central"] = "ku";
  BingTranslateLanguages["Kurdish_Northern"] = "kmr";
  BingTranslateLanguages["Kyrgyz"] = "ky";
  BingTranslateLanguages["Lao"] = "lo";
  BingTranslateLanguages["Latvian"] = "lv";
  BingTranslateLanguages["Lithuanian"] = "lt";
  BingTranslateLanguages["Macedonian"] = "mk";
  BingTranslateLanguages["Malagasy"] = "mg";
  BingTranslateLanguages["Malay"] = "ms";
  BingTranslateLanguages["Malayalam"] = "ml";
  BingTranslateLanguages["Maltese"] = "mt";
  BingTranslateLanguages["Marathi"] = "mr";
  BingTranslateLanguages["Mongolian_Cyrillic"] = "mn-Cyrl";
  BingTranslateLanguages["Mongolian_Traditional"] = "mn-Mong";
  BingTranslateLanguages["Myanmar_Burmese"] = "my";
  BingTranslateLanguages["M\u0101ori"] = "mi";
  BingTranslateLanguages["Nepali"] = "ne";
  BingTranslateLanguages["Norwegian"] = "nb";
  BingTranslateLanguages["Odia"] = "or";
  BingTranslateLanguages["Pashto"] = "ps";
  BingTranslateLanguages["Persian"] = "fa";
  BingTranslateLanguages["Polish"] = "pl";
  BingTranslateLanguages["Portuguese_Brazil"] = "pt";
  BingTranslateLanguages["Portuguese_Portugal"] = "pt-PT";
  BingTranslateLanguages["Punjabi"] = "pa";
  BingTranslateLanguages["Quer\xE9taro_Otomi"] = "otq";
  BingTranslateLanguages["Romanian"] = "ro";
  BingTranslateLanguages["Russian"] = "ru";
  BingTranslateLanguages["Samoan"] = "sm";
  BingTranslateLanguages["Serbian_Cyrillic"] = "sr-Cyrl";
  BingTranslateLanguages["Serbian_Latin"] = "sr-Latn";
  BingTranslateLanguages["Slovak"] = "sk";
  BingTranslateLanguages["Slovenian"] = "sl";
  BingTranslateLanguages["Somali"] = "so";
  BingTranslateLanguages["Spanish"] = "es";
  BingTranslateLanguages["Swahili"] = "sw";
  BingTranslateLanguages["Swedish"] = "sv";
  BingTranslateLanguages["Tahitian"] = "ty";
  BingTranslateLanguages["Tamil"] = "ta";
  BingTranslateLanguages["Tatar"] = "tt";
  BingTranslateLanguages["Telugu"] = "te";
  BingTranslateLanguages["Thai"] = "th";
  BingTranslateLanguages["Tibetan"] = "bo";
  BingTranslateLanguages["Tigrinya"] = "ti";
  BingTranslateLanguages["Tongan"] = "to";
  BingTranslateLanguages["Turkish"] = "tr";
  BingTranslateLanguages["Turkmen"] = "tk";
  BingTranslateLanguages["Ukrainian"] = "uk";
  BingTranslateLanguages["Upper_Sorbian"] = "hsb";
  BingTranslateLanguages["Urdu"] = "ur";
  BingTranslateLanguages["Uyghur"] = "ug";
  BingTranslateLanguages["Uzbek_Latin"] = "uz";
  BingTranslateLanguages["Vietnamese"] = "vi";
  BingTranslateLanguages["Welsh"] = "cy";
  BingTranslateLanguages["Yucatec_Maya"] = "yua";
  BingTranslateLanguages["Zulu"] = "zu";
})(BingTranslateLanguages || (BingTranslateLanguages = {}));

function readProxyFile(_x) {
  return _readProxyFile.apply(this, arguments);
}
function _readProxyFile() {
  _readProxyFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(file_path) {
    var confs, data, proxyList;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            confs = {
              checkerRX: /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}:(\d){1,}$/
            };
            _context.next = 3;
            return fs$1.promises.readFile(file_path, 'utf8');
          case 3:
            data = _context.sent;
            if (data) {
              _context.next = 7;
              break;
            }
            error('proxy file is empty!');
            return _context.abrupt("return");
          case 7:
            proxyList = data.split(/\r?\n/);
            proxyList = proxyList.filter(function (proxy_item) {
              return confs.checkerRX.test(proxy_item);
            });
            success("\n---------------- Proxy Mode ----------------\n");
            global.proxyList = proxyList;
          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _readProxyFile.apply(this, arguments);
}

var inquirer = /*#__PURE__*/require('inquirer');
function initializeCli() {
  return _initializeCli.apply(this, arguments);
}
function _initializeCli() {
  _initializeCli = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var myArgs;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            global.totalTranslation = 0;
            global.totalTranslated = 0;
            global.proxyIndex = 0;
            global.proxyList = [];
            myArgs = process.argv.slice(2);
            if (!(myArgs.length === 0 || myArgs[0] === commands.help1 || myArgs[0] === commands.help2)) {
              _context.next = 8;
              break;
            }
            help();
            return _context.abrupt("return");
          case 8:
            translate();
          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _initializeCli.apply(this, arguments);
}
function help() {
  return _help.apply(this, arguments);
}
function _help() {
  _help = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            success(messages.cli.welcome);
            info(messages.cli.usage);
          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _help.apply(this, arguments);
}
function translate() {
  return _translate.apply(this, arguments);
}
function _translate() {
  _translate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var myArgs, file_path, objectPath, _yield$getFileFromPat, json_obj, from, to, source_choices, _getLanguageChoices, from_choices, to_choices, to_languages, load, refreshInterval;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            myArgs = process.argv.slice(2);
            if (!(myArgs[1] && typeof myArgs[1] === 'string')) {
              _context3.next = 5;
              break;
            }
            file_path = myArgs[1];
            _context3.next = 5;
            return readProxyFile(file_path);
          case 5:
            // no path condition
            objectPath = myArgs[0];
            if (!(objectPath === undefined || objectPath === '')) {
              _context3.next = 9;
              break;
            }
            error(messages.file.no_path + ' ' + messages.cli.usage);
            return _context3.abrupt("return");
          case 9:
            _context3.next = 11;
            return getFileFromPath(objectPath);
          case 11:
            _yield$getFileFromPat = _context3.sent;
            json_obj = _yield$getFileFromPat.json_obj;
            if (!(json_obj === undefined)) {
              _context3.next = 16;
              break;
            }
            error(messages.file.no_file_in_path);
            return _context3.abrupt("return");
          case 16:
            source_choices = Object.entries(Sources).map(function (_ref2) {
              var key = _ref2[0];
              return {
                name: language_choices[key],
                value: key,
                "short": key
              };
            });
            _context3.next = 19;
            return inquirer.prompt([{
              type: 'list',
              name: 'source',
              message: messages.cli.from_source,
              pageSize: 20,
              choices: [].concat(source_choices, [new inquirer.Separator()])
            }]).then(function (answers) {
              global.source = answers.source;
            });
          case 19:
            _getLanguageChoices = getLanguageChoices(), from_choices = _getLanguageChoices.from_choices, to_choices = _getLanguageChoices.to_choices;
            _context3.next = 22;
            return inquirer.prompt([{
              type: 'list',
              name: 'from',
              message: messages.cli.from_message,
              pageSize: 20,
              choices: [].concat(from_choices, [new inquirer.Separator()])
            }, {
              type: 'checkbox',
              name: 'to',
              pageSize: 20,
              message: messages.cli.to_message,
              choices: to_choices
            }]).then(function (answers) {
              from = answers.from;
              to = answers.to;
            });
          case 22:
            if (!(to.length === 0 || to === undefined)) {
              _context3.next = 25;
              break;
            }
            warn(messages.cli.no_selected_language);
            return _context3.abrupt("return");
          case 25:
            to_languages = to.map(function (language) {
              return getLanguages()[language];
            });
            load = loading({
              text: "Translating. Please wait. " + translationStatistic(global.totalTranslated, global.totalTranslation),
              color: 'yellow',
              interval: 100,
              stream: process.stdout,
              frames: ['.', 'o', 'O', '°', 'O', 'o', '.']
            }).start();
            refreshInterval = setInterval(function () {
              load.text = "Translating. Please wait. " + translationStatistic(global.totalTranslated, global.totalTranslation);
            }, 200);
            _context3.next = 30;
            return fileTranslator(objectPath, getCodeFromLanguage(from), to_languages);
          case 30:
            load.succeed("DONE! " + translationStatistic(global.totalTranslation, global.totalTranslation));
            clearInterval(refreshInterval);
            info(messages.cli.creation_done);
          case 33:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _translate.apply(this, arguments);
}
function getLanguageChoices() {
  var from_choices = getFromChoices();
  var to_choices = from_choices.filter(function (language) {
    return language !== "Automatic";
  });
  return {
    from_choices: from_choices,
    to_choices: to_choices
  };
}
function getFromChoices() {
  var languages = Object.entries(getLanguages()).map(function (_ref) {
    var key = _ref[0];
    return key;
  });
  return languages;
}

function translateWord(_x, _x2, _x3) {
  return _translateWord.apply(this, arguments);
}
function _translateWord() {
  _translateWord = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(word, from, to) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return plaintranslate(word, from, to);
          case 2:
            return _context.abrupt("return", _context.sent);
          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _translateWord.apply(this, arguments);
}
function translateObject(_x4, _x5, _x6) {
  return _translateObject.apply(this, arguments);
}
function _translateObject() {
  _translateObject = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(object, from, to) {
    var hard_copy;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            hard_copy = JSON.parse(JSON.stringify(object));
            return _context2.abrupt("return", objectTranslator(hard_copy, from, to));
          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _translateObject.apply(this, arguments);
}
function translateFile(_x7, _x8, _x9) {
  return _translateFile.apply(this, arguments);
}
function _translateFile() {
  _translateFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(objectPath, from, to) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", fileTranslator(objectPath, from, to));
          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _translateFile.apply(this, arguments);
}
function runCli() {
  return _runCli.apply(this, arguments);
}
function _runCli() {
  _runCli = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            initializeCli();
          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _runCli.apply(this, arguments);
}
(function (Sources) {
  Sources["GoogleTranslate"] = "GoogleTranslate";
  Sources["LibreTranslate"] = "LibreTranslate";
  Sources["ArgosTranslate"] = "ArgosTranslate";
  Sources["BingTranslate"] = "BingTranslate";
})(exports.Sources || (exports.Sources = {}));
function getLanguages$1() {
  if (global.source === exports.Sources.LibreTranslate) {
    return LibreTranslateLanguages$1;
  } else if (global.source === exports.Sources.ArgosTranslate) {
    return ArgosTranslateLanguages$1;
  } else if (global.source === exports.Sources.BingTranslate) {
    return BingTranslateLanguages$1;
  }
  return GoogleTranslateLanguages$1;
}
var LibreTranslateLanguages$1;
(function (LibreTranslateLanguages) {
  LibreTranslateLanguages["Automatic"] = "auto";
  LibreTranslateLanguages["English"] = "en";
  LibreTranslateLanguages["Arabic"] = "ar";
  LibreTranslateLanguages["Azerbaijani"] = "az";
  LibreTranslateLanguages["Chinese"] = "zh";
  LibreTranslateLanguages["Czech"] = "cs";
  LibreTranslateLanguages["Danish"] = "da";
  LibreTranslateLanguages["Dutch"] = "nl";
  LibreTranslateLanguages["Esperanto"] = "eo";
  LibreTranslateLanguages["Finnish"] = "fi";
  LibreTranslateLanguages["French"] = "fr";
  LibreTranslateLanguages["German"] = "de";
  LibreTranslateLanguages["Greek"] = "el";
  LibreTranslateLanguages["Hebrew"] = "iw";
  LibreTranslateLanguages["Hindi"] = "hi";
  LibreTranslateLanguages["Hungarian"] = "hu";
  LibreTranslateLanguages["Indonesian"] = "id";
  LibreTranslateLanguages["Irish"] = "ga";
  LibreTranslateLanguages["Italian"] = "it";
  LibreTranslateLanguages["Japanese"] = "ja";
  LibreTranslateLanguages["Korean"] = "ko";
  LibreTranslateLanguages["Persian"] = "fa";
  LibreTranslateLanguages["Polish"] = "pl";
  LibreTranslateLanguages["Portuguese"] = "pt";
  LibreTranslateLanguages["Russian"] = "ru";
  LibreTranslateLanguages["Slovak"] = "sk";
  LibreTranslateLanguages["Spanish"] = "es";
  LibreTranslateLanguages["Swedish"] = "sv";
  LibreTranslateLanguages["Turkish"] = "tr";
  LibreTranslateLanguages["Ukrainian"] = "uk";
})(LibreTranslateLanguages$1 || (LibreTranslateLanguages$1 = {}));
var ArgosTranslateLanguages$1;
(function (ArgosTranslateLanguages) {
  ArgosTranslateLanguages["Automatic"] = "auto";
  ArgosTranslateLanguages["English"] = "en";
  ArgosTranslateLanguages["Arabic"] = "ar";
  ArgosTranslateLanguages["Chinese"] = "zh";
  ArgosTranslateLanguages["French"] = "fr";
  ArgosTranslateLanguages["German"] = "de";
  ArgosTranslateLanguages["Hindi"] = "hi";
  ArgosTranslateLanguages["Indonesian"] = "id";
  ArgosTranslateLanguages["Irish"] = "ga";
  ArgosTranslateLanguages["Italian"] = "it";
  ArgosTranslateLanguages["Japanese"] = "ja";
  ArgosTranslateLanguages["Korean"] = "ko";
  ArgosTranslateLanguages["Polish"] = "pl";
  ArgosTranslateLanguages["Portuguese"] = "pt";
  ArgosTranslateLanguages["Russian"] = "ru";
  ArgosTranslateLanguages["Spanish"] = "es";
  ArgosTranslateLanguages["Turkish"] = "tr";
  ArgosTranslateLanguages["Vietnamese"] = "vi";
})(ArgosTranslateLanguages$1 || (ArgosTranslateLanguages$1 = {}));
var GoogleTranslateLanguages$1;
(function (GoogleTranslateLanguages) {
  GoogleTranslateLanguages["Automatic"] = "auto";
  GoogleTranslateLanguages["Afrikaans"] = "af";
  GoogleTranslateLanguages["Albanian"] = "sq";
  GoogleTranslateLanguages["Amharic"] = "am";
  GoogleTranslateLanguages["Arabic"] = "ar";
  GoogleTranslateLanguages["Armenian"] = "hy";
  GoogleTranslateLanguages["Azerbaijani"] = "az";
  GoogleTranslateLanguages["Basque"] = "eu";
  GoogleTranslateLanguages["Belarusian"] = "be";
  GoogleTranslateLanguages["Bengali"] = "bn";
  GoogleTranslateLanguages["Bosnian"] = "bs";
  GoogleTranslateLanguages["Bulgarian"] = "bg";
  GoogleTranslateLanguages["Catalan"] = "ca";
  GoogleTranslateLanguages["Cebuano"] = "ceb";
  GoogleTranslateLanguages["Chichewa"] = "ny";
  GoogleTranslateLanguages["Chinese_Simplified"] = "zh-CN";
  GoogleTranslateLanguages["Chinese_Traditional"] = "zh-TW";
  GoogleTranslateLanguages["Corsican"] = "co";
  GoogleTranslateLanguages["Croatian"] = "hr";
  GoogleTranslateLanguages["Czech"] = "cs";
  GoogleTranslateLanguages["Danish"] = "da";
  GoogleTranslateLanguages["Dutch"] = "nl";
  GoogleTranslateLanguages["English"] = "en";
  GoogleTranslateLanguages["Esperanto"] = "eo";
  GoogleTranslateLanguages["Estonian"] = "et";
  GoogleTranslateLanguages["Filipino"] = "tl";
  GoogleTranslateLanguages["Finnish"] = "fi";
  GoogleTranslateLanguages["French"] = "fr";
  GoogleTranslateLanguages["Frisian"] = "fy";
  GoogleTranslateLanguages["Galician"] = "gl";
  GoogleTranslateLanguages["Georgian"] = "ka";
  GoogleTranslateLanguages["German"] = "de";
  GoogleTranslateLanguages["Greek"] = "el";
  GoogleTranslateLanguages["Gujarati"] = "gu";
  GoogleTranslateLanguages["Haitian_Creole"] = "ht";
  GoogleTranslateLanguages["Hausa"] = "ha";
  GoogleTranslateLanguages["Hawaiian"] = "haw";
  GoogleTranslateLanguages["Hebrew"] = "iw";
  GoogleTranslateLanguages["Hindi"] = "hi";
  GoogleTranslateLanguages["Hmong"] = "hmn";
  GoogleTranslateLanguages["Hungarian"] = "hu";
  GoogleTranslateLanguages["Icelandic"] = "is";
  GoogleTranslateLanguages["Igbo"] = "ig";
  GoogleTranslateLanguages["Indonesian"] = "id";
  GoogleTranslateLanguages["Irish"] = "ga";
  GoogleTranslateLanguages["Italian"] = "it";
  GoogleTranslateLanguages["Japanese"] = "ja";
  GoogleTranslateLanguages["Javanese"] = "jw";
  GoogleTranslateLanguages["Kannada"] = "kn";
  GoogleTranslateLanguages["Kazakh"] = "kk";
  GoogleTranslateLanguages["Khmer"] = "km";
  GoogleTranslateLanguages["Korean"] = "ko";
  GoogleTranslateLanguages["Kurdish_Kurmanji"] = "ku";
  GoogleTranslateLanguages["Kyrgyz"] = "ky";
  GoogleTranslateLanguages["Lao"] = "lo";
  GoogleTranslateLanguages["Latin"] = "la";
  GoogleTranslateLanguages["Latvian"] = "lv";
  GoogleTranslateLanguages["Lithuanian"] = "lt";
  GoogleTranslateLanguages["Luxembourgish"] = "lb";
  GoogleTranslateLanguages["Macedonian"] = "mk";
  GoogleTranslateLanguages["Malagasy"] = "mg";
  GoogleTranslateLanguages["Malay"] = "ms";
  GoogleTranslateLanguages["Malayalam"] = "ml";
  GoogleTranslateLanguages["Maltese"] = "mt";
  GoogleTranslateLanguages["Maori"] = "mi";
  GoogleTranslateLanguages["Marathi"] = "mr";
  GoogleTranslateLanguages["Mongolian"] = "mn";
  GoogleTranslateLanguages["Myanmar_Burmese"] = "my";
  GoogleTranslateLanguages["Nepali"] = "ne";
  GoogleTranslateLanguages["Norwegian"] = "no";
  GoogleTranslateLanguages["Pashto"] = "ps";
  GoogleTranslateLanguages["Persian"] = "fa";
  GoogleTranslateLanguages["Polish"] = "pl";
  GoogleTranslateLanguages["Portuguese"] = "pt";
  GoogleTranslateLanguages["Punjabi"] = "pa";
  GoogleTranslateLanguages["Romanian"] = "ro";
  GoogleTranslateLanguages["Russian"] = "ru";
  GoogleTranslateLanguages["Samoan"] = "sm";
  GoogleTranslateLanguages["Scots_Gaelic"] = "gd";
  GoogleTranslateLanguages["Serbian"] = "sr";
  GoogleTranslateLanguages["Sesotho"] = "st";
  GoogleTranslateLanguages["Shona"] = "sn";
  GoogleTranslateLanguages["Sindhi"] = "sd";
  GoogleTranslateLanguages["Sinhala"] = "si";
  GoogleTranslateLanguages["Slovak"] = "sk";
  GoogleTranslateLanguages["Slovenian"] = "sl";
  GoogleTranslateLanguages["Somali"] = "so";
  GoogleTranslateLanguages["Spanish"] = "es";
  GoogleTranslateLanguages["Sundanese"] = "su";
  GoogleTranslateLanguages["Swahili"] = "sw";
  GoogleTranslateLanguages["Swedish"] = "sv";
  GoogleTranslateLanguages["Tajik"] = "tg";
  GoogleTranslateLanguages["Tamil"] = "ta";
  GoogleTranslateLanguages["Telugu"] = "te";
  GoogleTranslateLanguages["Thai"] = "th";
  GoogleTranslateLanguages["Turkish"] = "tr";
  GoogleTranslateLanguages["Ukrainian"] = "uk";
  GoogleTranslateLanguages["Urdu"] = "ur";
  GoogleTranslateLanguages["Uzbek"] = "uz";
  GoogleTranslateLanguages["Vietnamese"] = "vi";
  GoogleTranslateLanguages["Welsh"] = "cy";
  GoogleTranslateLanguages["Xhosa"] = "xh";
  GoogleTranslateLanguages["Yiddish"] = "yi";
  GoogleTranslateLanguages["Yoruba"] = "yo";
  GoogleTranslateLanguages["Zulu"] = "zu";
})(GoogleTranslateLanguages$1 || (GoogleTranslateLanguages$1 = {}));
var BingTranslateLanguages$1;
(function (BingTranslateLanguages) {
  BingTranslateLanguages["Automatic"] = "auto-detect";
  BingTranslateLanguages["Afrikaans"] = "af";
  BingTranslateLanguages["Albanian"] = "sq";
  BingTranslateLanguages["Amharic"] = "am";
  BingTranslateLanguages["Arabic"] = "ar";
  BingTranslateLanguages["Armenian"] = "hy";
  BingTranslateLanguages["Assamese"] = "as";
  BingTranslateLanguages["Azerbaijani"] = "az";
  BingTranslateLanguages["Bangla"] = "bn";
  BingTranslateLanguages["Bashkir"] = "ba";
  BingTranslateLanguages["Basque"] = "eu";
  BingTranslateLanguages["Bosnian"] = "bs";
  BingTranslateLanguages["Bulgarian"] = "bg";
  BingTranslateLanguages["Cantonese_Traditional"] = "yue";
  BingTranslateLanguages["Catalan"] = "ca";
  BingTranslateLanguages["Chinese_Literary"] = "lzh";
  BingTranslateLanguages["Chinese_Simplified"] = "zh-Hans";
  BingTranslateLanguages["Chinese_Traditional"] = "zh-Hant";
  BingTranslateLanguages["Croatian"] = "hr";
  BingTranslateLanguages["Czech"] = "cs";
  BingTranslateLanguages["Danish"] = "da";
  BingTranslateLanguages["Dari"] = "prs";
  BingTranslateLanguages["Divehi"] = "dv";
  BingTranslateLanguages["Dutch"] = "nl";
  BingTranslateLanguages["English"] = "en";
  BingTranslateLanguages["Estonian"] = "et";
  BingTranslateLanguages["Faroese"] = "fo";
  BingTranslateLanguages["Fijian"] = "fj";
  BingTranslateLanguages["Filipino"] = "fil";
  BingTranslateLanguages["Finnish"] = "fi";
  BingTranslateLanguages["French"] = "fr";
  BingTranslateLanguages["French_Canada"] = "fr-CA";
  BingTranslateLanguages["Galician"] = "gl";
  BingTranslateLanguages["Georgian"] = "ka";
  BingTranslateLanguages["German"] = "de";
  BingTranslateLanguages["Greek"] = "el";
  BingTranslateLanguages["Gujarati"] = "gu";
  BingTranslateLanguages["Haitian_Creole"] = "ht";
  BingTranslateLanguages["Hebrew"] = "he";
  BingTranslateLanguages["Hindi"] = "hi";
  BingTranslateLanguages["Hmong_Daw"] = "mww";
  BingTranslateLanguages["Hungarian"] = "hu";
  BingTranslateLanguages["Icelandic"] = "is";
  BingTranslateLanguages["Indonesian"] = "id";
  BingTranslateLanguages["Inuinnaqtun"] = "ikt";
  BingTranslateLanguages["Inuktitut"] = "iu";
  BingTranslateLanguages["Inuktitut_Latin"] = "iu-Latn";
  BingTranslateLanguages["Irish"] = "ga";
  BingTranslateLanguages["Italian"] = "it";
  BingTranslateLanguages["Japanese"] = "ja";
  BingTranslateLanguages["Kannada"] = "kn";
  BingTranslateLanguages["Kazakh"] = "kk";
  BingTranslateLanguages["Khmer"] = "km";
  BingTranslateLanguages["Klingon_Latin"] = "tlh-Latn";
  BingTranslateLanguages["Korean"] = "ko";
  BingTranslateLanguages["Kurdish_Central"] = "ku";
  BingTranslateLanguages["Kurdish_Northern"] = "kmr";
  BingTranslateLanguages["Kyrgyz"] = "ky";
  BingTranslateLanguages["Lao"] = "lo";
  BingTranslateLanguages["Latvian"] = "lv";
  BingTranslateLanguages["Lithuanian"] = "lt";
  BingTranslateLanguages["Macedonian"] = "mk";
  BingTranslateLanguages["Malagasy"] = "mg";
  BingTranslateLanguages["Malay"] = "ms";
  BingTranslateLanguages["Malayalam"] = "ml";
  BingTranslateLanguages["Maltese"] = "mt";
  BingTranslateLanguages["Marathi"] = "mr";
  BingTranslateLanguages["Mongolian_Cyrillic"] = "mn-Cyrl";
  BingTranslateLanguages["Mongolian_Traditional"] = "mn-Mong";
  BingTranslateLanguages["Myanmar_Burmese"] = "my";
  BingTranslateLanguages["M\u0101ori"] = "mi";
  BingTranslateLanguages["Nepali"] = "ne";
  BingTranslateLanguages["Norwegian"] = "nb";
  BingTranslateLanguages["Odia"] = "or";
  BingTranslateLanguages["Pashto"] = "ps";
  BingTranslateLanguages["Persian"] = "fa";
  BingTranslateLanguages["Polish"] = "pl";
  BingTranslateLanguages["Portuguese_Brazil"] = "pt";
  BingTranslateLanguages["Portuguese_Portugal"] = "pt-PT";
  BingTranslateLanguages["Punjabi"] = "pa";
  BingTranslateLanguages["Quer\xE9taro_Otomi"] = "otq";
  BingTranslateLanguages["Romanian"] = "ro";
  BingTranslateLanguages["Russian"] = "ru";
  BingTranslateLanguages["Samoan"] = "sm";
  BingTranslateLanguages["Serbian_Cyrillic"] = "sr-Cyrl";
  BingTranslateLanguages["Serbian_Latin"] = "sr-Latn";
  BingTranslateLanguages["Slovak"] = "sk";
  BingTranslateLanguages["Slovenian"] = "sl";
  BingTranslateLanguages["Somali"] = "so";
  BingTranslateLanguages["Spanish"] = "es";
  BingTranslateLanguages["Swahili"] = "sw";
  BingTranslateLanguages["Swedish"] = "sv";
  BingTranslateLanguages["Tahitian"] = "ty";
  BingTranslateLanguages["Tamil"] = "ta";
  BingTranslateLanguages["Tatar"] = "tt";
  BingTranslateLanguages["Telugu"] = "te";
  BingTranslateLanguages["Thai"] = "th";
  BingTranslateLanguages["Tibetan"] = "bo";
  BingTranslateLanguages["Tigrinya"] = "ti";
  BingTranslateLanguages["Tongan"] = "to";
  BingTranslateLanguages["Turkish"] = "tr";
  BingTranslateLanguages["Turkmen"] = "tk";
  BingTranslateLanguages["Ukrainian"] = "uk";
  BingTranslateLanguages["Upper_Sorbian"] = "hsb";
  BingTranslateLanguages["Urdu"] = "ur";
  BingTranslateLanguages["Uyghur"] = "ug";
  BingTranslateLanguages["Uzbek_Latin"] = "uz";
  BingTranslateLanguages["Vietnamese"] = "vi";
  BingTranslateLanguages["Welsh"] = "cy";
  BingTranslateLanguages["Yucatec_Maya"] = "yua";
  BingTranslateLanguages["Zulu"] = "zu";
})(BingTranslateLanguages$1 || (BingTranslateLanguages$1 = {}));
var languages = GoogleTranslateLanguages$1;

exports.getLanguages = getLanguages$1;
exports.languages = languages;
exports.runCli = runCli;
exports.translateFile = translateFile;
exports.translateObject = translateObject;
exports.translateWord = translateWord;
//# sourceMappingURL=json-translator.cjs.development.js.map
