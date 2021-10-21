import React from "react";
import PropTypes from 'prop-types';
import s from './Searchbar.module.css'
import SearchForm from "components/SearchForm";

export default function Searchbar({onSubmit}){
    return(
        <header className={s.Searchbar}>
            <SearchForm onSubmit={onSubmit}/>
        </header> 
    )
}
SearchForm.propTypes = {
    onSubmit: PropTypes.func,
  };