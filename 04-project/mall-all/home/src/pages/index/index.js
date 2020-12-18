import Swiper from 'swiper'
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('swiper/dist/css/swiper.min.css')
var api = require('api')
var _util = require('util')

require('./index.less')

var categoriesTpl = require('./categories.tpl')
var elevatorTpl = require('./elevator.tpl')
var swiperTpl = require('./swiper.tpl')
var hotTpl = require('./hot.tpl')
var floorTpl = require('./floor.tpl')
var childCategoriesTpl = require('./childCategories.tpl')

var page = {
    init:function(){
        this.$elevator = $('#elevator')
        this.$elevatorItems = null
        this.$floor = null
        this.$backToTop = null
        this.$win = $(window)
        this.$categories = $('.categories')
        this.cache = {}
        this.loadHomeCategories()
        this.loadSwiper()
        this.loadHotProducts()
        this.loadFloor()
        this.bindEvent()
    },
    bindEvent(){
        var _this = this
        this.$win.on('scroll resize load',function(){
            clearTimeout(_this.$elevator.showElevatorTimer);
            _this.$elevator.showElevatorTimer = setTimeout(_this.setElevator.bind(_this),200);
        });
        //点击电梯到达指定楼层
        this.$elevator.on('click','.elevator-item',function(){
            var num = _this.$elevatorItems.index(this);
            $('html,body')
            .animate({
                scrollTop:_this.$floor.eq(num).offset().top
            })
        });
        this.$elevator.on('click','.backToTop',function(){
             $('html,body')
            .animate({
                scrollTop:0
            })            
        })
        this.$categories.on('mouseenter','.keyword-item',function(){
            //显示子分类面板
            $('.child-categories').show()
            clearTimeout(_this.timer)
            var $elem = $(this)
            $('.keyword-item').removeClass('active')
            $elem.addClass('active')
            _this.timer = setTimeout(function(){
                var id = $elem.data('id')
                if(_this.cache[id]){
                    _this.renderChildArrayCategories(_this.cache[id])
                }else{
                    api.getChildArrayCategories({
                        data:{
                            pid:id
                        },
                        success:function(childArrayCategories){
                            _this.cache[id] = childArrayCategories
                            _this.renderChildArrayCategories(childArrayCategories)
                        }
                    })       
                }
            },200)
        })
        this.$categories.on('mouseleave',function(){
            //清空面板并且隐藏
            $('.keyword-item').removeClass('active')
            $('.child-categories').html('').hide()
        })            
    },
    renderChildArrayCategories(categories){
        var categoriesHtml = _util.render(childCategoriesTpl,{
            categories:categories
        })
        $('.child-categories').html(categoriesHtml)   
    },
    loadHomeCategories:function(){
        api.getArrayCategories({
            success:function(categories){
                var categoriesHtml = _util.render(categoriesTpl,{
                    categories:categories
                })
                $('.parent-categories').html(categoriesHtml)              
            }
        })
    },
    loadSwiper(){
        api.getPositionAds({
            data:{
                position:1
            },
            success:function(data){
                var html = _util.render(swiperTpl,{
                    slides:data
                })
                $('.swiper-container .swiper-wrapper').html(html)
                var mySwiper = new Swiper ('.swiper-container', {
                    loop: true, // 循环模式选项
                    autoplay:true,
                    // 如果需要分页器
                    pagination: {
                      el: '.swiper-pagination',
                      clickable:true
                    },
                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                })                
            }
        }) 
    },
    loadHotProducts(){
        var _this = this
        api.getHotProducts({
            success:function(data){
                var html = _util.render(hotTpl,{
                    products:data
                })
                $('.hot-bd').html(html)            
            }
        })
    },
    loadFloor(){
        var _this = this
        api.getFloors({
            success:function(floors){
                //加载楼层
                var floorsHtml = _util.render(floorTpl,{
                    floors:floors
                })
                $('.floor-wrap').html(floorsHtml)
                
                _this.$floor = $('.floor .floor-box')
                
                //加载电梯
                var elevatorHtml = _util.render(elevatorTpl,{
                    floors:floors
                })
                $('.elevator').html(elevatorHtml) 

                _this.$elevatorItems = _this.$elevator.find('.elevator-item')
                _this.$backToTop = _this.$elevator.find('.backToTop')                
            }
        })
    },
    //获取楼层号
    getFloorNum(){
        //默认楼层号
        var _this = this
        var num = -1;
        if (this.$floor){
            this.$floor.each(function (index, elem) {
                num = index;
                if ($(elem).offset().top > _this.$win.scrollTop() + _this.$win.height() / 2) {
                    num = index - 1;
                    return false;
                }
            });
        }

        return num;
    },    
    //设置电梯
    setElevator(){
        var num = this.getFloorNum();
        if(num == -1){
            this.$elevator.fadeOut();
        }else{
            this.$elevator.fadeIn();
            this.$elevatorItems.removeClass('elevator-active');
            this.$elevatorItems.eq(num).addClass('elevator-active');
        }        
    }
}



$(function() {
    page.init()
})
