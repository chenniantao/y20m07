import React,{Component} from 'react'

import { Route,Switch } from 'react-router-dom'

import AttrList from './list'
import AttrSave from './save'

class Attr extends Component{
    render(){
        return(
            <Switch>
                <Route path='/attr/save/:attrId?' component={AttrSave} />
                <Route path='/attr' component={AttrList}  />
            </Switch>
        )
    }
}
export default Attr