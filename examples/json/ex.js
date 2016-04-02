import dps from '../../lib';

const query = `SELECT DISTINCT ?Concept WHERE {[] a ?Concept} LIMIT 10`;
dps
  .client()
  .query(query)
  .asJson()
  .then(r => console.log(JSON.stringify(r)))
  .catch(e => console.error(e))
