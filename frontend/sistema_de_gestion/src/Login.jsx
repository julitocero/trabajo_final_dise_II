import "./styles/Login.css";
import Bubble from './media/bubble-login.svg'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");
  
  const handleLogin = async () => {
    const body = {
      email,
      password,
    };
  
    try {
      const response = await fetch("http://localhost:4001/api/auth/login", {

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
  
      console.log("Usuario registrado:", data)
      alert("Usuario registrado exitosamente");
      setUser(
        {
          "id": data.data.user.id,
          "name": data.data.user.name
        }
      );
      console.log("hola",data.data.user.name)
      navigate("/home");
    } catch (error) {
      console.error("Request error:", error);
      alert("No se pudo conectar con el servidor");
    }

  };
  
  return (
    <div className="login-container">
      <img className='img-bubble' src={Bubble} alt="jeje" />
      <div className="login-box">
        <h2 className="login-title">LOGIN</h2>
        <p className="login-subtitle">Bienvenido</p>

        <form className="login-form">

          <label>Correo</label>
          <input type="text" className="login-input" onChange={(e) => setEmail(e.target.value)}/>

          <label>Contraseña</label>
          <input type="password" className="login-input" onChange={(e) => setPasssword(e.target.value)}/>

          <button type="button" className="login-btn" onClick={handleLogin}>
            SUBMIT
          </button>

        </form>
      </div>

    </div>
  );
}
