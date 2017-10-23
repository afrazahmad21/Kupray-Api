const express = require('express')
const app = express();
const basic_auth = require('basicauth-middleware')
const bodyParser= require('body-parser')
const mobile_routes = require('./Mobile/Routes/index')
const connection = require('./mysql')
const path = require('path')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//Mobile Routes
app.use(mobile_routes)
app.set('view engine', 'ejs')
app.set('connection', connection)
const port = 80
app.listen(port, function(err){

    if (err){
        console.log('error occured ')
    }else {
        console.log("started listening @ port",port)
    }
})

app.use(function (req, res, next) {
    console.log(req.url)
    console.log("----------")
    console.log(req.headers);
    console.log('-----------------')
    console.log(req.body)
    next()

})
app.use(basic_auth("kupay","kupay"))
app.get('/',(req, res)=>{
    console.log("welcome to kupay API");
    res.sendFile('Signin.html', { root: path.join(__dirname, './Templates') });
})