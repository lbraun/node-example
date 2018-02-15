var express = require("express");
var app = express();
var uri_root = "http://localhost"
var port = 3000;

var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(express.static(__dirname + "/angular_app"));

var Product = require("./model/product");

app.get("/api/catalog", function(req, res) {
  var stream = Product.find().stream();
  var results = {};
  stream.on("data", function(doc) {
      results[doc.id] = doc;
    }).on("error", function(err) {
      res.status(500);
      next(err);
    }).on("close", function() {
      res.status(200);
      res.json(results);
  });
});

// Read
app.get("/api/catalog/:id", function (req, res, next) {
  var productId = req.params.id;

  Product.findOne({id: productId}, function(err, product) {
    if (err) {
      res.status(500);
      next("Internal server error.");
    } else if (product == null) {
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
  Product.create(req.body, function(err, product) {
    if (err) {
      res.status(500);
      next(err);
      next("Internal server error.");
    } else {
      res.set("Location", `${uri_root}:${port}/`)
      res.status(201);
      res.send(req.body);
    }
  });
});

// Update
app.put("/api/catalog/:id", function(req, res, next) {
  Product.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, product) {
    if (err) {
      res.status(404);
      console.log(err);
      next("No product with id " + req.params.id + " found!");
    } else {
      res.set("Location", `${uri_root}:${port}/`)
      res.status(200);
      res.send(req.body);
    }
  });
});

// Delete
app.delete("/api/catalog/:id", function(req, res, next) {
  Product.remove({id: req.params.id}, function(err) {
    if (err) {
      res.status(500);
      next("Internal server error.");
    } else {
      res.status(200);
      res.send();
    }
  });
})


var server = app.listen(port, function () {
  console.log(`Server running at ${uri_root}:${port}/`);
});
