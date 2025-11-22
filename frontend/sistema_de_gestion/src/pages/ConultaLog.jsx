import '../styles/addPerson.css';
import Sidebar from '../components/Sidebar';
import bubble from '../media/bubble.svg'
import logoutIcon from '../media/logout.svg'
import DenseTable from '../components/DenseTable';
import { useAuth } from "../AuthContext";
import { useState } from 'react';

function ConsultaLog() {

  const [data, setData] =  useState([]);
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


  const { user } = useAuth();
  return (
    <div className="main-body-add">
      <header className="add-header">
        <Sidebar />
        <img className='img-bubble' src={bubble} alt="jeje" />
        <div className='txt-home2'>
            <p>Modificar Persona</p>
            <div className='div-search-log'>
              <div className='div-form-datos-search'>
                <p>Tipo Documento</p> 
                <select >
                  <option disabled>Seleccione...</option>
                  <option value="CREATE_PERSON">CREATE_PERSON</option>
                  <option value="READ_PERSONS_FILTERED">READ_PERSONS_FILTERED</option>
                  <option value="READ_PERSONS_FILTERED">UPDATE_PERSON</option>
                  <option value="READ_PERSONS_FILTERED">DELETE_PERSON</option>
                </select>
              </div>
              <div className='div-form-datos-search'>
                <p>Nro. de documento</p> 
                <input type="number" placeholder='1234567890'/>
              </div>
              <div className='div-form-datos-search'><p>Fecha Transacción</p><input type="date" /></div>
              <div className='div-btn-submit2'>
                <button onClick={getLogs}>Buscar</button>
              </div>
            </div>
          </div>
        <div className='div-logout'> 
          <div className='txt-name'></div>
          <img className='img-logout' src={logoutIcon}></img>
        </div>
        <div className='div-body'>
            <DenseTable data={data} />
        </div>
      </header>
    </div>
  );
}

export default ConsultaLog;