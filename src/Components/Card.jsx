const Card = ({ product, productViewHandler }) => {
  return (
    <>
      <div className="rounded-md border w-[300px] shadow-lg shadow-slate-600 border-1 border-slate-300 border-box m-3">
        <div onClick={() => productViewHandler(product.id)}>
          <div className="overflow-hidden p-1 rounded-md">
            <img
              src={product.image}
              alt="Laptop"
              className="bg-cover aspect-[12/9] w-full rounded-md md:aspect-auto md:h-[45vh] lg:h-[45vh] hover:scale-105 duration-700 delay-100"
            />
          </div>
          <div className="p-4">
            <h1 className="inline-flex items-center text-lg font-semibold">
              {product.title.slice(0, 15)}...
            </h1>
            <p className="mt-3 text-sm text-gray-600">
              {product.description.slice(0, 70)}...
            </p>
          </div>
        </div>
        <div className="px-3">
          <button
            type="button"
            className="mb-4 w-full rounded-sm bg-slate-900 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
