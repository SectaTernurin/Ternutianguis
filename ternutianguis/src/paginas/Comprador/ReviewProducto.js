import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './ReviewProducto.css';

  const cadenaAImagen = (cadena) =>{
    const byteCharacters = atob(cadena);//Pasamos de base64 a binario
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) { //Convertimos a un array de enteros
        byteNumbers[i] = byteCharacters.charCodeAt(i); //Obtenemos el valor ASCII de cada caracter
    }
    const byteArray = new Uint8Array(byteNumbers); //Convertimos a un array de enteros sin signo
    return URL.createObjectURL(new Blob([byteArray], { type: 'image/jpeg' })); //Creamos la url de la imagen
  }

export const ReviewProducto = () => {
  const [review, setReview] = useState({ stars: 0, text: '' });
  const [reviews, setReviews] = useState([]);
  //const [productos, setProductos] = useState([]); // Estado para almacenar los productos encontrados

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
      // Actualizar la lista de reviews despues de agregar una
      setReviews([...reviews, data]);
      // Reiniciar las estrellas
      setReview({ stars: 0, text: '' });
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className='ContenedorReview'>
    <div className='TituloReview'>
      <h2>Agregar Review</h2>
    </div>
    <div className="ColumnasContenedor">
      <div className="column">
        {/* Primer columna */}
      </div>

      <div className="column">
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
      
      <div className='listaReviews'>
      <h2>Reviews</h2>
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
  );
};