import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import rancidTomato from '../assets/rancid-tomatillos.png';
import '../styles/Navigation.scss';

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    }
  }

  handleClick = () => {
    this.props.sortMovies();
  }

  handleOnChange = (event) => {
    this.setState({
      search: event.target.value.toLowerCase()
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { search } = this.state;
    const updateMovies = this.props.movies.filter(movie => movie.title.toLowerCase().includes(search))
    this.setState({
      search: ''
    })
    this.props.getSearchedMovies(updateMovies)
  }

  render() {
    const { getSearchedMovies, sortStatus } = this.props;
    return (
      <nav className='nav-bar'>
        <section className="nav-top">
          <img className='logo' src={rancidTomato} alt='logo' height='75px' width='225px' onClick={() => getSearchedMovies([])} />
          <form onSubmit={this.handleSubmit} className='filter-inputs'>
            <div className="search-input-wrap">
              <input className="search-input" id="search" placeholder="MOVIE NAME" name="search" value={this.state.search} onChange={this.handleOnChange} />
              <label htmlFor='search'></label>
            </div>
            <input className="search-button" type="submit" value='search' />
          </form>
        </section>
        <section className="nav-bottom">
          <button className='sort-button' onClick={this.handleClick}>{sortStatus ? "Oldest - Newest" : "Newest - Oldest"}</button>
          <Link to='/watch-list'>
            <button className='watch-list-button'>Watch List</button>
          </Link>
        </section>
      </nav>

    )
  }
}

export default Navigation;