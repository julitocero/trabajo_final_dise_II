import '../styles/addPerson.css';
import Sidebar from '../components/Sidebar';
import { Routes, Route, useNavigate } from "react-router-dom";
import bubble from '../media/bubble.svg'
import logoutIcon from '../media/logout.svg'
import DenseTable from '../components/DenseTable';
import { useAuth } from "../AuthContext";
import { useState } from 'react';

function ConsultaLog() {
  const navigate = useNavigate();

  const [data, setData] =  useState([]);
  const [action, setAction] = useState("");
  const [ndocument, setNDocument] = useState("");
  const [date, setDate] = useState("");
  const getLogs = async () => {
  try {
    const response = await fetch("http://localhost:4003/api/logs");

    const data = await response.json();

    if (!response.ok) {
      console.error("Error obteniendo logs:", data);
      alert("Error al obtener logs");
      return;
    }

    console.log("Logs obtenidos:", data);
    setData(data.data)
  } catch (error) {
    console.error("Request error:", error);
    alert("No se pudo conectar con el servidor");
  }
};

async function fetchLogs(paramsObj) {
  const params = new URLSearchParams(paramsObj);

  try {
    const response = await fetch(`http://localhost:4003/api/logs?${params}`);

    const data = await response.json();

    if (!response.ok) {
      console.error("Error obteniendo logs:", data);
      alert("Error al obtener logs");
      return;
    }

    console.log("Logs obtenidos:", data);
    setData(data.data)
  } catch (error) {
    console.error("Request error:", error);
    alert("No se pudo conectar con el servidor");
  }
}




  const { user } = useAuth();
  return (
    <div className="main-body-add">
      <header className="add-header">
        <Sidebar />
        <img className='img-bubble' src={bubble} alt="jeje" />
        <div className='txt-home2'>
            <p>Consulta Log</p>
            <div className='div-search-log'>
              <div className='div-form-datos-search'>
                <p>Tipo Acción</p> 
                <select onChange={(e) => setAction(e.target.value)}>
                  <option disabled selected>Seleccione...</option>
                  <option value="CREATE_PERSON">CREATE_PERSON</option>
                  <option value="UPDATE_PERSON">UPDATE_PERSON</option>
                  <option value="DELETE_PERSON">DELETE_PERSON</option>
                </select>
              </div>
              <div className='div-form-datos-search'>
                <p>Nro. de documento</p> 
                <input type="number" placeholder='1234567890' onChange={(e) => setNDocument(e.target.value)}/>
              </div>
              <div className='div-form-datos-search' onChange={(e) => setDate(e.target.value)}><p>Fecha Transacción</p><input type="date" /></div>
              <div className='div-btn-submit2'>
                <button onClick={() => fetchLogs({ndocument: ndocument,dateFrom: date,dateTo: date,action: action}).then(console.log)}>Buscar</button>
              </div>
            </div>
          </div>
        <div className='div-logout'> 
          <div className='txt-name'>{user.name}</div>
          <img className='img-logout' src={logoutIcon} onClick={() => navigate("/login")}></img>
        </div>
        <div className='div-body'>
            <DenseTable data={data} />
        </div>
      </header>
    </div>
  );
}

export default ConsultaLog;