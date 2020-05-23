const url="http://localhost:9000/fileupload"

document.addEventListener('DOMContentLoaded',init)

function init()
{
    document.getElementById("submit").addEventListener('click',upload)
}

function upload(event)
{
    event.preventDefault()
    let h=new Headers();
    h.append('Accept','application/json')
    let fd = new FormData();

    let myfile=document.getElementById('fileupload').files[0]
    fd.append('username',document.getElementById('username').value)
    fd.append('fileupload',myfile,'file.pdf')

    let req= new Request(url, {
        method: 'POST',
        headers: h,
        mode: 'no-cors',
        body: fd
    })

    fetch(req).then((reponse) => {
        document.getElementById('output').textContent="File Uploaded"
    }).catch ( (err) => {
        console.log("Error")
    })
    
}