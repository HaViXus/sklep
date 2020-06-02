import React, { Component, useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

const CartItem = (props) => {
    return(
        <>
            <div class="row">
                <div class="col-xs-2"><img class="img-responsive" src="http://placehold.it/100x70"/>
                </div>
                <div class="col-xs-4">
                    <h4 class="product-name"><strong>{props.productName}</strong></h4>
                </div>
                <div class="col-xs-6">
                    <div class="col-xs-6 text-right">
                        <h6><strong> {props.price.toFixed(2)}$ <span class="text-muted">x</span></strong></h6>
                    </div>
                    <div class="col-xs-4">
                        <input type="text" class="form-control input-sm" value={props.count}/>
                    </div>
                    <div class="col-xs-2">
                        <button type="button" class="btn btn-link btn-xs" onClick={()=>{props.removeItemFromCart(props.id)}}>
                            <span class="glyphicon glyphicon-trash"> </span>
                        </button>
                    </div>
                </div>
            </div>
            <hr/>
        </>
    );
};

export default CartItem;