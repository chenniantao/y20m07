/*
* @Author: TomChen
* @Date:   2019-08-22 10:23:25
* @Last Modified by:   Tom
* @Last Modified time: 2019-10-28 10:19:30
*/
require('./index.less')
var tplEmpty = require('./empty.tpl')
var _util = require('util')

var page = {
    init:function(){
        return this
    },
    getEmpty:function(){
        return _util.render(tplEmpty)
    },          
}
module.exports = page.init()