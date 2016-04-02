import rp from 'request-promise';

class DbPediaSparql {
  constructor() {
    this._query = null;
    this._uri = 'http://dbpedia.org/sparql';
    this._timeout = 10000;
  }

  static client() {
    return new DbPediaSparql();
  }

  query(query) {
    this._query = query;
    return this;
  }

  timeout(timeout) {
    this._timeout = timeout;
  }

  asJson() {
    return this._execute({ format: 'json'});
  }

  asXml() {
    return this._execute({ format: 'xml' });
  }

  _execute(opts) {
    if (!this._uri) {
      Promise.reject('no uri specified');
    }
    if (!this._query) {
      Promise.reject('no query specified');
    }

    let qs = {
      query: this._query,
      format: 'application/sparql-results+json',
      timeout: this._timeout
    };

    let headers = {
      'Content-type' : 'application/x-www-form-urlencoded',
      'Accept' : 'application/sparql-results+json'
    };

    if (opts.format === 'xml') {
      delete qs.format;
      delete headers.Accept;
    }

    let options = {
      method: 'GET',
      encoding: 'utf8',
      uri: this._uri,
      qs,
      headers,
      json: this._json
    };

    return rp(options);
  }
}

export default DbPediaSparql;