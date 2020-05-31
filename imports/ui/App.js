import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
 
import { Products } from '../api/products.js';
 
import Product from './Product.js';
 
 
// App component - represents the whole app
class App extends Component {
    renderProducts() {
        console.log(this.props);
        return this.props.products.map((product) => (
        <Product key={product.title} product={product} />
        ));
    }
 
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>
 
        <ul>
          {this.renderProducts()}
        </ul>
      </div>
    );
  }
} 

export default withTracker(() => {
    return {
      products: Products.find({}).fetch(),
    };
  })(App);