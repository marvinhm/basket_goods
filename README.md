# basket_goods

A program and associated unit tests that prices a basket of goods, while accounting for special oﬀers.


## Design & Structure
I appoached the design by briefly domain modelling the solution in order to figure out where to start. I begun with thinking about a customers path...
- create an order (POST) with a list of items
- check the validity of that list with the products in stock
- run a price/discount check on the list of items and then send results

I also initially planned that I would create a quick frontend to allow ease of use.

### Output

Program will output:
```
{ “subtotal" : <sub-total of the basket, before discounts>, “discounts" : <list of discounts applied. Empty if no discounts>, “discountAmt": <total of the discounts. Zero if no discounts>, “total": <total of the basket, after discounts>, “currency": <the currency of the basket totals> }

```

## Technologies

* [JS/nodeJS]
* [Express] - For serving the input file.
* [Jest] - For unit testing purposes.

* [Nodemon] - To enable live server refreshes after saves.
* [Morgan] - For debugging.
* [Chalk] - For debugging.
* [Mongoose] - For handling MongoDB.
* [ES-Lint] - For Linting.
* [Supertest] - HTTP method testing.
* [EJS] - For templating.
* [Bootstrap] - For templating and styling.


## Getting Started
After cloning the project, install the dependancies with npm
```
npm install
```

## Running Tests
You can run the tests with this line.
```
npm run unit
```

## Starting Node Server
```
npm start
```


### Starting DB 
- This project uses mongoDB to store collections for Orders (and also for Products). To use it download (https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

- Then start mongod to start db server (leave running)
```
mongod

```
- You'll need to use this following command to load products list which is in the base of our project directory
```
mongo shopAPI < productsJson.js

```

### Start Shopping

To start shopping visit (http://localhost:5000)

- Click on "Make Order" link in the navigation to make an order, 
- When making order just list your whole order comma separated in the input box "Shopping List" (e.g. Milk, Bread, Soup)
- Enter your 3 character currency ISO also (UPDATE: ALL ITEMS PRICED IN USD CURRENTLY)
- To check the result hit the "View Order Result" link in the navigation

