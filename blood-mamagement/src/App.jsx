import Navbar from "./Components/Navbar"
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./Components/Login";
import Sidebar from "./Components/Sidebar";
import React,{useState} from "react";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
     <BrowserRouter>
     <Navbar isLoggedIn={isLoggedIn} />

      <Routes>
      <Route path="/" />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/sidebar" element={<Sidebar />} />
       
      </Routes>

     </BrowserRouter>
    </>
  )
}

export default App
