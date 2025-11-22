import '../styles/ConsultaLLM.css';
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
import photoIcon from '../media/photo.svg'
function Add() {
  return (
    <div className="main-body-add">
      <header className="add-header">
        <Sidebar />
        <img className='img-bubble' src={bubble} alt="jeje" />
        <div className='txt-home'>Consulta de Datos - Lenguaje Natural</div>
        <div className='div-logout'> 
          <div className='txt-name'>Adalberto</div>
          <img className='img-logout' src={logoutIcon}></img>
        </div>
        <div className='div-body'>
            <div className='div-consultallm'>
                <div className='div-prompt'> <p>Consulta:</p> <textarea name="prompt" id="prompt" placeholder='Escriba aquí su consulta :)'></textarea></div>
                <div className='div-prompt'> <p>Respuesta:</p> <textarea name="prompt" id="prompt" placeholder='Y aquí estará su respuesta :)'></textarea></div>
            </div >
            <div className='div-btn-submit'><button>SUBMIT</button></div>
        </div>
      </header>
    </div>
  );
}

export default Add;