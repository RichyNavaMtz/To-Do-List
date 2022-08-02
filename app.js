
const express = require('express');
const app = express();

//require la base de datos
const mongoose = require('mongoose');

//seteamos app para usar EJS
app.set('view engine','ejs');

// para obtener los datos que mandamos el servidor con post
app.use(express.urlencoded({extended:true}));

//para servir el archivo de estilos
app.use(express.static('public'));

//----------DB------------------------
mongoose.connect('mongodb://localhost:27017/todolistDB')

// items schema
const itemsSchema = {
    name: String
};

//mongoose model based on the schema
const Item = mongoose.model('item', itemsSchema);

app.get('/',(req,res)=>{
    Item.find({},(err,listItems)=>{
        res.render('list',{listName:'Today',listItems:listItems});
    })
});

app.post('/',(req,res)=>{
    let newItem = req.body.newItem;
    const item = new Item({name:newItem});
    item.save();
    res.redirect('/')
})

app.post('/delete',(req,res)=>{
    let doneId = req.body.done;
    doneId = String(doneId)
    Item.findByIdAndRemove(doneId,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log('item borrado');
        }
    })
    res.redirect('/')
})

const listSchema = {
    name: String,
    items:[itemsSchema]
}
const List = mongoose.model('List',listSchema)

// app.get('/:listName',(req,res)=>{
//     let listName = req.params.listName
//     const list = new List({
//         name:listName,
//         items:[]
//     })
//     list.save()
//     res.render('list',{listName:listName,listItems:list})
// })

app.listen(3000,console.log('server running on port 3000'));