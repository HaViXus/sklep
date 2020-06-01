import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import createBrowserHistory from 'history/createBrowserHistory';

import Home from './Home';

import { Products } from '../api/products.js';
import Product from './Product.js';
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
        <Router history={browserHistory}>
        <Switch>
            <Route exact path="/" component={Home}/>
        </Switch>
        </Router>
      </div>
    );
  }
} 