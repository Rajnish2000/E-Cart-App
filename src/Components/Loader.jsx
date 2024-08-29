const Loader = () => {
  return (
    <>
      <button
        type="button"
        className="fixed bottom-[50vh] left-[45vw]"
        disabled
      >
        <svg
          className="animate-spin h-24 w-54 mr-3 lucide lucide-loader-circle"
          xmlns="http://www.w3.org/2000/svg"
          width="72"
          height="72"
          viewBox="0 0 24 24"
          fill="none"
          stroke="lightblue"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      </button>
    </>
  );
};

export default Loader;
