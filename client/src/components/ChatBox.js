import '../css/chatbox.css';
import { useEffect, useState } from 'react';
import getNowTime from '../Utils/Util';

function ChatBox(props) {
  const my_user_id = props.user_id;
  const item_id = props.item_id;
  const my_user_name = props.user_name;
  // Input form is controlled by React Hook Form

  // Collapsible Function
  const [isChatExpanded, setIsChatExpanded] = useState(false);

  // Chat message list's length is variable
  // So you have to handle state that have variable length
  // This will get all of message that API provide and render all.
  const [state, setState] = useState([]);
  const [text, setText] = useState(""); // for handle text inputed form
  const [scroll, setScroll] = useState([]); // for handle ScrollPosition

  // CAll API HERE
  // For now, just read json and sparse that data.
  useEffect(() => {
    // useEffect自体ではasyncの関数を受け取れないので内部で関数を定義して呼び出す。
    const access_get = async () => {
      const requestOptions ={
          method: 'GET'
        };
      // const url = "http://localhost:3304/message-list";
      const url = "/api:3001/get_message_list/" + item_id
      const response = await fetch(url,requestOptions); // External API
      const json = await response.json();
      console.log("GET Message Responce (Initial) is ");
      console.log(response);
      console.log(json);
      console.log(json['message_list']);

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
      const url = "/api:3001/get_message_list/" + item_id
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
            const url = "/api:3001/send_message/"
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

    


    // HTML HERE
    return (
      <div className="chatbox-container">
        <button
        className="collapse-btn"
        onClick={() => {
          setIsChatExpanded(!isChatExpanded);
        }}>
        <p>LiveChat<span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
          </svg></span>
          </p>
        </button>
        <div className={isChatExpanded ? "collapsible-chat expanded" : "collapsible-chat"
          }>

            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="ChatBoxArea">
              <div className='ChatMessageArea' id = "chat-scroll-area">
                  {list}
              </div>
                <div className="ChatInputForm">
                    <div className="ChatInputTextForm">
                        <input value={text}
                            onChange={(event) => setText(event.target.value)} 
                            minLength="2" maxLength="40" size="10" className='InputForm'>
                        </input>
                    </div>
                    <div className="ChatSendFormArea">
                        <button onClick={onClickSendText} className="ChatSendForm"> Send </button>
                    </div>
                </div>
            </div>

            {/* <div className="ChatInputForm">
            </div> */}
        </div>
      </div>
      );    
  }else{
    console.log("We have No MSGs")
    return (
      <div className="chatbox-container">
      <button
      className="collapse-btn"
      onClick={() => {
        setIsChatExpanded(!isChatExpanded);
      }}>
      <p>LiveChat<span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
        </svg></span>
        </p>
      </button>
      <div className={isChatExpanded ? "collapsible-chat expanded" : "collapsible-chat"
        }>

          <div className="chat-header">
              <p>Live Chat</p>
          </div>
          <div className="ChatBoxArea">
            <div className='ChatMessageArea' id = "chat-scroll-area">
                No messages
            </div>
              <div className="ChatInputForm">
                  <div className="ChatInputTextForm">
                      <input value={text}
                          onChange={(event) => setText(event.target.value)} 
                          minLength="2" maxLength="40" size="10" className='InputForm'>
                      </input>
                  </div>
                  <div className="ChatSendFormArea">
                      <button onClick={onClickSendText} className="ChatSendForm"> Send </button>
                  </div>
              </div>
          </div>

          {/* <div className="ChatInputForm">
          </div> */}
      </div>
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