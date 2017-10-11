/**
 * Created by Afraz on 10/8/2017.
 */
var mysql = require('mysql');

var getConnection = ()=>{
    var connection = mysql.createConnection({
        host     : '52.23.203.75',
        user     : 'afrazahmad',
        password : 'admin',
        database : 'kupray'
    });
    connection.connect();
    return connection
}



module.exports= getConnection()