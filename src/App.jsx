import { useContext } from "react";
import Footer from "./Components/footer";
import NavBar from "./Components/NavBar";
// import ProductView from "./pages/productView";
import Routing from "./utils/routes";
import { ProductContext } from "./utils/Context";
function App() {
  const [products] = useContext(ProductContext);
  return (
    <>
      <div className="relative h-[100%]">
        <NavBar />
        <div
          className={`pb-[30vh] ${products.length == 0 ? "" : "bg-slate-200"}`}
        >
          <Routing />
        </div>
        {products.length != 0 ? (
          <Footer style="absolute" />
        ) : (
          <Footer style="fixed" />
        )}
      </div>
    </>
  );
}

export default App;
