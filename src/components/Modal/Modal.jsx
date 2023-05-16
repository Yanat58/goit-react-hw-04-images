import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BsXLg } from 'react-icons/bs';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ title, onClose, large, alt }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleClickBackdrop}>
      <div className={css.modal}>
        {title && <h1 className={css.title}>{title}</h1>}
        <img src={large} alt={alt} loading="lazy" />
        <button className={css.button} type="button" onClick={onClose}>
          <BsXLg className={css.icon} />
        </button>
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  large: PropTypes.string,
  alt: PropTypes.string,
};

export default Modal;
