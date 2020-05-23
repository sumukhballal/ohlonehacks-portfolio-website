const express=require('express')
const spawn= require('child_process')
var formidable=require('formidable')
var multer = require('multer');
var http=require('http')

const app=express()
const port=9000

var storage=multer.diskStorage(
    {
        destination: '../Files/',
        filename: function(req,res,cb) {
            const uniqueSuffix= Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, res.fieldname+"_"+uniqueSuffix+".pdf")
        }
    }
)

var upload= multer({storage: storage}).single('fileupload')

app.post('/fileupload',(req,res,next) => 
{
    upload(req, res, function(err) {
        if(err) 
        {
            return res.send("Bad Luck! Doesnt work")
        }
        return res.send("File uploaded successfully")
    })
})

app.get('/',(req,res) => {

    res.send('<h1> working </h1>');
})


app.listen(port, () => { 
    console.log('listening on port 9000')
})