import { useState, useEffect } from "react";
import axios from "axios";

export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const fetchCategorias = async () => {
    try {
      const {
        data: { data },
      } = await axios.get("/categorias");
      setCategorias(data);
    } catch (error) {
      console.log({ error });
    }
  };

  const fetchProductos = async () => {
    try {
      const {
        data: { data },
      } = await axios.get("/products?populate=*");
      setProductos(data);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchProductos();
    fetchCategorias();
  }, []);

  return { categorias, productos };
};