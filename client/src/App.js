import logo from './logo.svg';
import './App.css';
import User from './components/users/users';
import Defhoc from './HOC/default_hoc';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import AboutPage from './pages/about';
import Profile from './pages/profile';
import AddUser from './pages/create_profile';

function App() {
  return (
   
    
    <Routes>
        <Route path = '/' element ={<Defhoc temp = {HomePage } />} />
        <Route path = '/about' element ={<Defhoc temp = {AboutPage } />} />
        <Route path = 'student/:id' element={<Defhoc temp={Profile} />} />
        <Route path = 'student/add' element={<Defhoc temp={AddUser} />} />
       
    </Routes>
   
  );
}

export default App;
