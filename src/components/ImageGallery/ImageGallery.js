import PropTypes from 'prop-types';
// import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';
import React from 'react';

export default function ImageGallery({ data, toggleModal, bigImage }) {
  return (
    <ul className={s.ImageGallery}>
      {data.map(({ id, largeImageURL, tags, webformatURL }) => {
        const bigImageOnModalOpen = () => bigImage(id, largeImageURL, tags);
        return (
          <ImageGalleryItem
            key={id}
            id={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            toggleModal={() => toggleModal()}
            bigImage={bigImageOnModalOpen}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  query: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      tags: PropTypes.string,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
    }),
  ),
  bigImage: PropTypes.func,
  toggleModal: PropTypes.func,
};
