/**
 * Created by pang on 2017/4/4.
 */

var express=require("express");
var cookieParser=require("cookie-parser");
var session=require("express-session");   //session模块
var bodyparser=require("body-parser");
var mysql=require("mysql");   //数据库模块
var fs=require("fs");   //文件操作

var swig=require("swig");   //加载模板引擎

var app=express();
app.use(cookieParser());
app.use(bodyparser.urlencoded({extended:false}));

//配置模板引擎
app.engine("html",swig.renderFile);    //engine（"后缀名"，处理模板引擎渲染的方法）
//设置模板引擎所放的目录
app.set("views","./view");    ///app.set("views(不可改变)","./view(目录)");
//注册所使用的模板引擎
app.set("view engine","html");    //app.set("view engine(不可改变)","html(为app.engine这个方法所定义的东西)");
//因为我们的模板引擎默认开启了引擎，因此我们开发的时候，可以去掉这个缓存，到那时上线了，就要开启
swig.setDefaults({cache:false});





//静态资源托管
app.use("/public",express.static(__dirname +"/public"));

// session
app.use(session({
    secret:"keyboard cat" ,    //session私密id
    resave:true,           //每次请求，都会去重新设置session cookie
    saveUninitialized:true,    //指无论有没有session cookie，每次请求都会自动添加一个
    cookie:{secure:false},     //https协议
    cookie:{maxAge:1000*60}    //毫秒为单位
}));

//数据库连接池
var pool=mysql.createPool({
    host:"127.0.0.1",
    port:3306,
    database:"drring",
    user:"root",
    password:"aaaa"
});

//考虑到所有的业务逻辑都写到server.js里面，那么将过于庞大，因此，我们我们分模块开发
//定义路由路径
//默认引用的js文件所以不用加后缀名
//加载顺序，从上到下
app.use("/admin",require("./routers/admin"));
app.use("/api",require("./routers/api"));
app.use("/",require("./routers/main"));















//使用静态资源管理插件
// app.use(express.static("../drring"));   //这个page下面的所有的文件全部都使用静态资源管理


//监听
app.listen(80,function (err) {
    if(err){
        console.log(err)
    } else{
        console.log("服务器启动成功")
    }
});





