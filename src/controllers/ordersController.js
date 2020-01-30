function orderController() {
  this.list = [];
  this.placeOrder = (items) => {
    for (item in items) {
      this.list.push(items[item]);
    }
  };
}

module.exports = orderController;
