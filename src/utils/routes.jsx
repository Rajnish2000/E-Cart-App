import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/landingpage";
import ProductView from "../pages/productView";
import AboutPage from "../pages/about";
import ContactPage from "../pages/contacts";
import AddProduct from "../pages/addProduct";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/product/:id" element={<ProductView />} />
      <Route path="/product/addProduct" element={<AddProduct />} />
      <Route path="/product/edit/:id" element={<AddProduct />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
};

export default Routing;
