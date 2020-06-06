import React, { useState } from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import {useStateWithLocalStorage} from './LocalStorage';

import Home from './Home';

import { Products } from '../api/products.js';

import ProductPage from './ProductPage';
import Autor from './Autor';
import Cart from "./Cart";
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import NavBar from './Navbar';

import {userContext} from './userContext';
// route components

const browserHistory = createBrowserHistory();
 
// App component - represents the whole app
const  App = (props) => {

  const [cart, setCart] = useStateWithLocalStorage("cart");

  const contextValue = {
    user: props.user,
    setUser: props.setUser,
    cart: cart,
    setCart: setCart
  }

  return (

    <userContext.Provider value={contextValue}>
      <button onClick={ ()=>{console.log(cart); props.setCart(JSON.stringify([]))} }></button>   
      <NavBar cartItems={props.cartItems} user={props.user} setUser={props.setUser}/>
      <Router history={browserHistory}>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/home/:id" component={Home}/>
            <Route exact path="/product/:id" component={(componentProps)=> <ProductPage addItem={props.addItemToCart} {...componentProps}/>}/>
            <Route exact path="/author" component={Autor}/>
            <Route exact path="/cart" component={() => <Cart cartItems={props.cartItems} removeItemFromCart={props.removeItemFromCart} user={props.user}/>} />
            <Route exact path="/register" component={RegisterPage}/>
            <Route exact path="/login" component={LoginPage}/>
        </Switch>
      </Router>

      

    </userContext.Provider>
  );
}

const AppManager = () => {
  const mockedCart = [
    {
        id: "d3fS2",
        productName: "Product1",
        count: 3
    },
    {
        id: "d45fd",
        productName: "Product2",
        count: 1
    },
    {
        id: "dg5jf7d",
        productName: "Product1",
        count: 2
    },
  ];

  const [user, setUser] = useStateWithLocalStorage("user");
  const [cartItems, setCartItems] = useStateWithLocalStorage(`cart:${user}`);
  const addItemToCart = (id, productName, count) => {
    console.log(cartItems)

    const items = cartItems ? JSON.parse( cartItems ) : [];
    const newItems = [...items, {id: id, name: productName, count: count}];
    console.log("NEW:", newItems)
    setCartItems(JSON.stringify(newItems));
  } 

  const removeItemFromCart = (id) => {
    const filteredItems = JSON.parse(cartItems).filter((item) => {
      return item.id != id;
    });
    console.log(id);

    setCartItems(JSON.stringify(filteredItems));
  } 

  const props = {
    cartItems: cartItems ? JSON.parse(cartItems) : [],
    setCartItems: setCartItems,
    addItemToCart: addItemToCart,
    removeItemFromCart: removeItemFromCart,
    user: user,
    setUser: setUser
  }

  return <App {...props}/>;
};

export default AppManager;
