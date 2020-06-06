import { Meteor } from 'meteor/meteor';
import '../imports/api/products.js';

import { WebApp } from 'meteor/webapp';
import bodyParser from "body-parser"
import { Users } from '../imports/api/user.js';

import {Products} from '../imports/api/products.js';
import { Random } from 'meteor/random';

const updateDatabase = (cart, products) => {
  const update= async () => {
      cart.map(item=>{
        const product = products.find(element => { return item.name === element.title});
        
        if(product){
          const amount = product.count - item.count;
          console.log("PROD: ", product._id._str)
          Products.update(product._id, {
            $set: { count: amount },
          });
          console.log(Products.find({}).fetch());
        }
    });
  }

  update();
}

const countItemsInCart = (cart) => {
  console.log("CART:", cart)
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
  return countItems().then(()=> {console.log("AMOUNT", itemsAmount); return itemsAmount});

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

  return checkItems().then(()=>{console.log("AAAA: ", tooSmall); return tooSmall});


}

const validateTransaction = (cart, res, totalPrice) => {
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
          updateDatabase(cart, products);
          

        }
      });
    })
  })
  
}

Meteor.startup(() => {
  // code to run on server at startup
  WebApp.connectHandlers.use(bodyParser.json())
  WebApp.connectHandlers.use((req, res, next) => {
    console.log(req.url);
    if (req.url === '/api/register') {
      console.log(req.body);
      Users.insert({
        name: req.body.name,
        password: req.body.password,
        number: req.body.number,
        createdAt: new Date(), // current time
      });
      console.log(Users.find({}).fetch())

      
    }
    else if (req.url === '/api/payinfo') {
      console.log(req.body);
      const cart = req.body.cart;
      const user = req.body.user;
      const totalPrice = req.body.totalPrice;

      validateTransaction(cart, res, totalPrice);
    }
    else {
      next();
    }
  });

});
