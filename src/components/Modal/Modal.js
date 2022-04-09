import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';
import propTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ largeImage, tag, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div onClick={handleBackdropClick} className={s.modal_backdrop}>
      <div className={s.modal_content}>
        <img className={s.image} src={largeImage} alt={tag} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: propTypes.func.isRequired,
  largeImage: propTypes.string.isRequired,
  tag: propTypes.string.isRequired,
};
