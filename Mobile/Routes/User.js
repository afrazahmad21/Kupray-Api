/**
 * Created by Afraz on 10/8/2017.
 */


const route = require('express').Router()
const user_controller = require('../Controller/user')
route.post('/user/login',(req,res)=>{
    user_controller.verify_login(req,res)
})

route.post('/user/add',(req,res)=>{
    user_controller.add_user(req,res)

})

module.exports= route