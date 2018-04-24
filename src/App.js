import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';

import {Route, Switch} from 'react-router-dom';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import Orders from './container/Orders/Orders';
import Auth from './container/Auth/Auth';


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout}></Route>
            <Route path="/orders" component={Orders}/> 
            <Route path="/auth" component={Auth}/> 
            
            <Route path="/" exact component={BurgerBuilder}></Route>

          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
