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
            user_model.updatePhoneNumber(connection, req.body)
                .then(result=>resolve(result))
                .catch(e => reject(e))
            }else{
                reject("User Does not exists")
            }
        })

    }
    let checkSuccess =  function (result) {
        return new Promise((resolve ,reject)=>{
            console.log(result)
            if (result){
                req.body.phone_number= req.body.new_phone_number
               let  object = {'connection': connection,'body':req.body }
                resolve(object)
            }else{
                reject({"reason":"something went wrong"})
            }
        })
    }
    let sendResponseBack = function (user) {
        if (user) {
            let response = UserSchema
            response.message = " User Phone number changed successfully";
            Object.assign(response.user, user)
            res.status(200).json(response)
        } else {
                res.status(200).json({"error": false, "message": "Something went wrong!", "httpstatus": 301})
        }
    }
     getUser(connection,req.body, null)
         .then(update)
         .then(checkSuccess)
         .then(getUserWithOject)
         .then(sendResponseBack)
         .catch(e => {
                res.status(400).json({
                    "error": true,
                    "message": e,
                    "httpstatus": 400
                })
            })
}

exports.updatePassword = function (req, res) {
    let connection = req.app.get('connection')
    req.body.password =  req.body.old_password
    let object = {'connection': connection, 'body': req.body}

    let update =function (user) {
        return new Promise((resolve, reject)=>{
            if (user){
                user_model.updatePassword(connection, req.body)
                    .then(result =>{
                        if(result){
                            user.password = req.body.new_password
                            resolve(user)
                        }else {
                            reject({"message": "Password could not be updated"})
                        }
                    })

            }else {
                reject({"message": "No User Found"})
            }
        })

    }

    let sendResponseBack = function (user) {
        if (user) {
            let response = UserSchema
            response.message = " Password changed successfully";
            Object.assign(response.user, user)
            res.status(200).json(response)
        } else {
            res.status(200).json({"error": false, "message": "Something went wrong!", "httpstatus": 301})
        }
    }
    getUserWithOject(object)
        .then(update)
        .then(sendResponseBack)
        .catch(e => {
            res.status(400).json({
                "error": true,
                "message": e,
                "httpstatus": 400
            })
        })


}

let getUser = function (connection,body, response) {
    if (!body.phone_number){
        body.phone_number =  body.old_phone_number
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
let getUserWithOject = function (object) {
    let connection = object.connection
    let body = object.body
    return new Promise((resolve, reject) => {
        user_model.getUser(connection, body.phone_number, body.password)
            .then(user => resolve(user))
            .catch(e => reject(e))
    })
}
