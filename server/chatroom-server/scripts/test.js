const db = require("./db_utils.js")
var con = db.connect_db()
console.log("connected");

const fs = require("fs")

var temp_users = require("./temp.json").users

var user_icon_img = fs.readFileSync('../user_icon_test.png')
var user_icon_blob = "0x" + Buffer.from(user_icon_img).toString('hex')

db.search_user("500").then(user_info =>{
    if(user_info != null){
        console.log(user_info)
    }
    else{
        console.log("Missing user")
    }
})

for(var i=0; i<temp_users.length; i++){
    //console.log(temp_users[i].user_id)
    db.insert_user(temp_users[i].user_id, temp_users[i].user_name, user_icon_blob).then(
        result => {
            //console.log(result)
        }
    )
}
