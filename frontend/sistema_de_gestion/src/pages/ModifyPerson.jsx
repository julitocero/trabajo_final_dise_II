import '../styles/addPerson.css';
import Sidebar from '../components/Sidebar';
import bubble from '../media/bubble.svg'
import logoutIcon from '../media/logout.svg'
import photoIcon from '../media/photo.svg'
import { useState } from 'react';
import { useAuth } from "../AuthContext";


function ModifyPerson() {
const { user } = useAuth();
console.log("userid:", user)
const [userID, setUserID] = useState("")
const [ndocumentSearch, setNdocumentSearch] = useState("");
const [tdocument, setTdocument] = useState("");
const [ndocument, setNdocument] = useState("");
const [fname, setFname] = useState("");
const [sname, setSname] = useState("");
const [lname, setLname] = useState("");
const [bday, setBday] = useState("");
const [gender, setGender] = useState("");
const [email, setEmail] = useState("");
const [cel, setCel] = useState("");
const [dataPerson, setDataPerson] =  useState([]);
const [data, setData] =  useState([]);
const [idPerson, setIdPerson] = useState("")
const [foto, setFoto] = useState("");


const getPerson = async (document) => {
  try {
    const response = await fetch(`http://localhost:4011/persons?ndocument=${document}`);

    const data = await response.json();

    if (!response.ok) {
      console.error("Error:", data);
      alert("Error actualizando usuario");
      return;
    }
    console.log("Datos obtenidos:", data);
    const person = data.data[0]
    setDataPerson(data.data[0])
    console.log("data:", dataPerson)
    setFname(person.fname ?? "")
    setTdocument(person.tdocument ?? "")
    setNdocument(String(person.ndocument) ?? "")
    setSname(person.sname ?? "")
    setLname(person.lname ?? "")
    setBday(person.bday ?? "")
    setLname(person.lname ?? "")
    setGender(person.gender ?? "")
    setEmail(person.email ?? "")
    setCel(String(person.cel) ?? "")
    console.log("cel:",person.cel)
    setIdPerson(person._id)
    setFoto(person.img_Url)
  } catch (err) {
    console.error("Request error:", err);
    alert("No se pudo conectar con el servidor");
  }
}
const updateUser = async (idPerson) => {
  setUserID(user.id)
  console.log("userid:", userID)
  const img_Url =  foto
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
    img_Url,
    userID
  };
  try {
    const response = await fetch(`http://localhost:4012/persons/${idPerson}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error:", data);
      alert("Error actualizando usuario");
      return;
    }

    console.log("Usuario actualizado:", data);
    alert("Usuario actualizado correctamente");
  } catch (err) {
    console.error("Request error:", err);
    alert("No se pudo conectar con el servidor");
  }
};

  const onChangeFile = (e) => {
    const foto = e.target.files[0];
    if (foto) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result);  
      };
      reader.readAsDataURL(foto);
    }
};
console.log("cel:",cel)
  return (
    <div className="main-body-add">
      <header className="add-header">
        <Sidebar />
        <img className='img-bubble' src={bubble} alt="jeje" />
        <div className='txt-home2'>
            <p>Modificar Persona</p>
            <div className='div-search'><div className='div-form-datos-search'><p>Ingrese el nro. de documento</p> <input type="number" placeholder='1234567890' onChange={(e) => setNdocumentSearch(e.target.value)}/></div><div className='div-btn-submit2'><button onClick={() => getPerson(ndocumentSearch)}>Buscar</button></div></div>
            </div>
        <div className='div-logout'> 
          <div className='txt-name'>name</div>
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
                          foto ? (<img src={foto} alt="Foto seleccionada" className="preview-img" />) : (<img src={photoIcon} alt="icono Foto" className="icon-img"/>)
                        }
                      </label>
                    </div>

                    <div className='div-form-datos'>
                        <p>Primer Nombre</p>
                        <input type="text" value={fname} onChange={(e) => setFname(e.target.value)}/>
                        <p>Segundo Nombre</p>
                        <input type="text" value={sname}  onChange={(e) => setSname(e.target.value)}/>
                        <p>Apellidos</p>
                        <input type="text" value={lname}  onChange={(e) => setLname(e.target.value)}/>
                    </div>
                </div>
                <div className='div-form-add2'>
                    <div className='div-form-datos'>
                      <p>Tipo Documento</p> 
                      <select onChange={(e) => setTdocument(e.target.value)} value={tdocument}>
                        <option value='' disabled selected>Seleccione...</option>
                        <option value="C.C">CC</option>
                        <option value="T.I">TI</option>
                        
                      </select>
                      </div>
                    <div className='div-form-datos' >
                      <p>Nro. Documento</p> 
                      <input type="number" value={ndocument} onChange={(e) => setNdocument(e.target.value)}/>
                      </div>
                    <div className='div-form-datos' >
                      <p>Género</p> 
                      <select onChange={(e) => setGender(e.target.value)} value={gender}>
                        <option value=''disabled selected>Seleccione...</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="No binario o Prefiero no responder">Otro</option>
                      </select>
                    </div>
                    <div className='div-form-datos' ><p>Fecha Nacimiento</p> <input type="date" value={bday} onChange={(e) => setBday(e.target.value)}/></div>
                    <div className='div-form-datos' ><p>Correo</p> <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/></div>
                    <div className='div-form-datos' ><p>Celular</p> <input type="number" value={cel} onChange={(e) => setCel(e.target.value)}/></div>
                </div>
            </div >
            <div className='div-btn-submit'><button onClick={() => updateUser(idPerson)}>SUBMIT</button></div>
        </div>
      </header>
    </div>
  );
}

export default ModifyPerson;