import React from 'react';


import Style from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavitaionItems from '../Navigationitems/Navigationitems';

import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';


const toolbar = (props) => (
    <header className={Style.Toolbar}>

        <DrawerToggle clicked={props.drawerToggleClicked} />
        <Logo height="80%" />
       
        <nav className={Style.DestopOnly}>
            <NavitaionItems />
        </nav>
    </header>


)


export default toolbar;
