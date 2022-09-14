const mysql = require('mysql');
const util = require('util');
const fs = require('fs');

var con = null
exports.connect_db = function(){
    return new Promise((res, rej) => {
        con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'rakuten-hackthon',
        database: "rakuten_users"
        });
        try{
            con.connect();
        }
        catch{
            rej("Error")
        }
        res(con)
    })
    
}
//create_table();

//con.query('SHOW tables', function(err, tables){ 
//    for(var t in tables){
//        console.log(t)
//    }
//});

//con.query('SHOW columns from users', function(err, columns){ 
//    for(var c in columns){
//        console.log(c)
//    }
//});

function create_table(){
    var que = "CREATE TABLE IF NOT EXISTS rakuten_users.users (user_id VARCHAR(255) NOT NULL PRIMARY KEY, user_name VARCHAR(255) NOT NULL, user_icon BLOB)"
    con.query(que, function(err, res){ 
        if(err) throw err;
        //else console.log(res);
    });
}

exports.insert_user = async function(id, name, icon){
    var values = "('" + id + "', '" + name + "', " + icon + ")";
    var que = "INSERT into rakuten_users.users values" + values;
    await con.query(que, function(err, res){ 
        if(err){
            console.log("Error (Maybe duplicated user_id?)");
            return false
        }
        else{
            console.log("successfully added");
            return true
        }
    });
}

exports.search_user = async function(id){
    const query = util.promisify(con.query).bind(con);
    console.log("searching: " + id)
    var que = "SELECT * FROM rakuten_users.users WHERE user_id = " + id;
    //var result = null
    /*
    var async_que = async() => {
        try{
            return await query(que)
        }
        finally{
            con.end()
        }
    }*/
    var res = await query(que)
    //console.log(res)
    if(res.length != 0){
        var user_id = res[0].user_id
        var user_name = res[0].user_name
        var user_icon = "0x" + res[0].user_icon.toString('hex')
    }
    else{
        console.log("empty")
        return null
    }

    console.log("found: " + user_id + " (" + user_name +")")
    return {"user_id": user_id, "user_name": user_name, "user_icon": user_icon}
}
