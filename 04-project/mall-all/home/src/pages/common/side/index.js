/*
* @Author: TomChen
* @Date:   2019-08-23 11:12:04
* @Last Modified by:   Tom
* @Last Modified time: 2019-10-31 11:18:20
*/
require('./index.less')
var _util = require('util')
var tpl = require('./index.tpl')

var list = [
    {name:'user-center',icon:'iconfont icon-user',desc:'用户中心',link:'./user-center.html'},
    { name: 'user-base', icon:'iconfont icon-setting',desc:'基本设置',link:'./user-base.html'},
    { name: 'order-list', icon:'iconfont icon-order',desc:'我的订单',link:'./order-list.html'},
    { name: 'user-update-password', icon:'iconfont icon-lock',desc:'修改密码',link:'./user-update-password.html'}
]
module.exports = {
    render:function(name){
        list.find(function(item){
            return item.name == name
        }).isActive = true

         var html = _util.render(tpl,{
            list:list
        })

        $('.side').html(html)      
    }
}