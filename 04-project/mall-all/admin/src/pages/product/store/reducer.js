import * as types from './actionTypes'
import { fromJS } from 'immutable'
//定义一个初始化的state
const defaultState = fromJS({
    current: 1, 
    total: 0, 
    pageSize: 0,
    list: [],
    keyword:'',
    isFetching:false,
    categories: [],
    allAttrs:[]
})

function reducer(state = defaultState, action) {
    if(action.type == types.SET_PAGE){
        const { list, current, total, pageSize, keyword} = action.payload
        return state.merge({
            list,
            current,
            total,
            pageSize,
            keyword
        })
    }
    if (action.type == types.PAGE_REQUEST_START){
        return state.set('isFetching',true)
    }
    if (action.type == types.PAGE_REQUEST_END) {
        return state.set('isFetching', false)
    }
    if (action.type == types.SET_CATEGORIES) {
        return state.set('categories', action.payload)
    }
    if (action.type == types.SET_ALL_ATTRS) {
        return state.set('allAttrs', action.payload)
    }                 
    return state
}

export default reducer