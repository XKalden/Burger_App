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

import { updateObject , checkValidity} from '../../../shared/utility';



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
            orderData: formData,
            userId: this.props.userId,
        }

        // order data props 
        this.props.onOrderBurger(order,this.props.token);

        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({loading: false});
        //         this.props.history.push('/');
        //     })
        //     .catch(error => {
        //         this.setState({loading: false});
        //     });
    }

    // function to change value  INPUT
    inputChangedHandler = (event, id) => {

        //REFACTORED code using updateObject() 
        const updatedFormElement = updateObject(this.state.orderForm[id],{
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[id].validation),
            touch: true,
        })

        const updatedOrderFrom = updateObject(this.state.orderForm, {
            [id] : updatedFormElement
        });
        
        
        // const updatedOrderFrom = {
        //     ...this.state.orderForm
        // }


        // copy deep element from state
        // const updatedFormElement = {
        //     ...updatedOrderFrom[id]
        // }

        // updatedFormElement.value = event.target.value;
        // // Added Touch statment to be true 
        // updatedFormElement.touch = true;
        
        // updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        
        // updatedOrderFrom[id] = updatedFormElement;
        

        //check if all Input are filled
        let formValidBool = true;
        for (let keyInput in updatedOrderFrom){
            formValidBool = updatedOrderFrom[keyInput].valid && formValidBool;     
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
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
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
        token: state.auth.token,

        userId: state.auth.userId,

    }
};


const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));