
const express = require('express');
const app = express();

//require la base de datos
const mongoose = require('mongoose');

//para el routing dinamico
const _ = require('lodash');

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
const Item = mongoose.model('Item', itemsSchema);

const item1 = new Item({
    name: 'Welcome to your todolist!'
});
const item2 = new Item({
    name: 'Hit the + button to add a new item'
})
const item3 = new Item({
    name:'Hit the trash can to delete an item'
})

const defaultItems = [item1, item2, item3];

// list 
const listSchema = {
    name:String,
    items:[itemsSchema]
};

const List = mongoose.model('List', listSchema);



app.get('/',(req,res)=>{
    Item.find({},(err,foundItems)=>{
        
        res.render('list',{listTitle:'Today',newListItems:foundItems})
        
    })
});

app.post('/delete',(req,res)=>{
    let listName = req.body.list
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

app.get('/:customListName',(req,res)=>{
    const customListName = _.capitalize(req.params.customListName);
    List.findOne({name: customListName}, function(err, foundList){
        if (!err){
          if (!foundList){
            //Create a new list
            const list = new List({
              name: customListName,
              items: []
            });
            list.save();
            res.redirect("/" + customListName);
          } else {
                //Show an existing list
    
                res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
            }
    }
});
});


app.post('/',(req,res)=>{
    let newItem = req.body.newItem;
    let listName = req.body.list
    const item = new Item({name:newItem});
    if(listName === 'Today'){
        item.save();
        res.redirect('/')
    }else{
        List.findOne({name:listName},(err,foundList)=>{
            foundList.items.push(item)
            foundList.save()
            res.redirect('/'+listName)
        })
    }
    
})








app.listen(3000,console.log('server running on port 3000'));