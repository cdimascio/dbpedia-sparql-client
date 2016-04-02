var dps = require('../../index').default;
var query = 'SELECT DISTINCT ?Concept WHERE {[] a ?Concept} LIMIT 10';
dps.client()
  .query(query)
  .asXml()
  .then(function(r) {
    console.log(r);
  })
  .catch(function(e) {
    console.error("ERROR: "+e);
  })
