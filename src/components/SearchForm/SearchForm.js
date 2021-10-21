import {Component} from "react";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";
import s from './SearchForm.module.css'

export default class SearchForm extends Component{
    state={
        query:''
    };

    handleQueryChange = event=>{
        this.setState({query:event.currentTarget.value.toLowerCase()});
    };
    handleSubmit = event=>{
      const {query} = this.state;
        event.preventDefault();
        if(query.trim() === ''){
        toast.error('Sorry,input field is empty');
        return;
        }
        this.setState({query:''});
        this.props.onSubmit(query)
    };

    render(){
      const {query} = this.state;
      const {handleQueryChange,handleSubmit} = this;
        return(
            <form onSubmit={handleSubmit} className={s.SearchForm}>
          <button type="submit" className={s.button}>
            <span className={s.buttonLabel}>Search</span>
          </button>
      
          <input
            className={s.input}
            value={query}
            onChange={handleQueryChange}
            type="text"
            placeholder="Search images and photos"
          />
        </form>
        )
    }
}
SearchForm.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.string,
};