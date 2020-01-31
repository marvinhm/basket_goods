/* eslint-disable keyword-spacing */
/* eslint-disable guard-for-in */

function orderController(nav, Order) {
  const stockList = [{ name: 'apples', price: 1.00 }, { name: 'bread', price: 0.8 }, { name: 'milk', price: 1.15 }, { name: 'soup', price: 0.65 }];

  function getNew(req, res) {
    return res.render(
      'orderNew',
      {
        nav,
        title: 'Make an order',
      },
    );
  }
  function get(req, res) {
    Order.find((err, orders) => {
      if (err) {
        return res.send(err);
      }
      // return res.json(orders);
      return res.render(
        'orderIndex',
        {
          nav,
          title: 'List of Orders',
          orders,
        },
      );
    });
  }

  function show(req, res) {
    Order.find((err, orders) => {
      if (err) {
        return res.send(err);
      }
      if(orders.length < 1) {
        return res.send(
          {
            orderStatus: 'basket loading',
          },
        );
      }
      const cuurentOrder = orders.reverse()[0];
      return res.json({
        subtotal: subtotalCalculator(cuurentOrder.list).subtotal.toFixed(2),
        discounts: getDiscountsArray(cuurentOrder.list.split(', ')).discounts,
        discountAmount: discountCalculator(getDiscountsArray(cuurentOrder.list.split(', ')).discounts).toFixed(2),
        total: subtotalCalculator(cuurentOrder.list).subtotal.toFixed(2) - discountCalculator(getDiscountsArray(cuurentOrder.list.split(', ')).discounts).toFixed(2),
        currency: cuurentOrder.currency,
      });
    });
  }

  function post(req, res) {
    const order = new Order(req.body);

    order.save();
    if(req.params.id) {
      res.redirect('/api/order/show');
    }
    return res.status(201).json(order);
  }
  // Return methods for REST and test purposes
  return {
    get,
    post,
    getNew,
    show,
    stockList,
  };
}

module.exports = orderController;
