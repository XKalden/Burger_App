import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialStata = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initialStata, action) => {
    switch (action.type){
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, {purchased: false});
            // return{
            //     ...state,
            //     purchased: false
            // }
            
        case actionTypes.PURCHASE_BURGER_START:
            return{
                ...state,
                loading: true
            }

        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            };

            return{
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            };


        case(actionTypes.PURCHASE_BURGER_FAIL):
            return{
                ...state,
                loading: false,
            };

        case actionTypes.FETCH_ORDERS_START:
            return{
                ...state,
                loading: true
            }

        case actionTypes.FETCH_ORDERS_SUCCESS:
            return{
                ...state,
                orders: action.orders,
                loading: false
            }
        
        case actionTypes.FETCH_ORDERS_FAIL:
            return{
                ...state,
                loading: false
            }

        default: 
            return state
    }
};

export default reducer;

