require('./index.less')
var api = require('api')
var page = {
    init:function(){
        this.loadUsername()
        this.bindEvent()
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
        //退出操作
        $('#logout').on('click',function(){
            api.logout({
                success:function(){
                    window.location.reload()
                }
            })
        })
    }
}

$(function(){
    page.init()
})