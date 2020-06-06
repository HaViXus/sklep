import { Meteor } from 'meteor/meteor';
import '../imports/api/products.js';

import { WebApp } from 'meteor/webapp';
import bodyParser from "body-parser"
import { Users } from '../imports/api/user.js';

import {Products} from '../imports/api/products.js';
import {Orders} from '../imports/api/orders.js';
import { Random } from 'meteor/random';

const updateDatabase = (cart, products) => {
  const update= async () => {
      cart.map(item=>{
        const product = products.find(element => { return item.name === element.title});
        
        if(product){
          const amount = product.count - item.count;
          Products.update(product._id, {
            $set: { count: amount },
          });
        }
    });
  }

  return update();
}

const countItemsInCart = (cart) => {
  let itemsAmount = [];
  const countItems = async () => {
      cart.map(item=>{
      const index = itemsAmount.findIndex(element => { return item.name === element.name});
      if(index !== -1){
        itemsAmount[index].amount = itemsAmount[index].amount + item.count;
      }
      else{
        itemsAmount.push({name: item.name, amount: item.count});
      }
    });
  }
  return countItems().then(()=> {return itemsAmount});

}

const isProperAmount = (cart, products) => {
  let tooSmall = [];
  const checkItems = async () => {
    return cart.map(item => {
    
      const product = products.find((itemFromDB) => {
          return itemFromDB.title === item.name;
      });
      if(product.count < item.amount){
        tooSmall.push({itemName: item.name, avaliable: product.count, itemsInCart: item.amount});
      }
    
    });
  }

  return checkItems().then(()=>{return tooSmall});


}

const validateTransaction = (cart, res, totalPrice, req) => {
  const getProducts = async () => {return Products.find({}).fetch() };

  getProducts().then(products => {
    countItemsInCart(cart).then(itemsAmount=> {
      return itemsAmount;
    }).then((itemsAmount)=>{
      isProperAmount(itemsAmount, products).then(badItems=>{
        if(badItems.length > 0){
          const data = {
            status: "NoItems",
            badItems: badItems
          };
          res.end(JSON.stringify(data));
        }
        else{
          const orderID = Random.id();
          const data = {
            status: "Success",
            numer: "27 1140 2004 0000 3002 0135 5387",
            name: "Radosław Rybarczyk",
            amount: totalPrice,
            currency: "$",
            title: `Opłata za zamówienie o ID: '${orderID}'`
          }
          res.end(JSON.stringify(data));
          updateDatabase(cart, products).then(
            response => {
              Orders.insert({
                street: req.body.street,
                homeNr: req.body.homeNr,
                ZIPCode: req.body.ZIPCode,
                city: req.body.city,
                cart: JSON.stringify(req.body.cart),
                totalPrice: req.body.totalPrice,
                user: req.body.user,
                createdAt: new Date(), // current time
              });
          });
          

        }
      });
    })
  })
  
}

Meteor.startup(() => {
  // code to run on server at startup
  WebApp.connectHandlers.use(bodyParser.json())
  WebApp.connectHandlers.use((req, res, next) => {
    if (req.url === '/api/register') {
      Users.insert({
        name: req.body.name,
        password: req.body.password,
        number: req.body.number,
        createdAt: new Date(), // current time
      });
    }
    else if (req.url === '/api/payinfo') {
      const cart = req.body.cart;
      const user = req.body.user;
      const totalPrice = req.body.totalPrice;

      validateTransaction(cart, res, totalPrice, req);
    }
    else {
      next();
    }
  });

});
