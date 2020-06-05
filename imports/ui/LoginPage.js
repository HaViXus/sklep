import React, {  useState } from 'react';
import { Users } from '../api/user.js';
import {userContext} from './userContext';

const LoginPage = (props) => {

    console.log(props);

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isFormValid, setIsFormValid] = useState(true);

    const onChangeInputName = (evt) => {
        setName(evt.target.value);
    }
    const onChangeInputPassword = (evt) => {
        setPassword(evt.target.value);
    }

    const onSubmit = (setUser) => {
        let isValid = true;
        if(name.length == 0) isValid = false;
        if(password.length < 4) isValid = false;

        if(!isValid){
            setIsFormValid(false);
        }
        else{
            // fetch('/api/login', {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         name: name,
            //         password: password,
            //     })
            // });
            const user =  Users.find({name: name}).fetch()[0];
            console.log(user," ", password.toString(), " ", user.password);
            if(!user){isValid = false; }
            else if(user.password !== password.toString()) isValid = false;

            if(isValid === false) setIsFormValid(false);
            else{
                console.log(user.name);
                setUser(user.name);
                //SET USER
                props.history.push("/");
                
                
            }

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
                                <input type="text" class="form-control" placeholder="Your Name *" 
                                value={name} onChange={onChangeInputName}/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="password" class="form-control" placeholder="Your Password *" 
                                value={password} onChange={onChangeInputPassword}/>
                            </div>
                        </div>
                    </div>
                    <userContext.Consumer>
                    {(value) =>{
                         return <button type="button" class="btn btn-success" onClick={()=>{onSubmit(value.setUser)}}>Submit</button> 
                     }}
                    </userContext.Consumer>
                    
                    {isFormValid ? "" : "Bad login or password!"}
                </div>
            </div>
        </div>
            
    );
}

export default LoginPage;