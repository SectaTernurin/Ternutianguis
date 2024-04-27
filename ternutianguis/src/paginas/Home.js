import './Home.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
 
 
 export const Home = () => {
    return (
        <div>
            <div className="Contenedor">
                <h1>Ternutianguis</h1>
                <h2>Bienvenido a Ternutianguis!</h2>
            </div>
            <div className="contenido-izquierda">
                <Image src={require('./imagenes/ternurin.jpeg')} width="20%" />
            </div>
            <div className="contenido-derecha">
                <h5>Ternutianguis es un sistema web que permite hacer compras y ventas en 
                    línea de distintos productos como: postres, dulces, libros, maquillaje,
                    juegos de mesa, etc</h5>
            </div>
        </div>
    )
 } 