import '../css/chatbox.css';
//import './App-fromRiku.css';
import { useEffect, useState } from 'react';
import getNowTime from '../Utils/Util';

function ChatBox(props) {
  const my_user_id = props.user_id;
  const item_id = props.item_id;
  const my_user_name = props.user_name;

  // This will get all of message that API provide and render all.
  const [state, setState] = useState([]);
  const [text, setText] = useState(""); // for handle text inputed form
  const [scroll, setScroll] = useState([]); // for handle ScrollPosition
  
  // CAll API HERE
  // 初回のレンダリング時に呼ばれる関数
  useEffect(() => {
    // useEffect自体ではasyncの関数を受け取れないので内部で関数を定義して呼び出す。
    const access_get = async () => {
        const requestOptions ={
            method: 'GET'
          };
        // const url = "http://localhost:3304/message-list";
        const url = "http://herozxzx.aa0.netvolante.jp:3001/get_message_list/" + item_id
        const response = await fetch(url,requestOptions); // External API
        const json = await response.json();
        console.log("GET Message Responce (Initial) is ");
        console.log(response);
        console.log(json);
        console.log(json['message_list']);
        //const response = await import("./chat_data.json"); // Internal Json
        //console.log(response.default['message-list'][0].user_id);

        setState(
            // response.default['message-list']
            json['message_list']
        ); // stateに反映する
        setScroll(json);
    };
    access_get();
    console.log('First Data render!!'); 
  }, []);

  // Regular Data Fetch : Update MessageList from Remote Server
  useEffect(() => {
    const intervalId = setInterval(() => {
      const requestOptions ={
            method: 'GET'
          };
      const url = "http://herozxzx.aa0.netvolante.jp:3001/get_message_list/" + item_id
      const get_message_list = async () => {
        const res = await fetch(url,requestOptions); // External API
        const json = await res.json();
        console.log(res);
        console.log(json);
        setState(
            json['message_list'] // The API returns single elem Array. Why...?
          ); // stateに反映する   
      };
      get_message_list();
      console.log("Regular Data Fetching !!!!!!!")     
    }, 1000);
    return function(){clearInterval(intervalId)};
  }, []);

  // SEND / POST Message to API
  // Update state value with Input Area and Send Data to API
  const onClickSendText = () => {
    if (text.length <= 2) {
        // The code that summon message "Message must have 2 text at least"
    }else{
        const now_date = getNowTime()
        console.log("Now Date is : " + `${now_date}`)
        const messageInfo = {
            user_id : my_user_id, user_name : my_user_name,
            user_icon : "NoImage", date : now_date,
            message : text,
        }
        setState(
            [...state, messageInfo]
        );
        setScroll([...state, messageInfo]);
        setText("");
        //After Locall state change, POST current situation to server
        const post_message_list = async () => {
            const requestOptions ={
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    item_id : item_id,
                    user_id : my_user_id,
                    message : text,
                })
                //`user_id=${my_user_id}&user_name=${my_user_name}&
                //user_icon="NoImage"&date=${now_date}&message=${text}`
            };
            const url = "http://herozxzx.aa0.netvolante.jp:3001/send_message/"
            //const url = "http://localhost:3304/message-list";
            const res = await fetch(url,requestOptions); // External API
            console.log(res);
            console.log(JSON.stringify(messageInfo));    
        };
      post_message_list();      
    }
  }


  // When Value State of scroll and Render was done, 
  // It will controll scroll position to the bottom.
  // In case of SendChat and First Display. 
  useEffect(() => {
    setScrollToBottom();
  },[scroll]);

  console.log("This is state here")
  console.log(state)


  if (Object.keys(state).length >=1){
    console.log("We have " + Object.keys(state).length + " MSGs")
    const list = []
    var i = 0;
    for (i=0 ; i < Object.keys(state).length ; i++) {
      //var hhmmdate = state[i].date.toString().slice(8, 10) + ":" + state[i].date.toString().slice(10, 12);
      var hhmmdate = state[i].date.slice(8, 10) + ":" + state[i].date.slice(10, 12);
      //console.log({my_user_id})
      //console.log(state[i].user_id)
      if (state[i].user_id == my_user_id){
        // if me
        list.push(
        <div className='EachMSGfromMe'>
            <p className='ChatName'> You </p>
            <p className='ChatContent'> {state[i].message}</p>
            <p className='ChatMSGDate'>{hhmmdate}</p>
        </div>)
      }else{
        // other
        list.push(
        <div className='EachMSG'>
            <p className='ChatName'>{state[i].user_name}</p>
            <p className='ChatContent'> {state[i].message}</p>
            <p className='ChatMSGDate'>{hhmmdate}</p>
        </div>)
      }
    }
    console.log(list)
    
    return (
        <div className="ChatBoxArea">
            <div className='ChatMessageArea' id = "chat-scroll-area">
                {list}
            </div>
            <div className="ChatInputForm">
                <div className="ChatInputTextForm">
                <input value={text}
                    onChange={(event) => setText(event.target.value)} 
                    minlength="2" maxlength="40" size="10" className='InputForm'>
                </input>
                </div>
                <div className="ChatSendFormArea">
                    <button onClick={onClickSendText} className="ChatSendForm"> Send </button>
                </div>
            </div>
        </div>
      );    
  }else{
    console.log("We have No MSGs")
    return (
        <div className="ChatBoxArea">
            <p>No Message</p>
        </div>
      );
  }

}

export default ChatBox;

function setScrollToBottom(){
    try {
        const el = document.getElementById(`chat-scroll-area`);
        el.scrollTo(0, el.scrollHeight);
    } catch (error) {
        console.log("Error : Trying to get value of have not rendered")
    }
}