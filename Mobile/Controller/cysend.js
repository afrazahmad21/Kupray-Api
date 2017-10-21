/**
 * Created by Afraz on 10/19/2017.
 */
var appendQuery = require('append-query')
const md5 = require('md5');
const request = require('request')
const cysend = require('../../cysend')
const user_model = require('../Model/user')
const cy_model = require('../Model/cysend')
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

exports.doPayment = function (req, res) {
    let phone_number = req.body.phone_number;
    let userid = req.body.userid;
    let country = req.body.country;
    let amount = req.body.amount;
    let currency = req.body.currency;
    let dollar_to_won = 1132.70;
    let object = {'connection': req.app.get('connection'), 'body': req.body}
    if (!phone_number || !userid || !country || !amount ||!currency){
        res.status(200).json({'message': 'Required field error', 'httstatus': 400})
    }else {
        user_model.searchPhoneNumber(object)
            .then((user)=>{
                if(user.length >0){
                    if(currency === 'WON'){
                        amount = amount/ dollar_to_won;
                        console.log(amount)
                    }
                    res.status(200).json({'message': 'Transacyion processed succssfully', 'httpstatus': 200})
                }else{
                    res.status(200).json({'message': 'Phone No not found in our records', 'httpstatus':309})
                }
            })
    }


}


exports.get_countries = function (req, res) {
    let connection = req.app.get('connection')
    const params = {
        'function': 'get_product_countries',
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
    let headers = cysend.api_headers
    let api_url =cysend.api_url
    request({url: api_url, method: 'POST',form:params, headers: headers}, function (err, http,body) {
        res.status(200).json(JSON.parse(http.body))
        if(http.body.response.status =="OK"){
            cy_model.saveCountriesInDb(connection, http.body.response.countries)
                .then((result)=>{
                    res.status(200).json({'message': 'saved in db successfully', 'httpstatus': 200})
                }).catch(e =>{
                    res.status(400).json({'message': e, 'httpstatus': 400})
            })

        }
    })


}


exports.getProducts = function (req, res) {
    let connection = req.app.get('connection')
    const params = {
        'function': 'get_product_countries',
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
    let headers = cysend.api_headers
    let api_url =cysend.api_url
    request({url: api_url, method: 'POST',form:params, headers: headers}, function (err, http,body) {
        res.status(200).json(JSON.parse(http.body))
        if(http.body.response.status =="OK"){
            cy_model.saveCountriesInDb(connection, http.body.response.countries)
                .then((result)=>{
                    res.status(200).json({'message': 'saved in db successfully', 'httpstatus': 200})
                }).catch(e =>{
                res.status(400).json({'message': e, 'httpstatus': 400})
            })

        }
    })

}

exports.checkMobile = function (req, res) {
    check_mobile(req, res)
        .then((response)=>{
            res.status(200).json({'response': response})
        })
}

let check_mobile = function (req, res) {
    let connection = req.app.get('connection')
    const params = {
        'function': 'check_mobile',
        'username': cysend.api_username,
        'format': 'json',
        'mobile': req.body.phone_number
    }

    let hash = ""
    Object.keys(params).forEach((key)=>{
        hash += params[key] + "|"
    })
    hash += cysend.api_password;
    // console.log('before *********', hash)
    params['hash'] = md5(hash)
    // console.log('params', params)
    let headers = cysend.api_headers
    let api_url =cysend.api_url
    return new Promise((resolve, reject)=>{
        request({url: api_url, method: 'POST',form:params, headers: headers}, function (err, http,body) {
            if (err){
                reject(err)
            }else {
                console.log()
                console.log()
                console.log()
                console.log()
                console.log(http.body)
                // if( http.body.response.status == "OK"){
                    resolve(http.body)
                // }else {
                //     reject({'message': http.body.status})
                // }

            }
        })

    })

}


exports.instantTransfer = function (req, res) {
    let connection = req.app.get('connection')

    check_mobile(req, res)
        .then((response)=>{
            let product_id = response['product_id']
            const params = {
                'function': 'instant_transfer',
                'username': cysend.api_username,
                'format': 'json',
                'product': product_id,
                'beneficiary_account':req.body.phone_number,
                'value': req.body.amount,
                'sms_receipt':'no',
                'tid': 'test_tid3',
                'sender_mobile':'+923284829922'
            }

            let hash = ""
            Object.keys(params).forEach((key)=>{
                hash += params[key] + "|"
            })
            hash += cysend.api_password;
            // console.log('before *********', hash)
            params['hash'] = md5(hash)
            console.log('params', params)
            let headers = cysend.api_headers
            let api_url =cysend.api_url

            request({url: api_url, method: 'POST',form:params, headers: headers}, function (err, http,body) {
                console.log(http)
                res.status(200).json(JSON.parse(http.body))
            })
        }).catch(e=>{
        res.status(200).json({"message": e, "httpstatus": 400})
    })


}





