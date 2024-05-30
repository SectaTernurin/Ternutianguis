import React, { useEffect } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import './DetallesProducto.css';
import Cookies from 'js-cookie';
import { useState } from 'react';





export const DetallesProducto = () => {

  const [producto, setProducto] = useState({});


	const obtenerDatosProductos = async () => {
		try {
			const idProducto = Cookies.get('idProducto');
			const response = await fetch('/productos/obtenerProducto', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({id: idProducto}),
			});
			const data = await response.json();
      setProducto(data);
		} catch (error) {
			console.error('Error al obtener productos:', error);
			return;
		}
	}

  useEffect(() => { obtenerDatosProductos(); }, []);
  
  /**
   * Función que dada una cadena en base64, la convierte en una imagen
   * @param {*} cadena  cadena en base64
   *   @returns url de la imágen 
  */
 const cadenaAImagen = (cadena) =>{
  let url = 'data:image/png;base64,' + cadena;
  return url;
 }



  const handleComprar = () => {
    if (window.confirm('¿Está seguro de que desea comprar este producto?')) {
      alert('Producto comprado con éxito! Se le enviara a su correo la información del vendendor.');
    }
  };


  return (
    <Container className="detalles-producto">
      <Row>
        <Col className='Imagen'>
        <Image src={cadenaAImagen(producto.imagen)} alt={producto.nombre} width="500" height="auto" rounded />
        </Col>
        <Col className='Detalles'>
          <h3>{producto.nombre}</h3>
          <p>Precio: ${producto.precio}</p>
          <p>{producto.descripcion}</p>
          <Button className="btn-comprar" variant="primary" onClick={handleComprar}>Comprar</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DetallesProducto;