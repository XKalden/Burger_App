import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../Navigationitems/Navigationitems';

import Style from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';


const sideDrawer = (props) => {

    let toggleClass = [Style.SideDrawer, Style.Close];

    if(props.open){
        toggleClass = [Style.SideDrawer, Style.Open];
    }


    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
    
            <div className={toggleClass.join(' ')}>

                <div className={Style.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    )
}

export default sideDrawer;