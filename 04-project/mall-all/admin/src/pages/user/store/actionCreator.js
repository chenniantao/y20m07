import * as types  from './actionTypes'

import api from  'api'
import {message} from 'antd'

const getPageRequestStart = () => ({
    type: types.PAGE_REQUEST_START
})

const getPageRequestEnd = () => ({
    type: types.PAGE_REQUEST_END
})

const setPage = (payload)=>({
    type: types.SET_PAGE,
    payload: payload
})

export const getPageAction = (page)=>{
    return async function (dispatch) {
        dispatch(getPageRequestStart())
        try{
            const result = await api.getUserList({
                page: page
            })
            if (result.code == 0) {
                dispatch(setPage(result.data))
            }
        }
        catch(e){
            message.error('网络请求失败', 1)
        }
        finally{
            dispatch(getPageRequestEnd())
        }

    }
}

export const getUpdateIsActive = (id,newActive) => {
    return async function (dispatch,getState) {
        dispatch(getPageRequestStart())
        const page = getState().get('user').get('current')
        try {
            const result = await api.updateUsersIsActive({
                id: id,
                isActive: newActive,
                page:page
            })
            if (result.code == 0) {
                dispatch(setPage(result.data))
                message.success('修改成功',1)
            }
        }
        catch (e) {
            message.error('网络请求失败', 1)
        }
        finally {
            dispatch(getPageRequestEnd())
        }
    }
}

