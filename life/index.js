/**
 *首页
 *author lixingji
 * 2014/8/23
 */
$(function() {
    init();
});

function init() {
    var AdvertArray = [{
        "adImage": "http://abc.2008php.com/2012_Website_appreciate/2012-07-27/20120727120529.jpg",
        "targetUrl": "whole-love.html"
    }, {
        "adImage": "http://stuweb.zjhzyg.net/2011/11/111128/images/1295091_132647251838_2.jpg",
        "targetUrl": "whole-love.html"
    }, {
        "adImage": "http://image.zcool.com.cn/img3/16/3/1346294201795.jpg",
        "targetUrl": "whole-love.html"
    }];
    // 广告活动清单
    var img_html_str = "";
    for (var i = 0; i < AdvertArray.length; i++) {
        img_html_str += '<div class="slide"><a href="' + AdvertArray[i].targetUrl + '"><img src="' + AdvertArray[i].adImage + '"></a></div>';
    }
    $("#_id_img_div").html(img_html_str);
    loadImg();
}

//加载图片
function loadImg() {
    var slides = $(".swipe-wrap div");
    var divCount = slides.length;
    var show_html_str = "";
    for (var i = 1; i < divCount + 1; i++) {
        if (i == 1) {
            show_html_str += '<span class="one_number blipSelected">' + i;
        } else {
            show_html_str += '<span class="one_number">' + i;
        }
        show_html_str += '</span>';
    }
    $("#_id_show_number").html(show_html_str);
    // pure JS
    var elem = document.getElementById('mySlider');
    var mySwipe = Swipe(elem, {
        // startSlide: 4,
        // auto: 3000,
        // speed:3000,
        // continuous: true,
        // disableScroll: true,
        // stopPropagation: true,
        callback: function(index, element) {
            var slidesShow = $("#_id_show_number span");
            for (var i = 0; i < slidesShow.length; i++) {
                $(slidesShow[i]).css("background", "rgba(80,80,80,0.5)");
            }
            $(slidesShow[index]).css("background-color", "black");
        }
        // transitionEnd : function(index, element) {}
    });

    setInterval(function() {
        mySwipe.next();
    }, 5000);
}
