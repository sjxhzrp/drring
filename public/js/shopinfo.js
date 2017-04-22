/**
 * Created by Administrator on 2017/4/21.
 */

$(function () {
        var wodeshoucan =$(".wodeshoucan");
        // var shoucaninfo=$(".dring_thing-word");
        // var shoucanprice=$(".dring_thing-price");
        // var shocuanimg=$(".shoucanimg");
        wodeshoucan.on("click",function () {
            var arr=[];
            arr[2]=$(this).parent().parent().find(".dring_thing-word").text();
            arr[1]=$(this).parent().parent().find(".dring_thing-price").text();
            arr[0]=$(this).parent().parent().parent().find(".shoucanimg").get(0).src;
            console.log(arr)
            var str=arr.join("-");
            console.log(str)
            $.ajax({
                type: "post",
                url: "/api/shopinfo/islogin",  //地址
                data: {               //传参
                },
                dataType: "json",
                success: function (data) {
                    console.log(data.msg.yonhumin)
                    if (data.code == 1) {//已经登录
                        $.ajax({
                            type: "post",
                            url: "/api/shopinfo/collection",  //地址
                            data: {//传参
                                yonhumin:data.msg.yonhumin,
                                wodeshoucan:str//按照图片路径-价格-商品信息的格式传到后台
                            },
                            dataType: "json",
                            success: function (data) {
                                alert(data.msg)
                            }
                        })
                    } else {//需要登录
                        alert(data.msg);
                    }

                }
            });
        });

})