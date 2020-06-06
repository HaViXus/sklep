import React, { Component, useState, useEffect } from 'react';
import CartItem from './CartItem';
import { withTracker } from 'meteor/react-meteor-data';
import { Products } from '../api/products.js';

const Cart = (props) => {
    const [totalPrice, setTotalPrice] = useState(0.00);
    

    useEffect(() => {
        getTotalPrice().then(price => {setTotalPrice(price)});
    });

    const renderItems = () => {
        return props.cartItems.map((item) =>{
            const product = props.products.find((itemFromDB) => {
                return itemFromDB.title === item.name;
            });

            if(product){
                return <CartItem productName={item.name} 
                                    count={item.count} 
                                    price={product.price}
                                    id = {item.id}
                                    imageSrc = {product.imageSrc}
                                    removeItemFromCart={props.removeItemFromCart} />;
            }
            else return( <></> );
        });
    }

    const getTotalPrice = () => {
        
        const getPrice = async () => {
            let price = 0;
            const calculatePrice = async () => {
                return props.cartItems.map((item) => {
                    const getProduct = async () => {
                        return props.products.find((itemFromDB) => {
                            return itemFromDB.title === item.name;
                        })
                    }
                    getProduct().then(product => {price += product.price * item.count; }).catch(error=>{});
                });
            }
            return await calculatePrice().then(()=>{return price;}); 
        }
        return getPrice().then(price=>{return price.toFixed(2)});
    }

    const onCheckout = (history) => {
        history.push("/sendData",{
            user: props.user,
            cart: props.cartItems,
            totalPrice: totalPrice
        });
    }

    const getBuyButton = (props) => {
        if(props.cartItems.length > 0){
            return(
                <button type="button" class="btn btn-success btn-block" onClick={()=>onCheckout(props.history)}>
                    Zamów
                </button>
            );
        }
        else return (<></>);    
    }

    const getContent = () => {
        if(props.products.length > 0){
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
                                                <a class="btn btn-lg btn-primary btn-sm btn-block" href="/" role="button">
                                                    <span class="glyphicon glyphicon-share-alt"></span> Continue shopping
                                                </a>
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
                                            <h4 class="text-right">Total <strong>${totalPrice}</strong></h4>
                                        </div>
                                        <div class="col-xs-3">
                                            {getBuyButton(props)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
            );
        }
        else return (<></>);
    }

    return(
        getContent()
    );
}


export default withTracker((props) => {
    return {
        ...props, 
        products: Products.find({}).fetch(),
    };
})(Cart);
