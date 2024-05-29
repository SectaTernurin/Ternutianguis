import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './paginas/Home';
//import { Inicio } from './paginas/Inicio';
import { DetallesProducto } from './paginas/Comprador/DetallesProducto';
import { NavBarAux } from './paginas/NavBarAux';
import { InicioComprador } from './paginas/InicioComprador';
import { Acceder } from './paginas/General/Acceder';
import { CerrarSesion } from './paginas/General/CerrarSesion';
import { Registrarse } from './paginas/General/Registrarse';
import { BuscarP } from './paginas/Comprador/BuscarP';
import { ReviewProducto } from './paginas/Comprador/ReviewProducto';
import { AltaProducto } from './paginas/Vendedor/AltaProducto';
import { Actualizar } from './paginas/Vendedor/Actualizar';
import { Prototipo } from './paginas/Vendedor/Prototipo';
import { VendedorProductos } from './paginas/Vendedor/VendedorProductos';
import { VerProductos } from './paginas/Vendedor/VerProductos';
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
        <NavBarAux />

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/acceder" element={<Acceder />} />
            <Route path="/registrarse" element={<Registrarse />} />
            <Route path="/inicioC" element={<InicioComprador />} />
            <Route path="/buscarP" element={<BuscarP />} />
            <Route path="/review" element={<ReviewProducto />} />
            <Route path="/producto" element={<DetallesProducto />} />
            {/*<Route path="/producto/:id" component={DetallesProducto} />*/}
            <Route path="/actualizar" element={<Actualizar />} />
            <Route path="/agregar" element={<AltaProducto />} />
            <Route path="/verProductos" element={<VerProductos />} />
            <Route path="/prototipo" element={<Prototipo />} />
            <Route path="/eliminar" element={<VendedorProductos />} />
            <Route path="/cerrarSesion" element={<CerrarSesion />} /> 
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
