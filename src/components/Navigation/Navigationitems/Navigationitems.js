import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import Style from './NavigationItems.css'

const navigationItems = (props) => (

    <ul className={Style.NavigationItems}>
        <NavigationItem link="/" exact>Bruger Builder</NavigationItem>
        <NavigationItem link="/orders">Order</NavigationItem>
        <NavigationItem link="/auth">Authenticate</NavigationItem>
    
    </ul>
);
export default navigationItems;