import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../Spinner/Spinner';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import pixHandler from '../../Services/AppiServise';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

class App extends Component {
  static propTypes = {
    searchQuery: PropTypes.string,
  };

  state = {
    searchQuery: '',
    page: 1,
    images: [],
    selectedImg: null,
    alt: null,
    status: 'idle',
  };

  async componentDidUpdate(_, prevState) {
    const prevSearch = prevState.searchQuery;
    const nextSearch = this.state.searchQuery;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearch !== nextSearch || prevPage !== nextPage) {
      this.setState({ status: 'pending' });

      try {
        const images = await pixHandler(nextSearch, nextPage);

        if (!images.length) {
          error({
            text: 'No image!',
            delay: 1000,
          });
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          status: 'resolved',
        }));
      } catch (error) {
        error({
          text: 'No image!',
          delay: 1000,
        });

        this.setState({ status: 'rejected' });
      }

      this.state.page > 1 && Button();
    }
  }

  handleFormSubmit = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      return;
    }

    this.resetState();
    this.setState({ searchQuery });
  };

  loadMoreBtnClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleSelectedImage = (largeImageUrl, tags) => {
    this.setState({
      selectedImg: largeImageUrl,
      alt: tags,
    });
  };

  closeModal = () => {
    this.setState({
      selectedImg: null,
    });
  };

  resetState = () => {
    this.setState({
      searchQuery: '',
      page: 1,
      images: [],
      selectedImg: null,
      alt: null,
      status: 'idle',
    });
  };

  render() {
    const { images, selectedImg, alt, status } = this.state;

    if (status === 'idle') {
      return <Searchbar onSubmit={this.handleFormSubmit} />;
    }

    if (status === 'pending') {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <Spinner />
          <ImageGallery images={images} selectedImage={this.handleSelectedImage} />

          {images.length > 0 && <Loader onClick={this.loadMoreBtnClick} />}
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery images={images} selectedImage={this.handleSelectedImage} />
          {selectedImg && <Modal selectedImg={selectedImg} tags={alt} onClose={this.closeModal} />}
          {images.length > 0 && <Loader onClick={this.loadMoreBtnClick} />}
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
        </>
      );
    }
  }
}

export default App;
