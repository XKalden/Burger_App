import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component{    
    componentDidMount(){
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }   

    render(){
        // loading logic included 
        let orders = (
            this.props.odr.map(order => (
                <Order 
                    key={order.id}
                    ingredients={order.ingredient}
                    price={order.price}
                    />
            ))
        )
        // if Loading is True then switch componet to spinner
        if(this.props.loading){
            orders = <Spinner/>
        }
        return(
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => { 
    return {
        odr: state.order.orders,
        loading : state.order.loading,  
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onFetchOrders : (token, userId) => {dispatch(actions.fetchOrders(token, userId))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));
