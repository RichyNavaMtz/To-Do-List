const express = require('express');

//falta poner el directorio estatico __diname para que se pueda deployar
const app = express();


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})







app.listen(3000,console.log('server running on port 3000'));