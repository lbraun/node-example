var db = require("./db");

var Product = db.model('Product', {
  id: {type: String, required: true},
  name: {type: String, required: true},
  price: {type: Number, required: true}
});

module.exports = Product;
