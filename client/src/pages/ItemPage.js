// import logo from './logo.svg';
// import './App.css';
import Navbar from '../components/Navbar';
import ShowItem from '../components/ShowItem';
import Footer from '../components/Footer';
import ChatBox from '../components/ChatBox';


function ItemPage() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <ShowItem/>
      <ChatBox/>
      <Footer/>
    </div>
  );
}

export default ItemPage;
