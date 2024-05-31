import React, { Component, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './BuscarP.css';
import { useState } from 'react';
import Cookies from 'js-cookie';

/**
 * Componente eencargado de todo lo realciónado a la busqueda de productos 
 * @returns La visualización de la página de búsqueda de productos
 */
export const BuscarP = () => {
    const [buscar , setBuscar] = useState(''); // Estado para el input de búsqueda
    const [productos, setProductos] = useState([]); // Estado para almacenar los productos encontrados
    const [habilitarCategoria, setHabilitarCategoria] = useState(false); // Estado para habilitar la selección de categoría
    const [categoria, setCategoria] = useState(''); // Estado para almacenar la categoría seleccionada

    useEffect(() => {
        buscarProducto();
        }   , []);



    /***
    * Funcion con la cual obtenemos todos los productos de la base de datos
    *  @returns 
    */
    const buscarProducto = async () => {
        try {
            const response = await fetch('/comprador/obtenerProductos', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: 0}),
              });
            const data = await response.json();
            setProductos(data.Productos);
        }
        catch (error) {
            console.error('Error al buscar productos por categoría:', error);
            return;
        }
    }

    const setID = (id) => {
        // Función para manejar la actualización del producto.
        Cookies.set('idProducto', id);
    };
        
        


    /**
     * Asigna a buscar el estado que contiene el nombre del producto a buscar 
     * @param {*} e Nombre del producto a buscar 
     */
    const handleBuscar = (e) => {
        setBuscar(e.target.value);
    }

    /**
     * Asigna a categoria el estado que contiene la categoría seleccionada
     * @param {*} e categoria a buscar
     * @returns si e es vacío, no regresa nada
     */
    const handleCategoria = (e) => {
        if (e.target.value === ''){
            alert('Por favor, selecciona una categoría');
            return;
        }
        buscarCategoria(e.target.value);
    }

    /**
     * Función que se encarga de obtener la información de los productos 
     * que coinciden con la categoría seleccionada del servidor flask 
     * @param {*} categoria a buscar 
     * @returns En caso de error regresa nada
     */

    const buscarCategoria = async (categoria) => {
        setCategoria(categoria);
        try { 
            /**
             * Estructura estandar para hacer petición al servidor flask 
             */
            const response = await fetch('/comprador/buscarCategoria', { 
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({elem: categoria}),
              });
            const data = await response.json();
            setProductos(data.Productos);
        }
        catch (error) {
            console.error('Error al buscar productos por categoría:', error);
            return;
        }
    }

    /**
     * Se encarga de buscar productos en la base de datos
     * @param {*} e 
     * @returns Nada 
     */
    const handleBuscarProductos = async (e) => {
        e.preventDefault();
        if (buscar === '') { //Nos asegurmaos que e usuario haya ingresado algo 
            alert('Por favor, ingresa un producto a buscar');
            return;
        }
        /** En caso de que el usuario este buscando en una categoria espedifica
         * se llama a la función buscarProductoCategoria en vez del procedimiento siguietne 
         * esto debido a que se necesita hacer una consulta diferente en la base de datos
         */
        if (habilitarCategoria === true){
            buscarProductoCategoria();
            return;
        }

        try {

            const response = await fetch('/comprador/buscarProductos', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({elem: buscar}),//Solo buscamos por nombre producto
              });

            const data = await response.json();
            setProductos(data.Productos);
        }
        catch (error) {
            console.error('Error al buscar productos:', error);
            return;
        }
    }

    
    /**
     * Dada una categoria y un producto, 
     * se encarga de buscar los productos que concuerden con el nombre y la categoria
     * @returns 
     */
    const buscarProductoCategoria =async () => {
        try {
            const response = await fetch('/comprador/buscarProductoCategoria', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({elem: buscar, categoria: categoria}),
              });
            const data = await response.json();
            setProductos(data.Productos);
        }
        catch (error) {
            console.error('Error al buscar productos por categoría:', error);
            return;
        }
    }

    /**
     * Función auxiliar para mostrar en pantalla  los productos
     * @returns 
     */
    const mostrarProductos = () => {
        if (productos.length === 0){
            return <p>No se encontraron productos </p>
        }
        else {
            return mostrarProductosUDI();

        }
    }

    /**
     * Componente que se encarga de mostrar los productos en pantalla vérticalmente 
     * Cada una en su propoio contenedor
     * @returns 
     */
    const mostrarProductosUDI = () => {
        return productos.map((producto, index) => {
            return (
                <div key={index} className='Producto'>
                    <Container>
                    <hr style={{ margin: '20px 0' }} /> {/* Línea divisoria */}
                        <Row>
                            <Col className='Imagen'>
                            <img src={cadenaAImagen(producto.imagen)} alt="Imagen" width="100" height="100"/>
                            </Col>
                            <Col>
                            <Container className='Columna'>
                                <Row>
                                    <Col>
                                    <h3>{producto.nombre}</h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <p>Precio: ${producto.precio}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <Link to={`/producto`}><div style={{ marginTop: '-25px' }}><Button onClick={() => setID(producto.id)} variant="outline-secondary" size="sm">Ver producto</Button></div></Link>
                                    </Col>
                                </Row>
                            </Container>
                            </Col>
                        </Row>
                    </Container>
                    <hr style={{ margin: '20px 0' }} /> {/* Línea divisoria */}
                </div>
            )
        });
    }


    /**
     * Función que dada una cadena en base64, la convierte en una imagen
     * @param {*} cadena  cadena en base64
     * @returns url de la imágen 
     */
    const cadenaAImagen = (cadena) =>{

        const byteCharacters = atob(cadena);//Pasamos de base64 a binario
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) { //Convertimos a un array de enteros
            byteNumbers[i] = byteCharacters.charCodeAt(i); //Obtenemos el valor ASCII de cada caracter
        }
        const byteArray = new Uint8Array(byteNumbers); //Convertimos a un array de enteros sin signo
        return URL.createObjectURL(new Blob([byteArray], { type: 'image/jpeg' })); //Creamos la url de la imagen
    }


    /**
     * Habilitamos o deshabilitamos la sección de categoria para hacer más evidente 
     * que esta buscando por categoría
     * @param {*} e 
     */
    const ponerHabilitarCategoria = (e) => {
        if (habilitarCategoria === false) {
            setHabilitarCategoria(true);
        }
        else {
            setHabilitarCategoria(false);
        }
    }

    /**
     * Componente que se encarga de mostrar las posibles categorias a buscar
     * @returns 
     */
    const mostrarOpcionesCategoria = () => {
        if (habilitarCategoria === true) {
            return (
                <div>
                    <center>
                    <Form>
                    <Form.Group >
                        <Form.Control as="select" onChange={handleCategoria} >
                            <option value=''>Selecciona una categoría</option>
                            <option value='Postres'>Postres</option>
                            <option value='Ropa'>Ropa</option>
                            <option value='Dulces'>Dulces</option>
                            <option value='Libros'>Libros</option>
                            <option value='Maquillaje'>Maquillaje</option>
                            <option value='Juegos de mesa'>Juegos de mesa</option>
                            <option value='Accesorios'>Accesorios</option>
                            <option value='Peluches'>Peluches</option>
                            <option value='Juguetes'>Juguetes</option>
                            <option value='Papelería'>Papelería</option>
                        </Form.Control>
                    </Form.Group>
                    </Form>
                    </center>
                </div>
                  
                
            )
        }
    }


    return ( 
        <div className="Contenedor">
            <form onSubmit={handleBuscarProductos}>
                <div className='buscarProducto'>
                    <input type='text' placeholder='Buscar productos' onChange={handleBuscar}/>
                    <Button variant="outline-secondary" size="sm" type='submit' >Buscar</Button>{' '}
                </div> 
                <Container>
                    <Row>
                        <Col className='Etiqueta'>
                        <p>Buscar por categoría:</p>
                        </Col>
                        <Col className='Switch'>
                        <Form>
                            <Form.Check type="switch" id="categoria" onChange={ponerHabilitarCategoria}/>
                        </Form>
                        </Col>                    
                    </Row>
                    <Row>
                        <Col>
                            {mostrarOpcionesCategoria()}
                        </Col>
                    </Row>

                </Container>
            </form>


            <div className='Productos'>
                {mostrarProductos()}
            </div>

        </div>
    )
}