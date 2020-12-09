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
export const getPageAction = (page) => {
    return async function (dispatch) {
        dispatch(getPageRequestStart())
        try {
            const result = await api.getAttrList({
                page: page
            })
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

export const getUpdateOrderAction = (id, newOrder) => {
    return async function (dispatch, getState) {
        dispatch(getPageRequestStart())
        const page = getState().get('attr').get('current')
        try {
            const result = await api.updateAttrsOrder({
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
export const getSaveAction = (values, id) => {
    return async function (dispatch, getState) {
        try {
            let request = api.addAttr
            let actionMessage = '添加属性成功'
            if (id) {
                values.id = id
                request = api.updateAttr
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