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
            <div className="product_short">
              {this.props.product.short}
            </div>
            <div className="product_price">
              {this.props.product.price.toFixed(2)}$
            </div>
            <div className="product_counter">
              Ilosc sztuk: {this.props.product.count}
            </div >
          </div>
          <div className="product_image_container">
            <img className="product_image" src={this.props.product.imageSrc}/>
          </div>
        </div>
      </li>
    );
  }
} 