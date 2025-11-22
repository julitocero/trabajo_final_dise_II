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


  const testData = [
  {
    "_id": "POHFIvphP1Xp",
    "action": "CREATE_PERSON",
    "user": 1,
    "details": "{\"tdocument\":\"C.C\",\"ndocument\":\"34534534\",\"fname\":\"dart\",\"sname\":\"tien\",\"lname\":\"sanz\",\"email\":\"asdad@gmail.com\"}",
    "timesp": "2025-10-14T16:07"
  },
  {
    "_id": "g3EjYhKwxBpm",
    "action": "DELETE_PERSON",
    "user": 1,
    "details": "{\"id\":\"fwz5PLR6Gl0Y\"}",
    "timesp": "2025-10-14T16:19"
  },
  {
    "_id": "ltvn7qZF4ymG",
    "action": "CREATE_PERSON",
    "user": 42,
    "details": "{\"tdocument\":\"C.C\",\"ndocument\":\"5134662890\",\"fname\":\"Juanita\",\"sname\":\"Carl\",\"lname\":\"Pérez García\",\"email\":\"juan.perez@example.com\"}",
    "timesp": "2025-11-22T04:53"
  },
  {
    "_id": "a1N9mAwruDcc",
    "action": "CREATE_PERSON",
    "user": 20,
    "details": "{\"tdocument\":\"C.C\",\"ndocument\":\"5114662810\",\"fname\":\"Juanito\",\"sname\":\"Jr\",\"lname\":\"Pérez García\",\"email\":\"juan.perez@example.com\"}",
    "timesp": "2025-11-22T12:09"
  },
  {
    "_id": "Cufdsb_xb6cL",
    "action": "CREATE_PERSON",
    "user": 1,
    "details": "{\"tdocument\":\"C.C\",\"ndocument\":\"1222222222\",\"fname\":\"Julio\",\"sname\":\"Test\",\"lname\":\"Uno\",\"email\":\"juliotest1@gmail.com\"}",
    "timesp": "2025-11-22T14:28"
  }
];

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
                  <option value="CC">CC</option>
                  <option value="TI">TI</option>
                  
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