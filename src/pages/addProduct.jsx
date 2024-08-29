import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";

const AddProduct = () => {
  const [products, setProducts] = useContext(ProductContext);
  const [formData, setFormData] = useState();
  const { register, handleSubmit, setValue } = useForm();
  const params = useParams();
  const [show, setShow] = useState("hidden");
  const navigate = useNavigate();
  console.log(params.id);

  useEffect(() => {
    if (params.id != undefined) {
      let localData = JSON.parse(localStorage.getItem("products"));
      if (localData.length) {
        let data = localData.find((item) => item.id == params.id);
        console.log(data);
        setFormData(data);
        setValue("title", data.title, { shouldValidate: true });
        setValue("image", data.image, { shouldValidate: true });
        setValue("price", data.price, { shouldValidate: true });
        setValue("category", data.category, { shouldValidate: true });
        setValue("other_category", data.category, { shouldValidate: true });
        setValue("description", data.description, { shouldValidate: true });
      }
    }
  }, []);

  const handleForm = (data) => {
    (async () => {
      try {
        if (data.category === "other") {
          data.category = data.other_category;
        }
        if (params.id == undefined) {
          const res = await axios.post("/products", data);
          let localData = JSON.parse(localStorage.getItem("products"));
          res.data.id = localData.length + 1;
          localData.push(res.data);
          localStorage.setItem("products", JSON.stringify(localData));
          setProducts(localData);
          navigate("/");
        } else {
          let localData = JSON.parse(localStorage.getItem("products"));
          let indx = localData.findIndex((item) => item.id == params.id);
          console.log(data);
          localData[indx] = { ...data, id: params.id };
          localStorage.setItem("products", JSON.stringify(localData));
          setProducts(localData);
          navigate(`/product/${params.id}`);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  };
  const categoryHandler = (e) => {
    console.log(e.target.value);
    if (e.target.value == "other") {
      setShow("block");
    } else {
      setShow("hidden");
    }
    console.log("category");
  };
  return (
    <>
      <section>
        <div className="bg-slate-200 flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              {params.id == undefined ? "Create New Product" : "Update Product"}
            </h2>
            <form
              action=""
              method="POST"
              className="mt-8 w-[100%]"
              onSubmit={handleSubmit(handleForm)}
            >
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="title"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Title{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("title")}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Title"
                      id="title"
                    ></input>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="image"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    image{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("image")}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="image url"
                      id="image"
                    ></input>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Price{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("price")}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="price"
                      id="price"
                    ></input>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Select Category{" "}
                  </label>
                  <div className="mt-2">
                    <select
                      {...register("category")}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="image url"
                      id="category"
                      onChange={categoryHandler}
                    >
                      <option value="men's clothing">Mens Clothing</option>
                      <option value="jewelery">Jewelery</option>
                      <option value="electronics">Electronics</option>
                      <option value="women's clothing">Womens Clothing</option>
                      <option value="other">other</option>
                    </select>
                    <input
                      id="other"
                      type="text"
                      placeholder="others."
                      required
                      {...register("other_category")}
                      className={`${show} h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Description{" "}
                  </label>
                  <div className="mt-2">
                    <textarea
                      {...register("description")}
                      className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      cols="70"
                      rows="7"
                      placeholder="description"
                      id="description"
                    ></textarea>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    {params.id == undefined
                      ? "Create Product"
                      : "Update Product"}{" "}
                    <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddProduct;
