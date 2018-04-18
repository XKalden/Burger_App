import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import Style from './CheckoutSummary.css'

const checkoutSummary = (props) => {
    return (
        <div className={Style.CheckoutSummary}>
            <h1>We Hope it Taste Well!</h1>
            <div style={{width: '100%', margin:'auto'}}> 
            
                <Burger ingredients={props.ingredients}/>
                <Button 
                    btnType="Danger"
                    clicked={props.cancleButton}>CANCLE</Button>
                <Button 
                    btnType="Success"
                    clicked={props.continueButton}>CONTINUE</Button>
                                        
            </div>
        </div>

    )
}

export default checkoutSummary;