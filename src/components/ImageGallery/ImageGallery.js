import propTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import s from './ImageGallery.module.css';

export default function ImageGallery({ data, openModal }) {
  return (
    <ul className={s.ImageGallery}>
      {data.map(({ id, webformatURL, tags, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            url={webformatURL}
            alt={tags}
            largeImageURL={largeImageURL}
            onImageClick={() => {
              openModal(largeImageURL, tags);
            }}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  data: propTypes.array.isRequired,
  openModal: propTypes.func.isRequired,
};
