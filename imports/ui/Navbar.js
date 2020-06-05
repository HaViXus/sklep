import React from 'react';

const getLoginPanel = (user, setUser)=>{
    
    if(user != ""){
        return(<li><button className="btn" onClick={()=>{setUser("")}}>logout</button></li>);
    }
    else{
        return(
            <>
                <li><a href="/register">Sign in</a></li>
                <li><a  href="/login"><b>Login</b></a></li>
            </>
        );
    } 
}

const getCart = (user, itemsAmount) => {
    return user==="" ? <></> : <li><a href="/cart">Cart ({itemsAmount})</a></li>;
}

const getLoggedInfo = (user) => {
    return user === "" ? <></> : <li>Logged as: {user} </li>
}

const NavBar = (props) => {
    
    console.log(props);
    return(
        <div>
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">NiesamowitaNazwaSklepu</a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li><a href="/">Home</a></li>
                        <li><a href="/author">Autor</a></li>
                        {getCart(props.user, props.cartItems.length)}
                    </ul>
                    <ul class="nav navbar-nav navbar-right"> 
                        {getLoggedInfo(props.user)}
                        {getLoginPanel(props.user, props.setUser)}
                    </ul>
                </div>
            </nav>  
        </div>
    );
}

export default NavBar;