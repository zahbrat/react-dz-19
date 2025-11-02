import React, { useEffect, useCallback, useRef } from "react";

const Modal = ({ largeImageURL, onClose }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target === overlayRef.current) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50"
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div className="max-w-4xl max-h-screen-lg relative p-3">
        <img
          src={largeImageURL}
          alt="Large view"
          className="max-w-full max-h-full h-auto"
        />
      </div>
    </div>
  );
};

export default Modal;
