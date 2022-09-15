// import logo from './logo.svg';
// import './App.css';
import Navbar from '../components/Navbar';
import ShowItem from '../components/ShowItem';
import Footer from '../components/Footer';
import ChatBox from '../components/ChatBox';


function ItemPage(props) {
  const item_id = props.item_id

  // ここでChatBoxを表示するのか，ChatBoxを表示するボタンを表示するのか制御

  return (
    <div>
      <Navbar />
      <ShowItem item_id = {item_id}/>
      <ChatBox item_id = "14314312" user_id = {341234166} user_name = {"SMITH"}/>
      <Footer/>
    </div>
  );
}

export default ItemPage;
