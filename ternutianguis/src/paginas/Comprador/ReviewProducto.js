import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import './ReviewProducto.css';



export const ReviewProducto = () => {
  const [review, setReview] = useState({ stars: 0, text: '' });
  const [reviews, setReviews] = useState([]);

  const cadenaAImagen = (cadena) =>{
    let url = 'data:image/png;base64,' + cadena;
    return url;
   }

  useEffect(() => {
    console.log(Cookies.get('nombreProducto'));
    console.log(Cookies.get('imagen'));
    console.log(Cookies.get('usuario'));
  }, []);

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
    console.log(review);
  };

  return (
    <div className='ContenedorReview'>
    <div className='TituloReview'>
      <h2>{Cookies.get('nombreProducto')}</h2>
    </div>
    <div className="ColumnasContenedor">
      <div className="column">
      </div>

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