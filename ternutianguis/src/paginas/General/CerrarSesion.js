import React from 'react';
import { Link } from 'react-router-dom';
import './CerrarSesion.css';
import Image from 'react-bootstrap/Image';

export const CerrarSesion = () => {
  return (
    <div className="logout-container">
      <div className="left-section">
        <div className="image-container">
          <h1 className="title">Ternutiaguis</h1>
          <Image src={require('../imagenes/ternurin.jpeg')} alt="Ternutiaguis" />
        </div>
      </div>
      <div className="right-section">
        <h1>¿Seguro que quieres cerrar sesión?</h1>
        <div className="buttons">
          <Link to="/" className="accept-button">Aceptar</Link>
          <Link to="/inicio" className="cancel-button">Cancelar</Link>
        </div>
      </div>
    </div>
  );
};

//export default Logout;