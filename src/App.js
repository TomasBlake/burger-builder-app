import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BulgerBuilder/BurgerBuilder';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Logout from './containers/Auth/Logout/Logout';
import * as actionCreators from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')});

const asyncAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth')});
    
const asyncOrders = asyncComponent(() => {
      return import('./containers/Orders/Orders')});

class App extends Component {

  componentDidMount () {
    this.props.onTryAuthAutoSignup();
  }

  render() {
    let routes = ( <Switch>
                      <Route path='/auth' component={asyncAuth} />
                      <Route path='/' component={BurgerBuilder} />
                      <Redirect to='/' /> 
                    </Switch>);
    if (this.props.isAutheticated) {
      routes = ( <Switch>
                  <Route path='/auth' component={asyncAuth} />
                  <Route path='/orders' component={asyncOrders}/>
                  <Route path='/logout' component={Logout} />
                  <Route path='/checkout' component={asyncCheckout} />
                  <Route path='/' component={BurgerBuilder} />
                  <Redirect to='/' />  
                </Switch> );
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAutheticated: state.authState.idToken !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAuthAutoSignup: () => dispatch(actionCreators.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
