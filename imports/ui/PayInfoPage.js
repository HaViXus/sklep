import React from 'react';

const Autor = (props) => {
    const search = props.history.location.search;
    console.log(props);
    if(search === "?status=OK"){
        return(
            <main role="main" class="container">
                <div class="jumbotron">
                    <h2><b>Zamówienie złożone.</b></h2>
                    <a class="btn btn-lg btn-primary" href="/" role="button">Back to home »</a>
                </div>
            </main>
        );
    }
    else{
        return(
            <main role="main" class="container">
                <div class="jumbotron">
                    <h2><b>Nie udało się przelać środków!</b></h2>
                    <a class="btn btn-lg btn-primary" href="/" role="button">Back to home »</a>
                </div>
            </main>
        );
    }
    
}

export default Autor;