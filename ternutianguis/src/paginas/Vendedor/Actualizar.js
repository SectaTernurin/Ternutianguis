import React, { useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './Actualizar.css';

export function Actualizar() {
	// Se utiliza usestate para modificar y obtener valores del jsx
	const [nombre, setnombre] = useState("");
	const [descripcion, setdescripcion] = useState("");
	const [precio, setprecio] = useState("");
	const [cantidad, setcantidad] = useState("");
	const [foto, setfoto] = useState("");
	const [categoria, setcategoria] = useState("");
	const [contacto, setcontacto] = useState("");
	const [id, setid] = useState("");
  
	//Usado para navegar con logica en js
	let history = useNavigate();
  
	const categorias = [
		"Postres",
		"Ropa",
		"Dulces",
		"Libros",
		"Maquillaje",
		"Juegos de mesa",
		"Accesorios",
		"Peluches",
		"Juguetes",
		"Papelería"
	  ];
	
	  const opcionesContacto = [
		"Facebook",
		"WhatsApp",
		"Instagram",
		"Correo electrónico",
		"Otro"
	  ];
	
	  const [producto, setProducto] = useState({
		nombre: '',
		descripcion: '',
		categoria: '',
		imagen: null,
		tipoContacto: '',
		contacto: '',
		precio: ''
	  });
	  const [errores, setErrores] = useState({
		nombre: false,
		descripcion: false,
		categoria: false,
		imagen: false,
		tipoContacto: false,
		contacto: false,
		precio: false
	  });
	
	  const handleChange = e => {
		const { name, value } = e.target;
		if (name === 'precio' && /^\$?\d*\.?\d{0,2}$/.test(value)) {
		  setProducto(prevState => ({
			...prevState,
			[name]: value
		  }));
		} else {
		  setProducto(prevState => ({
			...prevState,
			[name]: value
		  }));
		}
		setErrores(prevState => ({
		  ...prevState,
		  [name]: false
		}));
	  };

	const handleImagenChange = e => {
		const imagen = e.target.files[0];
		setProducto(prevState => ({
		  ...prevState,
		  imagen: imagen
		}));
		setErrores(prevState => ({
		  ...prevState,
		  imagen: false
		}));
	  };

	  const handleTipoContactoChange = e => {
		const { value } = e.target;
		setProducto(prevState => ({
		  ...prevState,
		  tipoContacto: value,
		  contacto: '' // Limpiar el campo de contacto cuando cambie el tipo de contacto
		}));
	  };

	// Funcion para manejar la actualizacion y generar los cambios
	const handelSubmit = (e) => {
	  // Preventing from reload
	  e.preventDefault();
	  if (nombre === "" || precio === "" || cantidad === "" || descripcion === "" || foto === "" || categoria === "") {
		alert("Favor de llenar todos los campos");
		return;
	  }
  
	  // Crear un objeto con los datos actualizados
	  const datosActualizados = {
		nombre,
		precio,
		cantidad,
		descripcion,
		foto,
		categoria,
	  };
  
	  // Enviar los datos al backend
	  fetch('/actualizar' + id, {
		method: 'PUT',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(datosActualizados)
	  })
	  .then(response => {
		if (!response.ok) {
		  throw new Error('Error al actualizar el producto');
		}
		return response.json();
	  })
	  .then(data => {
		console.log('Producto actualizado:', data);
		// Redireccionar a la página de inicio después de editar
		history('/inicio');
	  })
	  .catch(error => {
		console.error('Error:', error);
		alert('Error al actualizar el producto. Por favor, intenta de nuevo.');
	  });
	};
  
	return (
	<div className="ContenedorActualizar">
		<div className="ContenedorTitulo">
			<h2>Actualizar</h2>
		</div>
	  <div className="ContenedorForm">
		<div className="ColumnaFormIzq">
		<Form className="d-form" style={{ margin: "5rem" }}>
		  
		  <Form.Group className="mb-3" controlId="nombre">
		  <Form.Label>Nombre</Form.Label>
			<Form.Control 
			  value={nombre}
			  onChange={(e) => setnombre(e.target.value)}
			  type="text"
			  placeholder="Nombre"
			/>
		  </Form.Group>
  
		  <Form.Group className="mb-3" controlId="descripcion">
		  <Form.Label>Descripcion</Form.Label>
			<Form.Control
			  value={descripcion}
			  onChange={(e) => setdescripcion(e.target.value)}
			  as="textarea" rows={3}
			  placeholder="Descripcion"
			/>
		  </Form.Group>
		  
		  <Form.Group className="mb-3" controlId="categoria">
		  <Form.Label>Categoria</Form.Label>
		  <Form.Control as="select" name="categoria" 
		  value={producto.categoria} onChange={handleChange} isInvalid={errores.categoria} required>
			<option value="">Selecciona una categoría</option>
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria}>{categoria}</option>
            ))}
			</Form.Control>
		  </Form.Group>

		  <Form.Group className="mb-3" controlId="imagen">
          	<Form.Label>Imagen</Form.Label>
			<Form.Control
			  value={foto}
			  onChange={(e) => setfoto(e.target.value)}
			  //onChange={handleImagenChange}  
			  type="file"
			  accept=".png,.jpg"
			  //placeholder="Imagen"
			  name="imagen" 
			  isInvalid={errores.imagen} required
			/>
			<Form.Text muted>Solo se aceptan imágenes en formato .png y .jpg</Form.Text>
			<Form.Control.Feedback type="invalid">Recuerda subir una imagen</Form.Control.Feedback>
		  </Form.Group>

		  </Form>
		</div>
		<div className="ColumnaFormDer">
		<Form className="d-form" style={{ margin: "5rem" }}>

		<Form.Group className="mb-3" controlId="tipoContacto">
          <Form.Label>Tipo de Contacto</Form.Label>
          <Form.Control as="select" name="tipoContacto" 
		  value={producto.tipoContacto} onChange={handleTipoContactoChange} 
		  isInvalid={errores.tipoContacto} required>
            <option value="">Selecciona una opción</option>
            {opcionesContacto.map((opcion, index) => (
              <option key={index} value={opcion}>{opcion}</option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">Recuerda seleccionar una opción</Form.Control.Feedback>
        </Form.Group>
        {producto.tipoContacto && producto.tipoContacto !== "Otro" && (
          <Form.Group className="mb-3" controlId="contacto">
            <Form.Label>{producto.tipoContacto === "Correo electrónico" ? "Correo" : "Usuario"} *</Form.Label>
            <Form.Control type="text" name="contacto" value={producto.contacto} onChange={handleChange} isInvalid={errores.contacto} required />
            <Form.Control.Feedback type="invalid">Recuerda llenar este campo</Form.Control.Feedback>
          </Form.Group>
        )}
        {producto.tipoContacto === "Otro" && (
          <Form.Group className="mb-3" controlId="contacto">
            <Form.Label>Otro</Form.Label>
            <Form.Control type="text" name="contacto" value={producto.contacto} onChange={handleChange} isInvalid={errores.contacto} required />
            <Form.Control.Feedback type="invalid">Recuerda llenar este campo</Form.Control.Feedback>
          </Form.Group>
        )}

<Form.Group controlId="precio">
      <Form.Label>Precio *</Form.Label>
      <div className="precio-input">
        <span>$</span>
        <Form.Control
          type="number"
          name="precioP"
          value={producto.precioP}
          onChange={handleChange}
          isInvalid={!!errores.precio}
          required
          className="dolares-input"
          min="0"
        />
        <span>.</span>
        <Form.Control
          type="number"
          name="precioC"
          value={producto.precioC}
          onChange={handleChange}
          isInvalid={!!errores.precio}
          required
          className="centavos-input"
          min="0"
          max="99"
        />
      </div>
      <Form.Control.Feedback type="invalid">Ingresa un precio válido</Form.Control.Feedback>
    </Form.Group>

  
		  <Form.Group className="mb-3" controlId="cantidad">
		  <Form.Label>Cantidad</Form.Label>
			<Form.Control
			  value={cantidad}
			  onChange={(e) => setcantidad(e.target.value)}
			  type="number"
			  placeholder="Cantidad"
			  min="1"  // Asegura que solo se puedan ingresar números mayores o iguales a 1
        	  step="1"
			/>
		  </Form.Group>  
   
		  <Button
			onClick={(e) => handelSubmit(e)}
			variant="primary"
			type="submit"
			size="lg"
			className="Actualizarboton"
		  >
			Actualizar informacion
		  </Button>
		</Form>
		</div>
	  </div>
	  </div>
	);
  }  