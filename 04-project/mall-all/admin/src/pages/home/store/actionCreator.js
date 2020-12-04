import * as types  from './actionTypes'

import api from  'api'

const setCounts = (payload)=>({
    type: types.SET_COUNTS,
    payload: payload
})

export const getCountsAction = ()=>{
    return async function (dispatch) {
        const result = await api.getCounts()
        if (result.code == 0) {
            dispatch(setCounts(result.data))
        }
    }
}

