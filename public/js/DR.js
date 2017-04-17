/**
 * Created by Administrator on 2017/4/17.
 */
$(function () {
    $("#qhzjNav").bind("mouseover",function () {
        $("#xialadiv2").hide();
        $("#xialadiv1").show();
    }).bind("mouseout",function () {
        $("#xialadiv1").hide();
    });
    $("#zaskNav").bind("mouseover",function () {
        $("#xialadiv1").hide();
        $("#xialadiv2").show();
    }).bind("mouseout",function () {
        $("#xialadiv2").hide();
    });
    $("#xialadiv1").bind("mouseover",function () {
        $("#xialadiv1").show();
    }).bind("mouseout",function () {
        $("#xialadiv1").hide();
    });
    $("#xialadiv2").bind("mouseover",function () {
        $("#xialadiv2").show();
    }).bind("mouseout",function () {
        $("#xialadiv2").hide();
    });
})