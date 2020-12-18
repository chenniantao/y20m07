/*
* @Author: TomChen
* @Date:   2019-08-25 11:48:02
* @Last Modified by:   Tom
* @Last Modified time: 2019-10-23 10:40:31
*/
var Hogan = require('hogan.js')
require('./index.less')
var tpl = require('./index.tpl')

var page = {
    init:function(){
        this.$elem = $('body');
        this.bindEvent()
        return this
    },
    bindEvent:function(){
        var _this = this
        //1.关闭弹出面板
        this.$elem.on('click','.close-modal',function(){
            _this.$elem.trigger('click-btn',false)
            _this.hide()
        })
        //组织事件冒泡为了点击弹出面包中的其他地方不触发顶层的关闭事件
        this.$elem.on('click','.modal-wrap .modal-container',function(ev){
            ev.stopPropagation()
        })
        //1.点击确认按钮
        this.$elem.on('click','.confirm-modal',function(){
            _this.$elem.trigger('click-btn',true)
            _this.hide()
        })                    
    },
    show:function(options){
        var template = Hogan.compile(tpl)
        var html = template.render(options)
        this.$elem.append($(html))
    },
    showError:function(msg){
        this.show({
            msg:msg,
            isError:true
        })
    },
    showSuccess:function(msg){
        this.show({
            msg:msg,
            isSuccess:true
        })
    },
    /**
     * [confirm description]
     * @param  {[type]} options [{msg:,ok:,cancle}]
     * @return {[type]}         [description]
     */
    confirm:function(options){
        this.show({
            msg:options.msg,
            isConfirm:true
        })
        this.$elem.on('click-btn',function(ev,result){
            if(result){
                typeof options.ok == 'function' && options.ok()
            }else{
                typeof options.cancel == 'function' && options.cancel()
            }
        })        
    },    
    hide:function(){
        this.$elem.find('.modal-wrap').remove()
        this.$elem.unbind('click-btn')
    }        
}
module.exports = page.init()