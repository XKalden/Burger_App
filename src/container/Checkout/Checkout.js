import React, {Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
// Added Route to nest Contact Data.js
import { Route, Redirect } from 'react-router-dom';

import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

class Checkout extends Component{

  
   
    checkoutCancledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () =>{
        this.props.history.replace('/checkout/contact-data');
    }


    render(){   
        // redirece if there is no ingredient on chekout 
        let summary = <Redirect to="/"/>
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            console.log('this is purchased state', purchasedRedirect);
            console.log('this is proprs purchased', this.props.purchased);
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                    ingredients={this.props.ings}
                    cancleButton={this.checkoutCancledHandler}
                    continueButton={this.checkoutContinueHandler}/>
                    <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData} />
                </div>
            );
        }
     
        return summary;
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
    }
}



export default connect(mapStateToProps)(Checkout);
