/* eslint-disable keyword-spacing */
/* eslint-disable guard-for-in */

function orderController(nav, Order) {
  const stockList = [{ name: 'apples', price: 1.00 }, { name: 'bread', price: 0.8 }, { name: 'milk', price: 1.15 }, { name: 'soup', price: 0.65 }];


  function appleChecker(item) {
    let bool = false;
    if(item.toLowerCase() === 'apples') {
      bool = true;
    }
    return bool;
  }

  function discountCalculator(discountArray) {
    let discountAmount = 0;
    for(let i = 0; i < discountArray.length; i++) {
      if(discountArray[i] === 'Apples 10% off') {
        discountAmount += (stockList[0].price * 0.1);
      } else if (discountArray[i] === '3 Milks') {
        discountAmount += 0.5;
      }
    }
    return discountAmount;
  }

  function getDiscountsArray(basket) {
    const discountRecipt = [];
    let milkCount = 0;
    for(let i = 0; i < basket.length; i++) {
      const item = basket[i];
      if(appleChecker(item)) {
        discountRecipt.push('Apples 10% off');
      }
      if (item.toLowerCase() === 'milk') {
        milkCount += 1;
        if(milkCount === 3) {
          discountRecipt.push('3 Milks');
          milkCount = 0;
        }
      }
    }
    return { discounts: discountRecipt };
  }

  function makeStringArray(line) {
    let arr = '';
    if(line.includes(',')) {
      arr = line.split(', ');
    } else {
      arr = [];
      arr.push(line);
    }
    return arr;
  }

  function subtotalCalculator(line) {
    const arrayOfItems = makeStringArray(line);
    let item = '';
    let subTot = 0;
    const purchased = [];
    // eslint-disable-next-line no-restricted-syntax
    for (let i in arrayOfItems) {
      item = arrayOfItems[i];
      // eslint-disable-next-line no-restricted-syntax
      for(let x in stockList) {
        if (item.toLowerCase() === stockList[x].name.toLowerCase()) {
          const common = stockList[x].name;
          subTot += stockList[x].price;
          purchased.push(common);
        }
      }
    }
    return {
      itemsPurchased: purchased,
      subtotal: subTot,
    };
  }
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
    makeStringArray,
    subtotalCalculator,
    getDiscountsArray,
    discountCalculator,
  };
}

module.exports = orderController;
