/**
 * Created by Administrator on 2017/4/17.
 */
$(function () {
    $("#qhzjNav").bind("mouseover",function () {
        $("#zasksubNav").hide();
        $("#qhzjsubNav").show();
    }).bind("mouseout",function () {
        $("#qhzjsubNav").hide();
    });
    $("#zaskNav").bind("mouseover",function () {
        $("#qhzjsubNav").hide();
        $("#zasksubNav").show();
    }).bind("mouseout",function () {
        $("#zasksubNav").hide();
    });


    var denglu=$("#denglu");
    var zhuce=$("#zhuce");

    denglu.on("click",function () {
        window.location.href = "/login";
    });
    zhuce.on("click",function () {
        window.location.href = "/regisetr";
    });


})
