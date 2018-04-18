import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';

import {Route, Switch} from 'react-router-dom';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';



class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout}></Route>
            <Route path="/" exact component={BurgerBuilder}></Route>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
