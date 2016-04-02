# dbpedia-sparql-client

## Install

`npm install dbpediq-sparql-client`

## Example
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
  .catch(function(e) { /* handle error });

```

### License
MIT
