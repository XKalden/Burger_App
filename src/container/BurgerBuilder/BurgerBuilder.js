import React,{ Component } from 'react';
import Aux from '../../hoc/Aux.js';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const ingredient_price = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4

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

    }




    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let i in disabledInfo){
            disabledInfo[i] = disabledInfo[i] <= 0;
        }





        return(
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    addIngredient={this.addIngredientHandler}
                    remIngredient={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}/>

            </Aux>
        );
    }



} 


export default BurgerBuilder;