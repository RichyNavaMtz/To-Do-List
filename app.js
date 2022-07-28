const express = require('express');

//falta poner el directorio estatico __diname para que se pueda deployar
const app = express();

//seteamos app para usar EJS
app.set('view engine','ejs');

app.get('/',(req,res)=>{

    const today = new Date();
    const currentDay = today.getDay();
    let day = '';
    if(currentDay == 6 | currentDay == 0){
        //cuando es fin de semana
        day = 'weeknd!';
        res.render('list',{kindOfDay:day});
    }else{
        //cuando es dia laboral
        day = 'weekday!';
        res.render('list',{kindOfDay:day})
    }
        
    



    
})







app.listen(3000,console.log('server running on port 3000'));