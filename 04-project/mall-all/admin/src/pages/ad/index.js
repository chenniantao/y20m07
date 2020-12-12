import React,{Component} from 'react'

import { Route,Switch } from 'react-router-dom'

import AdList from './list'
import AdSave from './save'

class Ad extends Component{
    render(){
        return(
            <Switch>
                <Route path='/ad/save/:adId?' component={AdSave} />
                <Route path='/ad' component={AdList}  />
            </Switch>
        )
    }
}
export default Ad