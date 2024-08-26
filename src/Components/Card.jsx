const Card = ({ product, productViewHandler }) => {
  return (
    <>
      <div
        className="rounded-md border"
        onClick={() => productViewHandler(product.id)}
      >
        <img
          src={product.image}
          alt="Laptop"
          className="aspect-[24/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[230px] hover:scale-105 duration-500 delay-100"
        />
        <div className="p-4">
          <h1 className="inline-flex items-center text-lg font-semibold">
            {product.title.slice(0, 15)}...
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            {product.description.slice(0, 70)}...
          </p>
          <button
            type="button"
            className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
