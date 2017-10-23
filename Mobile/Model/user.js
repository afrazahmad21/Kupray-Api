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

exports.add_user = (object) => {
    let connection = object.connection;
    let body = object.body
    let prefered_language = body.prefered_language || "English";
    let device_type = body.device_type || "";
    let device_os_version = body.device_os_version || "";
    let device_other = body.device_other || "";
    let device_id = body.device_id || "";
    let user_credit = (body.user_credit? body.user_credit : 0);
    let user_bonus = (body.user_bonus? body.user_bonus : 0);
    let main_screen_image_name =  body.main_screen_image_name || "";
    let main_screen_image_url = body.main_screen_image_url || "";

    const query = `INSERT INTO User(username, phone_number, password, createdDateTime, ModiiedDateTime,prefered_language,device_type,device_os_version,device_other, device_id, user_credit, user_bonus,main_screen_image_name,main_screen_image_url) VALUES ('${body.username}', '${body.phone_number}',
     '${body.password}', Now(), Now(),'${prefered_language}','${device_type}','${device_os_version}','${device_other}', '${device_id}', '${user_credit}', '${user_bonus}' , '${main_screen_image_name}', '${main_screen_image_url}')`;

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
            console.log('inside get user', error, results)
            if (error) {
                reject(error)
            } else {
                console.log(results);
                if (results) {
                    resolve(results)
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

exports.searchPhoneNumber = function (object) {
    let connection = object.connection;
    let phone_number = object.body.phone_number;
    const query = `select * from User where phone_number = '${phone_number}'`
    return new Promise((resolve, reject)=>{
        connection.query(query, function (err, results, fields) {
            console.log(err, results, fields)
            if (err){
                reject(err)
            }else {

                resolve(results)
            }
        })
    })
}

let verfiyPhoneNumbe =  function(connection,phone_number){
    const query= `select * from User where phone_number = '${phone_number}';`
    return new Promise((resolve, reject)=>{
        connection.query(query, function (err, results, fields) {
            if (err){
                reject(err)
            }else {
                resolve(results)
            }
        })
    })
}

exports.getAllUsers =  function (connection) {
    let query = `select * from User;`
    return new Promise((resolve, reject)=>{
        connection.query(query, function (err, results , fields) {
            if(err){
                reject(err)
            }else{
                resolve(results)
            }
        })
    })
}