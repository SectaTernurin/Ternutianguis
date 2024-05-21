import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import './ReviewProducto.css'; // Archivo CSS para estilos

export const ReviewProducto = () => {
  const [review, setReview] = useState({ stars: 0, text: '' });
  const [reviews, setReviews] = useState([]);

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

    // Enviar la revisión al backend
    fetch('/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(review)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Review agregada:', data);
      // Actualizar la lista de revisiones después de agregar una nueva revisión
      setReviews([...reviews, data]);
      // Reiniciar el formulario de revisión
      setReview({ stars: 0, text: '' });
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className="two-columns-container">
      <div className="column">
        {/* Contenido de la primera columna */}
      </div>
      <div className="column">
        {/* Contenido de la segunda columna */}
        <div className="product-reviews">
          <div>
            <h2>Agregar Review</h2>
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
                <Label for="reviewText">Deja tu comentario aquí</Label>
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
          
          {/* Lista de revisiones */}
          <div>
            <h2>Lista de Reviews:</h2>
            <ul>
              {reviews.map((review, index) => (
                <li key={index}>
                  <p>Estrellas: {review.stars}</p>
                  <p>Comentario: {review.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

//export default ReviewProducto;