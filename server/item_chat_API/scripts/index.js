// Required packages or files
const db = require("./db_utils.js")
var con = db.connect_db()
console.log("connected");

var {PythonShell} = require('python-shell');
var get_api_item = new PythonShell('./scripts/getAPIcode.py');
var get_api_items = new PythonShell('./scripts/getAPI.py');

const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const cors = require("cors")
app.use(cors())

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var fs = require('fs');
const path = require("path");
const joi = require("Joi");
const { get } = require("http");
const { rejects } = require("assert");
const { resolve } = require("path");

var chat = read_local("../chat.json")

// Check responce
app.get('/', (req, res) => {
  res.send('Hello World')
});

// [GET] sending item info 
app.get("/get_item/:item_id", (req, res) => {
    var id = req.params.item_id
    const schema = joi.object().keys({
        item_id: joi.string().required(),
    })
    var error = schema.validate(req.params).error
    if(error == null){
        console.log("item request: " + id)
        get_item(id).then(item => {
            if(item != null){
                res.status(200)
                res.json(item);
            }
            else{
                res.status(404)
                res.json({"Error": ["bad request"]});
            }
        })
    }
    else{
        console.log(error.details)
        res.status(403)
        res.json({"Error": error.details})
    }
});

// [GET] sending top 10 items-info from input keyword
app.get("/get_item_list/:keyword", (req, res) => {
    var key = req.params.keyword
    const schema = joi.object().keys({
        keyword: joi.string().required(),
    })
    var error = schema.validate(req.params).error
    if(error == null){
        console.log("keyword request: " + key)
        get_items(key).then(item => {
            if(item != null){
                res.status(200)
                res.json(item);
            }
            else{
                res.status(404)
                res.json({"Error": ["bad request"]});
            }
        })
    }
    else{
        console.log(error.details)
        res.status(403)
        res.json({"Error": error.details})
    }
});

// [GET] sending message_list
app.get("/get_message_list/:item_id", (req, res) => {
    var id = req.params.item_id
    const schema = joi.object().keys({
        item_id: joi.string().required(),
    })
    var error = schema.validate(req.params).error
    if(error == null){
        console.log("chat request: " + id)
        get_chat(id).then(ret_chats => {
            //console.log(ret_chats)
            if(ret_chats != null){
                res.status(200)
                res.json(ret_chats);
            }
            else{
                res.status(404)
                res.json({"Error": ["unknown user_id"]});
            } 
        })
    }
    else{
        console.log(error.details)
        res.status(403)
        res.json({"Error": error.details})
    }
});

// [POST] getting user's message
app.post('/send_message', (req, res) => {
    const schema = joi.object().keys({
        item_id: joi.string().required(),
        user_id: joi.string().required(),
        message: joi.string().required()
    })
    var error = schema.validate(req.body).error
    if(error == null){
        db.search_user(req.body.user_id).then(user_info =>{
            if(user_info != null){
                //console.log(user_info)
                save_chat(user_info, req.body).then(err =>{
                    if(err == null){
                        res.status(200)
                        res.send('saved successfully to ' + req.body.item_id);
                    }
                    else{
                        res.status(500)
                        res.send({'Error': ["server internal error"]})
                    }
                })
            }
            else {
                res.status(404)
                res.send({'Error' : ["not found " + req.body.user_id]});
            }
        })
    }
    else{
        console.log(error.details)
        res.status(403)
        res.send({"Errors": error.details})
    }
});

app.listen(port, () => {
  console.log(`listening on *:${port}`);
});

// Funtions

// Saving message to the database
async function save_chat(user_info, req_body){
    var now = new Date();
    var now_str = load_proc(now)

    var room_id = req_body.item_id
    /* Uncomment if you want to save chats in your local chat.json (1)
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
    */
    var err1 = await db.create_table(room_id)
    if(err1 == null){
        var err2 = await db.insert_message(room_id, req_body.user_id, now_str, req_body.message)
        if(err2) return err2
    }
    else return err1
    
    return null
}


// Request to the database, Returns message list in API format
async function get_chat(id){
    var now = new Date();
    var now_str = load_proc(now)
    /* Uncomment if you want to save chats in your local chat.json (2)
    var i = isinJson(id, "item_id", chat.chatrooms)
    if (i != null){
        chat.chatrooms[i].date = now_str
        return chat.chatrooms[i]
    }
    return ret_room(id, now_str, [])
    */
    var chats = null
    var err = await db.create_table(id)
    if(err == null){
        var res = await db.get_messages(id)
        chats = ret_room(id, now_str, res)
    }
    else console.log(err)
    return chats
}

// Return date string in API format
function load_proc(date) {
    var Year = date.getFullYear().toString().padStart(2, "0");
    var Month = (date.getMonth()+1).toString().padStart(2, "0");
    var Date = date.getDate().toString().padStart(2, "0");
    var Hour = date.getHours().toString().padStart(2, "0");
    var Min = date.getMinutes().toString().padStart(2, "0");
    var Sec = date.getSeconds().toString().padStart(2, "0");

    //return Year + "-" + Month + "-" + Date + "T" + Hour + ":" + Min + ":" + Sec;
    return Year + Month + Date + Hour + Min + Sec;
}

// Return in a chatroom api format
function ret_room(id, date, mes){
    return {
        "item_id": id,
        "message_count": mes.length,
        "date": date,
        "message_list": mes
    }
}

// Read you local json file
function read_local(name){
    return require(name)
}

// Search your key(id) in hash-list
function isinJson(id, target, list){
    for(var i = 0; i < list.length; i++){
        if(id == list[i][target]){
            return i
        }
    }
    return null
}

// Get item from rakutenAPI using python wrapper
async function get_item(id){
    //var iconv = require('iconv-lite');
    return new Promise((resolve, reject) => {
        new Promise((resolve, reject) => {
            get_api_item.send(id)
            get_api_item.on('message', data => {
                if(data.toString() == 'Error') resolve(null)
                else resolve(JSON.parse(data))
            });
            get_api_item = new PythonShell('./scripts/getAPIcode.py');
        }).then(data =>{
            try{
                //console.log(data)
                var tmp = list_iteminfo(data[0])
                resolve(tmp)
            }catch{
                resolve(null)
            }
        }, err => { resolve(null) })
    })
}

// Get item list from rakutenAPI by keyword using python wrapper
async function get_items(key){
    return new Promise((resolve, reject) => {
        new Promise((resolve, reject) => {
            get_api_items.send(key)
            get_api_items.on('message', datas => {
                resolve(JSON.parse(datas))
            });
            get_api_items = new PythonShell('./scripts/getAPI.py');
        }).then(datas =>{
            try{
                //console.log(data)
                var tmp_l = []
                for(var data of datas){
                    tmp_l.push(list_iteminfo(data[0]))
                }
                resolve(tmp_l)
            }catch{
                reject(null)
            }
        })
    })
}

// Create item info in API format
function list_iteminfo(data){
    var images = []
    images.push(data.imageUrl1)
    images.push(data.imageUrl2)
    images.push(data.imageUrl3)
    var tmp = {
        "item_id": data.itemCode,
        "name": data.itemName,
        "price": data.itemPrice,
        "rating": 0,
        "item_url": data.itemUrl,
        "description": data.itemCaption,
        "images": images
    }
    return tmp
}