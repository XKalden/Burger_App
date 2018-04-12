import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import Style from './NavigationItems.css'

const navigationItems = (props) => (

    <ul className={Style.NavigationItems}>
        <NavigationItem link="/" active>Bruger Builder</NavigationItem>
        <NavigationItem link="/">Check Out</NavigationItem>
    </ul>



);
export default navigationItems;