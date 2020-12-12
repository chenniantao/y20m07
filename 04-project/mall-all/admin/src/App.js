import React, { Component } from 'react'
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom'

import Login from 'pages/login'
import Home from 'pages/home'
import User from 'pages/user'
import Category from 'pages/category'
import Attr from 'pages/attr'
import Product from 'pages/product'
import Order from 'pages/order'
import Ad from 'pages/ad'
import Pwd from 'pages/pwd'
import NotFound from 'pages/not-found'
import { getUsername } from './util'

const ProtectRoute = ({ component: Component, ...rest }) => <Route {...rest} render={() => (getUsername() ? <Component /> : <Redirect to="/login" />)} />
const LoginRoute = ({ component: Component, ...rest }) => <Route {...rest} render={() => (getUsername() ? <Redirect to="/" /> : <Component />)} />

class App extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <Router>
            <div className="App">
                <Switch>
                    <ProtectRoute exact path="/" component={Home} />
                    <ProtectRoute  path="/user" component={User} />
                    <ProtectRoute  path="/category" component={Category} />
                    <ProtectRoute path="/attr" component={Attr} />
                    <ProtectRoute path="/product" component={Product} />
                    <ProtectRoute path="/order" component={Order} />
                    <ProtectRoute path="/ad" component={Ad} />
                    <ProtectRoute path="/pwd" component={Pwd} />
                    <LoginRoute path="/login"  component={Login} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </div>
            </Router>
        )
    }
}
export default App