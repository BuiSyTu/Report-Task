var express = require('express');
var router = express.Router();

var pg = require("pg")

var config = {
  connectionString: 'postgres://xbziegmhxcxlas:7ce98c2cd9c14199200b76e62e9f8592d717f3e7a1c210f2a85947118130a41c@ec2-174-129-240-67.compute-1.amazonaws.com:5432/d3pkij1joc4ck0'
}

var pool = new pg.Pool(config)


/* GET home page. */
router.get('/', function (req, res, next) {
  pool.connect(function (err, client, done) {
    if (err) {
      return console.error('error ferching client from pool', err)
    }
    client.query('SELECT * from fruit.fruit', function (err, result) {
      done();
      if (err) {
        res.end();
        return console.error('error running query', err)
      }
      res.json(result.rows)
    })
  })
});

module.exports = router;
