import React, { Component, useState } from 'react';
import CartItem from './CartItem';
import { withTracker } from 'meteor/react-meteor-data';

const Cart = (props) => {

    const renderItems = () => {
        console.log(props);

        return props.cartItems.map((item) =>{
            const product = props.products.find((itemFromDB) => {
                return itemFromDB.title === item.productName;
            });
            return <CartItem productName={item.productName} 
                                count={item.count} 
                                price={product.price}
                                id = {item.id}
                                removeItemFromCart={props.removeItemFromCart} />;
        });
    }

    const getTotalPrice = () => {
        let price = 0;
        props.cartItems.map((item) => {
            const product = props.products.find((itemFromDB) => {
                return itemFromDB.title === item.productName;
            })
            price += product.price * item.count;
        });
        return price.toFixed(2);
    }


    return(
        <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <div class="panel panel-info">
                    <div class="panel-heading">
                        <div class="panel-title">
                            <div class="row">
                                <div class="col-xs-6">
                                    <h5><span class="glyphicon glyphicon-shopping-cart"></span> Shopping Cart</h5>
                                </div>
                                <div class="col-xs-6">
                                    <button type="button" class="btn btn-primary btn-sm btn-block">
                                        <span class="glyphicon glyphicon-share-alt"></span> Continue shopping
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel-body">  
                        {renderItems()}                   
                    </div>
                    <div class="panel-footer">
                        <div class="row text-center">
                            <div class="col-xs-9">
                                <h4 class="text-right">Total <strong>${getTotalPrice()}</strong></h4>
                            </div>
                            <div class="col-xs-3">
                                <button type="button" class="btn btn-success btn-block">
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}


export default withTracker((props) => {
    return {
        ...props,
        products:[
            {
                title: "Product 1",
                short: "To jest jakis krotki opis he he he",
                count: 10,
                imageSrc: "/1.png",
                price: 5.50
            },
            {
                title: "Product 2",
                short: "To jest jakis krotki 2 opis he he he",
                count: 16,
                imageSrc: "/2.png",
                price: 15.90
            },
            {
                title: "Product 3",
                short: "To jest jakis krotki 3 opis he he he",
                count: 654,
                imageSrc: "/3.png",
                price: 0.35
            },
        ]
     
      //products: Products.find({}).fetch(),
    };
})(Cart);
