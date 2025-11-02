import React from "react";

const Button = React.memo(({ onClick }) => (
  <button
    type="button"
    className="block mx-auto mt-5 mb-5 px-4 py-2 rounded-sm bg-blue-700 text-white text-lg font-medium shadow-md transition-all duration-250 ease-in-out hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    onClick={onClick}
  >
    Load more
  </button>
));

export default Button;
