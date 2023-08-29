import { useEffect } from 'react';

function Modal({ activeImage, onClose }) {
  function handleOverlayClick(e) {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Overlay" onClick={handleOverlayClick}>
      <div className="Modal">
        <img src={activeImage.largeImageURL} alt={activeImage.tags} />
      </div>
    </div>
  );
}

export default Modal;
