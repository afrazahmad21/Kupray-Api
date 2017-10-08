/**
 * Created by Afraz on 10/8/2017.
 */
var mysql = require('mysql');

var getConnection = ()=>{
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'afraz',
        database : 'kupray'
    });
    connection.connect();
    return connection
}



module.exports= getConnection()