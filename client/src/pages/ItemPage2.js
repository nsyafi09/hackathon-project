// import logo from './logo.svg';
// import './App.css';
import Navbar from '../components/Navbar';
import ShowItem2 from '../components/ShowItem2';
import Footer from '../components/Footer';
import ChatBox from '../components/ChatBox';


function ItemPage() {
  return (
    <div>
      <Navbar />
      <ShowItem2/>
      <ChatBox/>
      <Footer/>
    </div>
  );
}

export default ItemPage;
