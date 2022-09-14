const db = require("./db_utils.js")
var con = db.connect_db()
console.log("connected");

const express = require('express')
const app = express()
const port = process.env.PORT || 3001

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var fs = require('fs');
const path = require("path");
const joi = require("Joi");

var chat = {"chatrooms":[{
                "item_id": "a",
                "message_count": 1,
                "date": "",
                "message_list":[
                {
                    "user_id": "0001",
                    "user_name": "user1",
                    "user_icon": "NoImage",
                    "date": "19951217032400",
                    "message": "hoge"
                }
                ]}
            ]};

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get("/get_message_list/:item_id", (req, res) => {
    var id = req.params.item_id
    console.log(id)
    res.json( get_chat(id) );
})

app.post('/send_message', (req, res) => {
    const schema = joi.object().keys({
        item_id: joi.string().required(),
        user_id: joi.string().required(),
        message: joi.string().required()
    })
    var error = schema.validate(req.body).error
    if(error == null){
        db.search_user(req.body.user_id).then(user_info =>{
            console.log(user_info)
            save_chat(user_info, req.body)
            res.send('saved successfully to ' + req.body.item_id);
        })
    }
    else{
        console.log(error.details.message)
        res.send(error)
    }
    //console.log(req.body)
});

app.listen(port, () => {
  console.log(`listening on *:${port}`);
})

function save_chat(user_info, req_body){
    var now = new Date();
    var now_str = LoadProc(now)
    //console.log()

    var room_id = req_body.item_id

    var tmp = {
        "user_id": req_body.user_id,
        "user_name": user_info.user_name,
        "user_icon": user_info.user_icon,
        "date": now_str,
        "message": req_body.message
    }
    var i = isinJson(room_id, "item_id", chat.chatrooms)
    if(i != null){
        chat.chatrooms[i].message_list.push(tmp)
        chat.chatrooms[i].message_count += 1
        fs.writeFile('chat.json', JSON.stringify(chat, null, 2), function(err, result) {
            if(err) return 2;
        });
    }
    else{
        chat.chatrooms.push(ret_room(room_id, "", [tmp]))
        fs.writeFile('chat.json', JSON.stringify(chat, null, 2), function(err, result) {
            if(err) return 2;
        });
    }
    
    return 0
}

function get_chat(id){
    var now = new Date();
    var now_str = LoadProc(now)

    var i = isinJson(id, "item_id", chat.chatrooms)
    if (i != null){
        chat.chatrooms[i].date = now_str
        return chat.chatrooms[i]
    }
    return ret_room(id, now_str, [])
}

function LoadProc(date) {
    var Year = date.getFullYear().toString().padStart(2, "0");
    var Month = (date.getMonth()+1).toString().padStart(2, "0");
    var Date = date.getDate().toString().padStart(2, "0");
    var Hour = date.getHours().toString().padStart(2, "0");
    var Min = date.getMinutes().toString().padStart(2, "0");
    var Sec = date.getSeconds().toString().padStart(2, "0");

    //return Year + "-" + Month + "-" + Date + "T" + Hour + ":" + Min + ":" + Sec;
    return Year + Month + Date + Hour + Min + Sec;
}

function isinJson(id, target, list){
    for(var i = 0; i < list.length; i++){
        //console.log(id + "," + list[i][target])
        if(id == list[i][target]){
            return i
        }
    }
    return null
}

function ret_room(id, date, mes){
    return {
        "item_id": id,
        "message_count": mes.length,
        "date": date,
        "message_list": mes
    }
}

function get_userinfo(id){
    return ["test", "NoImage"];
}

function read_local(name){
    return JSON.parse(fs.readFileSync(name + '.json', 'utf8')); 
}