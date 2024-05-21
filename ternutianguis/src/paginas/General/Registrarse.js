import React, { Component } from 'react';
import './Registrarse.css';
import Container from 'react-bootstrap/Container';
import Cookies from 'js-cookie'; // Importamos Cookies de js-cookie
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

export class Registrarse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      usuario: '',
      telefono: '',
      email: '',
      rol: '',
      mensaje: ''
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleOptionChange = (event) => {
    this.setState({ rol: event.target.value });
  };
 
  handleSubmit = async event => {
    event.preventDefault();
    const { nombre, apellidoPaterno, apellidoMaterno, usuario, telefono, email, rol } = this.state;

    if (nombre && apellidoPaterno && apellidoMaterno && usuario && telefono && email && rol) {
      try {
        const response = await fetch('/loginVerificar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            usuario,
            telefono,
            correo: email,
            opcion: rol
          }),
        });

        const data = await response.json();

        if (data.usuario) {
          // Usuario valido, guardamos el token en las cookies
          Cookies.set('authToken', data.token, { path: '/' });
          window.location.href = '/inicio';
        } else {
          if (data.errorC === 'Contrasena incorrecta') {
            this.setState({ mensaje: 'La contraseña ingresada es incorrecta.' });
          } else {
            this.setState({ mensaje: 'Usuario no encontrado.' });
          }
        }
      } catch (error) {
        console.error('Error al registrarse:', error);
        this.setState({ mensaje: 'Error al iniciar sesión. Vuelva a intentarlo' });
      }
    } else {
      alert('Por favor complete todos los campos.');
    }
  }

  render() {
    return (
      <div className="auth-inner form-border">
        <form onSubmit={this.handleSubmit}>
          <h3>Registrarse</h3>
          {this.state.mensaje && <p>{this.state.mensaje}</p>}
          
          <div className="mb-3">
            <label>Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={this.state.nombre}
              onChange={this.handleInputChange}
              placeholder="Ingrese su nombre"
            />
          </div>

          <div className="mb-3">
            <label>Apellido Paterno</label>
            <input
              type="text"
              className="form-control"
              name="apellidoPaterno"
              value={this.state.apellidoPaterno}
              onChange={this.handleInputChange}
              placeholder="Ingrese su apellido paterno"
            />
          </div>

          <div className="mb-3">
            <label>Apellido Materno</label>
            <input
              type="text"
              className="form-control"
              name="apellidoMaterno"
              value={this.state.apellidoMaterno}
              onChange={this.handleInputChange}
              placeholder="Ingrese su apellido materno"
            />
          </div>

          <div className="mb-3">
            <label>Usuario</label>
            <input
              type="text"
              className="form-control"
              name="usuario"
              value={this.state.usuario}
              onChange={this.handleInputChange}
              placeholder="Ingrese su usuario"
            />
          </div>

          <div className="mb-3">
            <label>Teléfono</label>
            <input
              type="tel"
              className="form-control"
              name="telefono"
              value={this.state.telefono}
              onChange={this.handleInputChange}
              placeholder="Ingrese su teléfono"
            />
          </div>

          <div className="mb-3">
            <label>Correo</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              placeholder="Ingrese su correo"
            />
          </div>

          <div className="mb-3">
            <label>Rol</label>
            <select
              className="form-control"
              name="rol"
              value={this.state.rol}
              onChange={this.handleInputChange}
            >
              <option value="">Selecciona el rol</option>
              <option value="comprador">Comprador</option>
              <option value="vendedor">Vendedor</option>
            </select>
          </div>
          
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Registrarse
            </button>
          </div>
        </form>
      </div>
    );
  }
}