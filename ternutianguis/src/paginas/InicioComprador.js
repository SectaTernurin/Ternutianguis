 import React from "react";
 import Producto from "./Comprador/Producto";
 import { Row, Col } from "reactstrap";
 import { useProductos } from "./Comprador/MostrarProductos";
 import { useNavigate } from "react-router-dom";
 import { BuscarP } from "./Comprador/BuscarP";
 
export const InicioComprador = () => {
   const { categorias, productos } = useProductos();
   const navigate = useNavigate();
 
   const navegarAVistaProducto = (url) => {
     navigate(url);
   };
 
   return (
     <div>
       <BuscarP />
     </div>
   );
 };
 
// export default Home;