
/**
 * Created by Afraz on 10/26/2017.
 */
const route = require('express').Router()
const user_model = require('../Model/user')

route.get('/users', function (req, res) {
    user_model.getAllUsers(req.app.get('connection'))
        .then(users =>{
            console.log(users)
            for (let user of users){
                console.log("phone_number ***", user.phone_number)
            }
            res.render('Users.ejs', {users: users})
        })
})

route.get('/settings', function (req, res) {
    res.render('Settings.ejs')
})

route.get('/sales', function (req, res) {
    res.render('Sales.ejs')
})

route.get('/recharge', function (req, res) {
    res.render('Recharge.ejs')
})

route.get('/transfer', function (req, res) {
    res.render('Transfer.ejs')
})
route.get('/settings', function (req, res) {
    res.render('Settings.ejs')
})

module.exports = route