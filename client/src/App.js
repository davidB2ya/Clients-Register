import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import AddClient from './components/AddClient';
import EditClient from './components/EditClient';
import Modal from './components/Modal';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} exact />
        <Route path='/login' element={<Login />} exact />
        <Route path='/register' element={<Register />} exact />
        <Route path='/home' element={<Home />} exact />
        <Route path='/add' element={<AddClient />} exact />
        <Route path='/edit/:id' element={<EditClient />} exact />
        <Route path='/modal/:id' element={<Modal />} exact />

      </Routes>
    </div>
  );
}

export default App;
