import style from '../Loader/Loader.module.css';
import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ onClick }) => {
  return (
    <div className={style.div}>
      <button type="button" onClick={onClick} className={style.button}>
        Load more
      </button>
    </div>
  );
};

Loader.propTypes = {
  onClick: PropTypes.func,
};

export default Loader;
