// import logo from './logo.svg';
import './disappear.css';
import Navbar from '../components/Navbar';
import ShowItem from '../components/ShowItem';
import Footer from '../components/Footer';
import ChatBox from '../components/ChatBox';
import Tabs from '../components/Tabs';
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

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className='disapear-mobile'>
        <ShowItem item_id = {item_id}/>
        <ChatBox item_id = {item_id} user_id = "500" user_name = {"Cobra"}/>
      </div>
      <Tabs/>
      <Footer/>
    </div>
  );
}

export default ItemPage;
