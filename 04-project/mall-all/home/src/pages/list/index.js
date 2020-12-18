require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
var err = require('pages/common/err')
require('util/pagination')
var api = require('api')
var _util = require('util')

var tpl = require('./index.tpl')
require('./index.less')

var page = {
    productsListPrarms:{
        category:_util.getParamFromUrl('categoryId'),
        keyword:_util.getParamFromUrl('keyword'),
        isHot:_util.getParamFromUrl('nav') == 3 ? '1' : '',
        page:_util.getParamFromUrl('page') || 1,
        orderBy:_util.getParamFromUrl('orderBy') || 'default',
    },    
    init:function(){
        this.initPagination()
        this.bindEvent()
        this.categoriesTreeHtml = ''
        this.loadTreeCategories()
        this.loadProductList()
    },
    initPagination:function(){
        var _this = this
        this.$pagination = $('.pagination-box')
        this.$pagination.on('page-change',function(ev,page){
            _this.productsListPrarms.page = page
            _this.loadProductList()
        })
        //初始化分页组件
        this.$pagination.pagination()
    },
    loadTreeCategories:function(){
        var _this = this
        api.getTreeCategories({
            success:function(categories){
                _this.makeCategoriesTreeHtml(categories)
                $('.list .category-list').html(_this.categoriesTreeHtml)
            }
        })
    },
    makeCategoriesTreeHtml(categories){
        for(var i in categories){
           if(categories[i].children){
                var className = "link"
                if(categories[i]._id == this.productsListPrarms.category){
                    className += " active"
                }
               this.categoriesTreeHtml += '<ul><li class="parent"><i class="iconfont icon-minus-sl"></i><a class="'+className+'" href="javascript:;" data-id="'+categories[i]._id+'">'+categories[i].name+'</a>'
                this.makeCategoriesTreeHtml(categories[i].children)
                this.categoriesTreeHtml += '</li></ul>'
            }else{
                var className = "link"
                if(categories[i]._id == this.productsListPrarms.category){
                    className += " active"
                }
                this.categoriesTreeHtml += '<ul><li><a class="'+className+'"href="javascript:;" data-id="'+categories[i]._id+'">'+categories[i].name+'</a></li></ul>'
            }           
        }
  
    },
    bindEvent:function(){
        var _this = this
        //处理排序
        //根据点击的排序按钮来决定排序参数,根据新的排序参数获取数据再重新渲染页面
        $('.sort-item').on('click',function(){
            var $this = $(this)
            //点击默认排序
            if($this.hasClass('default')){
                if($this.hasClass('active')){
                    return
                }
                $this.addClass('active')
                .siblings('.sort-item').removeClass('active')

                _this.productsListPrarms.orderBy = 'default'
            }
            //点击按价格排序
            else if($this.hasClass('price')){
                $this.addClass('active')
                .siblings('.sort-item').removeClass('active')
                
                if($this.hasClass('asc')){
                    $this.removeClass('asc')
                    .addClass('desc')
                    _this.productsListPrarms.orderBy = 'price_desc'
                }else if($this.hasClass('desc')){
                    $this.removeClass('desc')
                    .addClass('asc')
                    _this.productsListPrarms.orderBy = 'price_asc'                    
                }                
            }
            _this.productsListPrarms.page = 1
            _this.loadProductList()            
        })

        //处理树形菜单图标
        $('.category-list').on('click','.iconfont',function(){
            var $this = $(this)
            if($this.hasClass('icon-minus-sl')){
                $this.removeClass('icon-minus-sl').addClass('icon-plus-sl').siblings('ul').hide()
            }
            else if($this.hasClass('icon-plus-sl')){
                $this.removeClass('icon-plus-sl').addClass('icon-minus-sl').siblings('ul').show()
            }
        })
        //处理树形菜单项目
        $('.category-list').on('click','.link',function(){
            var $this = $(this)
            _this.productsListPrarms.page = 1
            _this.productsListPrarms.category = $this.data('id')
            _this.loadProductList()
            $('.category-list .link').removeClass('active')                  
            $this.addClass('active')
        })        
    },
    loadProductList:function(){
        var _this = this
        api.getProductsList({
            data:this.productsListPrarms,
            success:function(result){
                if(result.list.length > 0){
                    var html = _util.render(tpl,{
                        list:result.list
                    })
                    $('.product-list-box').html(html)
                    //渲染分页组件
                    _this.$pagination.pagination('render',{
                        current:result.current,
                        total:result.total,
                        pageSize:result.pageSize
                    })
                }else{
                    _this.$pagination.pagination('clean')
                    $('.product-list-box').html(err.getEmpty())
                }
            }
        })
    },
}



$(function() {
    page.init()
})