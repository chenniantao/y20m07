//这是api的配置文件

export const SERVER =  process.env.NODE_ENV == 'production' ? 'http://api.sortmall.com' : ''
export const VERSION = 'v1'

export const CATEGORY_ICON_UPLOAD = SERVER + '/' + VERSION + '/categories/icons'

export const API_CONFIG = {
    //方法名称:                          [请求地址,请求方法]
    login:                              ['/users/login','post'],
    getCaptcha:                         ['/users/captcha','get'],
    getCounts:                          ['/counts', 'get'],  
    logout:                             ['/users/logout', 'get'],
    getUserList:                        ['/users/list', 'get'],
    updateUsersIsActive:                ['/users/isActive', 'put'],
    
    addCategory:                        ['/categories', 'post'],         
    getLevelCategories:                 ['/categories/levelCategories', 'get'],
    getCategoryList:                    ['/categories/list', 'get'], 
    updateCategoriesName:               ['/categories/name', 'put'],
    updateCategoriesMobileName:         ['/categories/mobileName', 'put'],
    updateCategoriesIsShow:             ['/categories/isShow', 'put'],                      
    updateCategoriesIsFloor:            ['/categories/isFloor', 'put'],                      
    updateCategoriesOrder:              ['/categories/order', 'put'],                      
}