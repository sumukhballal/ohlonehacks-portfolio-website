const express=require('express')
const spawn= require('child_process')
var formidable=require('formidable')
var multer = require('multer');
var http=require('http')
const bodyParser = require('body-parser');
const fs=require('fs')
const PDFParser=require('pdf2json')
const files=fs.readdirSync("../Files")
const parser=require('./parser.js')

const app=express()
const port=9000
var filenameNew=""
var storage=multer.diskStorage(
    {
        destination: '../Files/',
        filename: function(req,res,cb) {
            const uniqueSuffix= Date.now() + '-' + Math.round(Math.random() * 1000)
            filenameNew=res.fieldname+"_"+uniqueSuffix+".pdf"
            cb(null, filenameNew)
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
        parser(filenameNew)
        console.log("File uploaded.")
        return res.send("File uploaded successfully")
    })

})

app.get('/',(req,res) => {

    res.send('<h1> working </h1>');
})


app.listen(port, () => { 
    console.log('listening on port 9000')
})