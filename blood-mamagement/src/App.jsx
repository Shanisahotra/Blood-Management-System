import Navbar from "./Components/Navbar"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Login from "./Components/Login"
function App() {
  

  return (
    <>
     <BrowserRouter>
     <Navbar/>

      <Routes>
      <Route path="/" />
        <Route path="/login" element={<Login/>} />
      </Routes>

     </BrowserRouter>
    </>
  )
}

export default App
