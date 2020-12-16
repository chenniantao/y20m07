require('pages/common/logo')
require('pages/common/footer')

require('./index.less')

var _util = require('util')
var api = require('api')

var formErr = {
    hide: function () {
        $('.error-item')
            .hide()
            .find('.error-msg')
            .text('')
    },
    show: function (msg) {
        $('.error-item')
            .show()
            .find('.error-msg')
            .text(msg)
    }
}

var page = {
    init: function () {
        this.bindEvent()
        this.getCaptcha()
    },
    getCaptcha: function () {
        //获取并设置验证码
        api.getCaptcha({
            success: function (result) {
                $('.captcha-img').html(result)
            }
        })
    },
    bindEvent: function () {
        var _this = this
        $('#btn-submit').on('click', function () {
            _this.submit()
        })
        $('input').on('keyup', function (ev) {
            if (ev.keyCode == 13) {
                _this.submit()
            }
        })
        //刷新验证码
        $('.captcha-img').on('click', function () {
            _this.getCaptcha()
        })
    },
    submit: function () {
        //1.获取数据
        var formData = {
            username: $.trim($('[name="username"]').val()),
            password: $.trim($('[name="password"]').val()),
            captchaCode: $.trim($('[name="captcha-code"]').val())
        }
        //2.校验数据
        var validateResult = this.validate(formData)
        //验证成功
        if (validateResult.status) {
            formErr.hide()
            //3.发送请求
            api.login({
                data: formData,
                success: function (data) {
                    console.log(data)
                    //window.location.href = _util.getParamFromUrl('redirect') || "/"
                },
                error: function (msg) {
                    formErr.show(msg)
                }
            })

        }
        //验证失败
        else {
            formErr.show(validateResult.msg)
        }
    },
    validate: function (formData) {
        var result = {
            status: false,
            msg: ''
        }
        //校验
        //用户名不能为空
        if (!_util.validate(formData.username, 'require')) {
            result.msg = "用户名或者手机号不能为空"
            return result
        }
        //密码不能为空
        if (!_util.validate(formData.password, 'require')) {
            result.msg = "密码不能为空"
            return result
        }
        //密码格式验证
        if (!_util.validate(formData.password, 'password')) {
            result.msg = "密码格式不正确"
            return result
        }
        //图形验证码不能为空
        if (!_util.validate(formData.captchaCode, 'require')) {
            result.msg = "图形验证码不能为空"
            return result
        }
        //图形验证码格式验证
        if (!_util.validate(formData.captchaCode, 'captchaCode')) {
            result.msg = "图形验证码格式不正确"
            return result
        }
        result.status = true
        return result
    }
}

$(function () {
    page.init()
})