import * as types from './actionTypes'
import { fromJS } from 'immutable'
//定义一个初始化的state
const defaultState = fromJS({
    current: 1, 
    total: 0, 
    pageSize: 0,
    list: []
})

function reducer(state = defaultState, action) {
    if(action.type == types.SET_PAGE){
        const { list, current, total, pageSize} = action.payload
        return state.merge({
            list,
            current,
            total,
            pageSize
        })
    }
    return state
}

export default reducer