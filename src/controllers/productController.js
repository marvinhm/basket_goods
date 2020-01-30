function productController(Product) {
  function get(req, res) {
    Product.find((err, products) => {
      if (err) {
        return res.send(err);
      }
      return res.json(products);
    });
  }

  return { get };
}

module.exports = productController;
