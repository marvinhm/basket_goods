// const { expect } = require('chai');
// const request = require('supertest');

const OrderController = require('../src/controllers/orderController');


describe('Orders', () => {
  describe('stockList', () => {
    it('should return an order w/ an array', () => {
      const o1 = new OrderController();
      expect(o1.stockList).toBeInstanceOf(Array);
    });

    it('Array should have 5 items', () => {
      const o1 = new OrderController();
      expect(o1.stockList.length).toEqual(4);
    });
  });
});
