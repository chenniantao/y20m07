import React,{Component} from 'react'

import { Route,Switch } from 'react-router-dom'

import OrderList from './list'
import OrderDetail from './detail'

class Order extends Component{
    render(){
        return(
            <Switch>
                <Route path='/order/detail/:OrderId?' component={OrderDetail} />
                <Route path='/order' component={OrderList}  />
            </Switch>
        )
    }
}
export default Order