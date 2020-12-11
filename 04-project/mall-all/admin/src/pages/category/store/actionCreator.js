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

const setCategoies = (payload) => ({
    type: types.SET_CATEGORIES,
    payload: payload
})
const clearPage = (payload) => ({
    type: types.CLEAR_PAGE
})
export const getPageAction = (page)=>{
    return async function (dispatch) {
        dispatch(getPageRequestStart())
        try{
            const result = await api.getCategoryList({
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

export const getUpdateNameAction = (id,newName) => {
    return async function (dispatch,getState) {
        dispatch(getPageRequestStart())
        const page = getState().get('category').get('current')
        try {
            const result = await api.updateCategoriesName({
                id: id,
                name: newName,
                page:page
            })
            if (result.code == 0) {
                dispatch(setPage(result.data))
                message.success('修改成功',1)
            }else{
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
export const getUpdateMobileNameAction = (id, newName) => {
    return async function (dispatch, getState) {
        dispatch(getPageRequestStart())
        const page = getState().get('category').get('current')
        try {
            const result = await api.updateCategoriesMobileName({
                id: id,
                mobileName: newName,
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
export const getUpdateIsShowAction = (id, newIsShow) => {
    return async function (dispatch, getState) {
        dispatch(getPageRequestStart())
        const page = getState().get('category').get('current')
        try {
            const result = await api.updateCategoriesIsShow({
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
export const getUpdateIsFloorAction = (id, newIsFloor) => {
    return async function (dispatch, getState) {
        dispatch(getPageRequestStart())
        const page = getState().get('category').get('current')
        try {
            const result = await api.updateCategoriesIsFloor({
                id: id,
                isFloor: newIsFloor,
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
        const page = getState().get('category').get('current')
        try {
            const result = await api.updateCategoriesOrder({
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
            let request = api.addCategory
            let actionMessage = '添加分类成功'
            if (values.id){
                request = api.updateCategory
                actionMessage = '修改分类成功'
            }
            const result = await request(values)
            if (result.code == 0) {
                message.success(actionMessage,1)
                dispatch(setCategoies(result.data))
                dispatch(clearPage())
            }else{
                message.error(result.message, 1)
            }
        }
        catch (e) {
            message.error('网络请求失败', 1)
        }
    }
}
export const getLevelCategoriesAction = () => {
    return async function (dispatch) {
        try {
            const result = await api.getLevelCategories({
                level: 2
            })
            if (result.code == 0) {
                dispatch(setCategoies(result.data))
            }
        }
        catch (e) {
            message.error('网络请求失败', 1)
        }
    }
}

