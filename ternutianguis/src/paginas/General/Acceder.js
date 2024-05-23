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
      email: '',
      password: '',
      mensaje: ''
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;

    if (email && password) {
      try {
        const response = await fetch('/loginVerificar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ correo: email, contrasena: password }),
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
        console.error('Error al iniciar sesión:', error);
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
          <h3>Acceder</h3>
          {this.state.mensaje && <p>{this.state.mensaje}</p>}
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
            <label>Contraseña</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              placeholder="Ingrese su contraseña"
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Ingresar
            </button>
          </div>
        </form>
      </div>
    );
  }
}
