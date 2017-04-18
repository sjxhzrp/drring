/**
 * Created by pang on 2017/4/4.
 */
//路由操作
var express=require("express");
var mysql=require("mysql");
//1、加载路由
var router=express.Router();

//数据库连接池
var pool=mysql.createPool({
    host:"127.0.0.1",
    port:3306,
    database:"drring",
    user:"root",
    password:"aaaa"
});

router.get("/",function (req,res) {
    //使用模板引擎去渲染界面
    //            第一个参数模板的路径  第二个参数分配给模板使用的数据
    res.render("main/zhuce",{
        userInfo:req.session.user

    });
});


//2、把这个路由的文件和主模块连接起来
module.exports=router;









