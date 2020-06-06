import React, { useState } from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import {useStateWithLocalStorage} from './LocalStorage';

import Home from './Home';

import ProductPage from './ProductPage';
import Autor from './Autor';
import Cart from "./Cart";
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import NavBar from './Navbar';
import PayInfoPage from './PayInfoPage';
import {userContext} from './userContext';
import UserDataFormPage from './UserDataFormPage';
import Orders from './Orders';
// route components

const browserHistory = createBrowserHistory();
 
// App component - represents the whole app
const  App = (props) => {

  const [cart, setCart] = useStateWithLocalStorage(`cart:${props.user}`);

  const contextValue = {
    user: props.user,
    setUser: props.setUser,
    cart: cart,
    setCart: setCart
  }

  return (

    <userContext.Provider value={contextValue}>
      <NavBar cartItems={props.cartItems} user={props.user} setUser={props.setUser}/>
      <Router history={browserHistory}>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/home/:id" component={Home}/>
            <Route exact path="/orders" component={propsOrders=>{
              return(
                <userContext.Consumer>
                  {(value) =>{
                      return <Orders {...propsOrders} user={value.user}/>
                  }}
                </userContext.Consumer>
              );
            
          }}/>
            <Route exact path="/orders/:id" component={propsOrders=>{
              return(
                <userContext.Consumer>
                  {(value) =>{
                        return <Orders {...propsOrders} user={value.user}/>
                  }}
                </userContext.Consumer>
              );
              
            }}/>
            <Route exact path="/product/:id" component={(componentProps)=> <ProductPage addItem={props.addItemToCart} {...componentProps}/>}/>
            <Route exact path="/author" component={Autor}/>
            <Route exact path="/cart" component={(routerProps) => <Cart {...routerProps} cartItems={props.cartItems} removeItemFromCart={props.removeItemFromCart} user={props.user}/>} />
            <Route exact path="/register" component={RegisterPage}/>
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/payinfo" component={PayInfoPage}/>
            <Route exact path="/sendData" component={UserDataFormPage}/>
            
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

const AppManager = () => {

  const [user, setUser] = useStateWithLocalStorage("user");
  const [cartItems, setCartItems] = useStateWithLocalStorage(`cart:${user}`);
  const addItemToCart = (id, productName, count) => {

    const items = cartItems ? JSON.parse( cartItems ) : [];
    const newItems = [...items, {id: id, name: productName, count: count}];
    setCartItems(JSON.stringify(newItems));
  } 

  const removeItemFromCart = (id) => {
    const filteredItems = JSON.parse(cartItems).filter((item) => {
      return item.id != id;
    });

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
