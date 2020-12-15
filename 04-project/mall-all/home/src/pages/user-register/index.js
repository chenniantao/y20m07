require('pages/common/logo')
require('pages/common/footer')
require('./index.less')

var _util = require('util')
var api = require('api')

console.log(api)

var formErr = {
    show:function(msg){
        $('.error-item').show().find('.error-msg').html(msg)
    },
    hide:function(){
        $('.error-item').hide().find('.error-msg').html('')
    }
}

var page = {
    init:function(){
        this.bindEvent()
    },
    bindEvent:function(){
        var _this = this
        //添加提交事件
        $('#btn-submit').on('click',function(){
            _this.submit()
        })
    },
    //注册的提交
    submit:function(){
        //1.获取表单的数据
        var formData = {
            phone: $('input[name="phone"]').val(),
            verifyCode: $('input[name="verify-code"]').val(),
            password: $('input[name="password"]').val(),
            repassword: $('input[name="repassword"]').val(),
        }
        //2.验证
        var result = this.validate(formData)
        if(result.status){//验证成功
            //3.提交到后台
            formErr.hide()
            api.register({
                data: formData,
                success:function(result){
                    console.log('ok...')
                },
                error:function(msg){
                    formErr.show(msg) 
                }
            })
        }
        else{//验证失败
            formErr.show(result.msg)
        }
    },
    validate: function (formData){
        var result = {
            status:false,
            msg:''
        }
        if (!_util.validate(formData.phone,'require')){
            result.msg = '手机号不能为空'
            return result
        }
        if (!_util.validate(formData.phone, 'phone')) {
            result.msg = '手机格式不正确'
            return result
        }
        if (!_util.validate(formData.verifyCode, 'require')) {
            result.msg = '手机验证码不能为空'
            return result
        }
        if (!_util.validate(formData.verifyCode, 'verifyCode')) {
            result.msg = '手机验证码格式不正确'
            return result
        }
        if (!_util.validate(formData.password, 'require')) {
            result.msg = '密码不能为空'
            return result
        }
        if (!_util.validate(formData.password, 'password')) {
            result.msg = '密码格式不正确'
            return result
        }
        if (formData.password != formData.repassword){
            result.msg = '两次密码不一致'
            return result
        }                 
        result.status = true
        return result;

    }
}

$(function () {
    page.init()
})