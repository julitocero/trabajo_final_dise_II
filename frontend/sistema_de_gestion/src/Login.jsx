import "./styles/Login.css";
import Bubble from './media/bubble-login.svg'

export default function Login() {
  return (
    <div className="login-container">
      <img className='img-bubble' src={Bubble} alt="jeje" />
      <div className="login-box">
        <h2 className="login-title">LOGIN</h2>
        <p className="login-subtitle">Bienvenido</p>

        <form className="login-form">

          <label>Usuario</label>
          <input type="text" className="login-input" />

          <label>Contraseña</label>
          <input type="password" className="login-input" />

          <button type="submit" className="login-btn">
            SUBMIT
          </button>

        </form>
      </div>

    </div>
  );
}
