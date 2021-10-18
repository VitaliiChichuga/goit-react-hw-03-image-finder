import React from 'react';
import PropTypes from 'prop-types';
import style from '../ImageGallery/ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images, selectedImage }) {
  return (
    <ul className={style.ImageGallery}>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          selectedImage={() => selectedImage(largeImageURL, tags)}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
  selectedImg: PropTypes.func,
};
