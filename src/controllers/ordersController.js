function orderController() {
  this.list = [];
  this.placeOrder = (items) => {
    this.list.push(items);
  };
}

module.exports = orderController;
