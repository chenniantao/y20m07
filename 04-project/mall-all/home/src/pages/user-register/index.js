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
        //回车提交表单
        $('input').on('keydown',function(ev){
            if(ev.keyCode == 13){
                _this.submit()
            }
        })
        //获取验证码
        $('#btn-verify-code').on('click',function(){
            $('.captcha-box').show()
            _this.getCaptcha()
        })
        //刷新验证码
        $('.captcha-img').on('click',function(){
            _this.getCaptcha()
        })
        //发送验证码请求
        $('#btn-captcha-code').on('click',function(){
            _this.getVerifyCodeRequest()
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

    },
    //获取图形验证码
    getCaptcha:function(){
        api.getCaptcha({
            success:function(result){
                $('.captcha-img').html(result)
            }
        })
    },
    //获取手机验证码请求
    getVerifyCodeRequest:function(){
        //验证
        var phone = $.trim($('input[name="phone"]').val())
        var captchaCode = $.trim($('input[name="captcha-code"]').val())
        if (!_util.validate(phone, 'require')) {
            formErr.show('手机号不能为空')
            return
        }
        if (!_util.validate(phone, 'phone')) {
            formErr.show('手机格式不正确')
            return 
        }
        if (!_util.validate(captchaCode, 'require')) {
            formErr.show('图形验证码不能为空')
            return
        }
        if (!_util.validate(captchaCode, 'captchaCode')) {
            formErr.show('图形验证码格式不正确')
            return
        }
        formErr.hide()                 
        //发送请求
        api.getRegisterVerifyCode({
            data:{
                phone:phone,
                captchaCode: captchaCode
            },
            success:function(){
                _util.showSuccessMsg('手机验证码发送成功')
                $('input[name="captcha-code"]').val('')
                $('.captcha-box').hide()
            },
            error:function(msg){
                formErr.show(msg)
            }
        })
    }
}

$(function () {
    page.init()
})