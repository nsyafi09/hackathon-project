// import logo from './logo.svg';
// import './App.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatBox from '../components/ChatBox';


function ChatPage() {
  return (
    <body>
      <Navbar />
      <ChatBox item_id = "14314312" user_id = {341234166} user_name = {"SMITH"}/>
      <Footer/>
    </body>
  );
}

export default ChatPage;
