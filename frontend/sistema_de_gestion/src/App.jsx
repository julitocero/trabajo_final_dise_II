
import { Routes, Route, useNavigate } from "react-router-dom";
import './App.css';
import Sidebar from './components/Sidebar.jsx';
import bubble from './media/bubble.svg';
import Option from "./components/Option.jsx";
import addPersonIcon from './media/add_person.svg';
import deletePersonIcon from './media/delete_person.svg';
import modifyIcon from './media/modify.svg';
import queryIcon from './media/query.svg';
import keyboardIcon from './media/keyboard.svg';
import logIcon from './media/log.svg';
import logoutIcon from './media/logout.svg';
import AddPerson from './pages/AddPerson.jsx';
import ModifyPerson from "./pages/ModifyPerson.jsx";
import DeletePerson from "./pages/DeletePerson.jsx";
import ConsultaLLM from './pages/ConsultaLLM.jsx'
import Consulta from './pages/Consulta.jsx'
import ConsultaLog from './pages/ConultaLog.jsx'
import Login from "./Login.jsx";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
        <Sidebar />
        <img className='img-bubble' src={bubble} alt="jeje" />
        <div className='txt-home'>¿Qué quieres hacer hoy, Adalberto?</div>

        <div className='div-logout'>
          <div className='txt-name'>Adalberto</div>
          <img className='img-logout' src={logoutIcon} alt="logout" />
        </div>

        <div className='div-option'>
          <div onClick={() => navigate("/login")}>
            <Option color={1} texto="Crear Persona" icono={addPersonIcon}/>
          </div>
          <div onClick={() => navigate("/modify")}>
            <Option color={0} texto="Modificar Datos Personales" icono={modifyIcon} />
          </div>
          <div onClick={() => navigate("/delete")}>
            <Option color={1} texto="Borrar Persona" icono={deletePersonIcon}/>
          </div>
          <div onClick={() => navigate("/consulta")}>
            <Option color={0} texto="Consultar Datos" icono={queryIcon}/>
          </div>
          <div onClick={() => navigate("/consultallm")}>
            <Option color={1} texto="Consultar Datos Lenguaje Natural" icono={keyboardIcon}/>
          </div>
          <div onClick={() => navigate("/consultalog")}>
            <Option color={0} texto="Consultar Log" icono={logIcon}/>
          </div>
        </div>
      </header>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
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

