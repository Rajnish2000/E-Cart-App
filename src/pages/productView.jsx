import axios from "../utils/axios";
import { ChevronLeft, ChevronRight, Delete, Edit, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import { ProductContext } from "../utils/Context";

const ProductView = () => {
  const prams = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [products, setProducts] = useContext(ProductContext);
  useEffect(() => {
    (async () => {
      let localData = JSON.parse(localStorage.getItem("products"));
      if (localData.length == 0) {
        const res = await axios.get(`/products/${prams.id}`);
        setProduct(res.data);
      } else {
        let res = localData.find((item) => item.id == prams.id);
        setProduct(res);
      }
    })();
  }, []);

  const editHandler = (id) => {
    navigate(`/product/edit/${id}`);
  };
  const deleteHandler = (id) => {
    let localData = JSON.parse(localStorage.getItem("products"));
    localData = localData.filter((item) => item.id != id);
    setProducts([...localData]);
    localStorage.setItem("products", JSON.stringify(localData));
    navigate("/");
  };

  return (
    <>
      <nav className="flex relative top-10 left-14" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link
              to="/"
              className="ml-1 inline-flex text-sm font-medium text-gray-800 hover:underline md:ml-2"
            >
              Products
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2.5 text-gray-800 ">/</span>
              {product.title}
            </div>
          </li>
        </ol>
      </nav>
      {Object.keys(product).length != 0 ? (
        <div className="sp mx-auto max-w-7xl px-2 py-10 lg:px-0">
          <div className="overflow-hidden">
            <div className="mb-9 pt-4 md:px-6 md:pt-7 lg:mb-2 lg:p-8 2xl:p-10 2xl:pt-10">
              <div className="items-start justify-between lg:flex lg:space-x-8">
                <div className="mb-6 items-center justify-center overflow-hidden md:mb-8 lg:mb-0 xl:flex">
                  <div className="w-full xl:flex xl:flex-row-reverse">
                    <div className="relative mb-2.5 w-full shrink-0 overflow-hidden rounded-md border md:mb-3 xl:w-[480px] 2xl:w-[650px]">
                      <div className="relative flex items-center justify-center">
                        <img
                          alt="Product gallery 1"
                          src={product.image}
                          width={650}
                          height={590}
                          className="rounded-lg object-cover md:h-[300px] md:w-full lg:h-full"
                        />
                      </div>
                      <div className="absolute top-2/4 z-10 flex w-full items-center justify-between">
                        <ChevronLeft className="text-white" />
                        <ChevronRight className="text-white" />
                      </div>
                    </div>
                    <div className="flex gap-2 xl:flex-col">
                      {[product.image].map((image, index) => (
                        <div
                          key={index}
                          className="border-border-base flex cursor-pointer items-center justify-center overflow-hidden rounded border transition hover:opacity-75 "
                        >
                          <img
                            alt={`Product ${index}`}
                            src={image}
                            decoding="async"
                            loading="lazy"
                            className="h-20 w-20 object-cover md:h-24 md:w-24 lg:h-28 lg:w-28 xl:w-32"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col lg:w-[430px] xl:w-[470px] 2xl:w-[480px]">
                  <div className="pb-5">
                    <h2 className="text-lg font-semibold md:text-xl xl:text-2xl">
                      {product.title}
                    </h2>
                    <p className="mt-4 font-semibold">$ {product.price}</p>
                  </div>
                  <div className="my-4 flex items-center">
                    <span className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={`text-yellow-500 ${
                            product.rating?.rate > i ? "fill-yellow-500" : ""
                          }`}
                        />
                      ))}
                      <span className="ml-3 inline-block text-xs font-semibold">
                        {product.rating?.count} Reviews
                      </span>
                    </span>
                  </div>
                  <div className="mb-2 pt-0.5">
                    <h4 className="text-15px mb-3 font-normal capitalize text-opacity-70">
                      category
                    </h4>
                    <ul className="flex flex-wrap space-x-2">
                      <li className="md:text-15px mb-2 flex h-9 border-blue-300 cursor-pointer items-center justify-center rounded border p-1 px-3 text-sm font-medium transition duration-200 ease-in-out md:mb-3 md:h-10">
                        {product.category.toUpperCase()}
                      </li>
                    </ul>
                  </div>
                  <div className="pb-2" />
                  <div className="space-y-2.5 pt-1.5 md:space-y-3.5 lg:pt-3 xl:pt-4">
                    <button
                      type="button"
                      className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      Add To Cart
                    </button>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => editHandler(product.id)}
                        type="button"
                        className="inline-flex items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        <Edit size={16} className="mr-3" />
                        <span className="block">Edit</span>
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => deleteHandler(product.id)}
                          type="button"
                          className="inline-flex w-full items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                          <Delete size={16} className="mr-3" />
                          <span className="block">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 xl:pt-8">
                    <h3 className="text-15px mb-3 font-semibold sm:text-base lg:mb-3.5">
                      Product Details:
                    </h3>
                    <p className="text-sm">{product.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProductView;
