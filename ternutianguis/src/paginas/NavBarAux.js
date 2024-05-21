import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export const NavBarAux = () => {
  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Nav className="me-auto">
          {currentPage === '/' ? (
            <>
              <Nav.Link href="/acceder">Ingresar</Nav.Link>
              <Nav.Link href="/registrarse">Registrarse</Nav.Link>
            </>
          ) : currentPage === '/acceder' || currentPage === '/registrarse' 
          || currentPage === '/verProductos' || currentPage === '/agregar'? (
            <Nav.Link href="/">Regresar</Nav.Link>
          ) : currentPage === '/inicio' ? (
            <>
              <Nav.Link href="/agregar">Agrega Producto</Nav.Link>
              <Nav.Link href="/verProductos">Consultar tus productos</Nav.Link>
              <Nav.Link href="/cerrarSesion">Cerrar Sesión</Nav.Link>
            </>
          ) : currentPage === '/inicioC' ? (
            <>
              <Nav.Link href="/cerrarSesion">Cerrar Sesión</Nav.Link>
            </>
          ) : ( 
            null
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

//export default NavBarAux;