import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import Style from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import { connect } from 'react-redux';


class Layout extends Component {
    state = {
        showSideDrawer: false,
    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false,
        })
    }

    sideDrawerToggleHandler = () => {
        this.setState((prev) => {
            return { showSideDrawer: !prev.showSideDrawer }
        });
    }

    render(){
        return(
        <Aux>
            <Toolbar 
                isAuth={this.props.isAuthenticated}
                drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDrawer 
                isAuth={this.props.isAuthenticated}
                open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>

            
            <main className={Style.content}>
                {this.props.children}
            </main>
        </Aux>
        )
    }
}


const mapStatetoProps = state => {
    return {
        // start of false
        isAuthenticated : state.auth.token !== null,
    }
}




export default connect(mapStatetoProps, null)(Layout);