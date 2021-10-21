import PropTypes from 'prop-types';
import React, { Component } from 'react';
import s from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  render() {
    const { webformatURL, tags, toggleModal, bigImage } = this.props;
    return (
      <li className={s.ImageGalleryItem}>
        <img
          src={webformatURL}
          alt={tags}
          className={s.image}
          onClick={() => {
            toggleModal();
            bigImage();
          }}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  toggleModal: PropTypes.func,
  bigImage: PropTypes.func,
};
