import * as types  from './actionTypes'

import api from  'api'

const setPage = (payload)=>({
    type: types.SET_PAGE,
    payload: payload
})

export const getPageAction = (page)=>{
    return async function (dispatch) {
        const result = await api.getUserList({
            page: page
        })
        if (result.code == 0) {
            dispatch(setPage(result.data))
        }
    }
}

