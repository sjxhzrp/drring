/**
 * Created by zrp on 2017/4/21.
 */
$(function () {
        //定义默认参数
        var settings={
            xzoom:400,   //定义放大镜大小
            yzoom:400,   //定义放大镜大小
            offset:10,    //放大镜和图片之间的距离
            position:"right"    //默认放大镜在图片的右边
        };

        $("#ringbuyimg").hover(function () {
            //获取一下位置
            //get(0)  把jQuery对象转换为js对象
            var imageLeft=$(this).get(0).offsetLeft;
            var imageTop=$(this).get(0).offsetTop;
            var imageWidth=$(this).get(0).offsetWidth;
            var imageHeight=$(this).get(0).offsetHeight;
            //得到较大的那张图片
            var bigImage=$(this).parent().attr("href");
            //console.log(bigImage);
            //创建div
            if( $("div.bigImagediv").length==0 ){
                //在这个标签之后来创建一个div
                $(this).after("<div class='bigImagediv'><img class='bigimg' src='"+bigImage+"'></div>");
            }
            //创建出来之后，要来设置一下位置
            $("div.bigImagediv").width(settings.xzoom);
            $("div.bigImagediv").height(settings.yzoom);
            var  leftValue=parseInt(imageLeft)+parseInt(imageWidth)+parseInt(settings.offset);
            // console.log(leftValue);

            $("div.bigImagediv").css({left:leftValue , top:imageTop });

            //添加移动事件
            $(".bigImage").mousemove(function (e) {
                //计算缩放比例
                var bigWidth=$(".bigimg").get(0).offsetWidth;
                var bigHeight=$(".bigimg").get(0).offsetHeight;

                var scalex=bigWidth / imageWidth;
                var scaley=bigHeight / imageHeight;
                //计算移动的位置  减去放大镜的一半 ？ 内容居中显示，不减去的话就是起始显示
                console.log(e.pageY);
                var scrolly= e.pageY -imageTop - ($("div.bigImagediv").height()/scaley/2)-60;
                var scrollx= e.pageX -imageLeft - ($("div.bigImagediv").width()/scalex/2)+60;
                $("div.bigImagediv").get(0).scrollLeft = scrollx*scalex;
                $("div.bigImagediv").get(0).scrollTop = scrolly*scaley;
            })
        },function () {
            $("div.bigImagediv").hide();
            $("div.bigImagediv").remove();
            $("div.bigImagediv").unbind("mousemove");
        })
    })


