import '../styles/addPerson.css';
import Sidebar from '../components/Sidebar';
import bubble from '../media/bubble.svg'
import logoutIcon from '../media/logout.svg'
import photoIcon from '../media/photo.svg'
import { useState } from 'react';
import { useAuth } from "../AuthContext";
function DeletePerson() {
  const { user } = useAuth();
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
    setFname(person.fname ?? "")
    setTdocument(person.tdocument ?? "")
    setNdocument(person.ndocument ?? "")
    setSname(person.sname ?? "")
    setLname(person.lname ?? "")
    setBday(person.bday ?? "")
    setLname(person.lname ?? "")
    setGender(person.gender ?? "")
    setEmail(person.email ?? "")
    setCel(person.cel ?? "")
    setIdPerson(person._id)
    setFoto(person.img_Url)
  } catch (err) {
    console.error("Request error:", err);
    alert("No se pudo conectar con el servidor");
  }
}
  const deleteUser = async (id) => {
  try {
    const response = await fetch(`http://localhost:4013/persons/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error:", data);
      alert("Error eliminando usuario");
      return;
    }

    console.log("Usuario eliminado:", data);
    alert("Usuario eliminado correctamente");
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


  return (
    <div className="main-body-add">
      <header className="add-header">
        <Sidebar />
        <img className='img-bubble' src={bubble} alt="jeje" />
        <div className='txt-home2'>
            <p>Modificar Persona</p>
            <div className='div-search'><div className='div-form-datos-search'><p>Ingrese el nro. de documento</p> <input type="number" placeholder='1234567890' value={ndocumentSearch} onChange={(e) => setNdocumentSearch(e.target.value)}/></div><div className='div-btn-submit2'><button onClick={() => getPerson(ndocumentSearch)}>Buscar</button></div></div>
            </div>
        <div className='div-logout'> 
          <div className='txt-name'>{user.name}</div>
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
                        <input type="text" placeholder='Jhon ' readOnly value={fname} onChange={setFname}/>
                        <p>Segundo Nombre</p>
                        <input type="text" placeholder='Mario' readOnly value={sname} onChange={setSname}/>
                        <p>Apellidos</p>
                        <input type="text" placeholder='Dalton Doe' readOnly value={lname} onChange={setLname}/>
                    </div>
                </div>
                <div className='div-form-add2'>
                    <div className='div-form-datos' >
                      <p>Tipo Documento</p> 
                      <select disabled value={tdocument} onChange={setTdocument}>
                        <option disabled>Seleccione...</option>
                        <option value="C.C">CC</option>
                        <option value="T.I">TI</option>
                        
                      </select>
                      </div>
                    <div className='div-form-datos' >
                      <p>Nro. Documento</p> 
                      <input type="number" placeholder='1234567890' readOnly value={ndocument} onChange={setNdocument}/>
                      </div>
                    <div className='div-form-datos' >
                      <p>Género</p> 
                      <select disabled value={gender} onChange={setGender}>
                        <option disabled>Seleccione...</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                    <div className='div-form-datos' ><p>Fecha Nacimiento</p> <input type="date"  readOnly value={bday} onChange={setBday}/></div>
                    <div className='div-form-datos' ><p>Correo</p> <input type="text" placeholder='jhondalton@ejemplo.com' readOnly value={email} onChange={setEmail}/></div>
                    <div className='div-form-datos' ><p>Celular</p> <input type="number" placeholder='1234567890' readOnly value={cel} onChange={setCel}/></div>
                </div>
            </div >
            <div className='div-btn-delete'><button onClick={() => deleteUser(idPerson)}>DELETE</button></div>
        </div>
      </header>
    </div>
  );
}

export default DeletePerson;