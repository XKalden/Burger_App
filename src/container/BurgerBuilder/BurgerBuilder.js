import React,{ Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';

import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const ingredient_price = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount(){
        console.log(this.props);

        axios.get('/ingredients.json')
            .then(response => {
                console.log(response.data);
                this.setState({ingredients:response.data, error: false});
            })
            .catch(error => {
                this.setState({error: true});
            })
    }


    updatePurchaseState = (curretState) => {
     
        const sum = Object.keys(curretState)
            .map((igkey) => {return curretState[igkey]})
                .reduce((add,el)=>{return add + el},0);
        this.setState({purchasable: sum > 0});

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updateCount;

        const priceAdditon = ingredient_price[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAdditon;


        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        let updateCount = oldCount - 1;
        
        if(updateCount <= -1){
            updateCount = 0;
        }
        
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updateCount;

        const priceDeduction = ingredient_price[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
 
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
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
        // alert('You continue');

        // this.setState({loading: true});

        // const order = {
        //     ingredient: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Tsering Kalden',
        //         address: { 
        //             street: '123 king',
        //             zipcode: '134124',
        //             country: 'Canada'
        //         },
        //         email: 'mail@tkalden.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }

        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({loading: false, purchasing: false});
        //     })
        //     .catch(error => {
        //         this.setState({loading: false, purchasing: false});
        //     });


        // Get Data from state and push to arry as string for Search implement
        const queryParams = [];
        for( let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        // push Total price
        queryParams.push('price=' + this.state.totalPrice);
        
        const querySearch = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + querySearch,

        });
        console.log(querySearch);

    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let i in disabledInfo){
            disabledInfo[i] = disabledInfo[i] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredient can't be loaded</p> : <Spinner />
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        addIngredient={this.addIngredientHandler}
                        remIngredient={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        p={this.state.purchasable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}/>  
                </Aux>
            );
            orderSummary = <OrderSummary 
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
                purchaseCancled={this.canclePurchaseHandler}
                purchaseContinued={this.purchaseContinueHandler}/>
        }

        if(this.state.loading){
            orderSummary = <Spinner />
        }



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


export default withErrorHandler(BurgerBuilder, axios);