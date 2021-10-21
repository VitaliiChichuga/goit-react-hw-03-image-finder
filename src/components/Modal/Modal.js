import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  backdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { modalImage } = this.props;
    const { backdropClick }=this;
    return createPortal(
      <div className={s.Overlay} onClick={backdropClick}>
        <div className={s.Modal}>
          <img key={modalImage.id} src={modalImage.img} alt={modalImage.tags} />
        </div>
      </div>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func,
  ModalImage: PropTypes.object,
};

