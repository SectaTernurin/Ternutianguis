import React, { useEffect } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import './DetallesProducto.css';
import Cookies from 'js-cookie';




export const DetallesProducto = () => {
  const producto = {
    nombre: 'Ternurin',
    foto: '../imagenes/ternurin.jpeg',
    precio: '250.00',
    descripcion: 'Aqui va la descripcion'
  };

  const handleComprar = () => {
    if (window.confirm('¿Está seguro de que desea comprar este producto?')) {
      alert('Producto comprado con éxito!');
    }
  };

  useEffect(() => {
    console.log(Cookies.get('idProducto'));
    console.log(Cookies.get('usuario'));
  }, []);

  return (
    <Container className="detalles-producto">
      <Row>
        <Col className='Imagen'>
          <Image width="100%" height="auto" src={producto.foto} rounded />
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