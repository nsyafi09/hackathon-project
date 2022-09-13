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
                "chatroom_id": "a",
                "requested_date": "",
                "message_list":[
                {
                    "user_id": "user1",
                    "posted_date": "1995-12-17T03:24:00",
                    "message": "hoge"
                }
                ]}
            ]};

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get("/get_message_list/:chatroom_id", (req, res) => {
    var id = req.params.chatroom_id
    console.log(id)
    res.json( get_chat(id) );
})

app.post('/send_message', (req, res) => {
    const schema = joi.object().keys({
        chatroom_id: joi.string().required(),
        user_id: joi.string().required(),
        message: joi.string().required()
    })
    var error = schema.validate(req.body).error
    if(error == null){
        save_chat(req.body)
        res.send('saved successfully to ' + req.body.chatroom_id);
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

function save_chat(req_body){
    var now = new Date();
    var now_str = LoadProc(now)
    //console.log()

    var room_id = req_body.chatroom_id

    var tmp = {
        "user_id": req_body.user_id,
        "posted_date": now_str,
        "message": req_body.message
    }
    var i = isinJson(room_id, "chatroom_id", chat.chatrooms)
    if(i != null){
        chat.chatrooms[i].message_list.push(tmp)
        fs.writeFile('chat.json', JSON.stringify(chat, null, 2), function(err, result) {
            if(err) return 2;
        });
    }
    else{
        var tmp2 = {
            "chatroom_id": room_id,
            "requested_date": "",
            "message_list":[tmp]
        }
        chat.chatrooms.push(tmp2)
        fs.writeFile('chat.json', JSON.stringify(chat, null, 2), function(err, result) {
            if(err) return 2;
        });
    }
    
    return 0
}

function get_chat(id){
    var now = new Date();
    var now_str = LoadProc(now)

    var i = isinJson(id, "chatroom_id", chat.chatrooms)
    if (i != null){
        chat.chatrooms[i].requested_date = now_str
        return chat.chatrooms[i]
    }
    var tmp = {
        "chatroom_id": id,
        "requested_date": now_str,
        "message_list": []
    }
    return tmp
}

function LoadProc(date) {
    var Year = date.getFullYear();
    var Month = date.getMonth()+1;
    var Date = date.getDate();
    var Hour = date.getHours();
    var Min = date.getMinutes();
    var Sec = date.getSeconds();

    return Year + "-" + Month + "-" + Date + "T" + Hour + ":" + Min + ":" + Sec;
}

function read_local(name){
    return JSON.parse(fs.readFileSync(name + '.json', 'utf8')); 
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