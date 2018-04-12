import React from 'react';


import Style from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';


const control = [
    {label:'Salad', type: 'salad'},
    {label:'Bacon', type: 'bacon'},
    {label:'Cheese', type: 'cheese'},
    {label:'Meat', type: 'meat'},

]


const buildControls = (props) => (

    <div className={Style.BuildControls}> 
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>

        {control.map((arr) => (
            <BuildControl 
                key={arr.lable}  
                label={arr.label} 
                added={() => props.addIngredient(arr.type)}
                remove={() => props.remIngredient(arr.type)}
                disable={props.disabled[arr.type]}
                
                />
        ))}

        <button className={Style.OrderButton}
        disabled={!props.p}
        onClick={props.ordered}>ORDER NOW!</button>





    </div>

)

export default buildControls;