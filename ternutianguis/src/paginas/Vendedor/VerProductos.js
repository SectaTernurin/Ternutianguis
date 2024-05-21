import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

export function VerProductos() {
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Aquí deberías cargar los datos de los productos, por ejemplo, desde una API.
        // Simularemos con datos estáticos para este ejemplo.
        const data = [
            { id: 1, descripcion: 'Producto 1', foto: 'foto1.jpg', categoria: 'Categoría 1', contacto: 'contacto1@example.com', precio: 10, cantidad: 100 },
            { id: 2, descripcion: 'Producto 2', foto: 'foto2.jpg', categoria: 'Categoría 2', contacto: 'contacto2@example.com', precio: 20, cantidad: 200 },
            // Agrega más productos según sea necesario
        ];
        setProductos(data);
    }, []);

    const setID = (id, name, age) => {
        // Función para manejar la actualización del producto.
        // Aquí podrías almacenar el ID y otros datos en algún estado global o en el almacenamiento local.
        console.log(`Set ID: ${id}, Name: ${name}, Age: ${age}`);
    };

    const deleted = (id) => {
        // Función para manejar la eliminación del producto.
        // Aquí podrías hacer una llamada a una API para eliminar el producto.
        setProductos(productos.filter(product => product.id !== id));
        console.log(`Deleted product with ID: ${id}`);
    };

    return (
        <div style={{ margin: "5rem" }}>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Descripcion</th>
                        <th>Foto</th>
                        <th>Categoria</th>
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
                            <td>{item.descripcion}</td>
                            <td>{item.foto}</td>
                            <td>{item.categoria}</td>
                            <td>{item.contacto}</td>
                            <td>{item.precio}</td>
                            <td>{item.cantidad}</td>
                            <td>
                                <Link to={`/actualizar`}>
                                    <Button
                                        onClick={() => setID(item.id, item.descripcion, item.cantidad)}
                                        variant="info"
                                    >
                                        Actualizar
                                    </Button>
                                </Link>
                            </td>
                            <td>
                                <Button
                                    onClick={() => deleted(item.id)}
                                    variant="danger"
                                >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Link className="d-grid gap-2" to="/agregar">
                <Button variant="warning" size="lg">
                    Agregar Producto
                </Button>
            </Link>
        </div>
    );
}