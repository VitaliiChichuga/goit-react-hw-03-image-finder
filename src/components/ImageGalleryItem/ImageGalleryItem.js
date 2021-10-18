import React from 'react';
import PropTypes from 'prop-types';
import style from '../ImageGalleryItem/ImageGalleryItem.module.css';

export default function ImageGalleryItem({ tags, webformatURL, selectedImage }) {
  return (
    <li className={style.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        onClick={selectedImage}
        className={style.ImageGalleryItemImage}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  selectedImage: PropTypes.func,
};
