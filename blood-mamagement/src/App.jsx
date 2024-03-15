import Navbar from "./Components/Navbar"
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./Components/Login";
import Sidebar from "./Components/Sidebar";



function App() {
  

  return (
    <>
     <BrowserRouter>
     <Navbar/>

      <Routes>
      <Route path="/" />
        <Route path="/login" element={< Login/>} />
        <Route path="/sidebar" element={<Sidebar/>} />
       
      </Routes>

     </BrowserRouter>
    </>
  )
}

export default App
