import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const ingredient_price = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}


// function linking to switch statement (part of REFACTOR Code)
const addIngredient = (state, action) => {
    // Refactor Reducer Code 
        // store ingredient eg bacon : 1
        const updateIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
        // Nested state. and store ingredient
        const updateIngredients = updateObject(state.ingredients, updateIngredient);
        // Nested store ingredient and TotalPrice Increment
        const updateState = {
            ingredients: updateIngredients,
            totalPrice: state.totalPrice + ingredient_price[action.ingredientName],
            building: true,
        }
        // Return state
    return updateObject(state, updateState);
}

// function linking to switch statement 
const removeIngredient = (state, action) => {
    return{
        ...state,
        ingredients:{
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
         
        },
        totalPrice: state.totalPrice - ingredient_price[action.ingredientName],
        building: true,
        };
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.ADD_INGREDIENT): return addIngredient(state, action);       

        case(actionTypes.REMOVE_INGREDIENT): return removeIngredient(state, action);

        case(actionTypes.SET_INGREDIENTS):
            return{
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 4,
                building: false,
                error: false,
            };
        
        case(actionTypes.FETCH_INGREDIENTS_FAILED):
            return updateObject(state, {error: true});
            // return{
            //     ...state,
            //     error: true,
            // }

    
        default:
            return state;
    }
}

export default reducer;
