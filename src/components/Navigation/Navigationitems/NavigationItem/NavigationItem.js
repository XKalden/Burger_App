import React from 'react';
import { NavLink } from 'react-router-dom';
import Style from './NavigationItem.css';


const navigationItem = (props) => (
    <li className={Style.NavigationItem}> 
    <NavLink 
        to={props.link}
        activeClassName={Style.active} exact={props.exact}> {props.children}
        </NavLink> 
    </li>
);

export default navigationItem;


