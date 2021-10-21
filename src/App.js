import React, { Component } from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.module.css';

import fetchApi from 'components/Service-api';
import Container from 'components/Container';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Spinner from 'components/Spinner';

export default class App extends Component {
  state={
    status: 'idle',
    query: '',
    page: 1,
    data: [],
    loading: false,
    showModal: false,
    modalLargeImage: '',
  };

componentDidUpdate(prevProps, prevState) {
  const { query, page} = this.state;

  if (prevState.query !== query) {
    this.setState({ status: 'pending' });
      fetchApi(query, page)
      .then(data => data.hits)
      .then(data => this.setState({ data: data, status: 'resolved' }));
  }

  if (prevState.page !== page && page !== 1) {
    this.setState({ status: 'pending' });
  fetchApi(query, page)
  .then(data => data.hits)
  .then(data =>{
    this.setState(prevState => ({
      data: [...prevState.data, ...data],
      status: 'resolved',
    }))
    if (page !== 1) {
      this.scrollOnLoadButton();
    };
  })}
}
scrollOnLoadButton = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
};

handleFormSubmit = query =>{
 this.setState({
   query: query,
   page: 1});
};

buttonLoadMore = () => {
  const { page } = this.state;
  this.setState({
    page: page + 1,
    status: 'pending',
  });
};
toggleModal = () => {
  this.setState(({ showModal }) => ({
    showModal: !showModal,
  }));
};

modalImage = (id, img, tags) => {
  this.setState({ modalLargeImage: { id: id, img: img, tags: tags } });
};

  render(){
    const { handleFormSubmit, toggleModal, modalImage, buttonLoadMore } = this;
    const { data, status, showModal, modalLargeImage } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery
          data={data}
          toggleModal={toggleModal}
          bigImage={modalImage}
        />
        {status === 'pending' && <Spinner />}
        {data.length > 0 && <Button onClick={buttonLoadMore} />}
        {showModal && <Modal closeModal={toggleModal} modalImage={modalLargeImage} />}
        <ToastContainer autoClose={2000}/>
        </Container>
    );
  }
 }

