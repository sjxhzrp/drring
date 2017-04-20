$(function () {
    //注册
    $("#emil").on("click",function () {
        $("#zhanghao").hide();
        console.log($('ul li:eq(0)'));
        $("#emilform").show();
        $("ul #firstli").attr("class","");
        $("ul #secondli").attr("class","active");
        $("#emil").attr("class","active1");
        $("#shouji").attr("class","");
    });
    $("#shouji").on("click",function () {
        $("#emilform").hide();
        $("#zhanghao").show();
        $("ul #firstli").attr("class","active");
        $("ul #secondli").attr("class","");
        $("#emil").attr("class","");
        $("#shouji").attr("class","active1");
    });
    $("#pwd1").on("click",function () {
        var zhval=$("#txt1").val();
        var reg=/^\d+$/;
        if(zhval==""){
            $("#tanchuk").show();
            $("#tanchuk span").html("账号不能为空");
        }else if(reg.test(zhval)!=true){
            $("#tanchuk").show();
            $("#tanchuk span").html("账号只允许数字");
        }if(reg.test(zhval)==true){
            $("#tanchuk").hide();
        }
    });

    function creatname() {
        var arr=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",1,2,3,4,5,6,7,8,9,0,"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        var num=5;//定义长度
        var str="";//定义要输出的默认字符串
        for (var i=0;i<num;i++){
            var a=parseInt(Math.random()*62);
            str+=arr[a];
        };
        return str;
    };

    function zhuce (emailform) {
        var uname = emailform.find("[name='uname']").val();
        var pwd = emailform.find("[name='pwd']").val();
        var repwd = emailform.find("[name='repwd']").val();
        var accont = creatname();
        if (uname == "" || uname == null || pwd == "" || pwd == null || repwd == "" || repwd == null) {
            alert("用户名或者密码不能为空");
            return;
        }

        if (pwd !== repwd) {
            alert("两次输入的密码不一致，请重新输入");
            return;
        }

        $.ajax({
            type: "post",
            url: "/api/user/register",  //地址
            data: {               //传参
                uname: uname,
                pwd: pwd,
                accont: accont
            },
            dataType: "json",
            success: function (data) {
                alert(data.msg);
                window.location.href = "login";
            }
        });
    }

    var emailform=$("#emilform");
    var zhanghaoform=$("#zhanghao");
    var emailzhucebtn=emailform.find("#btn");
    var zhanghaozhuceBtn=zhanghaoform.find("#btn1");
  // userIsLogin();   //查看是否登录过

    //邮箱注册
    emailzhucebtn.on("click",function () {
        var flag = validate();
        if (!flag) {
            return;
        }
        zhuce(emailform);
    });
     zhanghaozhuceBtn.on("click",function () {
        zhuce(zhanghaoform);
    });



   //登录
    var dengluflag=true;//定义一个布尔，去判断用户是用手机语音验证码登录的还是用密码登录的，true为验证码
    $(".usePhone").on("click",function () {
        $(".email").hide();
        $(".phone").show();
        dengluflag=true;
    })
    $(".usepassword").on("click",function () {
        $(".phone").hide();
        $(".email").show();
        dengluflag=false;
    })
    $("#email").on("click",function () {
        $("#myli1").attr("class","");
        $("#myli2").attr("class","active");
        $("#email").attr("class","active1");
        $("#phone").attr("class","");
        $("#getphone").hide();
        $("#getemail").show();
    });
    $("#phone").on("click",function () {
        $("#myli1").attr("class","active");
        $("#myli2").attr("class","");
        $("#email").attr("class","");
        $("#phone").attr("class","active1");
        $("#getphone").show();
        $("#getemail").hide();
    });
    $("#forgetpwd").on("click",function () {
        $("#logindiv").hide();
        $("#findpwd").show();
    });
    $(".fanhui").on("click",function () {
        $("#findpwd").hide();
        $("#logindiv").show();
    });

    var logindiv=$("#logindiv");
    var denlu=$("#denglubtn");
    denlu.on("click",function () {
        if (dengluflag){
            //验证码登录
            var uname=logindiv.find("[name='elephone']").val();
            if(uname=="" ||  uname==null ){
                alert("用户名不能为空");
                return;
            };
            console.log(uname)
            $.ajax({
                type: "post",
                url: "/api/user/login",  //地址
                data: {               //传参
                    uname: uname
                },
                dataType: "json",
                success: function (data) {
                    window.location.href = "/";
                    console.log(data.info);
                }
            });
        }else {
            //密码登录
            var uname = logindiv.find("[name='email']").val();
            var pwd = logindiv.find("[name='password']").val();
            if (uname == "" || uname == null || pwd == "" || pwd == null) {
                alert("用户名或者密码不能为空");
                return;
            };
            console.log(uname+"_____"+pwd)
            $.ajax({
                type: "post",
                url: "/api/user/login",  //地址
                data: {               //传参
                    uname: uname,
                    pwd: pwd
                },
                dataType: "json",
                success: function (data) {
                    window.location.href = "/";
                    console.log(data.info);
                }
            })
        }
    })

    // //退出
    // $logout.on("click",function () {
    //     $.get("/api/user/logout",function (data) {
    //         if(data=="1"){
    //             alert("退出成功");
    //             $userBox.hide();
    //             $loginBox.show();
    //             location.reload();
    //         }else{
    //             alert("退出失败，请重试");
    //         }
    //     })
    // });



});









