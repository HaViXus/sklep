import React, {  useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Products } from '../api/products.js';
import { Random } from 'meteor/random';
import {userContext} from './userContext';

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

    const getBuyButton = (user) => {
        console.log(user)
        if(user != ""){
            return(
                <button class="btn btn-success" onClick={()=>{props.addItem(Random.id(), product.title, counter)}}>
                                    <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> 
                                    Put to Cart
                </button>
            )
        }
        else return <h3 className="text-danger">Log to put item into the cart</h3>

        
    }

    const createContent = () => {
        if(product){
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-xs-4 item-photo">
                            <img className="img-responsive" src={product.imageSrc}/>
                        </div>
                        <div className="col-xs-8" >
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
                            <userContext.Consumer>
                                {(value) =>{
                                    return getBuyButton(value.user)
                                }}
                            </userContext.Consumer>
                            
                                                                        
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
        else return <></>
    }

    return( createContent() );

}

export default withTracker(() => {
    const a = Products.find({}).fetch();
    console.log(a);
    return {
        products: a
    };
})(ProductPage);