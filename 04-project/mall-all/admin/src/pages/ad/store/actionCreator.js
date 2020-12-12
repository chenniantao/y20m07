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
            const result = await api.getAdList({
                page: page
            })
            if (result.code == 0) {
                dispatch(setPage(result.data))
            }else{
                message.error(result.message)
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


export const getUpdateIsShowAction = (id, newIsShow) => {
    return async function (dispatch, getState) {
        dispatch(getPageRequestStart())
        const page = getState().get('ad').get('current')
        try {
            const result = await api.updateAdsIsShow({
                id: id,
                isShow: newIsShow,
                page: page
            })
            if (result.code == 0) {
                dispatch(setPage(result.data))
                message.success('修改成功', 1)
            } else {
                message.error(result.message, 1)
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

export const getUpdateOrderAction = (id, newOrder) => {
    return async function (dispatch, getState) {
        dispatch(getPageRequestStart())
        const page = getState().get('ad').get('current')
        try {
            const result = await api.updateAdsOrder({
                id: id,
                order: newOrder,
                page: page
            })
            if (result.code == 0) {
                dispatch(setPage(result.data))
                message.success('修改成功', 1)
            } else {
                message.error(result.message, 1)
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

export const getSaveAction = (values) => {
    return async function (dispatch, getState) {
        try {
            let request = api.addAd
            let actionMessage = '添加广告成功'
            if (values.id){
                request = api.updateAd
                actionMessage = '修改广告成功'
            }
            const result = await request(values)
            if (result.code == 0) {
                message.success(actionMessage,1)
            }else{
                message.error(result.message, 1)
            }
        }
        catch (e) {
            message.error('网络请求失败', 1)
        }
    }
}