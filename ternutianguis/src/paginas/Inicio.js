import './Home.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

 export const Inicio = () => {
    return (
        <div className="ContenedorInicio">
            <h1>Página de inicio</h1>
            <h2>Bienvenidx a Ternutianguis!</h2>
        </div>
    )
 } 