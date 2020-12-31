import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import rancidTomato from '../assets/rancid-tomatillos.png';
import '../styles/Navigation.scss';

const Navigation = (props) => {
  const [search, updateSearch] = useState('');
  const { movies, getSearchedMovies, sortMovies, sortStatus } = props;

  const handleClick = () => {
    sortMovies();
  }

  const handleOnChange = (event) => {
    updateSearch(event.target.value.toLowerCase())
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const updateMovies = movies.filter(movie => movie.title.toLowerCase().includes(search))
    updateSearch('')
    getSearchedMovies(updateMovies)
  }

  return (
    <nav className='nav-bar'>
      <section className="nav-top">
        <img className='logo' src={rancidTomato} alt='logo' height='75px' width='225px' onClick={() => getSearchedMovies([])} />
        <form onSubmit={handleSubmit} className='filter-inputs'>
          <div className="search-input-wrap">
            <input className="search-input" id="search" placeholder="MOVIE NAME" name="search" value={search} onChange={handleOnChange} />
            <label htmlFor='search'></label>
          </div>
          <input className="search-button" type="submit" value='search' />
        </form>
      </section>
      <section className="nav-bottom">
        <button className='sort-button' onClick={handleClick}>{sortStatus ? "Oldest - Newest" : "Newest - Oldest"}</button>
        <Link to='/watch-list'>
          <button className='watch-list-button'>Watch List</button>
        </Link>
      </section>
    </nav>
  )

}

export default Navigation;