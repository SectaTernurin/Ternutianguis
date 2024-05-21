import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Actualizar() {
	// Se utiliza usestate para modificar y obtener valores del jsx
	const [nombre, setnombre] = useState("");
	const [precio, setprecio] = useState("");
	const [cantidad, setcantidad] = useState("");
	const [descripcion, setdescripcion] = useState("");
	const [foto, setfoto] = useState("");
	const [categoria, setcategoria] = useState("");
	const [id, setid] = useState("");
  
	//Usado para navegar con logica en js
	let history = useNavigate();
  
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
	  <div>
		<Form
		  className="d-grid gap-2"
		  style={{ margin: "5rem" }}
		>
		  <Form.Group
			className="mb-3"
			controlId="formBasicEmail"
		  >
			<Form.Control
			  value={nombre}
			  onChange={(e) => setnombre(e.target.value)}
			  type="text"
			  placeholder="Nombre"
			/>
		  </Form.Group>
  
		  <Form.Group
			className="mb-3"
			controlId="formBasicPrecio"
		  >
			<Form.Control
			  value={precio}
			  onChange={(e) => setprecio(e.target.value)}
			  type="number"
			  placeholder="Precio"
			/>
		  </Form.Group>
  
		  <Form.Group
			className="mb-3"
			controlId="formBasicCantidad"
		  >
			<Form.Control
			  value={cantidad}
			  onChange={(e) => setcantidad(e.target.value)}
			  type="number"
			  placeholder="Cantidad"
			/>
		  </Form.Group>
  
		  <Form.Group
			className="mb-3"
			controlId="formBasicDescripcion"
		  >
			<Form.Control
			  value={descripcion}
			  onChange={(e) => setdescripcion(e.target.value)}
			  type="text"
			  placeholder="Descripcion"
			/>
		  </Form.Group>
  
		  <Form.Group
			className="mb-3"
			controlId="formBasicFoto"
		  >
			<Form.Control
			  value={foto}
			  onChange={(e) => setfoto(e.target.value)}
			  type="text"
			  placeholder="Foto"
			/>
		  </Form.Group>
  
		  <Form.Group
			className="mb-3"
			controlId="formBasicCategoria"
		  >
			<Form.Control
			  value={categoria}
			  onChange={(e) => setcategoria(e.target.value)}
			  type="text"
			  placeholder="Categoria"
			/>
		  </Form.Group>
  
		  {/* Hadinling an onclick event 
			running an edit logic */}
		  <Button
			onClick={(e) => handelSubmit(e)}
			variant="primary"
			type="submit"
			size="lg"
		  >
			Actualizar informacion
		  </Button>
  
		  {/* Redirecting to main page after editing */}
		  <Link className="d-grid gap-2" to="/inicio">
			<Button variant="warning" size="lg">
			  Inicio
			</Button>
		  </Link>
		</Form>
	  </div>
	);
  }  