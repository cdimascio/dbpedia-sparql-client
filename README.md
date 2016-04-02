# dbpedia-sparql-client

## Install

`npm install dbpediq-sparql-client`

## Example

```
import dps from 'dbpedia-sparql-client';

const query = `SELECT DISTINCT ?Concept WHERE {[] a ?Concept} LIMIT 10`;

dps
  .client() 
  .query(query)
  .timeout(15000) // optional, defaults to 10000
  .asJson()       // or asXml()
  .then(r => { /* handle success */})
  .catch(e => { /* handle failure */})

```

### License
MIT
