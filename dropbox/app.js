const express = require('express');
const app = express();
const {join}=require("path");
app.get('/',(req,res)=>{
    res.sendFile(join(__dirname + "/home.html"));
});

app.listen(5000);