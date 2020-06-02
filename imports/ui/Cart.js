import React, { Component, useState } from 'react';
import CartItem from './CartItem';
import { withTracker } from 'meteor/react-meteor-data';

const Cart = (props) => {

   
    const renderItems = () => {
        console.log(props);
        return props.cartItems.map((product) => (
            <Product productName={product.productName} count={product.count} />
        ));
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
                        
                        <div class="row">
                            <div class="col-xs-2"><img class="img-responsive" src="http://placehold.it/100x70"/>
                            </div>
                            <div class="col-xs-4">
                                <h4 class="product-name"><strong>Product name</strong></h4><h4><small>Product description</small></h4>
                            </div>
                            <div class="col-xs-6">
                                <div class="col-xs-6 text-right">
                                    <h6><strong>25.00 <span class="text-muted">x</span></strong></h6>
                                </div>
                                <div class="col-xs-4">
                                    <input type="text" class="form-control input-sm" value="1"/>
                                </div>
                                <div class="col-xs-2">
                                    <button type="button" class="btn btn-link btn-xs">
                                        <span class="glyphicon glyphicon-trash"> </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div class="row">
                            <div class="text-center">
                                <div class="col-xs-9">
                                    <h6 class="text-right">Added items?</h6>
                                </div>
                                <div class="col-xs-3">
                                    <button type="button" class="btn btn-default btn-sm btn-block">
                                        Update cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel-footer">
                        <div class="row text-center">
                            <div class="col-xs-9">
                                <h4 class="text-right">Total <strong>$50.00</strong></h4>
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
