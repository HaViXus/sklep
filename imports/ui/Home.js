import React, { Component, useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
 
import { Products } from '../api/products.js';
 
import Product from './Product.js';
 
const maxElements = 10;

const PaginationButton = (props) => {
    if(props.selected == true)
        return <li key={props.number.toString()} className="page-item active"><a className="page-link" href={`/home/` + (props.number) }>{props.number}</a></li>
    else
        return <li key={props.number.toString()} className="page-item"><a className="page-link" href={`/home/` + (props.number) }>{props.number}</a></li>
}

const CreatePagination = (props) => {
    return( 
        Array.from(Array(props.pages), (e, i) => {
            if(props.selected == i + 1) return <PaginationButton number={i+1} selected={true}/>
            else return <PaginationButton number={i+1} selected={false}/>
        })
    );
}

const getPreviousPagination = (selected) => {
    if(selected == 1)
        return <li key="previous" className="page-item disabled"><a className="page-link" href={`/home/` + (selected-1)} >Previous</a></li>
    else 
        return <li key="previous" className="page-item"><a className="page-link" href={`/home/` + (selected-1)} >Previous</a></li>
}

const getNextPagination = (selected, pages) => {
    if(selected == pages)
        return <li key="next" className="page-item disabled"><a className="page-link" href={`/home/` + (selected+1)} >Next</a></li>
    else 
        return <li key="next" className="page-item"><a className="page-link" href={`/home/` + (selected+1)} >Next</a></li>
}


const Pagination = (props) => {
    const pages = Math.ceil(props.products.length / maxElements);
    return(
        <nav aria-label="...">
            <ul className="pagination">
                
                {getPreviousPagination(props.selected)}
                {pages != 0 ? <CreatePagination pages={pages} 
                                selected={props.selected}/> : 
                            <CreatePagination pages={1} 
                                selected={1}/>
                }
                {getNextPagination(props.selected, pages)}
            </ul>
        </nav>
    );
}
 
const HomePage = (props) => {
    const renderProducts = () => {
        const offset = props.match.params.id ? (props.match.params.id - 1 ) * maxElements : 0;
        const data = props.products.slice(offset, offset+maxElements);

        return data.map((product) => (
        <Product key={product.title} product={product} />
        ));
    }
 
    return ( 
        <div className="container">
            <header >
            <h1>Super przedmioty do kupowania</h1>
            </header>
            
            <Pagination products={props.products} selected={props.match.params.id || 1}/>
    
                <ul>
                {renderProducts()}
                </ul>   
            <Pagination products={props.products} selected={props.match.params.id || 1}/>
        </div>
    );
  
}

export default withTracker(() => {
    return {
      products: Products.find({}).fetch(),
    };
})(HomePage);