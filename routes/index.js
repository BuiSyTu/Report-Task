var express = require('express');
var router = express.Router();

var pg = require("pg")

var config = {
  connectionString: 'postgres://witidczijjtnft:220ebe4c41a4e78db9b30207eaee20d0422f92038f958614a09ef9f2f030dbd6@ec2-174-129-231-100.compute-1.amazonaws.com:5432/d4h5vs51ghpb1q'
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
