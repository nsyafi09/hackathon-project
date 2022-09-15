// import logo from './logo.svg';
// import './App.css';
import Navbar from '../components/Navbar';
import ShowItem from '../components/ShowItem';
import Footer from '../components/Footer';
import ChatBox from '../components/ChatBox';
import { useLocation } from 'react-router-dom';


function ItemPage() {
  var item_id = "";
  try { // catch if user reach this page without state like direct URL link
    const location = useLocation();
    item_id = location.state.item_id
    console.log("This is Item ID got from Genere page!")
    console.log(item_id.item_id)
  } catch (error){
    item_id = "ezaki-g:10225380"
    console.log("An unexpected page access! It displys default items")
    console.log(item_id)
  }

  // ここでChatBoxを表示するのか，ChatBoxを表示するボタンを表示するのか制御

  return (
    <div>
      <Navbar />
      <ChatBox item_id ={item_id} user_id = "341234123" user_name = {"SMITH"}/>
      <ShowItem item_id = {item_id}/>
      <Footer/>
    </div>
  );
}
//<ChatBox item_id = "14314312" user_id = "341234123" user_name = {"SMITH"}/>

export default ItemPage;
