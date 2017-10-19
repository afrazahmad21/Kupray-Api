/**
 * Created by Afraz on 10/19/2017.
 */
const route = require('express').Router()
const cysend_controller = require('../Controller/cysend')


route.get('/checkbalance',(req, res)=>{
    cysend_controller.checkBalance(req, res)
})

module.exports = route

