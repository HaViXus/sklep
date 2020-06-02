import React, { Component } from 'react';
 
// Task component - represents a single todo item
export default class Product extends Component {
  render() {
    return (
      <li>
        <div className="product_info_container">
          <div className="product_data_container">
            <div className="product_title">
              <a href={`/product/` + this.props.product.title }> {this.props.product.title}</a>
            </div>
            <h3 className="product_price">
              {this.props.product.price.toFixed(2)}$
            </h3>
            <h3 className="product_counter">
              Ilosc sztuk: {this.props.product.count}
            </h3 >
            <h4 className="product_short">
              {this.props.product.short}
            </h4>
          </div>
          <div className="product_image_container">
            <img className="product_image" src={this.props.product.imageSrc}/>
          </div>
        </div>
      </li>
    );
  }
} 