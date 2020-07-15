import React, { Component } from 'react';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'
import Logout from './containers/Auth/Logout/Logout'

import asynic from './hoc/asynic/asynic'

const asynicCheckout =asynic(()=>{
  return import('./containers/Checkout/Checkout')
})

const asynicOrder =asynic(()=>{
  return import('./containers/Orders/Orders')
})

const asynicAuth =asynic(()=>{
  return import('./containers/Auth/Auth')
})


class App extends Component {
  componentDidMount() {
    this.props.onAuthPage()
  }
  render() {

    let routes = (
      <Switch>
        <Route path="/auth" exact component={asynicAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asynicCheckout} />
          <Route path="/orders" exact component={asynicOrder} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/auth" exact component={asynicAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
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

const stateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapsDispatchToProps = dispatch => {
  return {
    onAuthPage: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(stateToProps, mapsDispatchToProps)(App));
