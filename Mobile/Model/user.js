/**
 * Created by Afraz on 10/8/2017.
 */


exports.verify_login = (phone_number, password) => {
    const connection = require('../../mysql');

    return new Promise((resolve, reject) => {
        connection.query(`select * from User where phone_number = ${phone_number} and password = ${password}`, (err, results, fields) => {
            if (err) {
                reject(err)
            } else {
                if (results) {
                    resolve(true)
                } else {
                    results(false)
                }
            }
            connection.end()
        })
    })


}

exports.add_user = (body) => {
    const connection = require('../../mysql')

    const query = `INSERT INTO User(username, phone_number, password, createdDateTime, ModiiedDateTime) VALUES ('${body.username}', '${body.phone_number}', '${body.password}', Now(), Now()`;

    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            if (error) {
                reject(error)
            } else {
                console.log(results, fields);
                if (results) {
                    resolve(true)
                } else {
                    reject(false)
                }
            }

        })
    })

}