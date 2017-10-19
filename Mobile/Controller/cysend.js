/**
 * Created by Afraz on 10/19/2017.
 */
var appendQuery = require('append-query')
const md5 = require('md5');
const request = require('request')

exports.checkBalance =  function (req, res) {
    const api_username = "tW12YxFFGHmzx8vQjG5ZKwPRQTSQuFYK"
    let api_url ="https://honeypot.cysend.ch/merchant_api/4.1"

    const params = {
        'function': 'get_balance',
        'username': api_username,
        'format': 'json'
    }

    let hash = ""
    Object.keys(params).forEach((key)=>{
        hash += params[key] + "|"
    })
    hash += "HZaZzBjzHMrJWgjjZFnkz2XaneHh8w3EUXWjqecCg6Lv6qgSiy1AkB3SByD62UdD";
    console.log('before *********', hash)
    params['hash'] = md5(hash)
    // console.log('params', params)
    headers = {'Content-Type': 'application/x-www-form-urlencoded', 'Content-Language': 'en-US'}
    request({url: api_url, method: 'POST',form:params, headers: headers}, function (err, http,body) {
        res.status(200).json({ 'http' :http})
    })
}