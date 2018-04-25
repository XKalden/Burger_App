export const updateObject = (oldObject, updatedProperty) => {
    return {
        ...oldObject,
        ...updatedProperty
    }
}


export const checkValidity = (value, rule) =>{
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
        isValid = pattern.test(value) && isValid;
   
    }

    if (rule.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}
