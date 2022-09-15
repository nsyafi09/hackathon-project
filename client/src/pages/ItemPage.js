// import logo from './logo.svg';
import './disappear.css';
import Navbar from '../components/Navbar';
import ShowItem from '../components/ShowItem';
import Footer from '../components/Footer';
import ChatBox from '../components/ChatBox';
import Tabs from '../components/Tabs';
import PlaceHolder from '../components/placeholder';


function ItemPage() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className='disapear-mobile'>
      <ShowItem/>
      <ChatBox item_id = "14314312" user_id = "341234123" user_name = {"SMITH"}/>
      </div>
      <Tabs/>
      <Footer/>
    </div>
  );
}

export default ItemPage;
