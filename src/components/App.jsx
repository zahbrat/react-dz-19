import React, { useState, useEffect, useCallback } from "react";
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Loader from "./Loader";
import Button from "./Button";
import Modal from "./Modal";

const fetchImages = async (query, page = 1) => {
  const API_KEY = "49326639-01cc2e057e54105d870ddb0dd";
  const BASE_URL = "https://pixabay.com/api/";
  const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (data.hits.length === 0) {
    return { hits: [], totalHits: 0 };
  }

  return {
    hits: data.hits.map(({ id, webformatURL, largeImageURL }) => ({
      id,
      webformatURL,
      largeImageURL,
    })),
    totalHits: data.totalHits,
  };
};

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (!query) {
      return;
    }

    const loadImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchImages(query, page);

        if (data.hits.length === 0 && page === 1) {
          setError(`На жаль, за запитом "${query}" нічого не знайдено.`);
          setTotalHits(0);
          setImages([]);
          return;
        }

        setImages((prevImages) =>
          page === 1 ? data.hits : [...prevImages, ...data.hits]
        );
        setTotalHits(data.totalHits);

        if (page > 1) {
          window.scrollBy({ top: 500, behavior: "smooth" });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, [query, page]);

  const handleSearchSubmit = useCallback(
    (newQuery) => {
      if (newQuery === query) return;

      setQuery(newQuery);
      setPage(1);
      setImages([]);
      setTotalHits(0);
      setError(null);
    },
    [query]
  );

  const handleLoadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const openModal = useCallback((url) => {
    setLargeImageURL(url);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setLargeImageURL("");
  }, []);

  const showLoadMoreButton =
    images.length > 0 && images.length < totalHits && !isLoading;

  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      <Searchbar onSubmit={handleSearchSubmit} />

      {error && (
        <p className="text-red-600 text-center mt-4 text-xl font-medium">
          ❌ {error}
        </p>
      )}

      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}

      {isLoading && <Loader />}

      {showLoadMoreButton && <Button onClick={handleLoadMore} />}

      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;
