import React, { Component, useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
 
import { Orders } from '../api/orders.js';
 
const maxElements = 10;

const PaginationButton = (props) => {
    if(props.selected == true)
        return <li key={props.number.toString()} className="page-item active"><a className="page-link" href={`/home/` + (props.number) }>{props.number}</a></li>
    else
        return <li key={props.number.toString()} className="page-item"><a className="page-link" href={`/home/` + (props.number) }>{props.number}</a></li>
}

const CreatePagination = (props) => {
    return( 
        Array.from(Array(props.pages), (e, i) => {
            if(props.selected == i + 1) return <PaginationButton number={i+1} selected={true}/>
            else return <PaginationButton number={i+1} selected={false}/>
        })
    );
}

const getPreviousPagination = (selected) => {
    console.log("PPP: ", selected)
    if(selected == 1)
        return <li key="previous" className="page-item disabled"><a className="page-link" href={`/home/` + (selected-1)} >Previous</a></li>
    else 
        return <li key="previous" className="page-item"><a className="page-link" href={`/home/` + (selected-1)} >Previous</a></li>
}

const getNextPagination = (selected, pages) => {
    if(selected == pages)
        return <li key="next" className="page-item disabled"><a className="page-link" href={`/home/` + (selected+1)} >Next</a></li>
    else 
        return <li key="next" className="page-item"><a className="page-link" href={`/home/` + (selected+1)} >Next</a></li>
}


const Pagination = (props) => {
    const pages = Math.ceil(props.products.length / maxElements);
    return(
        <nav aria-label="...">
            <ul className="pagination">
                
                {getPreviousPagination(props.selected)}
                {pages != 0 ? <CreatePagination pages={pages} 
                                selected={props.selected}/> : 
                            <CreatePagination pages={1} 
                                selected={1}/>
                }
                {getNextPagination(props.selected, pages)}
            </ul>
        </nav>
    );
}

const Order = (props) => {
    console.log(props.order)
    return(
        <li>    
            <h3>Order ID: {props.order._id}</h3>       
            <p><b>Price:</b> <b>{props.order.totalPrice}$</b></p>
            <p><b>Home:</b> {props.order.homeNr}</p>
            <p><b>Street:</b> {props.order.street}</p>
            <p><b>ZIP Code:</b> {props.order.ZIPCode}</p>
            <p><b>Cart:</b> {props.order.cart}</p>
            <p><b>Date:</b> {props.order.createdAt.toString()}</p>                     
        </li>
    )
}
 
const OrdersPage = (props) => {
    const renderOrders = () => {
        const offset = props.match.params.id ? (props.match.params.id - 1 ) * maxElements : 0;
        const data = props.orders.slice(offset, offset+maxElements);
        console.log(props);
        if(props.orders.length > 0){
            console.log("AAAAA")
            return data.map((order) => (
                    <Order order={order}/>
            ));
        }
        else{
            console.log("BBBB")
            return <div>Brak zamówień w historii</div>
        }
        
    }

    console.log("ORD");
 
    return ( 
        <div className="container">
            <header >
            <h1>Super przedmioty do kupowania</h1>
            </header>
            
            <Pagination products={props.orders} selected={props.match.params.id || 1}/>
    
            <ul>
                {renderOrders()}
            </ul>
            <Pagination products={props.orders} selected={props.match.params.id || 1}/>
        </div>
    );
  
}

export default withTracker((props) => {
    return {
      orders: Orders.find({user: props.user}).fetch(),
    };
})(OrdersPage);

//export default WithTracker;