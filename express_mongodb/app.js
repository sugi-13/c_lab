const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

//setting ejs as template
app.set('view engine','ejs');

//body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//static files
app.use(express.static('public'));

//method ovveride
app.use(methodOverride('_method'));

//db url
const url = "mongodb+srv://sugi:12345@studentcluster.aybfi9k.mongodb.net/StudentCluster?retryWrites=true&w=majority";

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(console.log("db connected"))
.catch(err=>console.log(err));

app.listen(4000,()=>{
    console.log("server is running");
});

//creating schema

const markschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mark:{
        type:String,
        required:true
    }
});

const stud = mongoose.model('newtable',markschema);


app.get('/',(req,res)=>{
    stud.find().then(data=>{
        res.render('index',{title:'home page',data:data});
        console.log(data);
    });
});

//insert
app.post('/add-item',(req,res)=>{
    const data = new stud({
        name:req.body.name,
        mark:req.body.mark
    });
    data.save().then(()=>{
        res.redirect('/');
    }).catch(err=>console.log(err));
});

//display
app.get('/display/:id',(req,res)=>{
    stud.findOne({
        _id:req.params.id
    }).then(data=>{
        res.render('display',{data:data});
    })
});

//update
app.get('/edit/:id',(req,res)=>{
    stud.findOne({
        _id:req.params.id
    }).then(data=>{
        res.render('edit',{title:'edit page',data:data});
    }).catch(err=>console.log(err));
});

app.put('/edit/:id',(req,res)=>{
    stud.findOne({
        _id:req.params.id
    }).then(data=>{
        data.name = req.body.name
        data.mark = req.body.mark
        data.save().then(()=>{
            res.redirect('/');
        }).catch(err=>console.log(err));
    }).catch(err=>console.log(err));
});

//delete from database
app.delete('/delete/:id',(req,res)=>{
    stud.deleteOne({
        _id:req.params.id
    }).then(()=>{
        res.redirect('/');
    }).catch(err=>console.log(err));
});