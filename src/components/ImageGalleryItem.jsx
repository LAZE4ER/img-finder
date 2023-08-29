function ImageGalleryItem({ image, onOpen }) {
  return (
    <li className="ImageGalleryItem" onClick={() => onOpen(image)}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className="ImageGalleryItem-image"
      />
    </li>
  );
}

export default ImageGalleryItem;
