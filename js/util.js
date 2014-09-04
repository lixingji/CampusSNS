var url_util = "http://120.196.143.36:803/";
var storage = window.localStorage;
var intervalCounter = 0;
var isOnePoint = false;

// 判断登陆的标记 
var _isOwnerLogin = false;

function $_id(id) {
    return document.getElementById(id);
}

/**
 * 封装单按钮对话框 id:id text_val:对话框内容 Evaluate
 */
function alertView(id, text_val) {
    this.text_val = text_val;
    this.id = id;
}

alertView.prototype.init = function() {
    var html_str = '<div class="background_color"></div><div class="background_Content">';
    html_str += '<div class="background_top">提  &nbsp; &nbsp;   示</div><div class="alertView_content">';
    html_str += this.text_val;
    html_str += '</div><div class="btn btn-negative btn-block background_btn" id="alertView_btn">';
    html_str += '确 &nbsp; &nbsp;  定</div></div>';

    $("#" + this.id).html(html_str);
    var alertView_id = this.id;
    $("#alertView_btn").click(function() {
        $("#" + alertView_id).html('');
    });
};
//confirm对话框
alertView.prototype.confirm = function(callback) {
    var html_str = '<div class="background_color"></div><div class="background_Content">';
    html_str += '<div class="background_top">提  &nbsp; &nbsp;   示</div><div class="alertView_content">';
    html_str += this.text_val;
    html_str += '</div><div class="btn btn-negative btn-block alertView_btn" id="alertView_btn">';
    html_str += '确 &nbsp; &nbsp;  定</div><div class="btn btn-negative btn-block alertView_clr" id="alertView_clr">取&nbsp; &nbsp;  消</div></div>';

    $("#" + this.id).html(html_str);
    var alertView_id = this.id;
    $("#alertView_btn").click(function() {
        callback();
    });
    $("#alertView_clr").click(function() {
        $("#" + alertView_id).html('');
    });
};


/**
 * 封装toast id:id text_val:toast内容 settime:toast停留的时间
 */
function toastView(id, text_val, settime) {
    this.text_val = text_val;
    this.id = id;
    this.settime = settime;
}

toastView.prototype.init = function() {
    var html_str = '<div id="toastView" class="toastView">' + this.text_val + '</div>';
    $("#" + this.id).html(html_str);
    var toastView_id = this.id;
    setTimeout(function() {
        $("#" + toastView_id).html('');
    }, this.settime);
}

// 显示toast
function MyToastView(message, settime) {
    var alert = document.getElementById("toast");
    if (alert == null) {
        var toastHTML = '<div id="toast">' + '<span id="toast_text_color">' + message + '</span>' + '</div>';
        document.body.insertAdjacentHTML('beforeEnd', toastHTML);
    } else {
        alert.style.opacity = .9;
    }
    intervalCounter = setInterval("hideToast()", settime);
}

// 隐藏toast
function hideToast() {
    var alert = document.getElementById("toast");
    alert.style.opacity = 0;
    clearInterval(intervalCounter);
}

/**
 * 封装html页面跳转方法
 */
var PageUtil = {
    toNextPage: function(PageName, obj) {
        var PageIdS = Util.getCookie("PageIdS");
        if (!Util.isEmpty(PageIdS)) {
            var url_pathname = "index.html"; // location.pathname;
            var PageList = new Array();
            PageList.push(url_pathname);
            Util.SetCookie("PageIdS", PageList);
        } else {
            var PageList = new Array(Util.getCookie("PageIdS"));
            PageList.push(PageName);
            location.href = PageName;
            Util.SetCookie("PageIdS", PageList);
        }
    },
    back: function() {
        var PageIdS = Util.getCookie("PageIdS");
        if (!Util.isEmpty(PageIdS)) {
            return 0;
        } else {
            var PageList = new Array(Util.getCookie("PageIdS"));
            alert(PageList[PageList.length - 1]);
            var url_pathname = PageList.pop();
            Util.SetCookie("PageIdS", PageList);
            return url_pathname;
        }
    }
}

/**
 * 封装公用方法
 */
var Util = {
    /**
     * 提供ajax的POST的异步请求方法
     *
     *
     */
    getRequestData_POST: function(request_url, params, success_callback,
        error_callback) {
        // alert(JSON.stringify(params));
        try {
            $.ajax({
                url: request_url,
                type: "POST",
                data: params,
                dataType: "jsonp",
                jsonp: 'jsonpcallback',
                success: success_callback,
                error: error_callback
            });
        } catch (e) {
            alert(e.message);
        }
    },

    /**
     * 提供ajax的GET的异步请求方法(跨域)
     *
     */
    getRequestData_GET: function(request_url, params, success_callback,
        error_callback) {
        try {
            $.ajax({
                url: request_url,
                type: "GET",
                data: params,
                dataType: "jsonp",
                success: success_callback,
                error: error_callback
            });
        } catch (e) {
            alert("get:" + e.message);
        }
    },
    /**
     * 提供ajax的GET的异步请求方法
     *
     */
    getRequest_GET: function(request_url, success_callback) {
        try {
            $.ajax({
                url: request_url,
                type: "GET",
                dataType: "jsonp",
                success: success_callback
            });
        } catch (e) {
            alert("get:" + e.message);
        }
    },
    /**
     * 提供判空的方法
     *
     */
    isEmpty: function(para) {
        if (typeof para == 'undefined' || para == 'undefined' || para == '' || para == null || para == 'null' || para == 'NULL' || para == '(null)')
            return false;
        else
            return true;
    },

    // 获得coolie 的值
    cookie: function(name) {
        var cookieArray = document.cookie.split("; "); // 得到分割的cookie名值对
        var cookie = new Object();
        for (var i = 0; i < cookieArray.length; i++) {
            var arr = cookieArray[i].split("="); // 将名和值分开
            if (arr[0] == name)
                return unescape(arr[1]); // 如果是指定的cookie，则返回它的值
        }
        return "";
    },

    // 删除cookie
    delCookie: function(name) {
        document.cookie = name + "=;expires=" + (new Date(0)).toGMTString();
    },

    // 获取指定名称的cookie的值
    getCookie: function(objName) {
        var arrStr = document.cookie.split("; ");
        for (var i = 0; i < arrStr.length; i++) {
            var temp = arrStr[i].split("=");
            if (temp[0] == objName)
                return unescape(temp[1]);
        }
    },

    // 添加cookie
    addCookie: function(objName, objValue, objHours) {
        var str = objName + "=" + escape(objValue);
        if (objHours > 0) { // 为时不设定过期时间，浏览器关闭时cookie自动消失
            var date = new Date();
            var ms = objHours * 3600 * 1000;
            date.setTime(date.getTime() + ms);
            str += "; expires=" + date.toGMTString();
        }
        document.cookie = str;
    },

    // 两个参数，一个是cookie的名子，一个是值
    SetCookie: function(name, value) {
        // var Days = 1; // 此 cookie 将被保存 1 天
        // var exp = new Date(); // new Date("December 31, 9998");
        // exp.setTime(exp.getTime() + Days * 60 * 1000 * 24 * 60);
        // document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
        storage.setItem(name, value);
    },

    // 取cookies函数
    getCookie: function(name) {
        // var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        // if (arr != null)
        //     return unescape(arr[2]);
        // return null;
        var val_return = storage.getItem(name);
        return val_return;
    },

    // web存储set
    setWebData: function(name, value) {
        //storage.setItem(name, value);
    	Util.SetCookie(name, value);
    },
    // web存储get
    getWebData: function(name) {
        var val_return = storage.getItem(name);
        return Util.getCookie(name);//val_return;
    },

    // 手机号码验证  Dialog
    checkPhoneNumber: function(phoneNum) {
        if (phoneNum != null && "" != (phoneNum)) {
            if (phoneNum.length > 11) {
                return "号码位数不对，请检查输入号码";
            }
            if (phoneNum.match("^[0-9]+$") == null) {
                return "请输入正确的手机号码";
            }
            if (phoneNum.length > 2) {
                var phoNum = phoneNum.substring(0, 3);
                // 电信
                if ("133" == phoNum || "153" == phoNum || "180" == phoNum || "189" == phoNum || "181" == phoNum) {
                    return "";
                }
                // 移动
                else if ("134" == phoNum || "135" == phoNum || "136" == phoNum || "137" == phoNum || "138" == phoNum || "139" == phoNum || "150" == phoNum || "151" == phoNum || "152" == phoNum || "157" == phoNum || "158" == phoNum || "159" == phoNum || "182" == phoNum || "183" == phoNum || "184" == phoNum || "187" == phoNum || "188" == phoNum || "147" == phoNum) {
                    return "";
                }
                // 联通
                else if ("130" == phoNum || "131" == phoNum || "132" == phoNum || "145" == phoNum || "155" == phoNum || "156" == phoNum || "185" == phoNum || "186" == phoNum) {
                    return "";
                } else {
                    return "请输入正确的手机号码";
                }
            } else {
                if (phoneNum.length == 1) {
                    if ((phoneNum.substring(0, 1)) != '1') {
                        return "请输入正确的手机号码";
                    } else {
                        return "";
                    }
                } else if (phoneNum.length == 2) {
                    if ("13" == (phoneNum.substring(0, 2)) || "14" == (phoneNum.substring(0, 2)) || "15" == (phoneNum.substring(0, 2)) || "18" == (phoneNum.substring(0, 2))) {
                        return "";
                    } else {
                        return "请输入正确的手机号码";
                    }
                }
            }
        } else {
            return "";
        }
        return null;
    },
    isNumber: function(nums) {
        var retnum = '';
        for (var i = 0; i < nums.length; i++) {
            var num = nums[i];
            if (num * 1 >= 0 && num * 1 <= 9) {
                retnum += num;
            }
        }
        return retnum;
    },
    isNumberRange: function(nums, start, end) {
        var retnum = '';
        for (var i = 0; i < nums.length; i++) {
            var num = nums[i];
            if (num * 1 >= 0 && num * 1 <= 9) {
                retnum += num;
            }
        }
        if (retnum * 1 >= start && retnum * 1 <= end) {
            return retnum;
        } else {
            return retnum.substr(0, retnum.length - 1);
        }
    },
    isNumberRangePoint: function(id, bigNum) {
        var thisObj = $_id(id);
        thisObj.addEventListener("input", function() {
            var oldStr = thisObj.value,
                newStr = '',
                sumPoint = 0;
            for (var i = 0; i < oldStr.length; i++) {
                var theOne = oldStr[i];
                if (theOne * 1 >= 0 && theOne * 1 <= 9 || theOne == ".") {
                    if (theOne == ".") {
                        sumPoint++;
                    }
                    newStr += theOne;
                }
            }
            if (newStr.indexOf("0") == 0 && newStr.indexOf(".") != 1) {
                newStr = newStr.substr(0, 1);
            }
            if (newStr.indexOf(".") == 0) {
                newStr = newStr.substr(1, newStr.length);
            }
            if (sumPoint > 1) {
                sumPoint = 0;
                var lastIndex = newStr.lastIndexOf(".");
                if (lastIndex + 1 >= newStr.length) {
                    newStr = newStr.substr(0, lastIndex);
                } else {
                    newStr = newStr.substr(0, lastIndex) + newStr.substr(lastIndex + 1, newStr.length - 1);
                }
            }
            if (Util.isEmpty(bigNum)) {
                if (newStr * 1 > bigNum * 1) {
                    newStr = newStr.substr(0, newStr.length - 1);
                }
            }
            thisObj.value = newStr;
        });
    },
    createDivElt: function(clsName, id, txt) {
        var divElt = document.createElement("div");
        if (clsName != null && clsName != "") {
            divElt.className = clsName;
        }
        if (id != null) {
            divElt.id = id;
        }
        if (txt != null) {
            divElt.innerHTML = txt;
        } else {
            divElt.innerHTML = "";
        }
        return divElt;
    }
};

/**
 * 时间控件
 *
 * @param id
 *            指定div的id
 * @param startTime
 *            格式：YYYYMMDD 开始时间
 * @param datanum
 *            格式： 总天数
 *
 */
var TimeControls = function(id, startTime, datanum) {
    this.id = id;
    this.startTime = startTime;
    this.datanum = datanum;
    this.init();
    this.returnval = "";
}

TimeControls.prototype.init = function() {
    var yeas = this.startTime.substr(0, 4);
    var month = this.startTime.substr(4, 2);
    var day = this.startTime.substr(6, 2);
    this.calculation(yeas, month, day);
}

TimeControls.prototype.calculation = function(yeas, month, day) {
    var thisobj = this;
    var big_number = [1, 3, 5, 7, 8, 10, 12];
    var small_number = [4, 6, 9, 11];
    var thisMonthDay = 0;

    for (var i = 0; i < big_number.length; i++) {
        if (big_number[i] * 1 == month * 1) {
            thisMonthDay = 31;
        }
    }
    for (var i = 0; i < small_number.length; i++) {
        if (small_number[i] * 1 == month * 1) {
            thisMonthDay = 30;
        }
    }
    if (month * 1 == 2) {
        if ((yeas % 4 == 0 && yeas % 100 != 0) || yeas % 400 == 0) {
            thisMonthDay = 29;
        } else {
            thisMonthDay = 28;
        }
    }

    var listArray = new Array();
    var datanum = this.datanum;
    var listDivOut = document.createElement("div");

    for (var i = 0, j = 1; i < datanum; i++) {
        var htmlstr = "";
        if (thisMonthDay * 1 >= (i + day * 1)) {
            htmlstr = yeas + "-" + this.addnumber(month * 1) + "-" + this.addnumber(i + day * 1);
        } else {
            htmlstr = yeas + "-" + this.addnumber(month * 1 + 1) + "-" + this.addnumber(j);
            j++;
        }
        var listDiv = Util.createDivElt("selectionBox_Content_li", "", htmlstr);
        listDiv.addEventListener("click", function() {
            // alert($(this).html());
            $("#" + thisobj.id + " .select_click")
                .removeClass("select_click");
            $(this).addClass("select_click");
            thisobj.returnval = $(this).html();
        }, false);
        listDivOut.appendChild(listDiv);
    }
    $_id(this.id).appendChild(listDivOut);
    return listDivOut;
};

TimeControls.prototype.addnumber = function(num) {
    if ((num + "").length <= 1) {
        return "0" + num;
    }
    return num;
}

TimeControls.prototype.setSelect = function(n) {

    $($("#" + this.id).find(".selectionBox_Content_li")[n])
        .addClass("select_click");
}
TimeControls.prototype.getReturnval = function() {
    this.returnval = $("#" + this.id + " .select_click").html();
    return this.returnval;
}

/**
 * 提供页面跳转方法
 *
 */
var LocationHref = {
    LocationSignin: function() {
        location.href = "signin.html";
    },
    LocationOther: function(url) {
        location.href = url;
    },
    LocationIsFailure: function(code) {
        if (code == 1) {
            return true;
        } else {
            location.href = "../signin.html";
        }
    }
}

/**
 * 定位
 */
var Positioning = function(callback) {
    this.longitude = null; // 经度
    this.latitude = null; // 纬度
    this.address = null; // 地址
    this.callback = callback;
    this.init();
}

// 初始化，判断是不是微信
Positioning.prototype.init = function() {
    if (typeof window.WeixinJSBridge == 'undefined' || typeof window.WeixinJSBridge.invoke == 'undefined') {
        this.initNoWeiXing();
    } else {
        this.initWeiXing();
    }
}

Positioning.prototype.initWeiXing = function() {

}

Positioning.prototype.initNoWeiXing = function() {
    var thisObj = this;
    var getMap = function(value) {
        thisObj.longitude = value.coords.longitude;
        thisObj.latitude = value.coords.latitude;
        thisObj.changeAdd();
    }
    var handleError = function(value) {
        switch (value.code) {
            case 1:
                console.log("位置服务被拒绝");
                break;
            case 2:
                console.log("暂时获取不到位置信息");
                break;
            case 3:
                console.log("获取信息超时");
                break;
            case 4:
                console.log("未知错误");
                break;
        }
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getMap, handleError, {
            enableHighAccuracy: true,
            maximumAge: 1000
        });
    } else {
        console.log("您的浏览器不支持使用HTML 5来获取地理位置服务");
    }
}

Positioning.prototype.getLongitude = function() {
    try {
        thisObj = this;
        var urlstr = "http://api.map.baidu.com/geocoder/v2/?ak=zg0GXKNCuaYqF6tXqsO76kXf&location=" + this.latitude + "," + this.longitude + "&output=json&pois=0";
        var renderReverse = function(returnjson) {
            thisObj.address = returnjson.result.formatted_address;
            thisObj.callback(thisObj.address);
            console.log(JSON.stringify(returnjson));
        }
        Util.getRequest_GET(urlstr, renderReverse);
    } catch (e) {
        console.log(e.message);
    }
}

Positioning.prototype.changeAdd = function() {
    var thisObj = this;
    var gpsPoint = new BMap.Point(this.longitude, this.latitude);
    var translateCallback = function(point) {
        thisObj.longitude = point.lng;
        thisObj.latitude = point.lat;
        Util.setWebData("Aipet_Position_Longitude", thisObj.longitude);
        Util.setWebData("Aipet_Position_Latitude", thisObj.latitude);
        console.log(thisObj.longitude + ";" + thisObj.latitude);
        thisObj.getLongitude();
    }
    BMap.Convertor.translate(gpsPoint, 0, translateCallback); // 真实经纬度转成百度坐标
}

/**
 * 处理发布的相关数据
 **/
var DataProcessUtil = {

    // 服务方式
    SeviceWay_val: function(val) {
        if (val == '001') {
            return '接送';
        } else if (val == '010') {
            return '上门';
        } else if (val == '100') {
            return '到店';
        } else if (val == '111') {
            return '都可以';
        }
        return '都可以';
    },

    // 服务相应类型图片 Dialog
    ServiceType_val: function(ServiceType) {
        if (ServiceType == '0') {
            return '../../img/ToBatheIconDetail.png';
        } else if (ServiceType == '1') {
            return '../../img/doHairdressingIconDetail.png';
        } else if (ServiceType == '2') {
            return '../../img/findFosterageIconDetail.png';
        }
    },

    ServiceStaReq_Val: function(ServiceStaReq) {
        if (ServiceStaReq == '' || ServiceStaReq == null)
            return '';
        var staArray = ServiceStaReq.split(" ");
        var li_str = '';
        var length = staArray.length;
        for (var i = 0; i < length; i++) {
            li_str += '<li>' + staArray[i] + '</li>'
        };
        return li_str;
    },

    // 宠物种类
    PetVarieties_val: function(PetVarieties) {
        return PetVarieties.split(" ")[2];
    },
    PromotionTime_Val: function(PromotionTime) {
        if (PromotionTime == null)
            return '1月' + '1日';
        var date = PromotionTime.split(" ");
        var dates = date[0].split('/');
        return dates[1] + '月' + dates[2] + '日';
    },

    // 服务开始时间
    ServiceBegintime_Val: function(ServiceBegintime) {

        if (ServiceBegintime == null)
            return '1月' + '1日' + ' 全天';
        var date = ServiceBegintime.split(" ");
        var dates = date[0].split('/');
        var times = date[1].split(':');
        if (times[0] < 12) {
            return dates[1] + '月' + dates[2] + '日' + ' 上午';
        } else if (times[0] >= 12) {
            return dates[1] + '月' + dates[2] + '日' + ' 下午';
        } else {
            return dates[1] + '月' + dates[2] + '日' + ' 全天';
        }

    },
    ServiceTimeDesc_Val: function(ServiceTimeDesc) {
        if (ServiceTimeDesc == null)
            return "全天";
        else
            return ServiceTimeDesc;
    },

    // 服务开始时间
    publishTime_Val: function(publishTime) {
        if (publishTime == null)
            return '1月' + '1日' + ' 全天';
        var date = publishTime.split(" ");
        var dates = date[0].split('/');
        var times = date[1].split(':');
        if (times[0] < 12) {
            return dates[1] + '月' + dates[2] + '日' + ' 上午';
        } else if (times[0] >= 12) {
            return dates[1] + '月' + dates[2] + '日' + ' 下午';
        } else {
            return dates[1] + '月' + dates[2] + '日' + ' 全天';

        }
    },

    // 服务时间 全天 上午 下午
    ServiceDec_Val: function(Dec) {
        if (Dec == '全天')
            return '全天';
        else if (Dec == '上午')
            return '上午';
        else if (Dec == '下午')
            return '下午';
        else
            return '全天';
    },

    // 服务时间
    ServiceTime_Val: function(ServiceBegintime, ServiceTimeDesc) {
        var date = ServiceBegintime.split(" ")[0];
        var time = ServiceTimeDesc.split(" ")[0];
        var beginTime = date.split("/");
        var month = beginTime[1];
        var day = beginTime[2];
        return month + "月" + day + "日" + time;
    },

    // 剩余时间计算 精确到分
    TenderEffectiveTime_Val: function(TenderEffectiveTime) {
        var date1 = new Date();
        var date2 = new Date(TenderEffectiveTime);
        var date_str = '';

        var s1 = date1.getTime(),
            s2 = date2.getTime();
        // 总秒数
        var total = parseInt((s2 - s1) / 1000);
        // 天数
        var day = parseInt((total / (60 * 60 * 24))) % 365;
        // 小时数
        var hour = parseInt((total - day * 24 * 60 * 60) / (3600)) % 24;
        // 分钟数
        var minute = parseInt((total - day * 24 * 60 * 60 - hour * 60 * 60) / (60)) % 60;
        if (total <= 0)
            return '剩余0时0分';
        // return '剩余0天0时0分';
        else if (day > 0) {
            return '剩余' + day + "天" + hour + '小时' + minute + '分';
        } else {
            return '剩余' + hour + '小时' + minute + '分';
        }
        // return '剩余' + day + '天' + hour + '小时' + minute + '分';
    },

    // 剩余有效时间计算 精确到秒
    EffectiveTime_Val: function(EffectiveTime) {
        var str = "";
        var date1 = new Date();
        var date2 = new Date(EffectiveTime);

        var s1 = date1.getTime(),
            s2 = date2.getTime();
        // 总秒数
        var total = parseInt((s2 - s1) / 1000);
        // 天数
        var day = parseInt((total / (60 * 60 * 24))) % 365;
        // 小时数
        var hour = parseInt((total - day * 24 * 60 * 60) / (3600)) % 24;
        // 分钟数
        var minute = parseInt((total - day * 24 * 60 * 60 - hour * 60 * 60) / (60)) % 60;
        var second = parseInt(total - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60);
        if (day > 0)
            str += "<b>" + day + "</b>天";
        if (hour > 0)
            str += "<b>" + hour + "</b>时";
        if (minute >= 0)
            str += "<b>" + minute + "</b>分";
        if (second > 0)
            str += "<b>" + second + "</b>秒";
        else
            str += "<b>0</b>秒";
        return str + "";
    },

    //设置时间进度条
    setTimePrecent: function(EffectiveTime, PublishTime) {
        var date1 = new Date(EffectiveTime); //有效时间
        var date2 = new Date(PublishTime); //发布时间
        var date3 = new Date(); //当前时间
        var s1 = date1.getTime(),
            s2 = date2.getTime(),
            s3 = date3.getTime();
        // 总秒数
        var totalTime = s1 - s2;
        var leaveTime = s1 - s3;
        var total = leaveTime / totalTime;
        if (total <= 0)
            total = 0;
        //百分比
        var progressBarWidth = total * 100 + "%";
        $("#_id_timePercentage").attr("style", "width:" + progressBarWidth);
    },

    // 报价人数
    TenderNumber_Val: function(num) {
        if (num == 0) {
            return '未报价';
        } else {
            return '<b style="color:red">' + num + '</b>' + '人报价';
        }
    },

    // 所处状态 1未投标、2已投标、3已中标、4需求取消、5需求中止、11服务结束（未评价）、12服务结束（宠物主评价）、13服务结束（服务提供者评价）、14服务结束（双方评价）、15服务中止（宠物主中止）、16服务中止（服务者中止）
    // Status_Name: function(Status) {
    //     var Status_List = ['报价中', '等待服务', '等待服务', '已失效(需求取消)', '已失效(需求过期)', '', '', '', '',
    //         '', '未评价', '已评价（宠物主评）', '已评价（服务者评）', '已评价（双方评）', '已失效(服务中止)', '已失效(服务中止)'
    //     ];
    //     return Status_List[Status - 1];
    // },
    Status_Name: function(Status) {
        var Status_List = ['报价中', '报价中', '等待服务', '已失效', '已失效', '', '', '', '',
            '', '已服务', '已评价', '已服务', '已评价', '已失效', '已失效'
        ];
        return Status_List[Status - 1];
    },
    //状态图标
    Status_Icon: function(Status) {
        switch (Status) {
            case 1:
            case 2:
                return 1;
                break;

            case 3:
                return 2;
                break;
            case 4:
            case 5:
            case 15:
            case 16:
                return 4;
                break;
            case 11:
                return 3;
                break;
            case 12:
            case 13:
            case 14:
                return 5;
                break;
            default:
                return 1;
                break;
        }
    },

    // 根据状态链接到不同的页面 宠物主
    Status_URL_Link: function(Status, pre_html) {
        var html_str = "";
        html_str += pre_html;

        switch (Status) {
            case 1: // 报价中
                return html_str + "service-detail-status1.html";
            case 2: // 已报价
                return html_str + "service-detail-status1.html";
            case 3: // 待服务
                return html_str + "service-detail-status2.html";
            case 4: // 已失效
                return html_str + "service-detail-status4.html";
            case 5: // 已失效 超过时间期限
                return html_str + "service-detail-status4.html";
            case 11: //待评价
                return html_str + "service-detail-status3.html";
            case 12: // 已评价
                return html_str + "service-detail-status5.html";
            case 13: // 已评价
                return html_str + "service-detail-status3.html";
            case 14: // 已评价
                return html_str + "service-detail-status5.html";
            case 15: // 服务中止
                return html_str + "service-detail-status4.html";
            case 16: // 服务中止
                return html_str + "service-detail-status4.html";
            default:
                return html_str + "service-detail-status1.html";
        }
    },
    //服务地址
    ServiceAdd_Val: function(ServiceAdd) {
        if (ServiceAdd == "" || ServiceAdd == null)
            return "(未选定，尚无地址)";
        return ServiceAdd;
    },

    //服务者服务地址
    S_ServiceAdd_Val: function(ServiceAdd) {
        if (ServiceAdd == "" || ServiceAdd == null)
            return "本店";
        return ServiceAdd;
    },
    //距离
    Distance_Val: function(Distance) {
        if (Distance == null)
            return "10米";
        return Distance + "米";

    },

    // 宠物主的信息 姓名
    Name: function(petOwner_name) {
        if (petOwner_name == null || petOwner_name.length <= 0 || petOwner_name == '')
            return petOwner_name = "暂无";
        return petOwner_name;
    },

    // 宠物主服务者的信息 联系电话
    Tel: function(Client_tel) {
        if (Client_tel == null || Client_tel.length <= 0 || Client_tel == '')
            return "号码未提供";
        return Client_tel;
    },
    // 评价星星
    Evaluate: function(Fraction) {
        var StrHtml = "";
        var Fraction = Fraction * 1;
        for (var i = 0; i <= 4; i++) { //满分 5颗星
            if (i <= Fraction - 1)
                StrHtml += '<img src="../../img/evaluateLightIcon.png" alt=""/>';
            else if ((i < Fraction) && (i > Fraction - 1)) {
                StrHtml += '<img src="../../img/evaluateHalfIcon.png" alt=""/>';
            } else {
                StrHtml += '<img src="../../img/evaluateGrayIcon.png" alt=""/>';
            }
        }
        return StrHtml;
    }
}

/**
 * load 对话框
 *
 */
var showHtmlDialog = function(id, txt) {
    this.txt = txt;
    this.id = id;
    this.init();
}

showHtmlDialog.prototype.init = function() {
    var outdivobj = $_id(this.id);
    var imgObj = document.createElement("div");
    imgObj.id = "foo";
    var txtdiv = Util.createDivElt("txtdiv");
    txtdiv.innerHTML = this.txt;
    outdivobj.className = "loading-out";
    outdivobj.appendChild(imgObj);
    outdivobj.appendChild(txtdiv);
    var parent = outdivobj.parentNode;
    var bg_div = Util.createDivElt("loading-bg");
    bg_div.id = "loading_id";
    parent.appendChild(bg_div);

    var opts = {
        lines: 17, // The number of lines to draw
        length: 7, // The length of each line
        width: 2, // The line thickness
        radius: 4, // The radius of the inner circle
        corners: 0.5, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#fff', // #rgb or #rrggbb or array of colors
        speed: 2.2, // Rounds per second
        trail: 17, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        left: '12%'
    };
    var target = document.getElementById('foo');
    var spinner = new Spinner(opts).spin(target);
}

showHtmlDialog.prototype.showDiv = function() {
    jQuery("#" + this.id).show();
    jQuery("#loading_id").show();
}

showHtmlDialog.prototype.hideDiv = function() {
    jQuery("#" + this.id).fadeOut();
    jQuery("#loading_id").fadeOut();
}


/**
 * Dialog 对话框
 */

var Dialog = {
    alert: function(text, time) {
        if (time == null) {
            time = 1000;
        }
        var divDialog = document.createElement("div");
        divDialog.className = "toastView";
        divDialog.innerHTML = text;
        document.body.appendChild(divDialog);
        setTimeout(function() {
            document.body.removeChild(divDialog);
        }, time);
    }
}

var UrlLink = function(Pre, Url) {
    Util.SetCookie("Aipet_Pre_Location_href",location.href);

    if (Url == 'null' || Url == null) {
        alert("消息内容为空");
        location.reload();
    } else if (Url.substring(0, 4) == "http") {
        location.href = '' + Pre + 'commonPage.html';
    } else {
        location.href = Url;
    }
}
