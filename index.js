const express = require('express')
const app = express();
const basic_auth = require('basicauth-middleware')
const bodyParser= require('body-parser')
const mobile_routes = require('./Mobile/Routes/index')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(basic_auth("kupray","kupray"))

//Mobile Routes
app.use(mobile_routes)

const port = 80
app.listen(port, function(err){

    if (err){
        console.log('error occured ')
    }else {
        console.log("started listening @ port",port)
    }
})

app.get('/',(req, res)=>{
    console.log("welcome to kupray API");
})