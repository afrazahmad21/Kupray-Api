/**
 * Created by Afraz on 10/8/2017.
 */

const user_model = require('../Model/user')
exports.verify_login = (req, res) => {
    const connection = req.app.get('connection')
    //connection added
    user_model.verify_login(connection, req.body.phone_number, req.body.password)
        .then((valid_user) => {
            if (valid_user) {
                res.status(200).json({"message": " User Verified", "httpstatus": 200})
            } else {
                res.status(200).json({"message": "User not verfied to Proceed", "httpstatus": 300})
            }

        }).catch((e) => {
        res.status(400).json({"message": "somethng went wrong", "error": e.meaage})
    })
}

exports.add_user = (req, res) => {
    if(req.body.phone_number.length != 11){
        res.status(200).json({"meaage":"Phone number is not perfect 11 digits"})
    }else if (!req.body.password.match(/^[0-9a-z]+$/)) {
        res.status(200).json({"meaage":"Password must oly be alpha numeric"})
    }else if(req.body.password.length >7){
        res.status(200).json({"meaage":"Password length must be <=7"})
    }else {
        const connection = req.app.get('connection')
        user_model.add_user(connection, req.body)
            .then(result).catch((e) => {
            res.status(400).json({"message": "somethng went wrong", "error": e.meaage})
        })
    }

}