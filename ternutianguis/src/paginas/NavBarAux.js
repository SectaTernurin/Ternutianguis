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
          ) : currentPage === '/actualizar' || currentPage === '/agregar'? (
            <Nav.Link href="/verProductos">Regresar</Nav.Link>
          ) : currentPage === '/review' || currentPage === '/producto'? (
            <Nav.Link href="/inicioC">Regresar</Nav.Link>
          ) : currentPage === '/verProductos' ? (
            <Nav className="custom-nav">
              <Nav.Link href="/cerrarSesion">Cerrar Sesión</Nav.Link>
            </Nav>
          ) : currentPage === '/inicioC' ? (
            <Nav className="custom-nav">
              <Nav.Link href="/cerrarSesion">Cerrar Sesión</Nav.Link>
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