import * as types from './actionTypes'

import api from 'api'
import { message } from 'antd'

const getPageRequestStart = () => ({
    type: types.PAGE_REQUEST_START
})

const getPageRequestEnd = () => ({
    type: types.PAGE_REQUEST_END
})

const setPage = (payload) => ({
    type: types.SET_PAGE,
    payload: payload
})
const setCategoies = (payload) => ({
    type: types.SET_CATEGORIES,
    payload: payload
})
const setAllAttrs = (payload) => ({
    type: types.SET_ALL_ATTRS,
    payload: payload
})
export const getPageAction = (page, keyword) => {
    return async function (dispatch) {
        dispatch(getPageRequestStart())
        try {
            const options = {
                page:page
            }
            if(keyword){
                options.keyword = keyword
            }
            const result = await api.getProductList(options)
            if (result.code == 0) {
                dispatch(setPage(result.data))
            } else {
                message.error(result.message)
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
        const page = getState().get('product').get('current')
        try {
            const result = await api.updateProductsIsShow({
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
export const getUpdateStatusAction = (id, newStatus) => {
    return async function (dispatch, getState) {
        dispatch(getPageRequestStart())
        const page = getState().get('product').get('current')
        try {
            const result = await api.updateProductsStatus({
                id: id,
                status: newStatus,
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
export const getUpdateIsHotAction = (id, newIsHot) => {
    return async function (dispatch, getState) {
        dispatch(getPageRequestStart())
        const page = getState().get('product').get('current')
        try {
            const result = await api.updateProductsIsHot({
                id: id,
                isHot: newIsHot,
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
        const page = getState().get('product').get('current')
        try {
            const result = await api.updateProductsOrder({
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
    return async function () {
        try {
            let request = api.addProduct
            let actionMessage = '添加商品成功'
            if (values.id) {
                request = api.updateProduct
                actionMessage = '修改属性成功'
            }
            const result = await request(values)
            if (result.code == 0) {
                message.success(actionMessage, 1)
            } else {
                message.error(result.message, 1)
            }
        }
        catch (e) {
            console.log(e)
            message.error('网络请求失败', 1)
        }
    }
}
export const getLevelCategoriesAction = () => {
    return async function (dispatch) {
        try {
            const result = await api.getLevelCategories({
                level: 3
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
export const getAllAttrsAction = () => {
    return async function (dispatch) {
        try {
            const result = await api.getAllAttrs()
            if (result.code == 0) {
                dispatch(setAllAttrs(result.data))
            }
        }
        catch (e) {
            message.error('网络请求失败', 1)
        }
    }
}