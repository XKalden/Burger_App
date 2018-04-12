import React from 'react';
import Style from './Backdrop.css'



const backdrop = (props) => {
    return(
        props.show ? <div className={Style.Backdrop} onClick={props.clicked}></div>: null 
    )
}


export default backdrop;