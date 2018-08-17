var throttle = function (func, lazy_time) {
    var timeout = null;     //处理定时器
    //得到事件触发的时间
    var startTime = new Date();
    return function () {
        //获取当前时间
        var nowTime = new Date();
        //清除定时器，以达到节流的目的
        clearTimeout(timeout);
        //每隔 lazy_time 时间段执行一次 func() 函数
        if (nowTime - startTime >= lazy_time) {
            func();
            // 函数执行后重置事件触发的时间
            startTime = nowTime;
        } else {
            // 设置定时器，定时执行 func() 函数
            timeout = setTimeout(func, lazy_time);
        }
    }
}


var loaded_img_num = 0; //存储图片加载到的位置，避免每次都从第一张图片开始遍历
var lazy_load_img = function () {
    var img_out_div = document.getElementsByClassName('load_img');
    var img_tag = document.getElementsByClassName('lazy_img');
    //获得用户屏幕的高度
    var user_client_height = document.documentElement.clientHeight;
    // console.log('用户屏幕的高度' + user_client_height);
    //获得滚动条下拉的距离
    var scroll_height = document.documentElement.scrollTop;
    // console.log('滚动条下拉的距离' + scroll_height);
    //获得img所在div在网页中的高
    for (var i = loaded_img_num; i < img_out_div.length; i++) {
        var img_out_div_height = img_out_div[i].offsetTop;
        // console.log('第'+ i +'张img所在div在网页中的高: ' + img_out_div_height);
        //判断当前img的src是否已经修改
        var img_url = img_tag[i].getAttribute('data-src')
        if (img_url !== img_tag[i].src) {
            //判断img所在div是否在用户可见区域或可见区域底端以上
            if (img_out_div_height < scroll_height + user_client_height) {
                img_tag[i].src = img_url;
                loaded_img_num++;
            }
        }
    }
}


//页面加载时初始化已显示页面区域部分的图片
lazy_load_img();
//添加页面 scroll 的监听事件
window.addEventListener('scroll', throttle(lazy_load_img, 700), false);