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

  describe('makeStringArray', () => {
    it('given a string, we should get back an array', () => {
      const o1 = new OrderController();
      const givenString = 'test';
      expect(o1.makeStringArray(givenString)).toBeInstanceOf(Array);
    });

    it('given a string "test", we should get back an array of length 1', () => {
      const o1 = new OrderController();
      const givenString = 'test';
      expect(o1.makeStringArray(givenString).length).toEqual(1);
    });

    it('given a string "test, test", we should get back an array of length 2', () => {
      const o1 = new OrderController();
      const givenString = 'test, test';
      expect(o1.makeStringArray(givenString).length).toEqual(2);
    });

    it('given a string "test, test, test", we should get back an array of length 3', () => {
      const o1 = new OrderController();
      const givenString = 'test, test, test';
      expect(o1.makeStringArray(givenString).length).toEqual(3);
    });
  });

  describe('subtotalCalculator', () => {
    it('An apple should have a price of 1.00', () => {
      const o1 = new OrderController();
      const items = 'Apples';

      const subTotal = o1.subtotalCalculator(items).subtotal;
      expect(subTotal).toEqual(1.00);
    });
  });

  describe('discounts', () => {
    describe('10% off Apples', () => {
      it('getDiscountsArray should include 1 Apples discount', () => {
        const o1 = new OrderController();
        const testArray = ['Apples'];

        const discountArray = o1.getDiscountsArray(testArray).discounts;
        expect(discountArray).toEqual(['Apples 10% off']);
      });

      it('getDiscountsArray should include 2 Apples discount', () => {
        const o1 = new OrderController();
        const testArray = ['Apples', 'Apples'];

        const discountArray = o1.getDiscountsArray(testArray).discounts;
        expect(discountArray).toEqual(['Apples 10% off', 'Apples 10% off']);
      });
    });

    describe('Money off when you buy 3 Milks', () => {
      it('Buying 1 Milk should include no Milk discount', () => {
        const o1 = new OrderController();
        const testArray = ['Milk'];

        const discountArray = o1.getDiscountsArray(testArray).discounts;
        expect(discountArray.length).toEqual(0);
      });

      it('Buying 2 Milk should include no Milk discount', () => {
        const o1 = new OrderController();
        const testArray = ['Milk', 'Milk'];

        const discountArray = o1.getDiscountsArray(testArray).discounts;
        expect(discountArray.length).toEqual(0);
      });

      it('Buying 3 Milk should include 1 Milk discount', () => {
        const o1 = new OrderController();
        const testArray = ['Milk', 'Milk', 'Milk'];

        const discountArray = o1.getDiscountsArray(testArray).discounts;
        expect(discountArray.length).toEqual(1);
      });

      it('Buying 4 Milk should include 1 Milk discount', () => {
        const o1 = new OrderController();
        const testArray = ['Milk', 'Milk', 'Milk', 'Milk'];

        const discountArray = o1.getDiscountsArray(testArray).discounts;
        expect(discountArray.length).toEqual(1);
      });

      it('Buying 6 Milk should include 2 Milk discount', () => {
        const o1 = new OrderController();
        const testArray = ['Milk', 'Milk', 'Milk', 'Milk', 'Milk', 'Milk'];

        const discountArray = o1.getDiscountsArray(testArray).discounts;
        expect(discountArray.length).toEqual(2);
      });

      it('Buying 9 Milk should include 3 Milk discount', () => {
        const o1 = new OrderController();
        const testArray = ['Milk', 'Milk', 'Milk', 'Milk', 'Milk', 'Milk', 'Milk', 'Milk', 'Milk'];

        const discountArray = o1.getDiscountsArray(testArray).discounts;
        expect(discountArray.length).toEqual(3);
      });
    });

    describe('Calculate discount amount', () => {
      it('Given an apples discount, should return correct discount', () => {
        const o1 = new OrderController();
        const testArray = ['Apples 10% off'];

        expect(o1.discountCalculator(testArray)).toEqual(0.1);
      });

      it('Given 2 apples discounts, should return correct discount amount', () => {
        const o1 = new OrderController();
        const testArray = ['Apples 10% off', 'Apples 10% off'];

        expect(o1.discountCalculator(testArray)).toEqual(0.2);
      });

      it('Given a milk discount, should return correct discount amount', () => {
        const o1 = new OrderController();
        const testArray = ['3 Milks'];

        expect(o1.discountCalculator(testArray)).toEqual(0.5);
      });

      it('Given 3 milk discounts, should return correct discount amount', () => {
        const o1 = new OrderController();
        const testArray = ['3 Milks', '3 Milks', '3 Milks'];

        expect(o1.discountCalculator(testArray)).toEqual(1.5);
      });
    });
  });
});
