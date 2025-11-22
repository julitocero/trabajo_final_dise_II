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
import photoIcon from '../media/photo.svg'
function DeletePerson() {
  return (
    <div className="main-body-add">
      <header className="add-header">
        <Sidebar />
        <img className='img-bubble' src={bubble} alt="jeje" />
        <div className='txt-home2'>
            <p>Modificar Persona</p>
            <div className='div-search'><div className='div-form-datos-search'><p>Ingrese el nro. de documento</p> <input type="number" placeholder='1234567890'/></div><div className='div-btn-submit2'><button>Buscar</button></div></div>
            </div>
        <div className='div-logout'> 
          <div className='txt-name'>Adalberto</div>
          <img className='img-logout' src={logoutIcon}></img>
        </div>

        <div className='div-body'>
            <div className='div-form-add'>
                <div className='div-form-photo'>

                    <div className="photo-upload">
                      <input 
                        id="fileInput" 
                        type="file" 
                        accept="image/*" 
                      />

                      <label htmlFor="fileInput" className="upload-btn">
                        <img src={photoIcon} alt="jej" />
                      </label>
                    </div>

                    <div className='div-form-datos'>
                        <p>Primer Nombre</p>
                        <input type="text" placeholder='Jhon ' readOnly/>
                        <p>Segundo Nombre</p>
                        <input type="text" placeholder='Mario' readOnly/>
                        <p>Apellidos</p>
                        <input type="text" placeholder='Dalton Doe' readOnly/>
                    </div>
                </div>
                <div className='div-form-add2'>
                    <div className='div-form-datos' >
                      <p>Tipo Documento</p> 
                      <select disabled>
                        <option disabled>Seleccione...</option>
                        <option value="TI">TI</option>
                        <option value="CC">CC</option>
                        
                      </select>
                      </div>
                    <div className='div-form-datos' >
                      <p>Nro. Documento</p> 
                      <input type="number" placeholder='1234567890' readOnly/>
                      </div>
                    <div className='div-form-datos' >
                      <p>Género</p> 
                      <select disabled>
                        <option disabled>Seleccione...</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                        <option value="O">Otro</option>
                      </select>
                    </div>
                    <div className='div-form-datos' ><p>Fecha Nacimiento</p> <input type="date"  readOnly/></div>
                    <div className='div-form-datos' ><p>Correo</p> <input type="text" placeholder='jhondalton@ejemplo.com' readOnly/></div>
                    <div className='div-form-datos' ><p>Celular</p> <input type="number" placeholder='1234567890' readOnly/></div>
                </div>
            </div >
            <div className='div-btn-delete'><button>DELETE</button></div>
        </div>
      </header>
    </div>
  );
}

export default DeletePerson;