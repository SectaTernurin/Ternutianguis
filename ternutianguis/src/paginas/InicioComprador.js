 import React from "react";
 import { Row, Col } from "reactstrap";
 import { Link, useNavigate } from "react-router-dom";
 import { BuscarP } from "./Comprador/BuscarP";
 import "./Home.css";
 
export const InicioComprador = () => { 
  return (
     <div>
      <div className="Bienvenida">
        <h2>Ternutianguis</h2>
      </div>
       <BuscarP />
     </div>
   );
 };