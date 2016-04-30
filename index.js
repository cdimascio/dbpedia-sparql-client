'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DbPediaSparql = function () {
  function DbPediaSparql() {
    _classCallCheck(this, DbPediaSparql);

    this._query = null;
    this._uri = 'http://dbpedia.org/sparql';
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
        'Content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/sparql-results+json'
      };

      if (opts.format === 'xml') {
        delete qs.format;
        delete headers.Accept;
      }

      var options = {
        method: 'GET',
        encoding: 'utf8',
        uri: this._uri,
        qs: qs,
        headers: headers,
        json: opts.format === 'json'
      };

      return (0, _requestPromise2.default)(options);
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
