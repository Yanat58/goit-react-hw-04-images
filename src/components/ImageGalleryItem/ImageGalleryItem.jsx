import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ description, smallImage, largeImage }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <li className={css.item}>
      <img
        onClick={toggleModal}
        src={smallImage}
        alt={description}
        data-large={largeImage}
      />

      {showModal && (
        <Modal onClose={toggleModal} large={largeImage} alt={description} />
      )}
    </li>
  );
}

ImageGalleryItem.prototype = {
  description: PropTypes.string,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
