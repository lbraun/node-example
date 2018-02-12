var express = require('express');
var app = express();
var uri_root = "http://localhost"
var port = 3000;

var bodyParser = require("body-parser");
app.use(bodyParser.json());

// app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/angular_app'));

var Product = require("./model/product");

app.get('/api/catalog', function (req, res) {
  res.json(catalog);
});

// Read
app.get('/api/catalog/:id', function (req, res, next) {
  var productId = req.params.id;

  Product.findOne({id: productId}, function(err, product) {
    if(err) {
      res.status(500);
      next("Internal server error.");
    } else if(product == null) {
      res.status(404); // Not found
      next("No product with id " + productId + " found.");
    } else {
      res.status(200);
      res.json(product);
    }
  });
});

// Create
app.post("/api/catalog", function(req, res, next) {
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

// Update
app.put("/api/catalog/:id", function(req, res, next) {
  var id = req.params.id;

  if (id in catalog) {
    catalog[id] = req.body;
    res.set("Location", `${uri_root}:${port}/`)
    res.status(200);
    res.send(req.body);
  } else {
    res.status(404);
    next("No product with id " + id + " found!");
  }
});

// Delete
app.delete("/api/catalog/:id", function(req, res, next) {
  var id = req.params.id;

  if (id in catalog) {
    deleted_product = catalog[id];
    delete catalog[id];
    res.set("Location", `${uri_root}:${port}/`)
    res.status(200);
    res.send(deleted_product);
  } else {
    res.status(404);
    next("No product with id " + id + " found!");
  }
})


var server = app.listen(port, function () {
  console.log(`Server running at ${uri_root}:${port}/`);
});
