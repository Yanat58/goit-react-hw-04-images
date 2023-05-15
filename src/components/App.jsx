import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchImages from 'services/images-api';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  // const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);
  const [showBtn, setShowBtn] = useState(0);
  // const [error, setError] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentImageDescription, setCurrentImageDescription] = useState(null);

  const getSearchRequest = newQuery => {
    if (query !== newQuery) {
      setQuery(newQuery);
      setImages([]);
      setPage(1);
    }
  };

  const onNextFetch = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = e => {
    const currentImageUrl = e.target.dataset.large;
    const currentImageDescription = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      setShowModal(!showModal);
      setCurrentImageUrl(currentImageUrl);
      setCurrentImageDescription(currentImageDescription);
      // this.setState(({ showModal }) => ({
      //   showModal: !showModal,
      //   currentImageUrl: currentImageUrl,
      //   currentImageDescription: currentImageDescription,
      // }));
    }
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    setIsLoading(true);

    fetchImages(query, page)
      .then(({ hits, totalHits }) => {
        if (totalHits === 0) {
          toast.warn(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        if (page === 1) {
          toast.info(`Hooray! We found ${totalHits} images.`);
        }

        if (page * 12 >= totalHits) {
          toast.info(
            `We're sorry, but you've reached the end of search results.`
          );
        }

        const gallery = hits.map(({ tags, webformatURL, largeImageURL }) => ({
          description: tags,
          smallImage: webformatURL,
          largeImage: largeImageURL,
        }));

        setImages(prevImages => [...prevImages, ...gallery]);
        setShowBtn(page * 12 < totalHits);
      })
      .catch(error => toast.error(error.message, 'Something went wrong!'))
      .finally(() => setIsLoading(false));
  }, [page, query]);

  return (
    <>
      <Searchbar onSubmit={getSearchRequest} />

      <ImageGallery images={images} openModal={openModal} />

      {isLoading && <Loader />}

      {showBtn && !isLoading && images.length > 0 && (
        <Button onNextFetch={onNextFetch} />
      )}

      {showModal && (
        <Modal
          onClose={toggleModal}
          currentImageUrl={currentImageUrl}
          currentImageDescription={currentImageDescription}
        />
      )}

      <ToastContainer theme="colored" autoClose={2500} />
    </>
  );
};

export default App;
