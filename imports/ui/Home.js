import React, { Component, useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
 
import { Products } from '../api/products.js';
 
import Product from './Product.js';
 
 
// App component - represents the whole app
const HomePage = (props) => {
    const renderProducts = () => {
        console.log(props);
        return props.products.map((product) => (
        <Product key={product.title} product={product} />
        ));
    }
 
    return (
      <div className="container" onClick={ ()=>{productOnClickHandler()} }>
          
        <header>
          <h1>Todo List</h1>
        </header>
 
        <ul>
          {renderProducts()}
        </ul>
      </div>
    );
  
}

//  const WithTracker = () => {
//      console.log("BBB");
//      console.log( Products.find({}).fetch() );
    
//     const [data, setData] = useState([]);
//     setData(Products.find({}).fetch());
//     return <HomePage products={data} />
// };

export default withTracker(() => {
    return {
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
})(HomePage);

//export default WithTracker;