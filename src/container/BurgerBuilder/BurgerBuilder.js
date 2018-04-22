import React,{ Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';

import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        // purchasable: false,
        purchasing: false,
        // loading: false,
        // error: false,
    }

    componentDidMount(){
        console.log(this.props);
        this.props.onIngredientHandler();

        console.log(this.props.onIngredientHandler);
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         console.log(response.data);
        //         this.setState({ingredients:response.data, error: false});
        //     })
        //     .catch(error => {
        //         this.setState({error: true});
        //     })
    }


    updatePurchaseState = (curretState) => {
        const sum = Object.keys(curretState)
            .map((igkey) => {return curretState[igkey]})
                .reduce((add,el)=>{return add + el},0);
        return sum > 0; 
    }


    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    canclePurchaseHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        // alert('You continue')
    
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({loading: false, purchasing: false});
        //     })
        //     .catch(error => {
        //         this.setState({loading: false, purchasing: false});
        //     });


        // Get Data from state and push to arry as string for Search implement
        // const queryParams = [];
        // for( let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // // push Total price
        // queryParams.push('price=' + this.state.totalPrice);
        
        // const querySearch = queryParams.join('&');

        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + querySearch,
        // });

        //***  Not Using queryParam ****/
        this.props.history.push('./checkout');
        

    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        }

        for(let i in disabledInfo){
            disabledInfo[i] = disabledInfo[i] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredient can't be loaded</p> : <Spinner />
        
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        addIngredient={this.props.onIngredientAdded}
                        remIngredient={this.props.onIngredientRemove}

                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        ordered={this.purchaseHandler}/>  
                </Aux>
            );
            orderSummary = <OrderSummary 
                price={this.props.price}
                ingredients={this.props.ings}
                purchaseCancled={this.canclePurchaseHandler}
                purchaseContinued={this.purchaseContinueHandler}/>
        }

        // if(this.state.loading){
        //     orderSummary = <Spinner />
        // }



        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.canclePurchaseHandler}>
                  {orderSummary}
                </Modal>
                {burger}        
            </Aux>
        );
    }

} 

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    };
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemove: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onIngredientHandler: () => dispatch(burgerBuilderActions.initIngredients()),
    
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));