import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import Home from './Home';

import { Products } from '../api/products.js';
import Product from './Product.js';
import ProductPage from './ProductPage';
import Autor from './Autor';
import Cart from "./Cart";
// route components

const browserHistory = createBrowserHistory();
 
// App component - represents the whole app
export default class App extends Component {
  
    renderProducts() {
        console.log(this.props);
        return this.props.products.map((product) => (
        <Product key={product.title} product={product} />
        ));
    }
 
 
  render() {
    return (
      <div>
        <nav class="navbar navbar-default">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="#">NiesamowitaNazwaSklepu</a>
            </div>
            <ul class="nav navbar-nav">
              <li class="active"><a href="/">Home</a></li>
              <li><a href="/author">Autor</a></li>
              <li><a href="/cart">Cart</a></li>
            </ul>
          </div>
        </nav>
        <Router history={browserHistory}>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/product/:id" component={ProductPage}/>
            <Route exact path="/author" component={Autor}/>
            <Route exact path="/cart" component={Cart}/>
        </Switch>
        </Router>
      </div>
    );
  }
} 
