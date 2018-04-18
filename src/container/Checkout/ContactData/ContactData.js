import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Style from './ContactData.css'
import axios from '../../../axios-orders';

class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false

    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);

        this.setState({loading: true});

        const order = {
            ingredient: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Tsering Kalden',
                address: { 
                    street: '123 king',
                    zipcode: '134124',
                    country: 'Canada'
                },
                email: 'mail@tkalden.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    render(){
        let form = (
            <form>
            <input className={Style.Input} type="text" name="name" placeholder="Your Name"/>
            <input className={Style.Input} type="email" name="email" placeholder="Your Email"/>
            <input className={Style.Input} type="text" name="street" placeholder="Your Street"/>
            <input className={Style.Input} type="text" name="postal" placeholder="Your Postal"/>
        
            <Button 
            btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
        );
        if(this.state.loading){
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


export default ContactData;