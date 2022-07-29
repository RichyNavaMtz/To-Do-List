const express = require('express');

//falta poner el directorio estatico __diname para que se pueda deployar
const app = express();

//seteamos app para usar EJS
app.set('view engine','ejs');

// para obtener los datos que mandamos el servidor con post
app.use(express.urlencoded({extended:true}));

//para servir el archivo de estilos
app.use(express.static('public'));

var items = [];

app.get('/',(req,res)=>{
    const today = new Date();
    const options ={
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };
    const day = today.toLocaleDateString('en-US',options);
    res.render('list',{kindOfDay:day,newListItems:items});
})

app.post('/',(req,res)=>{
    let nuevo = req.body.newItem;
    items.push(nuevo);
    res.redirect('/')
})







app.listen(3000,console.log('server running on port 3000'));