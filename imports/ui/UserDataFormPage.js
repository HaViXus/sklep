import React, {  useState } from 'react';
import {userContext} from './userContext';
import axios from 'axios';

const UserDataFormPage = (props) => {

    const state = props.history.location.state;
    console.log(state);

    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [ZIPCode, setZIPCode] = useState("");
    const [homeNr, setHomeNr] = useState("");
    const [isFormValid, setIsFormValid] = useState(true);

    const onChangeInputStreet = (evt) => {
        setStreet(evt.target.value);
    }
    const onChangeInputCity = (evt) => {
        setCity(evt.target.value);
    }
    const onChangeInputZipCode = (evt) => {
        setZIPCode(evt.target.value);
    }
    const onChangeInputHomeNr = (evt) => {
        setHomeNr(evt.target.value);
    }

    const onSubmit = (setCart) => {
        let isValid = true;
        if(street.length === 0) isValid = false;
        else if(ZIPCode.length === 0) isValid = false;
        else if(homeNr.length === 0) isValid = false;
        else if(city.length === 0) isValid = false;
        console.log(street.length, " ", street.length)
        if(!isValid){
            setIsFormValid(false);
        }
        else{
            const cartToSend = JSON.stringify(props.cartItems);
            console.log(cartToSend);
            axios.post(`/api/payinfo`, {
                user: state.user,
                cart: state.cart,
                totalPrice: state.totalPrice,
                street: street,
                homeNr: homeNr,
                ZIPCode: ZIPCode,
                city: city
            })
            .then(res => {  

                console.log("RES: ", res);
                console.log("DATA: ", res.data);
                if(res.data.status==="Success"){
                    props.history.push("/payinfo",{
                        numer: res.data.numer,
                        name: res.data.name,
                        amount: res.data.amount,
                        currency: res.data.currency,
                        title: res.data.title,
                    });
                    setCart(JSON.stringify([]));
                }
                else if(res.data.status==="NoItems"){
                    setErrorMessage(`Brak towaru: ${printBadItems(res.data.badItems)}`)
                }
            }).catch(error => {
                console.log(error);
            })
        }

    }

    return(
        <div class="container register-form">
            <div class="form">
                <div class="note">
                    <p>Join to us and buy best products in all universe!</p>
                </div>

                <div class="form-content">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Numer domu i mieszkania" 
                                value={homeNr} onChange={onChangeInputHomeNr}/>
                            </div>
                            <div class="form-group">
                                <input class="form-control" placeholder="Ulica" 
                                onChange={onChangeInputStreet} value={street} type="text"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Kod pocztowy" 
                                value={ZIPCode} onChange={onChangeInputZipCode}/>
                            </div>
                            <div class="form-group">
                                <input type="text" className={`form-control`} placeholder="Miasto" 
                                value={city} onChange={onChangeInputCity}/>
                            </div>
                        </div>
                    </div>
                    <userContext.Consumer>
                    {(value) =>{
                         return <button type="button" class="btn btn-success" onClick={()=>{onSubmit(value.setCart)}}>Przejdź do płatności</button>
                     }}
                    </userContext.Consumer>
                    
                    {isFormValid ? "" : "Error in form!"}
                </div>
            </div>
        </div>
            
    );
}

export default UserDataFormPage;