// const should = require('should');
// const sinon = require('sinon');
// const productController = require('../src/controllers/productController');
const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');

describe('api/products', () => {
  describe('GET', () => {
    it('Should return all products', async () => {
      const res = await request(app).get('/api/products');
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(4);
    });
  });
});
