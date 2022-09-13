// import logo from './logo.svg';
import './App.css';
import MainPage from './pages/MainPage';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ItemPage from './pages/ItemPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/itempage" element={<ItemPage/>} />
      </Routes>
   </Router>
  );
}

export default App;
