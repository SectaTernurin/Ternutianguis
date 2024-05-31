import React from 'react';
import { Navbar, Container, Nav, Image} from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './NavBarAux.css';
import { LinkContainer } from 'react-router-bootstrap';

export const NavBarAux = () => {
  const location = useLocation();
  const currentPage = location.pathname;

  const handleCloseSessionClick = () => {
    if (currentPage === '/inicioC') {
      window.location.href = `/cerrarSesion?from=${location.pathname}`;
    } else if (currentPage === '/verProductos'){
      window.location.href = `/cerrarSesion?from=${location.pathname}`;
    }
  };

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
            <Nav.Link onClick={handleCloseSessionClick}>Cerrar Sesión</Nav.Link>
          ) : currentPage === '/inicioC' ? (
            <Nav.Link onClick={handleCloseSessionClick}>Cerrar Sesión</Nav.Link>
          ) : ( 
            null
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

//export default NavBarAux;