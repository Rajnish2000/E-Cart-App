import { createContext, useEffect, useState } from "react";
import axios from "./axios";

export const ProductContext = createContext();

const Context = (props) => {
  const [products, setProducts] = useState([]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts([...products, ...data]);
      if (localStorage.getItem("products") == null) {
        localStorage.setItem("products", JSON.stringify(data));
      } else {
        const localData = localStorage.getItem("products");
        setProducts(JSON.parse(localData));
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    (async () => {
      await getProduct();
    })();
  }, []);

  return (
    <ProductContext.Provider value={[products, setProducts]}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default Context;
