import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import './AltaProducto.css';

export const AltaProducto = () => {
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
    precioP: '',
    precioC: '',
    cantidad: ''
  });
  const [errores, setErrores] = useState({
    nombre: false,
    descripcion: false,
    categoria: false,
    imagen: false,
    tipoContacto: false,
    contacto: false,
    precio: false,
    cantidad: false
  });

  const handleChange = e => {
    /*const { name, value } = e.target;
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
    }));*/
    const { name, value } = e.target;
    let erroresActualizados = { ...errores };

    if (name === 'precioDolares') {
      const precioDolares = value.replace(/[^0-9]/g, '');
      setProducto((prevProducto) => ({ ...prevProducto, precioDolares }));
    } else if (name === 'precioCentavos') {
      const precioCentavos = value.replace(/[^0-9]/g, '').slice(0, 2);
      setProducto((prevProducto) => ({ ...prevProducto, precioCentavos }));
    } else {
      setProducto((prevProducto) => ({ ...prevProducto, [name]: value }));
    }

    // Validar si ambos campos están vacíos
    if (producto.precioDolares === '' && producto.precioCentavos === '') {
      erroresActualizados.precio = 'El precio no puede estar vacío';
    } else {
      erroresActualizados.precio = '';
    }

    setErrores(erroresActualizados);
  };

  const handleTipoContactoChange = e => {
    const { value } = e.target;
    setProducto(prevState => ({
      ...prevState,
      tipoContacto: value,
      contacto: '' // Limpiar el campo de contacto cuando cambie el tipo de contacto
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

  const handleSubmit = async e => {
    e.preventDefault();
    let hayErrores = false;
    const nuevosErrores = { ...errores };
    for (const campo in producto) {
      if (!producto[campo]) {
        nuevosErrores[campo] = true;
        hayErrores = true;
      }
    }
    if (hayErrores) {
      setErrores(nuevosErrores);
      return;
    }
    try {
      const formData = new FormData();
      formData.append('nombre', producto.nombre);
      formData.append('descripcion', producto.descripcion);
      formData.append('categoria', producto.categoria);
      formData.append('imagen', producto.imagen);
      formData.append('tipoContacto', producto.tipoContacto);
      formData.append('contacto', producto.contacto);
      formData.append('precio', producto.precio);
      
      await fetch('/api/altaProducto', {
        method: 'POST',
        body: formData
      });
      setProducto({
        nombre: '',
        descripcion: '',
        categoria: '',
        imagen: null,
        tipoContacto: '',
        contacto: '',
        precio: ''
      });
      window.location.href = '/inicio';
    } catch (error) {
      console.error('Error al dar de alta el producto:', error);
    }
  };

  const handleCancel = () => {
    window.location.href = '/inicio';
  };

  return (
    <div className="ContenedorAltaProducto">
      <div className="ContenedorTituloAP">
        <h2>Alta de Producto</h2>
      </div>
      <div className="product-image-container">
        <Image src={require('../imagenes/ternurin.png')} alt="Ternutiaguis" className="product-image" />
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="form-group-act" controlId="nombre">
          <Form.Label>Nombre *</Form.Label>
          <Form.Control type="text" name="nombre" value={producto.nombre} onChange={handleChange} isInvalid={errores.nombre} required />
          <Form.Control.Feedback type="invalid">Recuerda llenar este campo</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-group-act" controlId="descripcion">
          <Form.Label>Descripción *</Form.Label>
          <Form.Control as="textarea" rows={3} name="descripcion" value={producto.descripcion} onChange={handleChange} isInvalid={errores.descripcion} required />
          <Form.Control.Feedback type="invalid">Recuerda llenar este campo</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-group-act" controlId="categoria">
          <Form.Label>Categoría *</Form.Label>
          <Form.Control as="select" name="categoria" value={producto.categoria} onChange={handleChange} isInvalid={errores.categoria} required>
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria}>{categoria}</option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">Recuerda seleccionar una categoría</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-group-act" controlId="imagen">
          <Form.Label>Imagen *</Form.Label>
          <Form.Control type="file" accept=".png,.jpg" name="imagen" onChange={handleImagenChange} isInvalid={errores.imagen} required />
          <Form.Text muted>Solo se aceptan imágenes en formato .png y .jpg</Form.Text>
          <Form.Control.Feedback type="invalid">Recuerda subir una imagen</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-group-act" controlId="tipoContacto">
          <Form.Label>Tipo de Contacto *</Form.Label>
          <Form.Control as="select" name="tipoContacto" value={producto.tipoContacto} onChange={handleTipoContactoChange} isInvalid={errores.tipoContacto} required>
            <option value="">Selecciona una opción</option>
            {opcionesContacto.map((opcion, index) => (
              <option key={index} value={opcion}>{opcion}</option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">Recuerda seleccionar una opción</Form.Control.Feedback>
        </Form.Group>
        {producto.tipoContacto && producto.tipoContacto !== "Otro" && (
          <Form.Group controlId="contacto">
            <Form.Label>{producto.tipoContacto === "Correo electrónico" ? "Correo" : "Usuario"} *</Form.Label>
            <Form.Control type="text" name="contacto" value={producto.contacto} onChange={handleChange} isInvalid={errores.contacto} required />
            <Form.Control.Feedback type="invalid">Recuerda llenar este campo</Form.Control.Feedback>
          </Form.Group>
        )}
        {producto.tipoContacto === "Otro" && (
          <Form.Group className="form-group-act" controlId="contacto">
            <Form.Label>Otro *</Form.Label>
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
        <Form.Label>Cantidad *</Form.Label>
        <Form.Control type="number" name="cantidad" value={producto.cantidad} onChange={handleChange} isInvalid={errores.cantidad} required
        min="1"  // Asegura que solo se puedan ingresar números mayores o iguales a 1
        step="1"/>
        <Form.Control.Feedback type="invalid">Ingresa una cantidad válida</Form.Control.Feedback>
        </Form.Group>  
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Guardar Producto
          </Button>
        </div>
      </Form>
    </div>
  );
};