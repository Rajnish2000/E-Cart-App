import { useContext, useEffect, useState } from "react";
import Card from "../Components/Card";
import axios from "../utils/axios";
import { ChartColumnStacked, Logs, SquareStack } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import { ProductContext } from "../utils/Context";

const LandingPage = () => {
  // const [products, setProducts] = useState([]);
  const [products] = useContext(ProductContext);
  const [category, setCategory] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [slideStyle, setSlideStyle] = useState({
    styleProperty: "left-[-64vw] z-20",
    open: false,
  });
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      await getProducts();
    })();
  }, [products]);
  const getProducts = async () => {
    try {
      // const res = await axios.get(url);
      const cate = await axios.get("/products/categories");
      if (products.length != 0) {
        setCategory([...new Set([...products.map((item) => item.category)])]);
      } else {
        setCategory(cate.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getCategoryData = async (type) => {
    try {
      // let res = await axios.get(url + `/category/${type}`);
      let res = products.filter((item) => {
        if (item.category === type) {
          return item;
        }
      });
      setFilterProducts([...res]);
    } catch (e) {
      console.log(e);
    }
  };

  const productViewHandler = (id) => {
    navigate(`/product/${id}`);
  };

  const addNewProductHandler = () => {
    navigate("/product/addProduct");
  };
  const slideHandler = () => {
    if (slideStyle.open == false) {
      slideStyle.styleProperty = "left-[0vw] z-0 duration-500 delay-100";
      slideStyle.open = !slideStyle.open;
    } else {
      slideStyle.styleProperty = "left-[-64vw] z-20 duration-500 delay-100";
      slideStyle.open = !slideStyle.open;
    }
    setSlideStyle({ ...slideStyle });
  };
  return (
    <>
      {products.length ? (
        <div className="w-full h-full bg-slate-200 flex flex-row box-border">
          <div
            className={`fixed pt-[7vh] ${slideStyle.styleProperty} h-screen bg-zinc-50 border-2 py-2 border-x-slate-300 px-2 w-[240px] box-border`}
          >
            <button
              onClick={addNewProductHandler}
              className="my-2 w-full rounded-md text-xl text-center shadow-md shadow-slate-500 font-semibold px-4 py-3 bg-red-400 text-zinc-50 hover:bg-red-500 duration-500 delay-100"
            >
              Add New Product
            </button>
            <h3 className="rounded-md text-xl text-left font-semibold px-3 py-3 bg-slate-400 text-zinc-50 flex gap-2">
              <ChartColumnStacked />
              <span> Categories</span>
            </h3>
            {category.map((cat, index) => {
              return (
                <label
                  key={index}
                  className="relative border-2 p-3 mx-1 my-3 font-semibold box-border rounded-md flex flex-row gap-5 has-[:checked]:border-indigo-200 has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200"
                  onClick={() => getCategoryData(cat)}
                >
                  <SquareStack />
                  <span className="w-[100%]">{cat} </span>
                  <input
                    type="radio"
                    name="t-shirt"
                    className="has-[:checked]:border-indigo-500 relative right-0"
                  />
                </label>
              );
            })}
          </div>
          <div className="overflow-auto">
            <div className="w-100 h-14 flex items-center px-5 font-bold text-red-500 justify-between">
              <button onClick={slideHandler} className="z-40">
                <Logs />
              </button>
            </div>
            <div className="w-[100%] text-right px-8 font-semibold text-2xl text-zinc-600">
              {filterProducts.length == 0 ? "All" : filterProducts[0].category}
            </div>
            <div className="flex w-full justify-around flex-row flex-wrap">
              {filterProducts.length == 0
                ? products.map((product) => {
                    return (
                      <Card
                        product={product}
                        key={product.id}
                        productViewHandler={productViewHandler}
                      />
                    );
                  })
                : filterProducts.map((product) => {
                    return (
                      <Card
                        product={product}
                        key={product.id}
                        productViewHandler={productViewHandler}
                      />
                    );
                  })}
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default LandingPage;
