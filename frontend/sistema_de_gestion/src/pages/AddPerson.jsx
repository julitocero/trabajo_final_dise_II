import '../styles/addPerson.css';
import Sidebar from '../components/Sidebar';
import bubble from '../media/bubble.svg'
import logoutIcon from '../media/logout.svg'
import photoIcon from '../media/photo.svg'
import { useState } from 'react';
import { useAuth } from "../AuthContext";

function Add() {
const { user } = useAuth();
const [userID, setUserID] = useState("");
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
  
  const user_id = user.id
  console.log(user_id)
  console.log("gendero",gender)
  const body = {
    tdocument,
    ndocument,
    fname,
    sname,
    lname,
    bday,
    gender,
    email,
    cel,
    user_id
  };
  console.log("gendero",gender)
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
      console.log("url:",imageURL)
    }
  };
  return (
    <div className="main-body-add">
      <header className="add-header">
        <Sidebar />
        <img className='img-bubble' src={bubble} alt="jeje" />
        <div className='txt-home'>Crear Persona</div>
        <div className='div-logout'> 
          <div className='txt-name'>julio</div>
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
                        <input type="text" placeholder='Jhon'  onChange={(e) => setFname(e.target.value)}/>
                        <p>Segundo Nombre</p>
                        <input type="text" placeholder='Mario' onChange={(e) => setSname(e.target.value)}/>
                        <p>Apellidos</p>
                        <input type="text" placeholder='Dalton Doe' onChange={(e) => setLname(e.target.value)}/>
                    </div>
                </div>
                <div className='div-form-add2'>
                    <div className='div-form-datos' >
                      <p>Tipo Documento</p> 
                      <select onChange={(e) => setTdocument(e.target.value)}>
                        <option disabled>Seleccione...</option>
                        <option value="T.I">TI</option>
                        <option value="C.C">CC</option>
                        
                      </select>
                    </div>
                    <div className='div-form-datos' >
                      <p>Nro. Documento</p> 
                      <input type="number" placeholder='1234567890' onChange={(e) => setNdocument(e.target.value)}/>
                      </div>
                    <div className='div-form-datos' >
                      <p>Género</p> 
                      <select onChange={(e) => setGender(e.target.value)}>
                        <option disabled>Seleccione...</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="No binario o Prefiero no responder">Otro</option>
                      </select>
                    </div>
                    <div className='div-form-datos' ><p>Fecha Nacimiento</p> <input type="date" onChange={(e) => setBday(e.target.value)}/></div>
                    <div className='div-form-datos' ><p>Correo</p> <input type="text" placeholder='jhondalton@ejemplo.com' onChange={(e) => setEmail(e.target.value)}/></div>
                    <div className='div-form-datos' ><p>Celular</p> <input type="number" placeholder='1234567890' onChange={(e) => setCel(e.target.value)}/></div>
                </div>
            </div >
            <div className='div-btn-submit'><button type='button' onClick={handleCreateUser}>SUBMIT</button></div>
        </div>
      </header>
    </div>
  );
}

export default Add;