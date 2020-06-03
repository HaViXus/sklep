import React, {  useState } from 'react';

const RegisterPage = () => {
    const [number, setNumber] = useState(123456789);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [isFormValid, setIsFormValid] = useState(true);

    const onChangeInputNumber = (evt) => {
        const isValid = (evt.target.validity.valid);
        if(isValid){
            const value = Number(evt.target.value);
            setNumber(value);
        } 
    }
    const onChangeInputName = (evt) => {
        setName(evt.target.value);
    }
    const onChangeInputPassword = (evt) => {
        setPassword(evt.target.value);
    }
    const onChangeInputConfPassword = (evt) => {
        setConfPassword(evt.target.value);
    }

    const onSubmit = () => {
        let isValid = true;
        if(password !== confPassword) isValid = false;
        if(name.length == 0) isValid = false;
        if(password.length < 4) isValid = false;
        if(number.length < 7) isValid = false;

        if(!isValid){
            setIsFormValid(false);
        }
        else{
            fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    password: password,
                    number: number,
                })
            });
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
                            <div class="form-group">
                                <input class="form-control" placeholder="Phone Number *" maxLength="9"
                                onChange={onChangeInputNumber} value={number} type="text" pattern="[0-9]*"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="password" class="form-control" placeholder="Your Password *" 
                                value={password} onChange={onChangeInputPassword}/>
                            </div>
                            <div class="form-group">
                                <input type="password" className={`form-control`} placeholder="Confirm Password *" 
                                value={confPassword} onChange={onChangeInputConfPassword}/>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-success" onClick={onSubmit}>Submit</button>
                    {isFormValid ? "" : "Error in form!"}
                </div>
            </div>
        </div>
            
    );
}

export default RegisterPage;