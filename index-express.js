var express = require('express');
var app = express();
var uri_root = "http://localhost"
var port = 3000;

var bodyParser = require("body-parser");
app.use(bodyParser.json());

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
    next("No product with id " + id + " found!");
    res.status(404);
    res.send();
  }
});

app.post("/catalog", function(req, res, next) {
  var id = req.body.id;

  if (id in catalog) {
    res.status(400);
    next("A product with id " + id + " already exists!");
  } else {
    catalog[id] = req.body;
    res.set("Location", `${uri_root}:${port}/`)
    res.status(201);
    res.send(req.body);
  }
});

app.put("/catalog/:id", function(req, res, next) {
  var id = req.params.id;

  if (id in catalog) {
    catalog[id] = req.body;
    res.set("Location", `${uri_root}:${port}/`)
    res.status(201);
    res.send(req.body);
  } else {
    res.status(400);
    next("No product with id " + id + " found!");
  }
});


var server = app.listen(port, function () {
  console.log(`Server running at ${uri_root}:${port}/`);
});
