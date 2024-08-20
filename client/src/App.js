import logo from './logo.svg';
import './App.css';
import User from './components/users/users';
import Defhoc from './HOC/default_hoc';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import AboutPage from './pages/about';
import Profile from './pages/profile';
import SignUP from './pages/create_user';
import Login from './pages/login';
import React,{useState} from 'react';
import Navbar from './components/navbar/navbar';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);  // State is managed here
  console.log(loggedInUser);

  return (
    <>
      <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />  
      <Routes>
        <Route path="/" element={<Defhoc temp={HomePage} />} />
        <Route path="/about" element={<Defhoc temp={AboutPage} />} />
        <Route path="/user/:name" element={<Defhoc temp={Profile} />} />
        
        <Route path="/add/new" element={<Defhoc temp={SignUP} />} />
        <Route path="/users/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
      </Routes>
    </>
  );
}

export default App;
