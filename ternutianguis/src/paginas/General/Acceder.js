import React, { Component } from 'react';
import './Acceder.css';
import Cookies from 'js-cookie'; // Importamos Cookies de js-cookie
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

export class Acceder extends Component { // Exportamos por defecto aquí
  constructor(props) {
    super(props);
    this.state = {
      correo: '',
      contrasena: '',
      mensaje: '',
      rol: '',
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
    const { correo, contrasena,rol } = this.state;
    if (correo && contrasena && rol) {
      try {
        const response = await fetch('/general/verificarAcceso', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ correo: correo, contrasena: contrasena, opcion: rol}),
        });

        const data = await response.json();

        if (data.usuario) {
          // Usuario valido, guardamos el token en las cookies
          Cookies.set('usuario', data.id)

          // Verificamos el rol del usuario y redirigimos en consecuencia
          if (data.rol === 'comprador') {
            window.location.href = '/inicioC';
          } else if (data.rol === 'vendedor') {
            window.location.href = '/verProductos';
          }
        } else {
          if (data.errorC === 'Contrasena incorrecta') {
            this.setState({ mensaje: 'La contraseña ingresada es incorrecta.' });
          } else {
            this.setState({ mensaje: 'Usuario no encontrado.' });
          }
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        this.setState({ mensaje: 'Error al iniciar sesión. Vuelva a intentarlo' });
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
      <div className="ContenedorAcceder">
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
          <h3>Acceder</h3>
          {this.state.mensaje && <p>{this.state.mensaje}</p>}
          <div className="mb-3">
            <label>Correo</label>
            <input
              type="email"
              className="form-control"
              name="correo"
              value={this.state.correo}
              onChange={this.handleInputChange}
              placeholder="Ingrese su correo"
            />
          </div>
          <div className="mb-3">
            <label>Contraseña</label>
            <input
              type="password"
              className="form-control"
              name="contrasena"
              value={this.state.contrasena}
              onChange={this.handleInputChange}
              placeholder="Ingrese su contraseña"
            />
          </div>

          <div className="mb-3">
            <label>Selecciona el rol asociado a tu cuenta:</label>
            <select
              className="form-control"
              name="rol"
              value={this.state.rol}
              onChange={this.handleInputChange}
            >
              <option value="">...</option>
              <option value="comprador">Comprador</option>
              <option value="vendedor">Vendedor</option>
            </select>
          </div>
          
          <div className="d-grid">
            <button type="submit" className="botonIngresar">
              Ingresar
            </button>
          </div>
        </form>
        <div>
          <img src={require('../imagenes/Ternu3.png')} className="corner-image bottom-left" />
          <img src={require('../imagenes/Ternu4.png')} className="corner-image bottom-right" />
        </div>
      </div>
    );
  }
}
