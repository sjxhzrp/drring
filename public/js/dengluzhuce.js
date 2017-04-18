$(function () {

    $("#emil").on("click",function () {
        $("#zhanghao").hide();
        console.log($('ul li:eq(0)'));
        $("#emilform").show();
        $("ul #firstli").attr("class","");
        $("ul #secondli").attr("class","active");
        $("#emil").attr("class","active1");
        $("#shouji").attr("class","");
        zhuceFalg=true;
    });
    $("#shouji").on("click",function () {
        $("#emilform").hide();
        $("#zhanghao").show();
        $("ul #firstli").attr("class","active");
        $("ul #secondli").attr("class","");
        $("#emil").attr("class","");
        $("#shouji").attr("class","active1");
        zhuceFalg=false;
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

    var emailzhucebtn=$("#btn" );
    var zhanghaozhuceBtn=$("#btn1");


  // userIsLogin();   //查看是否登录过

    //邮箱注册
    emailzhucebtn.on("click",function () {
        validate();

        if (zhuceFalg){//邮箱注册
            var uname=emailzhucebtn.find("[name='uname']").val();
            var pwd=emailzhucebtn.find("[name='pwd']").val();
            var repwd=emailzhucebtn.find("[name='repwd']").val();
            var accont=creatname();
            if( uname=="" ||  uname==null || pwd=="" ||  pwd==null || repwd=="" || repwd==null){
                alert("用户名或者密码不能为空");
                return;
            }
        }

        if(pwd!==repwd){
            alert("两次输入的密码不一致，请重新输入");
            return;
        }
        pwd=md5(pwd);
        console.log(uname);
        console.log(pwd);
        console.log(accont);
       $.ajax({
          type:"post",
          url:"/api/user/register",  //地址
          data:{               //传参
             uname:uname,
             pwd:pwd,
              accont:accont
          },
          dataType:"json",
          success:function (data) {
              window.location.href="denglu.html"
             // if(data.code!=2){
             //     $resBox.find(".colWarning").html(data.msg);
             // }else{
             //    //注册成功
             //     $resBox.find(".colWarning").html(data.msg);
             //     setTimeout(function () {
             //         // $resBox.find("[name=username]").val("");
             //         // $resBox.find("[name=password]").val("");
             //         // $resBox.find("[name=repassword]").val("");
             //         location.reload();
             //         $resBox.hide();
             //         $loginBox.show();
             //     },1000);
          //    }
           }
       })
   });

   //登录1
   // $loginBox.find("button").on("click",function () {
   //    var uname=$loginBox.find("[name='username']").val();
   //    var pwd=$loginBox.find("[name='password']").val();
   //    console.log("aaaaaaaaaaaaaaaaaaaaaa");
   //     if(uname=="" ||  uname==null || pwd=="" ||  pwd==null ){
   //         alert("用户名或者密码不能为空");
   //         return;
   //     }
   //
   //     $.ajax({
   //         type:"post",
   //         url:"/api/user/login",  //地址
   //         data:{               //传参
   //             uname:uname,
   //             pwd:pwd
   //         },
   //         dataType:"json",
   //         success:function (data) {
   //
   //             if(data.code==0){
   //                 alert(data.msg);
   //             }else if(data.code==1){
   //                 alert(data.msg);
   //                 $resBox.hide();
   //                 $loginBox.hide();
   //                 $userBox.show();
   //             }else{
   //                 alert(data.msg);
   //                 $resBox.hide();
   //                 $loginBox.hide();
   //                 $userBox.show();
   //             }
   //         }
   //     })
   // })


    // $(document).keydown(function (event) {
    //     var e = event ? event : window.event;
    //     if (e.keyCode == 13) {
    //         $loginBox.find("button").click();
    //
    //     }
    // });
    //
    //
    //
    // //登录2
    // $loginBox.find("button").on("click",function () {
    //    var uname=$loginBox.find("[name='username']").val();
    //    var pwd=$loginBox.find("[name='password']").val();
    //     if(uname=="" ||  uname==null || pwd=="" ||  pwd==null ){
    //         alert("用户名或者密码不能为空");
    //         return;
    //     }
    //
    //     pwd=md5(pwd);
    //
    //     $.ajax({
    //         type:"post",
    //         url:"/api/user/login",  //地址
    //         data:{               //传参
    //             uname:uname,
    //             pwd:pwd
    //         },
    //         dataType:"json",
    //         success:function (data) {
    //             if(data.code==0){
    //                 $loginBox.find(".colWarning").html(data.msg);
    //             }else if(data.code==1){
    //                 $loginBox.find(".colWarning").html(data.msg);
    //             }else{
    //                 $loginBox.find(".colWarning").html(data.msg);
    //
    //                 setTimeout(function () {
    //                     //方法1
    //                     // $loginBox.hide();
    //                     // $userBox.show();
    //                     // //判断是管理员还是普通用户
    //                     // if(data.info.isAdmin==0){   //普通用户
    //                     //     $userBox.find("p.userName span").html(data.info.uname);
    //                     //     $userBox.find("p.adminInfo").hide();
    //                     // }else if(data.info.isAdmin==1){  //管理员
    //                     //     $userBox.find("p.userName span").html(data.info.uname);
    //                     //     $userBox.find("p.adminInfo").show();
    //                     // }
    //                     // 方法2
    //                     window.location.reload();
    //                 },1000);
    //             }
    //         }
    //     })
    // });
    //
    //
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









