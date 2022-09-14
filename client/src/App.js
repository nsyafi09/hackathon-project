// import logo from './logo.svg';
import './App.css';
import MainPage from './pages/MainPage';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ItemPage from './pages/ItemPage';
import ChatPage from './pages/Chat';
import ItemPage2 from './pages/ItemPage2';
 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/itempage" element={<ItemPage/>} />
        <Route path="/itempage2" element={<ItemPage2/>} />
        <Route path="/chatpage" element={<ChatPage/>} />
      </Routes>
   </Router>
  );
}

export default App;
