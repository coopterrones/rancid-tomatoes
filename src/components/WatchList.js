import React from 'react';
import MovieCard from './MovieCard';
import '../styles/WatchList.scss';
import { Link } from 'react-router-dom';
import backButton from '../assets/back-button.svg';

const WatchList = ({
  watchListMovies,
  addToWatchList,
  removeFromWatchList,
}) => {
  const watchList = watchListMovies();
  return (
    <section className='watch-list-movies-container'>
      <Link to='/'>
        <img
          className='back-button-icon'
          src={backButton}
          alt='back-button-icon'
        />
      </Link>

      {watchList.length ? (
        <MovieCard
          movies={watchList}
          addToWatchList={addToWatchList}
          removeFromWatchList={removeFromWatchList}
        />
      ) : (
        <p className='watch-list-empty-prompt'>
          No movies in your watch list. Please add to list!
        </p>
      )}
    </section>
  );
};

export default WatchList;
