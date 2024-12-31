import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Form from "./components/Form.jsx";
import Success from "./pages/Success.jsx";
import Map from "./pages/Map.jsx";
import './index.css'
import { Routes,Route } from "react-router-dom";

const App = () => {

  return (
    <div>
      <Routes>
       <Route path="/" element={<Login/>}/>
       <Route path="/SignUp" element={<Signup/>}/>
       <Route path="/Home" element={<Home/>}/>
       <Route path="/ManualLocation" element={<Form/>}/>
       <Route path="/success-page" element={<Success/>}/>
       <Route path="/Map" element={<Map/>}/>
      </Routes>
    </div>
  )
}

export default App
