import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png'

import Style from './Logo.css';

const logo = (props) => (
    <div className={Style.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="Buger Logo" /> 
    </div>
);

export default logo;