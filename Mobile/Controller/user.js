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
                user_model.getUser(req.body.phone_number, req.body.password)
                    .then(user => {
                        let response = UserSchema
                        response.message = " Sign in successfully";
                        object.assign(response.user, user)
                        res.status(200).json(response)
                    })

            } else {
                res.status(200).json({"message": "User not verfied to Proceed", "httpstatus": 300})
            }

        }).catch((e) => {
        res.status(400).json({"message": "somethng went wrong", "error": e.meaage,"httpstats": 400})
    })
}

exports.add_user = (req, res) => {
    if (req.body.phone_number.length != 11) {
        res.status(200).json({"meaage": "Phone number is not perfect 11 digits"})
    } else if (!req.body.password.match(/^[0-9a-z]+$/)) {
        res.status(200).json({"meaage": "Password must oly be alpha numeric"})
    } else if (req.body.password.length > 7) {
        res.status(200).json({"meaage": "Password length must be <=7"})
    } else {
        const connection = req.app.get('connection')
        user_model.add_user(connection, req.body)
            .then((result) => {
                if (result) {
                    user_model.getUser(req.body.phone_number, req.body.password)
                        .then(user => {
                            let response = UserSchema
                            response.message = " User Added Successfully";
                            object.assign(response.user, user)
                            res.status(200).json(response)
                        })
                } else {
                    res.status(200).json({"error": false,"message": "user Could not be added", "httpstatus": 301})
                }
            }).catch((e) => {
            res.status(400).json({"error": true, "message": "somethng went wrong", "httpstatus": 400})
        })
    }

}
