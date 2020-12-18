require('./index.less')
var api = require('api')
var page = {
    init:function(){
        this.$cartContent = $('.top .cart-content');
        this.loadUsername()
        this.bindEvent()
        this.loadCartsCount()
    },
    loadUsername:function(){
        api.getUsername({
            success:function(result){
                $('.not-login').hide()
                $('.login').show().find('.username').text(result.username)
            }
        })
    },
    bindEvent:function(){
        var _this = this 
        //退出操作
        $('#logout').on('click',function(){
            api.logout({
                success:function(){
                    window.location.reload()
                }
            })
        })
        //购物车
        $('.top .cart-box').hover(function () {
            _this.$cartContent.show()
            _this.$cartContent.html('<div class="loader"></div>')
            api.getCarts({
                success: function (cart) {
                    _this.render(cart)
                },
                error: function () {
                    _this.$cartContent.html('<span class="empty-cart">获取购物车失败,请稍后再试!</span>')
                }
            })
        }, function () {
            _this.$cartContent.html('')
            _this.$cartContent.hide()
        })        
    },
    loadCartsCount:function(){
        var $cartNum = $('.nav-list .cart-count')
        api.getCartsCount({
            success: function (count) {
                $cartNum.text(count || 0)
            },
            error: function () {
                $cartNum.text(0)
            }
        })
    },
    render: function (cart) {
        var _this = this;
        if (cart.cartList.length == 0) {
            _this.$cartContent.html('<span class="empty-cart">购物车中还没有商品,赶紧来购买吧!</span>')
        }
        else {
            var html = _util.render(tpl, cart);
            _this.$cartContent.html(html)
        }
    },    
}

$(function(){
    page.init()
})