import React, { useCallback } from "react";

const ImageGalleryItem = React.memo(({ image, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(image.largeImageURL);
  }, [image.largeImageURL, onClick]);

  return (
    <li className="rounded-sm shadow-md" onClick={handleClick}>
      <img
        src={image.webformatURL}
        alt=""
        loading="lazy"
        className="w-full h-64 object-cover transition-transform duration-250 ease-in-out cursor-zoom-in hover:scale-105"
      />
    </li>
  );
});

export default ImageGalleryItem;
