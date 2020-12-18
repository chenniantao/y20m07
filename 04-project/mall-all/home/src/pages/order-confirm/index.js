/*
* @Author: TomChen
* @Date:   2019-08-21 17:42:33
* @Last Modified by:   Tom
* @Last Modified time: 2019-11-06 09:55:23
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
var _err = require('pages/common/err')

var api = require('api')
var _util = require('util')
var _modal = require('./modal.js')

var shippingTpl = require('./shipping.tpl')
var productTpl = require('./product.tpl')
require('./index.less')

var page = {
  
    init:function(){
        this.selectedShippingId = ''
        this.selectedPaymentType = '10'
        this.$shippingBox = $('.shipping-box')
        this.$productBox = $('.product-box')
        this.loadProductList()
        this.bindEvent()
    },
    loadShippingList:function(){
        var _this = this
        api.getShippingsList({
            success:function(shippings){
               _this.renderShipping(shippings)
            }
        })
    },
    renderShipping(shippings){
        var _this = this
        //标示当前选中的地址,在渲染页面时设置为active
        shippings.forEach(function(shipping){
            if(shipping._id == _this.selectedShippingId){
                shipping.active = true
            }
        })
        var html = _util.render(shippingTpl,{
            shippings:shippings
        })
        this.$shippingBox.html(html)
    },
    loadProductList:function(){
        var _this = this
        api.getOrdersProducts({
            success:function(result){
                if(result.cartList.length > 0){
                    var html = _util.render(productTpl,result)
                    _this.$productBox.html(html) 
                    _this.loadShippingList()
                    $('.pay-box').show()
                }else{
                   _this.$productBox.html(_err.getEmpty())

                }

            },
            error:function(){
               _this.$productBox.html(_err.getEmpty()) 
            }
        })
    },
    bindEvent:function(){
        var _this = this
        //监听新增地址后获取最新数据
        this.$shippingBox.on('get-shippings',function(ev,shippings){
            _this.renderShipping(shippings)
        })
        //1.弹出添加地址面板
        this.$shippingBox.on('click','.shipping-add',function(){

            if(_this.$shippingBox.find('.shipping-item').length > 4){
                _util.showErrorMsg('您的地址数已经达到上限5个了')
            }else{
                _modal.show()
            }
        })
        //2.处理删除地址
        this.$shippingBox.on('click','.shipping-delete',function(ev){
            //阻止事件冒泡,防止点击时选中改地址
            ev.stopPropagation()
            var $this = $(this)
            _util.showConfirm({
                msg:'您确定要删除该条地址吗?',
                ok:function(){
                    var shippingId = $this.parents('.shipping-item').data('shipping-id')
                    api.deleteShippings({
                        data:{
                            id:shippingId
                        },
                        success:function(shippings){
                            _this.renderShipping(shippings)
                        },
                        error:function(msg){
                            _util.showErrorMsg(msg)
                        }
                    })
                }
            })
        })
        //3.编辑地址
        this.$shippingBox.on('click','.shipping-edit',function(ev){
            //阻止事件冒泡,防止点击时选中改地址
            ev.stopPropagation()
            var $this = $(this)
            var shippingId = $this.parents('.shipping-item').data('shipping-id')
            api.getShippingsDetail({
                data:{
                    id:shippingId
                },
                success:function(shipping){
                    _modal.show(shipping)
                },                
            })
        })
        //4.选中地址
        this.$shippingBox.on('click','.shipping-item',function(){
            var $this = $(this)
            $this.addClass('active')
            .siblings('.shipping-item').removeClass('active')

            //保存选中的地址id,为了页面重新渲染时可以知道当前选中的是那个地址
            _this.selectedShippingId = $this.data('shipping-id')
        })
        //5. 选择支付方式
        $('.pay-box .pay-way .pay-way-item').on('click',function(){
            var $this = $(this)
            $this.addClass('active')
            .siblings('.pay-way-item').removeClass('active')
            _this.selectedPaymentType = $this.data('paytype')
        })
        //6.去支付(生成订单)
        this.$productBox.on('click','.btn-submit',function(){
            if(_this.selectedShippingId){
                api.addOrders({
                    data:{
                        shippingId:_this.selectedShippingId,
                        paymentType:_this.selectedPaymentType,
                        channel:'page'
                    },
                    success:function(data){
                        window.location.href = data.url
                    },
                    error:function(msg){
                        _util.showErrorMsg(msg)
                    }
                })
            }
            else{
                _util.showErrorMsg('请选择地址后再提交!')
            }
        })
    }
}


$(function() {
    page.init()
})