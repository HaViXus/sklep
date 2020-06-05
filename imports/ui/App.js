import React, { useState } from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import {useStateWithLocalStorage} from './LocalStorage';

import Home from './Home';

import { Products } from '../api/products.js';
import Product from './Product.js';
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

  const [user, setUser] = useStateWithLocalStorage("user");
  const [cart, setCart] = useStateWithLocalStorage("cart");


  const contextValue = {
    user: user,
    setUser: setUser,
    cart: cart,
    setCart: setCart
  }

  return (

    <userContext.Provider value={contextValue}>
    
      <NavBar cartItems={props.cartItems} user={user} setUser={setUser}/>
      <Router history={browserHistory}>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/home/:id" component={Home}/>
            <Route exact path="/product/:id" component={(componentProps)=> <ProductPage addItem={props.addItemToCart} {...componentProps}/>}/>
            <Route exact path="/author" component={Autor}/>
            <Route exact path="/cart" component={() => <Cart cartItems={props.cartItems} removeItemFromCart={props.removeItemFromCart}/>} />
            <Route exact path="/register" component={RegisterPage}/>
            <Route exact path="/login" component={LoginPage}/>
        </Switch>
      </Router>

      

    </userContext.Provider>
  );
}

const AppManager = () => {
  const [cartItems, setCartItems] = useState(
    [
      {
          id: "d3fS2",
          productName: "Product 1",
          count: 3
      },
      {
          id: "d45fd",
          productName: "Product 2",
          count: 1
      },
      {
          id: "dg5jf7d",
          productName: "Product 1",
          count: 2
      },
    ]
  );
  const addItemToCart = (productName, count) => {
    setCartItems([...cartItems, {name: productName, count: count}]);
  } 

  const removeItemFromCart = (id) => {
    const filteredItems = cartItems.filter((item) => {
      return item.id != id;
    });
    console.log(id);

    setCartItems(filteredItems);
  } 

  const props = {
    cartItems: cartItems,
    setCartItems: setCartItems,
    addItemToCart: addItemToCart,
    removeItemFromCart: removeItemFromCart
  }

  return <App {...props}/>;
};

export default AppManager;
