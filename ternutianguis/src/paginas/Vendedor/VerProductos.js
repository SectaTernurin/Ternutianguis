import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import './VerProductos.css';

export function VerProductos() {
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Aquí se agregan los cambios de los datos
        const data = [
            { id: 1, nombre: 'a', descripcion: 'Producto 1', categoria: 'Categoría 1', 
             imagen: 'foto1.jpg', contacto: 'contacto1@example.com', precio: 10, cantidad: 100 },
            { id: 2, nombre: 'b', descripcion: 'Producto 2', categoria: 'Categoría 2',
            imagen: 'foto2.jpg', contacto: 'contacto2@example.com', precio: 20, cantidad: 200 },
            // Agrega más productos según sea necesario
        ];
        setProductos(data);
    }, []);

    const setID = (id, name, age) => {
        // Función para manejar la actualización del producto.
        console.log(`Set ID: ${id}, Name: ${name}, Age: ${age}`);
    };

    const deleted = (id) => {
        // Función para manejar la eliminación del producto.
        setProductos(productos.filter(product => product.id !== id));
        console.log(`Deleted product with ID: ${id}`);
    };

    return (
        <div className="ContenedorVerProductos">
            <div className="ContenedorTituloVerProductos">
                <h2>Tus Productos</h2>
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
                        <th>Contacto</th>
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
                            <td>{item.imagen}</td>
                            <td>{item.contacto}</td>
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
                                    onClick={() => deleted(item.id)}
                                    className="btn-eliminar"
                                >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        </div>
    );
}