import * as actionTypes from '../actions/actionTypes';


const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const ingredient_price = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.ADD_INGREDIENT):
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1  
                },
                totalPrice: state.totalPrice + ingredient_price[action.ingredientName],
                
            
            };
        case(actionTypes.REMOVE_INGREDIENT):
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - ingredient_price[action.ingredientName],
            };

        case(actionTypes.SET_INGREDIENTS):
            return{
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                
                error: false,
            };
        
        case(actionTypes.FETCH_INGREDIENTS_FAILED):
            return{
                ...state,
                error: true,
            }

    
        default:
            return state;
    }



}


export default reducer;