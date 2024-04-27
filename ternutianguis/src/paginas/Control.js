import React, { Component } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

export class Control extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  handleLoginClick = () => {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick = () => {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    return (
      <Navbar bg="light" expand="lg">
        <Container>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
            <Nav>
              {isLoggedIn ? (
                <>
                  <Nav.Link onClick={this.handleLogoutClick}>Logout</Nav.Link>
                  <Nav.Link disabled>Bienvenido de vuelta!</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={this.handleLoginClick}>Login</Nav.Link>
              )}
            </Nav>
        </Container>
      </Navbar>
    );
  }
}
//export default CustomNavbar;