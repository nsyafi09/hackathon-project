// import logo from './logo.svg';
// import './App.css';
import Navbar from '../components/Navbar';
import ShowItem from '../components/ShowItem';
import Footer from '../components/Footer';
import ChatBox from '../components/ChatBox';


function ItemPage() {
  return (
    <div>
      <Navbar />
      <ShowItem item_id = "this_is_item_id"/>
      <ChatBox/>
      <Footer/>
    </div>
  );
}

export default ItemPage;
