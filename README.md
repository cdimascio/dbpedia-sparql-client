# dbpedia-sparql-client

A promisified DBpedia SPARQL client that keeps it simple.

## Install

`npm install dbpediq-sparql-client`

#### Note: 
Requires fetch when running in a browser. If fetch is not available, install a [fetch polyfill](https://github.com/github/fetch)


## Use
###ES2015

```
import dps from 'dbpedia-sparql-client';
const query = `SELECT DISTINCT ?Concept WHERE {[] a ?Concept} LIMIT 10`;

dps
  .client() 
  .query(query)
  .timeout(15000) // optional, defaults to 10000
  .asJson()       // or asXml()
  .then(r => { /* handle success */})
  .catch(e => { /* handle error */});

```

###ES5
```
var dps = require('dbpedia-sparql-client').default;
var query = 'SELECT DISTINCT ?Concept WHERE {[] a ?Concept} LIMIT 10';

dps.client()
  .query(query)
  .timeout(15000) // optional, defaults to 10000
  .asJson() // or asXml()
  .then(function(r) { /* handle success */ })
  .catch(function(e) { /* handle error */ });

```


### License
MIT
