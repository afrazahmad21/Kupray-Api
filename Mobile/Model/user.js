/**
 * Created by Afraz on 10/8/2017.
 */


exports.verify_login = (connection,phone_number, password) => {
    return new Promise((resolve, reject) => {
        connection.query(`select * from User where phone_number = '${phone_number}' and password = '${password}';`, (err, results, fields) => {
            if (err) {
                reject(err)
            } else {
                console.log(results)
                if (results.length >0) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            }
        })
    })


}

exports.add_user = (connection, body) => {
    const query = `INSERT INTO User(username, phone_number, password, createdDateTime, ModiiedDateTime) VALUES ('${body.username}', '${body.phone_number}', '${body.password}', Now(), Now())`;

    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            if (error) {
                reject(error)
            } else {
                console.log(results);
                if (results) {
                    resolve(true)
                } else {
                    reject(false)
                }
            }

        })
    })

}