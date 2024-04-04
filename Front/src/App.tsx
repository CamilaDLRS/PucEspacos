import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import "./App.css"
import Login from "./Components/Formularios/Login"

function App() {

  return (
    <Router>
      <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="*" element=<div>F meu parceiro</div> />
      </Routes>
    </Router>
  )
}

export default App
