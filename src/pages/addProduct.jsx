import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const handleForm = (data) => {
    (async () => {
      try {
        const res = await axios.post("/products", data);
        console.log(res);
        let localData = JSON.parse(localStorage.getItem("products"));
        res.data.id = localData.length + 1;
        localData.push(res.data);
        console.log(localData);
        localStorage.setItem("products", JSON.stringify(localData));
        navigate("/");
      } catch (e) {
        console.log(e);
      }
    })();
  };
  return (
    <>
      <section>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              Create New Product
            </h2>
            <form
              action=""
              method="POST"
              className="mt-8"
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
                      type="number"
                      placeholder="price"
                      id="price"
                    ></input>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
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
                    >
                      <option value="men's clothing">Mens Clothing</option>
                      <option value="jewelery">Jewelery</option>
                      <option value="electronics">Electronics</option>
                      <option value="women's clothing">Womens Clothing</option>
                    </select>
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
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      cols="40"
                      rows="50"
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
                    Create Product <ArrowRight className="ml-2" size={16} />
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
