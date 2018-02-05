var express = require('express');
var app = express();
var port = 3000;

var catalog = new Object();
catalog[0] = {id:0, name: "USB drive 16 GB", price: 10}
catalog[1] = {id:1, name: "USB drive 32 GB", price: 18}

app.get('/', function (req, res) {
  res.send("Hello and welcome!");
});

app.get('/catalog', function (req, res) {
  res.json(catalog);
});

app.get('/catalog/:id', function (req, res, next) {
  var id = req.params.id;
  if (id in catalog) {
    res.json(catalog[id]);
  } else {
    next("No product with code " + id + " found!");
    res.status(404);
    res.send();
  }
});


var server = app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port);
});
