import { useReducer, useEffect, useCallback } from "react";

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

const initialState = {
  images: [],
  query: "",
  page: 1,
  isLoading: false,
  error: null,
  totalHits: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "START_FETCH":
      return { ...state, isLoading: true, error: null };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        error: null,
        images:
          state.page === 1
            ? action.payload.hits
            : [...state.images, ...action.payload.hits],
        totalHits: action.payload.totalHits,
      };
    case "FETCH_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    case "SET_QUERY":
      return { ...initialState, query: action.payload };
    case "INCREMENT_PAGE":
      return { ...state, page: state.page + 1 };
    case "NO_RESULTS":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        totalHits: 0,
        images: [],
      };
    default:
      return state;
  }
};

export const useImageSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { images, query, page, isLoading, error, totalHits } = state;

  useEffect(() => {
    if (!query) {
      return;
    }

    const loadImages = async () => {
      dispatch({ type: "START_FETCH" });

      try {
        const data = await fetchImages(query, page);

        if (data.hits.length === 0 && page === 1) {
          dispatch({
            type: "NO_RESULTS",
            payload: `На жаль, за запитом "${query}" нічого не знайдено.`,
          });
          return;
        }

        dispatch({ type: "FETCH_SUCCESS", payload: data });

        if (page > 1) {
          window.scrollBy({ top: 500, behavior: "smooth" });
        }
      } catch (err) {
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      }
    };

    loadImages();
  }, [query, page]);

  const handleSearchSubmit = useCallback(
    (newQuery) => {
      if (newQuery === query) return;
      dispatch({ type: "SET_QUERY", payload: newQuery });
    },
    [query]
  );

  const handleLoadMore = useCallback(() => {
    dispatch({ type: "INCREMENT_PAGE" });
  }, []);

  return {
    images,
    query,
    page,
    isLoading,
    error,
    totalHits,
    handleSearchSubmit,
    handleLoadMore,
  };
};
