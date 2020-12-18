/*
* @Author: TomChen
* @Date:   2019-08-21 17:42:33
* @Last Modified by:   Tom
* @Last Modified time: 2019-11-12 10:42:09
*/
require('pages/common/nav')
require('pages/common/search')
var _err = require('pages/common/err')
require('util/pagination')
var _side = require('pages/common/side')
require('pages/common/footer')
var tpl = require('./index.tpl')

require('./index.less')

var _util = require('util')
var api = require('api')

var page = {
    ordersListPrarms:{
        page:_util.getParamFromUrl('page') || 1,
        status:''
    },    
    init:function(){
        this.renderSide()
        this.initPagination()
        this.bindEvent()
        this.loadOrderList()
    },
    renderSide:function(){
        _side.render('order-list')
    },
    bindEvent:function(){
        var _this = this
        $('.order-box').on('click','.btn-order',function(){
            var $this = $(this)
            _this.ordersListPrarms.page = 1
            _this.ordersListPrarms.status = $this.data('status')
            _this.loadOrderList()
        })
    },
    initPagination:function(){
        var _this = this
        this.$pagination = $('.pagination-box')
        this.$pagination.on('page-change',function(ev,page){
            _this.ordersListPrarms.page = page
            _this.loadOrderList()
        })
        //初始化分页组件
        this.$pagination.pagination()
    },
    loadOrderList:function(){
        var _this = this
        api.getOrdersList({
            data:this.ordersListPrarms,
            success:function(result){
                if(result.list.length > 0){
                    result.list.forEach(function(order){
                        order.createdTime = new Date(order.createdAt).toLocaleString()
                    })
                    var html = _util.render(tpl,{
                        list:result.list
                    })
                    $('.order-box .pandel-body').html(html)

                    //渲染分页组件
                    _this.$pagination.pagination('render',{
                        current:result.current,
                        total:result.total,
                        pageSize:result.pageSize
                    })
                }else{
                    _this.$pagination.pagination('clean')
                    $('.order-box .pandel-body').html(_err.getEmpty())
                }
                //同步侧边栏的高度
                $('.side').css({
                    height:$('.side-content').outerHeight()
                })
                $('.btn-order').removeClass('active').each(function(){
                    if($(this).data('status') == _this.ordersListPrarms.status){
                        $(this).addClass('active')
                    }
                })
            }
        })
    },
}



$(function() {
    page.init()
})