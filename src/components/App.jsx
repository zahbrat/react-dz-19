import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Loader from "./Loader";
import Button from "./Button";
import Modal from "./Modal";
import { useImageSearch } from "../hooks/useImageSearch";
import { useModal } from "../hooks/useModal";

const App = () => {
  const {
    images,
    isLoading,
    error,
    totalHits,
    handleSearchSubmit,
    handleLoadMore,
  } = useImageSearch();

  const { showModal, largeImageURL, openModal, closeModal } = useModal();

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
