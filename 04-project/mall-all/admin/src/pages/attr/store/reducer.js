import * as types from './actionTypes'
import { fromJS } from 'immutable'
//定义一个初始化的state
const defaultState = fromJS({
    current: 1, 
    total: 0, 
    pageSize: 0,
    list: [],
    isFetching:false,
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
    if (action.type == types.PAGE_REQUEST_START){
        return state.set('isFetching',true)
    }
    if (action.type == types.PAGE_REQUEST_END) {
        return state.set('isFetching', false)
    }    
    return state
}

export default reducer