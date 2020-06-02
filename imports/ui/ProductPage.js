import React, {  useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {Link} from 'react-router';

ProductPage = (props) => {

    const product = props.products.find((product)=>{
        return product.title === props.match.params.id;
    });
    const [counter, setCounter] = useState(1);

    const addProduct = () =>{
        if(counter < product.count) setCounter(counter + 1);
    }

    const removeProduct = () => {
        if(counter > 0) setCounter(counter - 1);
    }

    const onChangeInput = (evt) => {
        const isValid = (evt.target.validity.valid);
        if(isValid){
            const value = Number(evt.target.value);
            if(value <= product.count) setCounter(value);
        } 
    }

    console.log(props);
    return(
        <div className="product-page">

            <div className="product_data_container">
                <div className="product_title">
                    <a href={`/product/` + product.title }> {product.title}</a>
                </div>
                <div className="product_short">
                    {product.short}
                </div>
                <div className="product_price">
                    {product.price.toFixed(2)}$
                </div>
                <div className="product_counter">
                    Ilosc sztuk: {product.count}
                </div >
            </div>
            <div className="product_image_container">
                <img className="product_image" src={product.imageSrc}/>
            </div>
            <div className="sell-panel">
                <button type="button" className="btn btn-primary" onClick={addProduct}>+</button>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={onChangeInput} value={counter} type="text" aria-describedby="basic-addon1" pattern="[0-9]*"/>
                </div>
                <button type="button" className="btn btn-primary" onClick={removeProduct}>-</button>
                <button type="button" className="btn btn-primary"> Add to cart</button>
            </div>

        </div>
    )

}

export default withTracker((props) => {
    return {
        ...props,
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
})(ProductPage);