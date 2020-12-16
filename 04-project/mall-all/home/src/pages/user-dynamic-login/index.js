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
        this.handleTimer()
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
        //刷新验证码
        $('.captcha-img').on('click', function () {
            _this.getCaptcha()
        })
        //显示验证输入框
        $('#btn-verify-code').on('click', function () {
            var $this = $(this)

            if ($this.hasClass('disable-btn')) {
                return;
            }
            //获取验证码
            _this.getCaptcha()
            $('.captcha-box').show()
        })

        $('#btn-captcha-code').on('click', function () {
            var $this = $(this)

            var phone = $.trim($('[name="phone"]').val())
            var captchaCode = $.trim($('[name="captcha-code"]').val())
            //电话号码不能为空
            if (!_util.validate(phone, 'require')) {
                formErr.show("电话号码不能为空")
                return;
            }
            //电话号码格式验证
            if (!_util.validate(phone, 'phone')) {
                formErr.show("电话号码格式不正确")
                return;
            }
            //图形验证码不能为空
            if (!_util.validate(captchaCode, 'require')) {
                formErr.show("图形验证码不能为空")
                return;
            }
            //图形验证码格式验证
            if (!_util.validate(captchaCode, 'captchaCode')) {
                formErr.show("图形验证码格式不正确")
                return;
            }
            formErr.hide()
            api.getLoginVerifyCode({
                data: {
                    phone: phone,
                    captchaCode: captchaCode
                },
                success: function (result) {
                    formErr.hide()
                    _util.showSuccessMsg('验证码发送成功')
                    //设置按钮
                    $('#btn-verify-code').addClass('disable-btn')
                    window.localStorage.setItem('getLoginVerifyCodeTime', Date.now())
                    _this.handleTimer()
                    $('.captcha-box').hide()
                },
                error: function (msg) {
                    formErr.show(msg)
                }
            })
        })
        $('input').on('keyup', function (ev) {
            if (ev.keyCode == 13) {
                _this.submit()
            }
        })
    },
    handleTimer: function () {
        var _this = this
        var getLoginVerifyCodeTime = window.localStorage.getItem('getLoginVerifyCodeTime')
        if (getLoginVerifyCodeTime) {
            var $btn = $('#btn-verify-code')
            var totalSeconds = 60
            var leaveSeconds = parseInt((Date.now() - getLoginVerifyCodeTime) / 1000)
            if (leaveSeconds <= totalSeconds) {
                //刷新页面时添加
                if (!$btn.hasClass('disable-btn')) {
                    $btn.addClass('disable-btn')
                }
                $btn.html((totalSeconds - leaveSeconds) + 's后重发')
                clearInterval(this.timer)
                //开启定时器
                this.timer = setInterval(function () {
                    _this.handleTimer()
                }, 1000)
            } else {
                clearInterval(this.timer)
                $btn.removeClass('disable-btn')
                $btn.html('获取验证码')
                window.localStorage.removeItem('getLoginVerifyCodeTime')
            }
        }
    },
    submit: function () {
        //1.获取数据
        formErr.hide()
        var formData = {
            phone: $.trim($('[name="phone"]').val()),
            verifyCode: $.trim($('[name="verify-code"]').val()),
        }
        //2.校验数据
        var validateResult = this.validate(formData)
        //验证成功
        if (validateResult.status) {
            formErr.hide()
            //3.发送请求
            api.dynamicLogin({
                data: formData,
                success: function (data) {
                    window.location.href = _util.getParamFromUrl('redirect') || "/"
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
        //电话号码不能为空
        if (!_util.validate(formData.phone, 'require')) {
            result.msg = "电话号码不能为空"
            return result
        }
        //电话号码格式验证
        if (!_util.validate(formData.phone, 'phone')) {
            result.msg = "电话号码格式不正确"
            return result
        }
        //手机验证码不能为空
        if (!_util.validate(formData.verifyCode, 'require')) {
            result.msg = "手机验证码不能为空"
            return result
        }
        //手机验证码格式验证
        if (!_util.validate(formData.verifyCode, 'verifyCode')) {
            result.msg = "手机验证码格式不正确"
            return result
        }
        result.status = true
        return result
    }
}

$(function () {
    page.init()
})