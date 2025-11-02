import React from "react";
import ImageGalleryItem from "./ImageGalleryItem";

const ImageGallery = React.memo(({ images, onImageClick }) => (
  <ul className="grid max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-0 mb-0 p-3 list-none">
    {images.map((image) => (
      <ImageGalleryItem key={image.id} image={image} onClick={onImageClick} />
    ))}
  </ul>
));

export default ImageGallery;
