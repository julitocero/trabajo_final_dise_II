import React from "react";
import '../styles/option.css'

const option = ({color, texto, icono}) => {
    return(
    <div className="option-body" style={{"--option-color": color ? "#62A07B" : "#4F8B89", "--text-color": color ? "black" : "white", "--option-hover-color": color ? "#7CC897" : "#66A6A4"}}>
        <img src={icono} alt="Icono de add" style={{"--icon-color": color ? "invert()" : "0"}}/>
        <p>{texto}</p>
    </div>
    );
}

export default option;