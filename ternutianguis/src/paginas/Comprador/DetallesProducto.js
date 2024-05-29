import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';


    const obtenerProductoPorId = (id) => {
    const productos = [
        // Agregar los productos
    ];
    return productos.find(producto => producto.id === parseInt(id));
    };

    /**
     * Función que dada una cadena en base64, la convierte en una imagen
     * @param {*} cadena  cadena en base64
     * @returns url de la imágen 
     */
    const cadenaAImagen = (cadena) =>{

        const byteCharacters = atob(cadena);//Pasamos de base64 a binario
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) { //Convertimos a un array de enteros
            byteNumbers[i] = byteCharacters.charCodeAt(i); //Obtenemos el valor ASCII de cada caracter
        }
        const byteArray = new Uint8Array(byteNumbers); //Convertimos a un array de enteros sin signo
        return URL.createObjectURL(new Blob([byteArray], { type: 'image/jpeg' })); //Creamos la url de la imagen
    }


export const DetallesProducto = () => {
  const { id } = useParams();
  const producto = obtenerProductoPorId(id);

  if (!producto) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <Container>
      <Row>
        <Col className='Imagen'>
          <Image width="50%" height="auto" src={cadenaAImagen(producto.foto)} rounded />
        </Col>
        <Col>
          <h3>{producto.nombre}</h3>
          <p>Precio: ${producto.precio}</p>
          {/* Aqui se agrega más sobre los productos */}
        </Col>
      </Row>
    </Container>
  );
};