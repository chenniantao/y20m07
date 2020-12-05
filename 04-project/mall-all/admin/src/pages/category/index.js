import React,{Component} from 'react'

import { Route,Switch } from 'react-router-dom'

import CategoryList from './list'
import CategorySave from './save'

class Category extends Component{
    render(){
        return(
            <Switch>
                <Route path='/category/save/:categoryId' component={CategorySave} />
                <Route path='/category' component={CategoryList}  />
            </Switch>
        )
    }
}
export default Category