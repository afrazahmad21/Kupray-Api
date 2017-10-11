/**
 * Created by Afraz on 10/8/2017.
 */

let UserSchema = {
    "error": false,
    "message": "User successfully registered",
    "httpstatus": "200",
    "user": {
        "prefered_language": "English",
        "authenticated": "No"

    }
};


const user_model = require('../Model/user')
exports.verify_login = (req, res) => {
    const connection = req.app.get('connection')
    //connection added

    user_model.verify_login(connection, req.body.phone_number, req.body.password)
        .then((valid_user) => {
            if (valid_user) {
                user_model.getUser(connection, req.body.phone_number, req.body.password)
                    .then(user => {
                        let response = UserSchema
                        response.message = " Sign in successfully";
                        Object.assign(response.user, user)
                        res.status(200).json(response)
                    })

            } else {
                res.status(200).json({"message": "User not verfied to Proceed", "httpstatus": 300})
            }

        }).catch((e) => {
        res.status(400).json({"message": "somethng went wrong", "error": e.meaage, "httpstats": 400})
    })
}

exports.add_user = (req, res) => {
    const connection = req.app.get('connection');


    let addUser = function (user) {
        return new Promise((resolve, reject) => {
            if (user) {
                let response = UserSchema
                response.message = " User Already Exists";
                response.httpstatus = 302;
                Object.assign(response.user, user)
                resolve(response)
            } else {

                user_model.add_user(connection, req.body)
                    .then(user => {
                        let response = UserSchema
                        response.message = " User Added Successfully";
                        Object.assign(response.user, user)
                        resolve(response)
                    })
                    .catch(e => reject(e))
            }
        })
    };
    let sendResponseBack = function (response) {
        if (response) {
            res.status(200).json(response)

        } else {
            res.status(200).json({"error": false, "message": "user Could not be added", "httpstatus": 301})
        }
    }
    if (req.body.phone_number.length !== 11) {
        res.status(200).json({"meaage": "Phone number is not perfect 11 digits"})
    } else if (!req.body.password.match(/^[0-9a-z]+$/)) {
        res.status(200).json({"meaage": "Password must oly be alpha numeric"})
    } else if (req.body.password.length > 7) {
        res.status(200).json({"meaage": "Password length must be <=7"})
    } else {

        getUser(connection, null)
            .then(addUser)
            .then(connection, getUser)
            .then(sendResponseBack)
            .catch(e => {
                res.status(400).json({
                    "error": true,
                    "message": "somethng went wrong",
                    "httpstatus": 400,
                    "e": e.message
                })
            })
    }

}


exports.updatePhoneNumber = function (req, res) {
    const connection = req.app.get('connection');
    let update =  function(user){
        return new Promise((resolve, reject)=>{
            if (user){
            user_model.updatePassword(connection, req.body)
                .then(result=> resolve(result))
                .catch(e => reject(e))
            }
        })

    }
    let sendResponseBack = function (response) {
        if (response) {
            res.status(200).json(response)

        } else {
            res.status(200).json({"error": false, "message": "user Could not be added", "httpstatus": 301})
        }
    }
     getUser(connection,req.body, null)
         .then(update)
         .getUser(connection,req.body, null)
         .then(sendResponseBack)
         .catch(e => {
                res.status(400).json({
                    "error": true,
                    "message": "somethng went wrong",
                    "httpstatus": 400,
                    "e": e.message
                })
}

exports.updatePassword = function (req, res) {

}

let getUser = function (connection,body, response) {
    if (!body.phone_number){
        body.phone_number =  body.old_phone_numeber
    }

    return new Promise((resolve, reject) => {
        if (response) {
            resolve(response)
        } else {
            user_model.getUser(connection, body.phone_number, body.password)
                .then(user => resolve(user))
                .catch(e => reject(e))
        }

    })
}
