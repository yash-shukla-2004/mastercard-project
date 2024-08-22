import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./chat.pages/home/Home.jsx";
import Login from "./chat.pages/login/Login.jsx";
import SignUp from "./chat.pages/signup/SignUp.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./chat.context/AuthContext.jsx";

function App() {
	const { authUser } = useAuthContext();
	return (
            <div className='p-4 h-screen flex items-center justify-center'>
                <Routes>
                    <Route path='/' element={authUser ? <Home /> : <Navigate to={"chat/login"} />} />
                    <Route path='chat/login' element={authUser ? <Navigate to='chat/' /> : <Login />} />
                    <Route path='chat/signup' element={authUser ? <Navigate to='chat/' /> : <SignUp />} />
                </Routes>
                <Toaster />
            </div>
	);
}

export default App;
