/**
 * Created by Afraz on 10/19/2017.
 */

const md5 = require('md5');
const request = require('request')

exports.checkBalance =  function (req, res) {
    const api_username = "tW12YxFFGHmzx8vQjG5ZKwPRQTSQuFYK"
    const api_url ="https://honeypot.cysend.ch/merchant_api/4.1"

    const params = {
        'function': 'get_balance',
        'username': api_username
    }

    let hash = ""
    for (let key in Object.keys(params)){
        hash += params[key] + "|"
    }

    params['hash'] = md5(hash)
    console.log('params', params)
    headers = {'Content-Type': 'application/x-www-form-urlencoded', 'Content-Language': 'en-US'}
    request({url: api_url, form:params, headers: headers}, function (err, http,body) {
        console.log(err, http, body)
        res.status(200).json({'err': err, 'http' :http,'body': body})
    })
}