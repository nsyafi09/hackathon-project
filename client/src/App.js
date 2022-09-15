// import logo from './logo.svg';
import './App.css';
import MainPage from './pages/MainPage';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ItemPage from './pages/ItemPage';
import ChatPage from './pages/Chat';

function App() {
  // We should pass some info to each page
  // item_id : for get item info from api / chat room
  // user_id : for chat room
  // user_name : for chat room

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/itempage" element={<ItemPage item_id = "this_is_item_id"/>} />
        <Route path="/chatpage" element={<ChatPage/>} />
      </Routes>
   </Router>
  );
}

export default App;
