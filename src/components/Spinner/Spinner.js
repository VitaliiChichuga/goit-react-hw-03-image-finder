import Loader from 'react-loader-spinner';
import React, { Component } from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import s from './Spinner.module.css'
export default class Spinner extends Component {
  render() {
    return (
        <Loader className={s.spinner} type="MutatingDots" color="#ca0e82" height={100} width={100} />
    );
  }
}
