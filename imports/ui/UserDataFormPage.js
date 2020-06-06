import React, {  useState } from 'react';
import {userContext} from './userContext';
import axios from 'axios';

const publicIp = require("react-public-ip");


const UserDataFormPage = (props) => {

    const getDataPromise = (price) => {
        console.log(price);
        const getData = publicIp.v4().then(ip=>{
            const data = {
                "order": {
                    "amount": price.toString(),
                    "currency": "USD",
                    "description": "test"
                },
                "seller": {
                    "account_id": "764280", 
                    "url": "http://localhost:3000/payinfo"   //<------ tutaj url na ktory ma wrocic po dokonaniu platnosci, tez do zmiany
                },
                "payer": {
                    "first_name": "John",
                    "last_name": "Doe",
                    "email": "johndoemail@example.com"
                },
                "payment_method": {
                    "channel_id": "6"    //<-------------- tutaj są różne kanaly i nizej dam info
                },
                "request_context": {
                        "ip":  "109.173.150.83", //<------- do podania ip
                        "language": "pl"  //<--- a to chyba opcjonalne, ale w/e
                }
            }
            return data;
        });
        return getData;
    }
    

    const url = "https://ssl.dotpay.pl/test_payment/payment_api/v1/register_order/"

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
                    // props.history.push("/payinfo",{
                    //     numer: res.data.numer,
                    //     name: res.data.name,
                    //     amount: res.data.amount,
                    //     currency: res.data.currency,
                    //     title: res.data.title,
                    // });
                    getDataPromise(state.totalPrice).then(data=>{
                        axios({
                            method: 'POST',
                            url: url,
                            headers: {"Accept":"application/json", "Content-Type": "application/json",}, 
                            data: data,
                            auth: {
                                username: "tukedarr@gmail.com",   //<--- do wpisania
                                password: "Cyclone1"    // <--- do wpisania
                              }
                            }).then(response => {
                                console.log("RES: ", response)
                                //tutaj otrzymasz link na przekierowanie, tzn. potrzebujesz przejść na link:
                                response.data.redirect_simplified_url
                                //ja to zrobiłam poprzez:
                                window.location.assign(response.data.redirect_simplified_url)
                                //ale to dlatego że mi router kijowo działa na ten moment :D
                            }).catch(error => {
                          });
                          setCart(JSON.stringify([]));
                    })
                    
                    
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