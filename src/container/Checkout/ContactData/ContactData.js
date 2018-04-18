import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';

import Style from './ContactData.css'


class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render(){
        return (
            <div className={Style.ContactData}>
                <h4>Enter your Contact Data</h4>

                <form>
                    <input className={Style.Input} type="text" name="name" placeholder="Your Name"/>
                    <input className={Style.Input} type="email" name="email" placeholder="Your Email"/>
                    <input className={Style.Input} type="text" name="street" placeholder="Your Street"/>
                    <input className={Style.Input} type="text" name="postal" placeholder="Your Postal"/>
                
                    <Button 
                    btnType="Success">ORDER</Button>
                </form>

            </div>
        )

}
}


export default ContactData;