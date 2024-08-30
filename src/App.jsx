import Footer from "./Components/footer";
import NavBar from "./Components/NavBar";
// import ProductView from "./pages/productView";
import Routing from "./utils/routes";
function App() {
  return (
    <>
      <div className="relative h-[100%]">
        <NavBar />
        <div className="pb-[30vh] bg-slate-200">
          <Routing />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
