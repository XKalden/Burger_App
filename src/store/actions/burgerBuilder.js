import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
        
    };
}; 

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name   
    };
};


// get ingredients from axios 
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};


// get ERROR from axios
export const fetchIngredietnsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () =>{
    return dispatch => {
            axios.get('/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredietnsFailed());
            })
    }
}  

