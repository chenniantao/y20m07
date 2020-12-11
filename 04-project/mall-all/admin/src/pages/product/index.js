import React,{Component} from 'react'

import { Route,Switch } from 'react-router-dom'

import ProductList from './list'
import ProductSave from './save'
import ProductDetail from './detail'

class Product extends Component{
    render(){
        return(
            <Switch>
                <Route path='/product/save/:productId?' component={ProductSave} />
                <Route path='/product/detail/:productId?' component={ProductDetail} />
                <Route path='/product' component={ProductList}  />
            </Switch>
        )
    }
}
export default Product