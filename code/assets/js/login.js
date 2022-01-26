$(function () {
    // 点击“去注册账号”的连接
    $('#link_reg').on('click', function () {
        // console.log('我点击了');
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的连接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 从layui身上获取form对象
    let form = layui.form
    let layer = layui.layer
    // 通过form.verify函数自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的值
            // 还需要拿到密码框中的值
            // 然后进行一次判断
            // 如果判断失败则返回一个错误提示信息
            let repass = $('.reg-box [name=password]').val()
            if (value != repass) {
                return '两次密码不一致'
            }
        }
    })
    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 阻止表单的默认提交
        e.preventDefault()
        let data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser', data, function (res) {
            if (res.status != 0) {
                // return console.log(res.message)
                return layer.msg(res.message)
            }
            // console.log('登录成功')
            layer.msg('注册成功请登录')
            $('#link_login').click()
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        // 阻止表单默认提交
        e.preventDefault()
        let data = $(this).serialize()
        data = decodeURIComponent(data, true)
        $.ajax({
            url: 'api/login',
            method: 'POST',
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                console.log(res.token);
                // 将登录成功得到的token字符串，保存到localStorage中
                localStorage.setItem('token', res.token)
                //跳转到后台
                location.href = '/index.html'
            }

        })
    })
})