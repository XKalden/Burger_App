import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import Style from './NavigationItems.css'

const navigationItems = (props) => (

    <ul className={Style.NavigationItems}>
        <NavigationItem link="/" exact>Bruger Builder</NavigationItem>
        
        
        {!props.isAuthenticated ? null : <NavigationItem link="/orders">Order</NavigationItem> }

        {/* If(True) ? Authenticate : Logout */}
        {!props.isAuthenticated 
            ? <NavigationItem link="/auth">Authenticate</NavigationItem> 
            : <NavigationItem link="/logout">Logout</NavigationItem> 
        }

    </ul>
);
export default navigationItems;