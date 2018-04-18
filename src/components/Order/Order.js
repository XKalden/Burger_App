import React from 'react';

import Style from './Order.css';

const order = (props) => {

    const ingredients = [];

    for(let ingredientName in props.ingredients){
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName],
            }
        );
    }

    const ingredeintOutput =  ingredients.map(ig => {
        return <span 
            style={{
                testTransform: 'capitalize',
                diplay: 'inline-block',
        
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'


            }}
            key={ig.name}>{ig.name} ({ig.amount}) </span>

    })

    return(
        <div className={Style.Order}>
            <p>Ingredients: {ingredeintOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};


export default order;