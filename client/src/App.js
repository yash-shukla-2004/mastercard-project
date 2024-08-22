import logo from './logo.svg';
import './App.css';
import User from './components/users/users.js';
import Defhoc from './HOC/default_hoc.js';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home.js';
import AboutPage from './pages/about.js';
import Profile from './pages/profile.js';
import SignUP from './pages/create_user.js';
import Login from './pages/login.js';
import React,{useState} from 'react';
import Navbar from './components/navbar/navbar.js';
import Chat from './chat.jsx';
import { AuthContextProvider } from './chat.context/AuthContext.jsx';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);  // State is managed here
  console.log(loggedInUser);

  return (
    <>
    <AuthContextProvider>
        <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />  
        <Routes>
          <Route path="/" element={<Defhoc temp={HomePage} />} />
          <Route path="/about" element={<Defhoc temp={AboutPage} />} />
          <Route path="/user/:name" element={<Defhoc temp={Profile} />} />
          <Route path="/chat/*" element={<Chat/>}/>           {/*wildcard to match all paths starting with /chat*/}
          <Route path="/add/new" element={<Defhoc temp={SignUP} />} />
          <Route path="/users/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
