const express = require('express')
const upload = require('express-fileupload')

const app = express()
const path = require('path');
const { dirname } = require('path/posix');

app.use(upload())

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,'public')))


function fileValidation() { 

    var fileInput =  document.getElementById('fileSelection');   
    var filePath = fileInput.value; 

    // Allowing file type 

    var allowedExtensions =  /(\.jpg|\.jpeg|\.png)$/i;       
    if (!allowedExtensions.exec(filePath)) { 
        alert('Invalid file type'); 
        fileInput.value = ''; 
        return false; 
    }  

} 


app.get('/',(req, res)=>{
    res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {
    if(req.files){
        console.log(req.files)
        var imagefile = req.files.file
        var filename = imagefile.name
        console.log(filename)
        imagefile.mv('./public/uploads/'+filename, function(err)
        {
            if(err){
                res.send(err)
            }
            else{
                console.log("File uploaded")
            }
        })
    }
})

app.listen(5000)