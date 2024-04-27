import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './paginas/Login'; // Asegúrate de importar el componente por defecto
import { Home } from './paginas/Home';
import { Inicio } from './paginas/Inicio';
import { Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie'; // Importamos Cookies de js-cookie

function App() {
  // Función para establecer una cookie del idioma preferido del usuario
  const setLanguageCookie = (language) => {
    Cookies.set('language', language, { expires: 7 }); // Cookie expira en 7 días
  }

  // Función para obtener la cookie del idioma
  const getLanguageCookie = () => {
    return Cookies.get('language'); // Obtiene la cookie 'language'
  }

  const currentPage = window.location.pathname;

  return (
    <div className="App">
      <Router>
        <Navbar bg="light" variant="light">
          <Container>
            <Nav className="me-auto">
              {currentPage === '/' ? (
                <Nav.Link href="/login">Log in</Nav.Link>
              ) : currentPage === '/login' ? (
                <Nav.Link href="/">Regresar</Nav.Link>
              ) : (
                <Nav.Link href="/">Log out</Nav.Link>
              )}
            </Nav>
          </Container>
        </Navbar>

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
