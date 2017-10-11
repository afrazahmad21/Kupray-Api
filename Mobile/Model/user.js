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
    let prefered_language = body.prefered_language || "English";
    let device_type = body.device_type || "";
    let device_os_version = body.device_os_version || "";
    let device_other = body.device_other || "";
    const query = `INSERT INTO User(username, phone_number, password, createdDateTime, ModiiedDateTime,prefered_language,device_type,device_os_version,device_other) VALUES ('${body.username}', '${body.phone_number}', '${body.password}', Now(), Now(),'${prefered_language}','${device_type}','${device_os_version}','${device_other}')`;

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

exports.getUser = function (connection,phone_number, password) {
    const query = `select * from User where phone_number = '${phone_number}' and password = '${password}'`;

    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            if (error) {
                reject(error)
            } else {
                console.log(results);
                if (results) {
                    resolve(results[0])
                } else {
                    reject(false)
                }
            }

        })
    })
}

exports.updatePhoneNumber =  function(conection, body){
    const query = `update User set phone_number='${body.new_phone_number}' where phone_number='${body.old_phone_number}' and password='${body.password}';`
    return new Promise((resolve, reject) => {
        conection.query(query, function(error, results) {
            if (error) {
                reject(error)
            } else {
                console.log("insideeee",results);
                if (results) {
                    resolve(results)
                } else {
                    reject(false)
                }
            }

        })

    })
}

exports.updatePassword =  function(conection, body){
    const query = `update User set password='${body.new_password}' where phone_number='${body.phone_number}' and password='${body.old_password}';`
    return new Promise((resolve, reject) => {
        conection.query(query, function(error, results)  {
            if (error) {
                reject(error)
            } else {
                console.log("insideeee",results);
                if (results) {
                    resolve(results)
                } else {
                    reject(false)
                }
            }

        })

})
}