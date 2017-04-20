/**
 * Created by pang on 2017/4/4.
 */
//路由操作
var express=require("express");
var mysql=require("mysql");


//数据库连接池
var pool=mysql.createPool({
    host:"127.0.0.1",
    port:3306,
    database:"drring",
    user:"root",
    password:"aaaa"
});

//1、加载路由
var router=express.Router();

//测试
// router.get("/",function (req,res) {
//     res.send("<script>alert('这是前台管理界面')</script>")
// });

//定义一下统一返回的json格式
var resData;
router.use(function (req,res,next) {
    resData={
        code:-1,
        msg:""
    };
    next();
});


//查看用户是否登录过
router.get("/user/userIsLogin",function (req,res) {
    if(req.session.user == undefined){
        //证明没有登录过
        res.send("0");
    }else{
        res.send(req.session.user);
    }
});




//注册
router.post("/user/register",function (req,res) {
   //获取传过来的参数
   var uname=req.body.uname;
   var pwd=req.body.pwd;
    var accont=req.body.accont;
    console.log(uname);
   pool.getConnection(function (err,conn) {
       conn.query("select * from user where zhanhumin=?",[uname],function (err,result) {
           if(err){
               console.log(err)
               resData.code=0;
               resData.msg="网络连接失败，请稍后重试";
               res.json(resData);
           }else if(result.length>0){
               resData.code=1;
               resData.msg="用户名已存在，请重新输入";
               res.json(resData);
           }else{
               //可以 注册
               conn.query("insert into user values(null,?,?,?,null,null,null)",[accont,uname,pwd],function (err,resu) {
                   conn.release();
                   if(err){
                       console.log(err);
                       resData.code=0;
                       resData.msg="网络连接失败，请稍后重试注册";
                       res.json(resData);
                   }else{
                       resData.code=2;
                       resData.msg="注册成功";
                       res.json(resData);
                   }
               })
           }
       })
   })
});

//登录2
router.post("/user/login",function (req,res) {
    //获取传过来的参数
    var uname=req.body.uname;
    var pwd=req.body.pwd;
    if (pwd){
        pool.getConnection(function (err,conn) {
            if(err){
                console.log(err);
                resData.code=0;
                resData.msg="网络连接失败，请稍后重试";
                res.json(resData);
            }else {
                conn.query("select yonhumin from user where zhanhumin=? && mima=?", [uname, pwd], function (err, result) {
                    conn.release();
                    if (err) {
                        console.log(err);
                        resData.code = 0;
                        resData.msg="网络连接失败，请稍后重试";
                        res.json(resData);

                    } else if(result.length<=0) {
                        resData.code = 1;
                        resData.msg="用户名或者密码错误，请验证后再试";
                        res.json(resData);
                    }else{
                        resData.code = 2;
                        resData.msg="登录成功";
                        resData.info=result[0];   //传输到前台，好收获用户名

                        //存session
                        req.session.user={
                            yonhumin:result[0]
                        };
                        res.json(resData);
                    }
                })
            }
        })
    }else {

        pool.getConnection(function (err,conn) {
            if(err){
                console.log(err);
                resData.code=0;
                resData.msg="网络连接失败，请稍后重试";
                res.json(resData);
            }else {
                conn.query("select yonhumin from user where zhanhumin=?", [uname], function (err, result) {
                    conn.release();
                    if (err) {
                        console.log(err);
                        resData.code = 0;
                        resData.msg="网络连接失败，请稍后重试";
                        res.json(resData);

                    } else if(result.length<=0) {
                        resData.code = 1;
                        resData.msg="用户名或者密码错误，请验证后再试";
                        res.json(resData);
                    }else{
                        resData.code = 2;
                        resData.msg="登录成功";
                        resData.info=result[0];   //传输到前台，好收获用户名

                        //存session
                        req.session.user={
                           yonhumin:result[0]
                        };
                        res.json(resData);
                    }
                })
            }
        })
    }
});
//
//     //退出
// router.get("/user/logout",function (req,res) {
//     delete req.session.user;
//     res.send("1");
// });




//2、把这个路由的文件和主模块连接起来
module.exports=router;
