$(function () {
   var $loginBox=$("#loginBox");
   var $resBox=$("#registerBox");
   var $userBox=$("#userInfo");
   var $logout=$("#logout");

   userIsLogin();   //查看是否登录过


   $loginBox.find("a.colMint").on("click",function () {
       $loginBox.hide();
       $resBox.show();
   });

   $resBox.find("a.colMint").on("click",function () {
       $resBox.hide();
       $loginBox.show();
   });

   function userIsLogin() {
       //发请求给服务器，
       $.get("/api/user/userIsLogin",null,function (data) {
           if(data=="0"){
               $userBox.hide();
               $loginBox.show();
           }else{
               // 登录过方法1
               $userBox.show();
               $loginBox.hide();
               //判断是管理员还是普通用户
               if(data.isAdmin==0){   //普通用户
                   $userBox.show();
                   $userBox.find("p.userName span").html(data.uname);
                   $userBox.find("p.adminInfo").hide();
               }else if(data.isAdmin==1){  //管理员
                   $userBox.find("p.userName span").html(data.uname);
                   $userBox.find("p.adminInfo").show();
               }
           }
       })
   }




    //注册
   $resBox.find("button").on("click",function () {
       var uname=$resBox.find("[name='username']").val();
       var pwd=$resBox.find("[name='password']").val();
       var repwd=$resBox.find("[name='repassword']").val();

       if(uname=="" ||  uname==null || pwd=="" ||  pwd==null || repwd=="" || repwd==null){
          alert("用户名或者密码不能为空");
          return;
       }

       if(pwd!==repwd){
          alert("两次输入的密码不一致，请重新输入");
          return;
       }

       pwd=md5(pwd);
       console.log(pwd);

       $.ajax({
          type:"post",
          url:"/api/user/register",  //地址
          data:{               //传参
             uname:uname,
             pwd:pwd
          },
          dataType:"json",
          success:function (data) {
             if(data.code!=2){
                 $resBox.find(".colWarning").html(data.msg);
             }else{
                //注册成功
                 $resBox.find(".colWarning").html(data.msg);
                 setTimeout(function () {
                     // $resBox.find("[name=username]").val("");
                     // $resBox.find("[name=password]").val("");
                     // $resBox.find("[name=repassword]").val("");
                     location.reload();
                     $resBox.hide();
                     $loginBox.show();
                 },1000);
             }
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


    $(document).keydown(function (event) {
        var e = event ? event : window.event;
        if (e.keyCode == 13) {
            $loginBox.find("button").click();

        }
    });



    //登录2
    $loginBox.find("button").on("click",function () {
       var uname=$loginBox.find("[name='username']").val();
       var pwd=$loginBox.find("[name='password']").val();
        if(uname=="" ||  uname==null || pwd=="" ||  pwd==null ){
            alert("用户名或者密码不能为空");
            return;
        }

        pwd=md5(pwd);

        $.ajax({
            type:"post",
            url:"/api/user/login",  //地址
            data:{               //传参
                uname:uname,
                pwd:pwd
            },
            dataType:"json",
            success:function (data) {
                if(data.code==0){
                    $loginBox.find(".colWarning").html(data.msg);
                }else if(data.code==1){
                    $loginBox.find(".colWarning").html(data.msg);
                }else{
                    $loginBox.find(".colWarning").html(data.msg);

                    setTimeout(function () {
                        //方法1
                        // $loginBox.hide();
                        // $userBox.show();
                        // //判断是管理员还是普通用户
                        // if(data.info.isAdmin==0){   //普通用户
                        //     $userBox.find("p.userName span").html(data.info.uname);
                        //     $userBox.find("p.adminInfo").hide();
                        // }else if(data.info.isAdmin==1){  //管理员
                        //     $userBox.find("p.userName span").html(data.info.uname);
                        //     $userBox.find("p.adminInfo").show();
                        // }
                        // 方法2
                        window.location.reload();
                    },1000);
                }
            }
        })
    });


    //退出
    $logout.on("click",function () {
        $.get("/api/user/logout",function (data) {
            if(data=="1"){
                alert("退出成功");
                $userBox.hide();
                $loginBox.show();
                location.reload();
            }else{
                alert("退出失败，请重试");
            }
        })
    });



});









