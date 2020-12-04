import * as types from './actionTypes'
import { fromJS } from 'immutable'
//定义一个初始化的state
const defaultState = fromJS({
    list: []
})

function reducer(state = defaultState, action) {
    if(action.type == types.SET_PAGE){
        const {list} = action.payload
        return state.set('list', list)
    }
    return state
}

export default reducer