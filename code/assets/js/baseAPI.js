// 注意：每次调用$.ajax()或$.get()或$.post()的时候会先调用ajaxPrefilter这个函数
//在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){
   
    // 在发起ajax请求之前，统一的拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007'+options.url
     console.log(options.url);
})