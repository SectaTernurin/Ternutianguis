import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { Col, Navbar } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';

import { useState } from 'react';


export const Prototipo = () => {
    const [comentarios, setComentarios] = useState([]); // Estado para almacenar los comentarios
    
    const handleComentarios = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/obtenerComentarios', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: 2}),
              });

            const data = await response.json();
            console.log(data.Comentarios);
            setComentarios(data.Comentarios);
        }
        catch (error) {
            console.error('Error al obtener comentarios:', error);
            return;
        }
    }

    const mostrarComentarios = () => {
        if (comentarios.length === 0){
            return <p>No hay comentarios</p>
        }
        else {
            return comentarios.map((comentario, index) => {
                return (
                    <div key={index}>
                        <Container>
                            <Row>
                                <Col>
                                <p>{comentario.comentario}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col>
                                <p>-{comentario.usuario}-</p>
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                        </Container>

                    </div>
                )
            })
        }
    }

    return(
        <div className="container">
            <h2>Página prueba</h2>
            <button onClick={handleComentarios}>Obtener comentarios</button>
            {mostrarComentarios()}
        </div>

    )
}