const fs=require('fs')
const PDFParser=require('pdf2json')
const files=fs.readdirSync("../Files")
var ncp = require('ncp').ncp;

var filesJson=[{
    "Name":"",
    "Location":"",
    "Linkedinurl":"",
    "Email":"",
    "Summary":"",
    "Experience":[],
    "Education":[],
    "Licenses":[],
    "Skills":[]
}]
const parser = function(filename) {
let pdfParser=new PDFParser(this, 1)
pdfParser.loadPDF('../Files/'+filename)
pdfParser.on("pdfParser_dataReady",(pdfData) => {
    const raw = pdfParser.getRawTextContent()
    var userJsonObject=rawtoJson(raw)
    var jsonFilePath="./parsedFile/"+filename.replace("pdf","json")
    fs.writeFile(jsonFilePath,JSON.stringify(userJsonObject),(err) => {
        if(err)
        throw err

        console.log("Created JSON FIle")
    })

   // createHtmlFile(jsonFilePath)
})
}

/*function createHtmlFile(jsonFilePath)
{
    ncp(source, destination, function (err) {
        if (err) {
          return console.error(err);
        }
        console.log('done!');
       });
}*/


var setCount=0

function rawtoJson(raw)
{
    var rawSplit=raw.split('\n')
    filesJson[0].Name=rawSplit[0].trim()
    filesJson[0].Location=rawSplit[1].trim()
    filesJson[0].LinkedInUrl=rawSplit[2].trim()
    filesJson[0].Email=rawSplit[3].trim()

    console.log(filesJson[0])
    filesJson[0].Summary=getSummary(rawSplit,5)
    filesJson[0].Experience=getExperiences(rawSplit,setCount+1)
    filesJson[0].Education=getEducation(rawSplit,setCount+1)
    filesJson[0].Licenses=getLicenses(rawSplit,setCount+1)

    return filesJson[0]

}

function getLicenses(rawG,count)
{
    if(count>39)
        count+=2
    var result=[]
    var i=0
    while(rawG[count].trim()!='Skills')
    {
        result.push({"id":i++,"Certification":rawG[count++],"CertificationId":rawG[count++]})
    }
    setCount=count
    return result;
}


function getEducation(rawE,count)
{
    var result=[]
    var i=0
    while(rawE[count].trim()!='Licenses & Certifications')
    {
        result.push({"id":i++,"institution":rawE[count++],"degree":rawE[count++],"duration":rawE[count++]})
    }
    setCount=count
    return result;
}

function getSummary(raw,count)
{
    var append=""
    while(raw[count].trim()!='Experience')
    {
        append+=raw[count]
        count++
    }
    setCount=count
    return append;
}

function getExperiences(rawC,count)
{
    var result=[]
    var i=0
    while(rawC[count].trim()!='Education')
    {
        result.push({"id":i++,"title":rawC[count++],"company":rawC[count++],"duration":rawC[count++]})
    }
    setCount=count
    return result;
}


module.exports = parser