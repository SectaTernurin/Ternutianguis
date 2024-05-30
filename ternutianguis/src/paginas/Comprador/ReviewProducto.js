import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import './ReviewProducto.css';



export const ReviewProducto = () => {
  const [review, setReview] = useState({ stars: 0, text: '' });
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

  const cadenaAImagen = (cadena) =>{
    let url = 'data:image/png;base64,' + cadena;
    return url;
   }

  const handleRating = (newRating) => {
    setReview({ ...review, stars: newRating });
  };

  const handleReviewText = (event) => {
    setReview({ ...review, text: event.target.value });
  };

  const handleSubmit = () => {
    if (!review.text || !review.stars) {
      alert("Hay campos sin rellenar.");
      return;
    }
    else{
      enviarRespuesta();
      navigate('/producto');
    }
  };

  const enviarRespuesta = async () => {
		try {
			const idProducto = Cookies.get('idProducto');
			const response = await fetch('/comentarios/registrar', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(
          {
            idProducto: Cookies.get('idProducto'),
            idUsuario: Cookies.get('usuario'),
            comentario: review.text,
            calificacion: review.stars
          }
        ),
			});
			const data = await response.json();
      alert(data.mensaje);

		} catch (error) {
			console.error('Error al obtener productos:', error);
			return;
		}
	}

  return (
    <div className='ContenedorReview'>
    <div className='TituloReview'>
      <h2>{Cookies.get('nombreProducto')}</h2>
    </div>
    <div className="ColumnasContenedor">
      <div className="column">
        <div className="product-reviews">
          <div>
            <h2>Agregar Reseña</h2>
            <Form>
              <FormGroup>
                <Label for="exampleText">Califica este producto</Label>
                <div>
                  {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon
                      key={index}
                      icon={index < review.stars ? solidStar : regularStar}
                      onClick={() => handleRating(index + 1)}
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </div>
              </FormGroup>
              <FormGroup>
                <Label for="reviewText">Agrega tu comentario aquí</Label>
                <Input
                  type="textarea"
                  name="reviewText"
                  id="reviewText"
                  value={review.text}
                  onChange={handleReviewText}
                />
              </FormGroup>
              <Button color="info" onClick={handleSubmit}>
                Agregar review
              </Button>
            </Form>
          </div>
    
        </div>
      </div>
    </div>
      


    </div>
  );
};