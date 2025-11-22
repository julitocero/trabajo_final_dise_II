import '../styles/addPerson.css';
import Sidebar from '../components/Sidebar';
import bubble from '../media/bubble.svg'
import Option from "../components/Option"
import addPersonIcon from '../media/add_person.svg'
import deletePersonIcon from '../media/delete_person.svg'
import modifyIcon from '../media/modify.svg'
import queryIcon from '../media/query.svg'
import keyboardIcon from '../media/keyboard.svg'
import logIcon from '../media/log.svg'
import logoutIcon from '../media/logout.svg'
import DenseTable from '../components/DenseTable';
import photoIcon from '../media/photo.svg'

function ConsultaLog() {
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
                <button>Buscar</button>
              </div>
            </div>
          </div>
        <div className='div-logout'> 
          <div className='txt-name'>Adalberto</div>
          <img className='img-logout' src={logoutIcon}></img>
        </div>
        <div className='div-body'>
            <DenseTable />
        </div>
      </header>
    </div>
  );
}

export default ConsultaLog;