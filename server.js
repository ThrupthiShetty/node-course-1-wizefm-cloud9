const express = require("express")
const fs = require("fs")
const hbs = require("hbs")
const port = process.env.PORT || 3000;
var app = express();

//handlebars

app.set('view engine' , 'hbs')

//passing a request --sending something ==body that is used, path all are stored in request
//response ==bunch of mrethods available,http status codes
//res.send = sending a data back

//setting the server for html
app.use(express.static(__dirname + '/public'))

//until the next is used middlleware are not going to call the renders fro the below method
app.use((req,res,next) =>{
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log  + '\n',(error) =>{
        if(error){
            console.log("unble to append to server.log")//only if callback function is used
        }
    })
    next();
})

//maintenace
app.use((req,res,next) =>{
    res.render('maintenance.hbs')
})

//to set footer
hbs.registerPartials(__dirname + '/views/partials')

//helpers to call the year
hbs.registerHelper('getCurrentYear',() =>{
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt',(text) =>{
    return text.toUpperCase();
})

// app.get('/', (req,res) =>{
// //res.send('hiii express')

// res.send({
//     name :'tripti',
//     likes :[
//         'bike',
//         'car'
//     ]
// });
// });



app.get('/',(req,res) =>{
    res.render('home.hbs',{
        pageTitle : 'home page',
        welcomeMessage :'welcomeeeee'
       
    })
})

app.get('/about',(req,res) =>{
    res.render('about.hbs',{
        pageTitle : 'about page',
        
        month : new Date().getMonth()
    })
})


app.get('/bad',(req,res) =>{
    res.send({
        errormesage : 'errorr'
    })
})


//render will allowe use to set up any engie here it is current engine
app.listen(port,() =>{
    console.log(`server is up and running on port ${port}`)

})