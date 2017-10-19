/**
 * Created by Afraz on 10/19/2017.
 */
var appendQuery = require('append-query')
const md5 = require('md5');
const request = require('request')
const cysend = require('../../cysend')

exports.checkBalance =  function (req, res) {
    let api_url =cysend.api_url

    const params = {
        'function': 'get_balance',
        'username': cysend.api_username,
        'format': 'json'
    }

    let hash = ""
    Object.keys(params).forEach((key)=>{
        hash += params[key] + "|"
    })
    hash += cysend.api_password;
    console.log('before *********', hash)
    params['hash'] = md5(hash)
    // console.log('params', params)
    headers = cysend.api_headers
    request({url: api_url, method: 'POST',form:params, headers: headers}, function (err, http,body) {
        res.status(200).json(JSON.parse(http.body))
    })
}