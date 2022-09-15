// import logo from './logo.svg';
// import './App.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatBox from '../components/ChatBox';


function ChatPage() {
  return (
    <body>
      <header>
        <Navbar />
      </header>
      <ChatBox/>
      <Footer/>
    </body>
  );
}

export default ChatPage;
