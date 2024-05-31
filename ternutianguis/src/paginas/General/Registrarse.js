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
    const {email, usuario, telefono, rol, nombre, apellidoPaterno, apellidoMaterno} = this.state;
    console.log(email, usuario, telefono, rol, nombre, apellidoPaterno, apellidoMaterno);
  
    if (email && usuario && telefono && rol && nombre && apellidoPaterno) {
      try {
        const response = await fetch('/general/registrar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            correo: email, 
            nombreUsuario: usuario, 
            telefono: telefono, 
            opcion: rol,
            nombre: nombre,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
          }),
        });
  
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
  
        if (data.registro === 'Registro realizado exitosamente.') {
          alert('Se ha completado tu registro, tu contraseña fue enviada a tu correo.');
          window.location.href = '/acceder';
        } else {
          this.setState({ mensaje: 'No se realizó el registro, el correo ya está registrado' });
        }
      } catch (error) {
        console.error('Error al registrar:', error);
        this.setState({ mensaje: 'Error al registrar. Por favor, inténtelo de nuevo más tarde.' });
      }
      
    } else {
      alert('Por favor complete todos los campos.');
    }
  }

  componentDidMount() {
    const leaves = document.querySelectorAll('.leaf');

    leaves.forEach((leaf) => {
      const randomLeafClass = `leaf${Math.floor(Math.random() * 3) + 1}`; // Elige aleatoriamente una clase de hoja entre leaf1, leaf2 y leaf3
      leaf.classList.add(randomLeafClass);
      const animationDuration = Math.random() * 10 + 5; // Duración de la animación entre 5 y 15 segundos
      const startPosition = Math.random() * window.innerWidth; // Posición inicial aleatoria en el ancho de la pantalla

      leaf.style.left = `${startPosition}px`; // Establecer la posición inicial

      leaf.animate(
        [
          { top: '-20px', opacity: 0 }, // Estado inicial: arriba y transparente
          { top: '100%', opacity: 1 }, // Estado final: abajo y visible
        ],
        {
          duration: animationDuration * 900, // Convertir segundos a milisegundos
          iterations: Infinity, // Repetir la animación infinitamente
          easing: 'linear', // Tipo de animación lineal
          delay: Math.random() * 5 * 1000, // Retraso aleatorio para iniciar la animación
        }
      );
    });
  }

  render() {
    return (
      <div className="auth-inner form-border">
        <div className="leaves-container">
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <h3>Registrarse</h3>
          {this.state.mensaje && <p>{this.state.mensaje}</p>}
          
          <div className="mb-3">
            <label>Nombre*</label>
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
            <label>Apellido Paterno*</label>
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
            <label>Usuario*</label>
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
            <label>Teléfono*</label>
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
            <label>Correo*</label>
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
            <label>Rol*</label>
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