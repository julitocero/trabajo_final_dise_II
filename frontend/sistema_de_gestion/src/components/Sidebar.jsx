// src/components/Sidebar.jsx
import React from 'react';
import '../styles/sidebar.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import homeIcon from '../media/home.svg'
import addPersonIcon from '../media/add_person.svg'
import deletePersonIcon from '../media/delete_person.svg'
import modifyIcon from '../media/modify.svg'
import queryIcon from '../media/query.svg'
import keyboardIcon from '../media/keyboard.svg'
import logIcon from '../media/log.svg'

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <aside className="sidebar">
      <div className="sidebar-header">Mi App</div>
      <div className='sidebar-title'>Menú Principal</div>
      <nav className="sidebar-nav">
        <a onClick={() => navigate("/home")}><img className='img' src={homeIcon} alt='Icono de home'/> Home</a>
        <a onClick={() => navigate("/add")}><img className='img' src={addPersonIcon} alt='Icono de add'/> Crear Persona</a>
        <a onClick={() => navigate("/modify")}><img className='img' src={modifyIcon} alt='Icono de modificar'/> Modificar Datos</a>
        <a onClick={() => navigate("/delete")}><img className='img' src={deletePersonIcon} alt='Icono de delete'/> Borrar Persona</a>
        <a onClick={() => navigate("/consulta")}><img className='img' src={queryIcon} alt='Icono de query'/> Consultar Datos</a>
        <a onClick={() => navigate("/consultallm")}><img className='img' src={keyboardIcon} alt='Icono de teclado'/> Consultar Datos Lenguaje Natural</a>
        <a onClick={() => navigate("/consultalog")}><img className='img' src={logIcon} alt='Icono de log'/> Consultar Log</a>
      </nav>
    </aside>
  );
};

export default Sidebar;

