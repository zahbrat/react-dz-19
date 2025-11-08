import { useState, useCallback } from "react";

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");

  const openModal = useCallback((url) => {
    setLargeImageURL(url);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setLargeImageURL("");
  }, []);

  return { showModal, largeImageURL, openModal, closeModal };
};
