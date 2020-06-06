import React, { Component, useState, useEffect } from 'react';
import CartItem from './CartItem';
import { withTracker } from 'meteor/react-meteor-data';
import { Products } from '../api/products.js';
import axios from 'axios';

const Cart = (props) => {
    const [totalPrice, setTotalPrice] = useState(0.00);
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        getTotalPrice().then(price => {setTotalPrice(price)});
    });

    const renderItems = () => {
        console.log(props);

        return props.cartItems.map((item) =>{
            const product = props.products.find((itemFromDB) => {
                console.log(itemFromDB.title," ", item, itemFromDB.title.toString() == item.name);
                return itemFromDB.title === item.name;
            });

            if(product){
                console.log(product);
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
        return getPrice().then(price=>{console.log(price); return price.toFixed(2)});
    }

    const printBadItems = (badItems) => {
        let itemsList = "";
        badItems.map(item=>{
            console.log("VVV:", item);
            itemsList = `${itemsList} Produkt: ${item.itemName} Dostępne: ${item.avaliable} W koszyku: ${item.itemsInCart}\n`;
        });

        return itemsList;
        
    }

    const onCheckout = (history) => {
        const cartToSend = JSON.stringify(props.cartItems);
        console.log(cartToSend);
        axios.post(`/api/payinfo`, {user: props.user, cart: props.cartItems, totalPrice: totalPrice})
        .then(res => {  
            console.log("RES: ", res);
            console.log("DATA: ", res.data);
            if(res.data.status==="Success"){
                history.push("/payinfo",{
                    numer: res.data.numer,
                    name: res.data.name,
                    amount: res.data.amount,
                    currency: res.data.currency,
                    title: res.data.title
                })
            }
            else if(res.data.status==="NoItems"){
                setErrorMessage(`Brak towaru: ${printBadItems(res.data.badItems)}`)
            }
        }).catch(error => {
            console.log(error);
        })

    }

    console.log("COS: ", getTotalPrice());

    const getContent = () => {
        if(props.products.length > 0){
            return(
                <>
                    <div class="container">
                        <h4 className="text-danger">{errorMessage}</h4>
                    </div>

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
                                                <button type="button" class="btn btn-success btn-block" onClick={()=>onCheckout(props.history)}>
                                                    Checkout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
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
