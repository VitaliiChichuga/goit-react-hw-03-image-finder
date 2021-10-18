import React, { Component } from 'react';
import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import PropTypes from 'prop-types';
import style from '../Searchbar/Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSearhChang = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      alert({
        text: 'Enter the title!',
        delay: 1000,
      });

      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={style.Searchbar}>
        <form onSubmit={this.handleSubmit} className={style.Searchbar}>
          <button type="submit" className={style.SearchFormButton}>
            <span className={style.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={style.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleSearhChang}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
