import React from 'react';
import { Navbar, Container, Nav, Image} from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './NavBarAux.css';

export const NavBarAux = () => {
  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Nav className="me-auto">
          {currentPage === '/' ? (
            <>
              <Nav className="custom-nav">
                <Nav.Link href="/acceder">Ingresar</Nav.Link>
                <Nav.Link href="/registrarse">Registrarse</Nav.Link>
              </Nav>
            </>
          ) : currentPage === '/acceder' || currentPage === '/registrarse'? (
            <Nav.Link href="/">Regresar</Nav.Link>
          ) : currentPage === '/verProductos' || currentPage === '/agregar'? (
            <Nav.Link href="/inicio">Regresar</Nav.Link>
          ) : currentPage === '/review'? (
            <Nav.Link href="/inicioC">Regresar</Nav.Link>
          ) : currentPage === '/inicio' ? (
            <Nav className="custom-nav">
              <Nav.Link href="/agregar">Agrega Producto</Nav.Link>
              <Nav.Link href="/verProductos">Consultar tus productos</Nav.Link>
              <Nav.Link href="/cerrarSesion">Cerrar Sesión</Nav.Link>
            </Nav>
          ) : currentPage === '/inicioC' ? (
            <Nav className="custom-nav">
              <Nav.Link href="/review">Review</Nav.Link>
              <Nav.Link href="/cerrarSesion">Cerrar Sesión</Nav.Link>
            </Nav>
          ) : currentPage === '/actualizar' ? (
            <Nav className="custom-nav">
              <Nav.Link href="/verProductos">Regresar</Nav.Link>
              <Nav.Link href="/inicio">Inicio</Nav.Link>
            </Nav>
          ) : ( 
            null
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

//export default NavBarAux;