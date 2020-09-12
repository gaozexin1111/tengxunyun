const express = require('express')
const path = require('path')
const mysql = require('mysql')
const {Db} = require('./libs/db')


const app = express()
const port = 3000

//设置静态资源
app.use(express.static('public'));

//req.body的设置
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//数据库设置
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'gzx123456',
    database: 'wui2006',
    port:3308
})
connection.connect();


//设置模板引擎和视图的位置
app.set('views', './views')
app.set('view engine', 'ejs')

//设置视图的后缀
app.set('views',path.join(__dirname,'views')); //设置模板存储位置
app.set('view engine','html');
app.engine('html',require('ejs').renderFile); //使用ejs模板引擎解析html


app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
})

app.get('/list', (req, res) => {


    connection.query("select * from stu",function (error,result,fields) {
        if(error){
            throw error;
        }
        // console.log(result);
        // let message = JSON.parse(JSON.stringify(result))
        let message = result;
        // console.log(message)
        res.render('list', { message:message})

    })



})
//删除
app.post('/del',(req,res)=>{
    let id = req.body.id;

    connection.query("delete from stu where id=?",[id],function(error,result){

        if(error){
            console.log(error)
        }
        if(result.affectedRows){
            res.json({
                    code:200,
                    message:'success'
                }
            )
        }else{
            res.json({
                    code:500,
                    message:'false'
                }
            )
        }

    });

})
//添加
app.post('/add',(req,res)=>{
    // let name = req.body.name;
    // let age = req.body.age;
    // let classes = req.body.classes;
    let data = req.body;
    let {name,classes,age} = data;

    connection.query("insert into stu (name,age,class) values (?,?,?)",[name,age,classes],function(error,result){
        if(error){
            throw error;
        }
        if(result.affectedRows){
            res.json({
                code:200,
                message:'success',
                id:result.insertId
            })
        }else{
            res.json({
                code:500,
                message:'false'
            })
        }

    })
})

//修改
app.get('/editShow',(req,res)=>{
    let id = req.query.id;
    let db = new Db('stu');
    db.edit(id).then(result=>{
        // console.log(result[0]);
        res.render('edit',student=result[0])
    }).catch(error=>{
        throw error
    })
})
app.post('/update',(req,res)=>{
    let data = req.body;
    let id = data.id
    // console.log(data)
    let db = new Db('stu');
    db.update(data,id).then(result=>{
        console.log(result);
        res.json({
          code:200
        })
    }).catch(error=>{
        throw error
    })
})



//修改
app.post('/edit',(req,res)=>{
    let data = req.body;
    let {id,name,classes,age} = data
    connection.query("update stu set name=?,age=?,class=? where id=?",[name,age,classes,id],function(error,result){
        if(error){
            throw error;
        }
        if(result.affectedRows){
            res.json({
                code:200,
                message:'success',
            })
        }else{
            res.json({
                code:500,
                message:'false'
            })
        }
    })
})



app.get('*',(req,res)=>{
    res.send("Hello 404");
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))