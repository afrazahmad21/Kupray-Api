/**
 * Created by Afraz on 10/19/2017.
 */


exports.saveCountriesInDb = function (connection, countries) {
    let query = `Insert into Countries(countries) values(${countries};`
    return new Promise((resolve, reject)=>{
        connection.query(query, (err, result)=>{
            if( err){
                reject(err)
            }else {
                resolve(result)
            }
        })
    })

}