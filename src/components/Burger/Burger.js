import React from 'react';
import Style from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';



const burger = (props) => {

    let transformIngredient = Object.keys(props.ingredients)
        .map(i => {
            return [...Array(props.ingredients[i])]
                .map((_,k) => {
                    console.log(props.ingredients[i] + i);
                    console.log('index ' +k);
                    return <BurgerIngredient key={i + k} type={i} />
                });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        },[]);


    if(transformIngredient.length <= 0){
        transformIngredient = <p> Please start adding Ingredients!</p>;
    }

    console.log(transformIngredient);

 

    return (
        <div className={Style.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformIngredient}
            <BurgerIngredient type="bread-bottom"/>

        </div>
    );

}

export default burger;