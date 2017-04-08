/**
 * Created by  pang on 2017/4/4.
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

    res.render("admin/index",{
        userInfo:req.session.user
    });
});

var resData;
router.use(function (req,res,next) {
    resData={
        code:-1,
        msg:""
    };
    next();
});


//用户管理首页
router.get("/user",function (req,res) {
                        //确保绝对是从第一页开始的
    var page=Number(req.query.page || 1);
    var size=7;  //默认每一页7个

    //获取所有的用户信息
    pool.getConnection(function (err,conn) {
        if(err){
            console.log(err);
        }else{
            conn.query("select * from user",function (err,result) {
                var count=result.length;
                var pages=Math.ceil(count/size);
                var mxpages=pages-1;
                //控制一下页数
                page=Math.min(page,pages);
                page=Math.max(page,1);

                //还要查一次数据库
                conn.query("select * from user limit ?,?",[size*(page-1),size],function (err,rs) {
                    conn.release();
                    if(err){
                        console.log(err);
                        result={};
                        res.render("admin/user_index",{
                            allUser:rs
                        });
                    }else {
                        res.render("admin/user_index",{
                            userInfo:req.session.user,
                            allUser:rs,
                            tag:"user",
                            page:page,
                            pages:pages,
                            count:count,
                            size:size
                        });
                    }
                })
            })
        }
    })
});



//退出
router.get("/user/adminUserOutLog",function (req,res) {
    res.send("1");
});

//添加分类
router.get("/type/add",function (req,res) {
    res.render("admin/type_add",{
        userInfo:req.session.user
    });
});

router.post("/type/add",function (req,res) {
    var name=req.body.name;
    if(name=="" || name==null){
        //跳转错误网页
    }else{
        pool.getConnection(function (err,conn) {
            conn.query("insert into type values(null,?)",[name],function (err,result) {
                conn.release();
                if(err){
                    console.log(err);
                    resData.code=1;
                    resData.message="类名不可重复，请重新添加";
                    res.send(resData);
                }else{
                    resData.code=2;
                    resData.message="添加成功";
                    res.send(resData);
                }
            });
        })
    }
});

//分类首页
router.get("/type",function (req,res) {
    //确保绝对是从第一页开始的
    var page=Number(req.query.page || 1);
    var size=7;  //默认每一页7个
    pool.getConnection(function (err,conn) {
        conn.query("select * from type",function (err,result) {
            var count=result.length;
            var pages=Math.ceil(count/size);
            var mxpages=pages-1;
            //控制一下页数
            page=Math.min(page,pages);
            page=Math.max(page,1);
            conn.query("select * from type order by tid limit ?,?",[size*(page-1),size],function (err,rs){
                conn.release();
                if(err || rs.length<=0){
                    res.render("/admin/type_index",{
                        userInfo:req.session.user,
                        msg:"暂无信息"
                    });
                }else{
                    res.render("admin/type_index",{
                        userInfo:req.session.user,
                        categories:rs,
                        tag:"type",
                        page:page,
                        pages:pages,
                        count:count,
                        size:size
                    });
                }
            })
        })
    })
})

//分类修改
router.post("/type/edit",function (req,res) {
    var id=req.body.tid;
    var tname=req.body.newname;
    pool.getConnection(function (err,conn) {
        conn.query("update type set tname=? where tid=?",[tname,id],function (err,result) {
            conn.release();
            if(err){
                console.log(err);
                resData.code=1;
                resData.message="网络连接失败";
                res.send(resData);
            }else{
                resData.code=2;
                resData.message="修改成功";
                res.send(resData);
            }
        });
    })
})

//删除分类
router.get("/category/delete",function (req,res) {
    var tid=Number(req.query.id);
    pool.getConnection(function (err,conn) {

        //万一当内容里面有一个分类下面的文章那就要把删除的那个分类下面的文章放到首页去
        conn.query("update contents set tid=1 where tid="+tid,function (err,result) {
            if(err){
                res.send("<script>alert('网络连接失败')</script>");
            }else{
                conn.query("delete from type where tid=?",[tid],function (err,rs) {
                    conn.release();
                    if(err){
                        console.log(err);
                        res.send("<script>alert('网络连接失败')</script>");
                    }else{
                        res.send("<script>alert('删除成功');location.href='../type'</script>");
                    }
                })
            }
        })
    })
})

//添加内容
router.get("/content/add",function (req,res) {
    pool.getConnection(function (err,conn) {
        conn.query("select * from type order by tid",function (err,result) {
            conn.release();
            res.render("admin/content_add",{
                userInfo:req.session.user,
                categories:result
            });
        });
    })
});

//添加内容
router.post("/content/add",function (req,res) {
    var tid=req.body.category;
    var title=req.body.title;
    var des=req.body.description;
    var content=req.body.content;

    console.log(req.session.user);
    var data=new Date();
    var addTime=data.getFullYear()+","+
        (data.getMonth()+1)+","+data.getDate()
        +""+data.getHours()+":"+data.getMinutes()
        +":"+data.getSeconds()+":"+data.getMilliseconds();

    pool.getConnection(function (err,conn) {
        conn.query("insert into contents values(null,?,?,?,?,?,?,null)",
            [tid,req.session.user._id,title,addTime,des,content],function (err,result) {
                conn.release();
                if(!err){
                    res.send("<script>alert('添加成功');location.href='./'</script>");
                }
            });
    })
});



//2、把这个路由的文件和主模块连接起来
module.exports=router;



