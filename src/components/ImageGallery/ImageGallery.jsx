import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

function ImageGallery({ images }) {
  return (
    <ul className={css.container}>
      {images.map(({ description, smallImage, largeImage }, index) => (
        <ImageGalleryItem
          key={index}
          description={description}
          smallImage={smallImage}
          largeImage={largeImage}
        />
      ))}
    </ul>
  );
}

ImageGallery.prototype = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      smallImage: PropTypes.string.isRequired,
      largeImage: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGallery;
