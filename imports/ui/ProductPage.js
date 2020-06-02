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
        <div className="container">
        	<div className="row">
                <div className="col-xs-4 item-photo">
                    <img className="img-responsive" src={product.imageSrc}/>
                </div>
                <div className="col-xs-5" >
                    <h2>{product.title}</h2>    
                    <h4 className="title-price"><small>PRICE</small></h4>
                    <h3> {product.price.toFixed(2)}$</h3>
        
                    <div className="section">
                        <h4 className="title-attr"><small>QUANTITY</small></h4>                    
                        <div>
                            <button className="btn-minus" onClick={removeProduct}><span className="glyphicon glyphicon-minus" onClick={removeProduct}></span></button>
                            <input onChange={onChangeInput} value={counter} type="text" pattern="[0-9]*"/>
                            <button className="btn-plus" onClick={addProduct}><span className="glyphicon glyphicon-plus"  ></span></button>
                            (Max: {product.count})
                        </div>
                    </div>     
                    <hr/>
                    <button class="btn btn-success" onClick={()=>{props.addItem(product.title, counter)}}>
                        <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> 
                        Agregar al carro
                    </button>
                                                                   
                </div>      

        
                <div className="col-xs-9">
                    <h3>Description</h3>
                    <div >
                        <p >
                            {product.short}
                        </p>
                    </div>
                </div>		
            </div>
        </div>
    );

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
                imageSrc: "/2.jpg",
                price: 15.90
            },
            {
                title: "Product 3",
                short: "To jest jakis krotki 3 opis he he he",
                count: 654,
                imageSrc: "/3.jpg",
                price: 0.35
            },
        ]
      //products: Products.find({}).fetch(),
    };
})(ProductPage);