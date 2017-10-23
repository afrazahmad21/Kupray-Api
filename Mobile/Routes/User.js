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

route.post('/user/update/password',(req,res)=>{
    user_controller.updatePassword(req,res)

})

route.post('/user/update/phonenumber',(req,res)=>{
    user_controller.updatePhoneNumber(req,res)

})

route.post('/user/forgot_password', (req, res)=>{
    user_controller.searchPhoneNumber(req, res)
})

route.post('/user/getProfile', (req, res)=>{
    user_controller.getProfile(req,res)
})

route.post('/user/admin/signin', (req, res)=>{
    console.log("hereeee")
    user_controller.loginAdmin(req, res)
})
module.exports= route