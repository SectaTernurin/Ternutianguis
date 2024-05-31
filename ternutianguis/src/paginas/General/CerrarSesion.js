import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import Image from 'react-bootstrap/Image';
import './CerrarSesion.css';

export const CerrarSesion = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Obtener la ubicación actual

  const cerrarSesion = () => {
    console.log('Cerrando sesión');
    Cookies.remove('usuario');
    navigate('/'); // Redirige a la página /home después de cerrar sesión
  };

  const handleCancel = () => {
    const from = new URLSearchParams(location.search).get('from');
    if (from) {
      navigate(from);
    } else {
      navigate('/'); // Redirige a una ruta predeterminada si no hay ruta de origen
    }
  };

  return (
    <div className="logout-container">
      <div className="left-section">
        <div className="image-container">
          <h1 className="title">Ternutianguis</h1>
          <div className="image">
            <Image src={require('../imagenes/ternurin.png')} alt="Ternutianguis" />
          </div>
        </div>
      </div>
      <div className="right-section">
        <h1>¿Está seguro de cerrar sesión?</h1>
        <div className="buttons">
          <button className="accept-button" onClick={cerrarSesion}>Aceptar</button>
          <button className="cancel-button" onClick={handleCancel}>Cancelar</button>
          {/*<Link to="/inicio" className="cancel-button">Cancelar</Link>*/}
        </div>
      </div>
    </div>
  );
};