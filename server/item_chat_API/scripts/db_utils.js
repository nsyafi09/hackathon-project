const mysql = require('mysql');
const util = require('util');
const fs = require('fs');

var con = null

// Connect to the database
exports.connect_db = function(){
    return new Promise((resolve, reject) => {
        con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'rakuten-hackthon',
        database: "rakuten_hackthon"
        });
        try{
            con.connect();
        }
        catch{
            reject("Error")
        }
        resolve(con)
    })
}

// Create chatroom session table
exports.create_table = async function(table_id){
    //"CREATE TABLE IF NOT EXISTS rakuten_hackthon.users (user_id varchar(255) NOT NULL PRIMARY KEY, user_name varchar(255) NOT NULL, user_icon BLOB);"
    var que = "CREATE TABLE IF NOT EXISTS rakuten_hackthon."+ table_id +
    " (user_id VARCHAR(255) NOT NULL, date VARCHAR(255) NOT NULL, message VARCHAR(255) NOT NULL)"
    await con.query(que, function(err, res){
        //console.log(que)
        if(err) return err;
        else return null;
    });
}

// Get messages from chatroom session table
exports.get_messages = async function(table_id){
    const query = util.promisify(con.query).bind(con);
    var que = "SELECT * FROM rakuten_hackthon." + table_id
    //console.log(que)
    var res = await query(que)
    var messages = []
    for await(r of res) {
        var user_info = await this.search_user(r.user_id)
        var m = {
            "date": r.date,
            "message": r.message
        }
        var tmp = Object.assign(user_info, m);
        //console.log(tmp);
        messages.push(tmp)
    }
    return messages
}

// Save user to the validate users table
exports.insert_user = async function(id, name, icon){
    var values = "('" + id + "', '" + name + "', " + icon + ")";
    var que = "INSERT into rakuten_hackthon.users values" + values;
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

// Save message to the chatroom session table
exports.insert_message = async function(table_id, id, date, message){
    var values = "('" + id + "', '" + date + "', '" + message + "')";
    var que = "INSERT into rakuten_hackthon." + table_id + " values" + values;
    await con.query(que, function(err, res){ 
        if(err){
            console.log(err);
            return false
        }
        else{
            console.log("successfully added to " + table_id + "(" + id + ")");
            return true
        }
    });
}

// Get user from validate users table
exports.search_user = async function(id){
    const query = util.promisify(con.query).bind(con);
    //console.log("searching: " + id)
    var que = "SELECT * FROM rakuten_hackthon.users WHERE user_id = '" + id + "'";

    var res = await query(que)
    if(res.length != 0){
        var user_id = res[0].user_id
        var user_name = res[0].user_name
        var user_icon = "0x" + res[0].user_icon.toString('hex')
    }
    else{
        console.log("empty")
        return null
    }

    //console.log("found: " + user_id + " (" + user_name +")")
    return {"user_id": user_id, "user_name": user_name, "user_icon": user_icon}
}


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