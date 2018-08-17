var loaded_img_num = 0; //存储图片加载到的位置，避免每次都从第一张图片开始遍历
var lazy_load_img = function(){
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
        if(img_url !== img_tag[i].src){
            //判断img所在div是否在用户可见区域或可见区域最底端以上
            if(img_out_div_height < scroll_height + user_client_height){
                img_tag[i].src = img_url;
                loaded_img_num++;
            }
        }
    }
}


lazy_load_img();    //页面加载时初始化已显示页面区域部分的图片
window.onscroll = function(){   // 页面窗口滚动事件
    lazy_load_img();
}
