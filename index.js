'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
var fetch = isBrowser() ? window.fetch : require('node-fetch');

var DbPediaSparql = function () {
  function DbPediaSparql() {
    _classCallCheck(this, DbPediaSparql);

    this._query = null;
    this._uri = 'https://dbpedia.org/sparql';
    this._timeout = 10000;
  }

  _createClass(DbPediaSparql, [{
    key: 'query',
    value: function query(_query) {
      this._query = _query;
      return this;
    }
  }, {
    key: 'timeout',
    value: function timeout(_timeout) {
      this._timeout = _timeout;
      return this;
    }
  }, {
    key: 'asJson',
    value: function asJson() {
      return this._execute({ format: 'json' });
    }
  }, {
    key: 'asXml',
    value: function asXml() {
      return this._execute({ format: 'xml' });
    }
  }, {
    key: '_execute',
    value: function _execute(opts) {
      if (!this._uri) {
        Promise.reject('no uri specified');
      }
      if (!this._query) {
        Promise.reject('no query specified');
      }

      var qs = {
        query: this._query,
        format: 'application/sparql-results+json',
        timeout: this._timeout
      };

      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/sparql-results+json'
      };

      if (opts.format === 'xml') {
        delete qs.format;
        delete headers.Accept;
      }

      var qst = '?' + Object.keys(qs).map(function (key) {
        return key + '=' + encodeURIComponent(qs[key]);
      }).join('&');

      return fetch(this._uri + qst, {
        headers: headers,
        method: 'GET',
        mode: 'cors'
      }).then(function (res) {
        if (opts.format === 'json') {
          return res.json();
        } else {
          return res.text();
        }
      });
    }
  }], [{
    key: 'client',
    value: function client() {
      return new DbPediaSparql();
    }
  }]);

  return DbPediaSparql;
}();

exports.default = DbPediaSparql;
