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
import { useState } from 'react';




function Add() {

const [tdocument, setTdocument] = useState("");
const [ndocument, setNdocument] = useState("");
const [fname, setFname] = useState("");
const [sname, setSname] = useState("");
const [lname, setLname] = useState("");
const [bday, setBday] = useState("");
const [gender, setGender] = useState("");
const [email, setEmail] = useState("");
const [cel, setCel] = useState("");

const handleCreateUser = async () => {
  const body = {
    tdocument,
    ndocument,
    fname,
    sname,
    lname,
    bday,
    gender,
    email,
    cel
  };

  try {
    const response = await fetch("http://localhost:4002/api/persons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error:", data);
      alert("Error creando usuario");
      return;
    }

    console.log("Usuario creado:", data);
    alert("Usuario creado exitosamente");

  } catch (error) {
    console.error("Request error:", error);
    alert("No se pudo conectar con el servidor");
  }
};

  const [preview, setPreview] = useState( null );

  const onChangeFile = (e) => {
    const foto = e.target.files[0]
    if (foto) {
      const imageURL = URL.createObjectURL(foto)
      setPreview(imageURL)
    }
  };
  return (
    <div className="main-body-add">
      <header className="add-header">
        <Sidebar />
        <img className='img-bubble' src={bubble} alt="jeje" />
        <div className='txt-home'>Crear Persona</div>
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
                        onChange={onChangeFile}
                      />
                      <label htmlFor="fileInput" className="upload-btn">
                        {
                          preview ? (<img src={preview} alt="Foto seleccionada" className="preview-img" />) : (<img src={photoIcon} alt="icono Foto" className="icon-img"/>)
                        }
                      </label>
                    </div>

                    <div className='div-form-datos'>
                        <p>Primer Nombre</p>
                        <input type="text" placeholder='Jhon' value={fname} onChange={setFname}/>
                        <p>Segundo Nombre</p>
                        <input type="text" placeholder='Mario' value={sname} onChange={setSname}/>
                        <p>Apellidos</p>
                        <input type="text" placeholder='Dalton Doe' value={lname} onChange={setFname}/>
                    </div>
                </div>
                <div className='div-form-add2'>
                    <div className='div-form-datos' >
                      <p>Tipo Documento</p> 
                      <select value={tdocument} onChange={setTdocument}>
                        <option disabled>Seleccione...</option>
                        <option value="T.I">TI</option>
                        <option value="C.C">CC</option>
                        
                      </select>
                    </div>
                    <div className='div-form-datos' >
                      <p>Nro. Documento</p> 
                      <input type="number" placeholder='1234567890' value={ndocument} onChange={setNdocument}/>
                      </div>
                    <div className='div-form-datos' >
                      <p>Género</p> 
                      <select value={gender} onChange={setGender}>
                        <option disabled>Seleccione...</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                    <div className='div-form-datos' ><p>Fecha Nacimiento</p> <input type="date" value={bday} onChange={setBday}/></div>
                    <div className='div-form-datos' ><p>Correo</p> <input type="text" placeholder='jhondalton@ejemplo.com' value={email} onChange={setEmail}/></div>
                    <div className='div-form-datos' ><p>Celular</p> <input type="number" placeholder='1234567890' value={cel} onChange={setCel}/></div>
                </div>
            </div >
            <div className='div-btn-submit'><button onClick={handleCreateUser}>SUBMIT</button></div>
        </div>
      </header>
    </div>
  );
}

export default Add;