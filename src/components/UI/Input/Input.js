import React from 'react';
import Style from './Input.css';


const input = ( props ) => {
    

    // This Switch select input type and display it!
    let inputElement = null;
    const inputClass = [Style.InputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClass.push(Style.Invalid);
    }

    // Validation Error 
    let validationError = null;
    if(props.invalid && props.touched){
        validationError = <p className={Style.ValidError}>Don't leave blank</p>
        console.log('wrong');
    }

    switch( props.elementType){
        case('input'):
            inputElement = <input 
                className={inputClass.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed}/>
            break;
        case('textarea'):
            inputElement = <textarea 
                className={inputClass.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed}/>
            break;
        case('select'):
            inputElement = <select 
                className={inputClass.join(' ')} 
                value={props.value} 
                onChange={props.changed}>
                {props.elementConfig.options.map(key => {
                    return <option key={key.value} value={key.value}>{key.displayValue}</option>
                })}
            </select>
            break;
        default:
            inputElement = <input 
                className={inputClass.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed}/>
    }

    return(
        <div className={Style.Input}>
            <label className={Style.Label}>{props.lable}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default input;


