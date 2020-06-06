import React from 'react';

const Autor = (props) => {
    const state = props.history.location.state;
    console.log(props);
    return(
        <main role="main" class="container">
            <div class="jumbotron">
                <h2><b>Zamówienie złożone.</b></h2>
                <h3><b> Dane do dokonania przelewu:</b></h3>
                <hr/>
                <p class="lead"><b>Numer rachunku: </b>{state.numer}</p>
                <p class="lead"><b>Dane odbiorcy: </b>{state.name}</p>
                <p class="lead"><b>Kwota: </b>{state.amount} {state.currency} </p>
                <p class="lead"><b>Tytułem: </b>{state.title}</p>

                <a class="btn btn-lg btn-primary" href="/" role="button">Back to home »</a>
            </div>
        </main>
    );
}

export default Autor;