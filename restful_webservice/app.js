var bodyparser = require('body-parser')
var express = require('express')
var sql = require('mysql')

//letting app use express
var app = express()

//for handling data
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

//db connection
var con = sql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"restexp1"
})

con.connect(function(err){
    if (err) throw err;
    console.log("connected");
})

app.listen(4000);
console.log("listening");

//to let know where the static files are
app.use(express.static(__dirname+'/'))

//display
app.get("/",function(req,res){
    con.query("select * from restexp1",function(err,response){
        if (err){
            res.send(err);
        }else{
            res.send(response);
        }
    })
})

//insert
app.post("/insert",function(req,res){
    uname = req.body.name;
    rollno = req.body.rollno;
    console.log(uname);
    con.query("insert into restexp1(name,rollno) values("+sql.escape(uname)+","+sql.escape(rollno)+")",function(err,response){
        if (err){
            res.send(err);
        }else{
            res.send(response);
        }
    })
})

app.put("/update/:id",function(req,res){
    id = req.params.id;
    uname = req.body.name;
    rollno = req.body.rollno;
    con.query("update restexp1 set name="+sql.escape(uname)+",rollno="+sql.escape(rollno)+"where id="+sql.escape(id),function(err,response){
        if (err){
            res.send(err);
        }else{
            res.send(response);
        }

    })
})

app.delete("/delete/:id",function(req,res){
    id = req.params.id;
    con.query("delete from restexp1 where id="+sql.escape(id),function(err,response){
        if (err){
            res.send(err);
        }else{
            res.send(response);
        }
    })
})