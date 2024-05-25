import React from 'react';
import { Button } from "react-bootstrap";
import './Eliminar.css';

export const Eliminar = ({ estaAbierto, estaCerrado, idProducto, actualizarProductos }) => {
  if (!estaAbierto) return null;

  // Método para eliminar un producto
  const eliminarProducto = async () => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        return; // Detener si el usuario no confirma
    }

    try {
        const response = await fetch(`/eliminarProducto/${idProducto}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (data.success) {
            alert('Producto eliminado correctamente');
            // Llama a la función para actualizar la lista de productos
            actualizarProductos(idProducto);
        } else {
            alert(data.message); // Mostrar mensaje de error del servidor
        }
    } catch (error) {
        alert('Error al comunicarse con el servidor');
    }
  }

  return (
    <div className="EliminarPopUp">
      <div className="EliminarContenido">
        <button className="cerrar" onClick={estaCerrado}>X</button>
        <div className='contenido'>
            <h4>¿Esta seguro de eliminar el producto?</h4>
            <Button className="btnEliminar" onClick={eliminarProducto}>
                Eliminar
            </Button>
            <Button className="btnCancelar" onClick={estaCerrado}>
                Cancelar
            </Button>
        </div>
      </div>
    </div>
  );
};