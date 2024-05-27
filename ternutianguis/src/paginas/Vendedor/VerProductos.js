import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import './VerProductos.css';
import { Eliminar } from './Eliminar';
import Cookies from "js-cookie";

export function VerProductos() {

    const id = Cookies.get('usuario');
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();

    const [eliminarAbierto, setEliminarAbierto] = useState(false);

    const eliminarPopup = () => {
        setEliminarAbierto(!eliminarAbierto);
    };

    const  obtenerProductos = async () =>{
        try {
            const response = await fetch('/vendendor/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: id}),
            });
            const data = await response.json();
            setProductos(data.Productos);
        } catch (error) {
            console.error('Error al obtener productos:', error);
            return;
        }
    }


    const eliminarProducto = async (idProducto) => {
        try {
            const response = await fetch('/productos/darDeBajaProducto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: idProducto}),
            });
            const data = await response.json();
            console.log(data.mensaje);
            obtenerProductos();
        } catch (error) {
            console.error('Error al obtener productos:', error);
            return;
        }
    }



    useEffect(() => { 
        obtenerProductos();
    }, []);

    const setID = (id, name, age) => {
        // Función para manejar la actualización del producto.
        console.log(`Set ID: ${id}, Name: ${name}, Age: ${age}`);
    };

  

    const cadenaAImagen = (cadena) =>{

        const byteCharacters = atob(cadena);//Pasamos de base64 a binario
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) { //Convertimos a un array de enteros
            byteNumbers[i] = byteCharacters.charCodeAt(i); //Obtenemos el valor ASCII de cada caracter
        }
        const byteArray = new Uint8Array(byteNumbers); //Convertimos a un array de enteros sin signo
        return URL.createObjectURL(new Blob([byteArray], { type: 'image/jpeg' })); //Creamos la url de la imagen
    }


    return (
        <div className="ContenedorVerProductos" >
            <div className="ContenedorTituloVerProductos">
                <h2>Tus Productos </h2>
            </div>
        <div className="ContenedorTabla">
        <Link className="d-grid gap-2" to="/agregar">
                <Button className="btn-agregar" size="lg">
                    Agregar Producto
                </Button>
            </Link>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Categoria</th>
                        <th>Imagen</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Actualizar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nombre}</td>
                            <td>{item.descripcion}</td>
                            <td>{item.categoria}</td>
                            <td>
                                <img src={cadenaAImagen(item.imagen)} alt="Imagen" width="100" height="100"/>
                            </td>
                            <td>{item.precio}</td>
                            <td>{item.cantidad}</td>
                            <td>
                                <Link to={`/actualizar`}>
                                    <Button
                                        onClick={() => setID(item.id, item.descripcion, item.cantidad)}
                                        className="btn-actualizar"
                                    >
                                        Actualizar
                                    </Button>
                                </Link>
                            </td>
                            <td>
                                <Button
                                    onClick={async () => eliminarProducto(item.id)}
                                    className="btn-eliminar"
                                >
                                    Eliminar
                                </Button>
                                <Eliminar estaAbierto={eliminarAbierto} estaCerrado={eliminarPopup} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        </div>
    );
}