import React from 'react';
import Loader from 'react-loader-spinner';
import style from '../Spinner/Spinner.module.css';

function Spinner() {
  return (
    <div className={style.spinner}>
      <Loader type="Puff" color="#00BFFF" height={200} width={200} timeout={3000} />
    </div>
  );
}

export default Spinner;
