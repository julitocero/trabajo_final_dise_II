import '../styles/addPerson.css';
import Sidebar from '../components/Sidebar';
import bubble from '../media/bubble.svg'
import logoutIcon from '../media/logout.svg'
import FilterTable from '../components/FilterTable.jsx'
import photoIcon from '../media/photo.svg'
import { useAuth } from "../AuthContext";
import { useState } from 'react';

function ConsultaLog() {

  const [dataPersons, setDataPersons] = useState([])
  const getPersons = async () => {
  try {
    const response = await fetch(`http://localhost:4011/persons`);

    const data = await response.json();

    if (!response.ok) {
      console.error("Error:", data);
      alert("Error actualizando usuario");
      return;
    }
    console.log("Datos obtenidos:", data);
    setDataPersons(seleccionarColumnas(data.data, ["fname", "lname", "ndocument", "gender", "bday"]))
    console.log(seleccionarColumnas(data.data, ["fname", "lname", "ndocument", "gender", "bday"]))
    console.log("set:",dataPersons)
  } catch (err) {
    console.error("Request error:", err);
    alert("No se pudo conectar con el servidor");
  }
}
function seleccionarColumnas(data, columnas) {
  return data.map(item => {
    const nuevo = {};
    columnas.forEach(col => {
      nuevo[col] = item[col]; 
    });
    return nuevo;
  });
}


  const logs = [
        { name: "Julio", action: "Login", date: "2025-11-22" },
        { name: "Ana", action: "Create User", date: "2025-11-21" }
    ];
  const { user } = useAuth();
  return (
    <div className="main-body-add">
      <header className="add-header">
        <Sidebar />
        <img className='img-bubble' src={bubble} alt="jeje" />
        <div className='txt-home2'>
            <p>Consulta Personas</p>
            <div className='div-search-log'>
              <div className='div-btn-submit2'>
                <button onClick={() => getPersons()}>Buscar</button>
              </div>
            </div>
          </div>
        <div className='div-logout'> 
          <div className='txt-name'>name</div>
          <img className='img-logout' src={logoutIcon}></img>
        </div>
        <div className='div-body'>
            <FilterTable data={dataPersons}  />
        </div>
      </header>
    </div>
  );
}

export default ConsultaLog;