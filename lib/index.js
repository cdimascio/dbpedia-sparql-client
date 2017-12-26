const isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
const fetch = (isBrowser()) ? window.fetch : require('node-fetch');
class DbPediaSparql {
  constructor() {
    this._query = null;
    this._uri = 'https://dbpedia.org/sparql';
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
    return this;
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
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Accept' : 'application/sparql-results+json'
    };

    if (opts.format === 'xml') {
      delete qs.format;
      delete headers.Accept;
    }

    const qst = '?'+Object.keys(qs)
        .map(key => `${key}=${encodeURIComponent(qs[key])}`)
        .join('&');

    return fetch(this._uri+qst, {
        headers,
        method: 'GET',
        mode: 'cors'
      })
      .then(res => {
        if (opts.format === 'json') {
          return res.json()
        } else {
          return res.text();
        }
      });
  }
}

export default DbPediaSparql;