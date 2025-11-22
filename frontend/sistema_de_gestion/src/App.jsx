
import { Routes, Route, useNavigate } from "react-router-dom";
import './App.css';
import AddPerson from './pages/AddPerson.jsx';
import ModifyPerson from "./pages/ModifyPerson.jsx";
import DeletePerson from "./pages/DeletePerson.jsx";
import ConsultaLLM from './pages/ConsultaLLM.jsx'
import Consulta from './pages/Consulta.jsx'
import ConsultaLog from './pages/ConultaLog.jsx'
import Login from "./Login.jsx";
import Home from "./pages/Home.jsx";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/add" element={<AddPerson />} />
      <Route path="/modify" element={<ModifyPerson />} />
      <Route path="/delete" element={<DeletePerson />} />
      <Route path="/consultallm" element={<ConsultaLLM />} />
      <Route path="/consulta" element={<Consulta  />} />
      <Route path="/consultalog" element={<ConsultaLog  />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;

