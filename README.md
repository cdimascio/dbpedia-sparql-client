# dbpedia-sparql-client

## Install
`npm install dbpediq-sparql-client`

## Example

```
import dps from 'dbpedia-sqarql-client';
const query = `
  SELECT * FROM <http://dbpedia.org>
  WHERE {
    ?city <http://dbpedia.org/property/leaderName> ?leaderName
  }
  LIMIT 10`;

dps
  .client() 
  .query(query)
  .timeout(15000) // optional, defaults to 10000
  .asJson() // or asXml()
  .then(r => console.log(JSON.stringify(r)))
  .catch(e => console.error(e))

```

### License
MIT
