var dps = require('../../index').default;
var query = 'SELECT DISTINCT ?Concept WHERE {[] a ?Concept} LIMIT 10';
dps.client()
  .query(query)
  .asJson()
  .then(function(r) {
    console.log(JSON.stringify(r, null, 2));
  })
  .catch(function(e) {
    console.error("ERROR: "+e);
  })
