
import './App.css';
import EditProfile from './components/EditProfile';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/"element={<Login/>}></Route>
    <Route path="/Signup"element={<Signup/>}></Route>
    <Route path="/Home"element={<Home/>}></Route>
    <Route path="/EditProfile"element={<EditProfile/>}></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
