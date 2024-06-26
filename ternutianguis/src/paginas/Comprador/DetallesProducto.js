import React, { useEffect } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import './DetallesProducto.css';
import Cookies from 'js-cookie';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';



export const DetallesProducto = () => {

  const [producto, setProducto] = useState({});
  const [agotado, setAgotado] = useState(false);
  const [comentarios, setComentarios] = useState([]);
  const navigate = useNavigate();


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
      Cookies.set('nombreProducto', data.nombre);
      if (data.cantidad === 0) {
        setAgotado(true);
      }
		} catch (error) {
			console.error('Error al obtener productos:', error);
			return;
		}
	}



  useEffect(() => { 
    obtenerDatosProductos();
    obtenerComentarios();
  }, []);
  
  /**
   * Función que dada una cadena en base64, la convierte en una imagen
   * @param {*} cadena  cadena en base64
   *   @returns url de la imágen 
  */
 const cadenaAImagen = (cadena) =>{
  let url = 'data:image/png;base64,' + cadena;
  return url;
 }

  const apartarProducto = async () => {
    try {
      const idProducto = Cookies.get('idProducto');
      const idComprador = Cookies.get('usuario');
      const response = await fetch('/comprador/comprarProducto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({idProducto: idProducto, idComprador: idComprador}),
      });
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        alert('Producto apartado con éxito! Se le enviara a su correo la información del vendendor.');
      }
    } catch (error) {
      console.error('Error al apartar producto:', error);
      return;
    }
  }

  const handleComprar = () => {
    if (window.confirm('¿Está seguro de que desea apartar este producto?')) {
      apartarProducto();
      window.location.reload();
    }
  };

  const manejarProductoAgotado = () => {
    if (agotado) {
      return (
        <div className="producto-agotado">
          <h3>Producto agotado</h3>
        </div>
      );
    }
    else {
      return (
        <Button className="btn-comprar" variant="primary" onClick={handleComprar} >Apartar</Button>
      );
    }

  };

  const obtenerComentarios = async (e) => {
    try {
        const response = await fetch('/comentarios/obtenerComentarios', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: Cookies.get('idProducto')}),
          });

        const data = await response.json();
        console.log(data.Comentarios);
        setComentarios(data.Comentarios);
    }
    catch (error) {
        console.error('Error al obtener comentarios:', error);
        return;
    }
  }

  const mostrarComentarios = () => {
    if (comentarios.length === 0){
      return <p>Aún no hay comentarios</p>
    }
    else {
      return comentarios.map((comentario, index) => {
        return (
        <div key={index}>
          <Container>
            <Row>
              <Col>
              {mostrarEstrellas(comentario.calificacion)}
              </Col>
            </Row>
            <Row>
              <Col>
              <p>{comentario.comentario}</p>
              </Col>
            </Row>
            <Row>
              <Col></Col>
              <Col>
              <p>-{comentario.usuario}-</p>
              </Col>
              <Col></Col>
            </Row>
          </Container>
          </div>)
        })
      }
    }

  const mostrarEstrellas = (calificacion) => {
    return (
      <div>
      {[...Array(calificacion)].map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon= {solidStar} 
        />
      ))}
    </div>
    )
  }


  return (
    <Container className="detalles-producto">
    <div className='Contenedor'>
        <Row>
          <Col className='Imagen'>
          <Image src={cadenaAImagen(producto.imagen)} alt={producto.nombre} width="500" height="auto" rounded />
          </Col>
          <Col className='Detalles'>
            <h3>{producto.nombre}</h3>
            <p>Precio: ${producto.precio}</p>
            <p>{producto.descripcion}</p>
            {manejarProductoAgotado()}
            <Link to={`/review`}>
              <Button className="btn-comprar" variant="primary">Agregar una reseña</Button>
            </Link>
          </Col>
        </Row>
        </div>

        <div className='ContenedorComentarios'>
          <Row>
            <Col>
              <h3>Comentarios</h3>
              <div className='comentario'>
                {mostrarComentarios()}
              </div>
            </Col>
          </Row>
        </div>
      </Container>
  );
};

export default DetallesProducto;