//这是api的配置文件

export const SERVER =  process.env.NODE_ENV == 'production' ? 'http://api.sortmall.com' : ''
export const VERSION = 'v1'

var API_CONFIG = {
    login: ['/users/login', 'post'],
    getUsername: ['/users/username', 'get'],
    logout: ['/users/logout', 'get'],
    register: ['/users', 'post'],
    checkUsername: ['/users/checkUsername', 'get'],
    getRegisterVerifyCode: ['/users/registerVerifyCode', 'get'],
    uploadUserAvatar: ['/users/avatar', 'post'],
    getUserinfo: ['/users/info', 'get'],
    updateUsersPwd: ['/users/pwd', 'put'],
    updateUsersUsername: ['/users/username', 'put'],
    updateUsersEmail: ['/users/email', 'put'],
    dynamicLogin: ['/users/dynamicLogin', 'post'],
    getLoginVerifyCode: ['/users/loginVerifyCode', 'get'],
    getCaptcha: ['/users/captcha', 'get'],

    getArrayCategories: ['/categories/arrayCategories', 'get'],
    getTreeCategories: ['/categories/treeCategories', 'get'],
    getChildArrayCategories: ['/categories/childArrayCategories', 'get'],
    getPositionAds: ['/ads/positionAds', 'get'],
    getFloors: ['/floors', 'get'],

    getProductsList: ['/products/list', 'get'],
    getProductsSearchList: ['/products/search', 'get'],
    getProductsDetail: ['/products/detail', 'get'],
    getHotProducts: ['/products/hot', 'get'],

    addCarts: ['/carts', 'post'],
    getCartsCount: ['/carts/count', 'get'],
    getCarts: ['/carts', 'get'],
    updateCartsChoices: ['/carts/choices', 'put'],
    deleteCarts: ['/carts', 'delete'],
    updateCartsCounts: ['/carts/counts', 'put'],

    getOrdersProducts: ['/orders/products', 'get'],
    addOrders: ['/orders', 'post'],
    getOrdersList: ['/orders/list', 'get'],
    getOrdersDetail: ['/orders/detail', 'get'],
    updateOrdersStatus: ['/orders/status', 'put'],
    updateOrdersPay: ['/orders/pay', 'put'],


    addShippings: ['/shippings', 'post'],
    getShippingsList: ['/shippings/list', 'get'],
    deleteShippings: ['/shippings', 'delete'],
    getShippingsDetail: ['/shippings/detail', 'get'],
    updateShippings: ['/shippings', 'put'],

    getPayments: ['/payments', 'get'],
    getPaymentsStatus: ['/payments/status', 'get'],
}

module.exports = {
    API_CONFIG,
    SERVER,
    VERSION
}