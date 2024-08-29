import Footer from "./Components/footer";
import NavBar from "./Components/NavBar";
// import ProductView from "./pages/productView";
import Routing from "./utils/routes";
function App() {
  return (
    <>
      <NavBar />
      <Routing />
      <Footer />
    </>
  );
}

export default App;
