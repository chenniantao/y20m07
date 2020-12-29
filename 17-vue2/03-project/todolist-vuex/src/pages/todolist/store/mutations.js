import { LOAD_ITEM,ADD_ITEM,DEL_ITEM } from './types'

export default {
    [LOAD_ITEM](state, payload) {
        state.list = payload
    },
    [ADD_ITEM](state, payload) {
        state.list.push(payload)
    },
    [DEL_ITEM](state, payload) {
        const list = state.list.filter(item => item.id != payload)
        state.list = list
    }      
}