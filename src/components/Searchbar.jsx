import React, { useState, useCallback } from "react";

const Searchbar = React.memo(({ onSubmit }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

  const handleChange = useCallback(
    (e) => {
      setQuery(e.target.value);
      if (error) {
        setError(null);
      }
    },
    [error]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const trimmedQuery = query.trim();

      if (trimmedQuery === "") {
        setError("Будь ласка, введіть пошуковий запит.");
        return;
      }

      setError(null);
      onSubmit(trimmedQuery);
      setQuery("");
    },
    [onSubmit, query]
  );

  return (
    <header className="sticky top-0 z-50 flex flex-col justify-center items-center h-20 px-6 py-3 text-white bg-blue-700 shadow-md">
      <form
        className="flex items-center w-full max-w-xl bg-white rounded-md overflow-hidden"
        onSubmit={handleSubmit}
      >
        <button
          type="submit"
          className="relative w-12 h-12 border-0 bg-transparent flex items-center justify-center text-gray-600 opacity-60 transition-opacity duration-250 ease-in-out hover:opacity-100 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <span className="sr-only">Search</span>
        </button>

        <input
          className="inline-block w-full font-sans text-xl border-none outline-none pl-1 pr-1 placeholder:text-gray-500 text-black"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </form>
      {error && <p className="text-red-300 text-sm mt-1">{error}</p>}
    </header>
  );
});

export default Searchbar;
