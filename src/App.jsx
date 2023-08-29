import axios from "axios";
import { useState, useEffect } from "react";

import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
import Button from "./components/Button";
function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [activeImage, setActiveImage] = useState(null);
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  useEffect(() => {
    if (query === "") {
      return;
    }

    setLoading(true);

    axios
      .get("https://pixabay.com/api/", {
        params: {
          q: query,
          page,
          key: "37431690-25678a882bd85283e2be359ee",
          image_type: "photo",
          orientation: "horizontal",
          per_page: 12,
        },
      })
      .then((res) => {
        setImages((prevImages) => [...prevImages, ...res.data.hits]);
        setTotalImages(res.data.totalHits);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, page]);

  function search(newQuery) {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  }

  function openModal(image) {
    setActiveImage(image);
  }

  function closeModal() {
    setActiveImage(null);
  }
  function loadMore() {
    setPage((prevPage) => prevPage + 1);
  }
  return (
    <div className="App">
      {activeImage && <Modal activeImage={activeImage} onClose={closeModal} />}
      <Searchbar onSearch={search} />
      <ImageGallery images={images} onOpen={openModal} />
      {loading && <Loader />}
      {images.length < totalImages && <Button onClick={loadMore} />}
    </div>
  );
}

export default App;
