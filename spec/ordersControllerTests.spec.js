const { expect } = require('chai');
const request = require('supertest');

const OrderController = require('../src/controllers/ordersController');


describe('Orders', () => {

  describe('placeOrder', () => {
    it('should return an order w/ an array of 1 item, when a single product', () => {
      const o1 = new OrderController();
      o1.placeOrder([{ name: 'apple' }]);
      expect(o1.list.length).to.equal(1);
    });

    it('should return an order w/ an array of 2 items, when a two products ordered', () => {
      const o1 = new OrderController();
      o1.placeOrder([{ name: 'apple' }, { name: 'milk' }]);
      expect(o1.list.length).to.equal(2);
    });
  });
});


describe('POST', () => {
  it('should return an order w/ an array of 1 item, when a single product is in request body', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({
        order: ['a'],
      });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('_id');
    expect(res.body.order).to.contain({ name: 'apple' });
  });
});