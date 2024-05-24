import React from 'react';
import { Button } from "react-bootstrap";
import './Eliminar.css';

export const Eliminar = ({ estaAbierto, estaCerrado }) => {
  if (!estaAbierto) return null;

  return (
    <div className="EliminarPopUp">
      <div className="EliminarContenido">
        <button className="cerrar" onClick={estaCerrado}>X</button>
        <div className='contenido'>
            <h4>¿Esta seguro de eliminar el producto?</h4>
            <Button className="btnEliminar">
                Eliminar
            </Button>
            <Button className="btnCancelar">
                Cancelar
            </Button>
        </div>
      </div>
    </div>
  );
};