import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';

// import redux state
import { connect } from 'react-redux';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Style from './ContactData.css'
import axios from '../../../axios-orders';

import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

// import action for axios request 
import * as actions from '../../../store/actions/index';



class ContactData extends Component{
    state = {
        orderForm: {
            name:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required: true,
                },
                valid:false,
                touch: false,
            },
            street:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Steeet'
                },
                value: '',
                validation:{
                    required: true,
                },
                valid:false,
                touch: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 5,
                    maxlength: 5,
                    isNumeric: true
                },
                valid:false,
                touch: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation:{
                    required: true,
                },
                valid:false, 
                touch: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid:false,
                touch: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options:[
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation:{},
                valid:true,
                touch: false,
            },
        },
        fromValid: false,

    }

    orderHandler = (event) => {
        event.preventDefault();

        // this.setState({loading: true});


        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        console.log('OrderData', formData);

        const order = {
            ingredient: this.props.ings,
            price: this.props.price,
            orderData: formData
        }

        // order data props 
        this.props.onOrderBurger(order);

        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({loading: false});
        //         this.props.history.push('/');
        //     })
        //     .catch(error => {
        //         this.setState({loading: false});
        //     });
    }


    checkValidity(value, rule){
        let isValid = true;

        // Make Select be true for required state 
        if(!rule){
            return true;
        }

        if(rule.required ){
            isValid = value.trim() !== '' && isValid;
        }

        if(rule.maxlength){
            // retrun true  Max less & equal to  value.length
            isValid = value.length <= rule.maxlength && isValid;
        }

        if(rule.minLength){
            // Return True min less & equal value.length 
            isValid = value.length >= rule.minLength && isValid;
        }

        if (rule.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rule.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }



    // function to change value  INPUT
    inputChangedHandler = (event, id) => {

        const updatedOrderFrom = {
            ...this.state.orderForm
        }
        // copy deep element from state
        const updatedFormElement = {
            ...updatedOrderFrom[id]
        }
        updatedFormElement.value = event.target.value;
        // Added Touch statment to be true 
        updatedFormElement.touch = true;
        
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderFrom[id] = updatedFormElement;
        

        //check if all Input are filled
        let formValidBool = true;
        for (let keyInput in updatedOrderFrom){
            formValidBool = updatedOrderFrom[keyInput].valid && formValidBool;
            console.log('key ', keyInput);
        }

        console.log('this bool ' + formValidBool);
        console.log('this is ID'+ id);
        
        this.setState({
            orderForm: updatedOrderFrom,
            fromValid:formValidBool
        });
    }






    render(){
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }
    
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        // vaild input False
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}

                        // Click Input (State.touch)
                        touched={formElement.config.touch}


                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        />
                ))}
                
                <Button 
                btnType="Success" disabled={!this.state.fromValid}>ORDER</Button>
            </form>
        );



        if(this.props.loading){
            form = <Spinner />
        }

      
        return (
            <div className={Style.ContactData}>

                <h4>Enter your Contact Data</h4>
                 {form}

            </div>
        )

}
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
    }
};


const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));